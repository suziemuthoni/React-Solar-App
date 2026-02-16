using BotA.Configuration;
using BotA.Models;
using BotA.Services;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BotA.Workers
{
    public class BotWorker : BackgroundService
    {
        private readonly ILogger<BotWorker> _logger;
        private readonly BotSettings _settings;
        private readonly PolymarketApiService _apiService;
        private readonly MarketLookupService _marketLookup;
        private readonly RiskManager _riskManager;
        private readonly Eip712SignerService _signerService;
        private readonly BotControlService _botControl;
        private readonly TradeStore _tradeStore;

        public BotWorker(
            ILogger<BotWorker> logger,
            IOptions<BotSettings> settings,
            PolymarketApiService apiService,
            MarketLookupService marketLookup,
            RiskManager riskManager,
            Eip712SignerService signerService,
            BotControlService botControl,
            TradeStore tradeStore)
        {
            _logger = logger;
            _settings = settings.Value;
            _apiService = apiService;
            _marketLookup = marketLookup;
            _riskManager = riskManager;
            _signerService = signerService;
            _botControl = botControl;
            _tradeStore = tradeStore;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("BotWorker starting...");
            _logger.LogInformation($"Wallet Address: {_signerService.GetSignerAddress()}");
            _logger.LogInformation($"Maker Address: {_signerService.GetMakerAddress()}");

            // Auto-start the bot
            _botControl.Start();

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Check if bot should run
                    if (!_botControl.ShouldRun())
                    {
                        await Task.Delay(1000, stoppingToken);
                        continue;
                    }

                    await RunBotLoopAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in Bot Loop");
                    await Task.Delay(5000, stoppingToken);
                }
            }
        }

        private async Task RunBotLoopAsync(CancellationToken token)
        {
            // 1. Get Market
            var market = await _marketLookup.GetMarketFromSlugAsync(_settings.MarketSlug);
            if (!market.Active)
            {
                _logger.LogWarning("Market is not active. Waiting...");
                await Task.Delay(60000, token);
                return;
            }

            _logger.LogInformation($"Market found: {market.Question} (ID: {market.MarketId})");
            bool isNegRisk = _settings.MarketSlug.Contains("15min"); // Heuristic based on Python bot

            while (!token.IsCancellationRequested)
            {
                // 2. Check Balance
                var balance = await _apiService.GetBalanceAsync();
                // _logger.LogInformation($"Balance: {balance} USDC");

                if (!_riskManager.CanTrade(1.0m, balance) && !_settings.DryRun)
                {
                    _logger.LogWarning("Risk checks failed or insufficient balance.");
                    await Task.Delay(10000, token);
                    continue;
                }

                // 3. Get Orderbooks
                var yesBook = await _apiService.GetOrderBookAsync(market.YesTokenId);
                var noBook = await _apiService.GetOrderBookAsync(market.NoTokenId);

                // Check asks
                if (yesBook.Asks.Count == 0 || noBook.Asks.Count == 0)
                {
                    // _logger.LogInformation("No liquidity.");
                    await Task.Delay(1000, token);
                    continue;
                }

                if (!decimal.TryParse(yesBook.Asks[0][0], out var yesAsk) ||
                    !decimal.TryParse(noBook.Asks[0][0], out var noAsk))
                {
                    continue;
                }

                var totalCost = yesAsk + noAsk;
                // _logger.LogInformation($"Ref: {totalCost:F3} | Yes: {yesAsk} | No: {noAsk}");

                if (totalCost < _settings.TargetPairCost)
                {
                    var profit = 1.0m - totalCost;
                    _logger.LogInformation($"ARBITRAGE OPPORTUNITY! Cost: {totalCost}, Profit: {profit}");

                    // Create trade record
                    var trade = new Trade
                    {
                        MarketSlug = _settings.MarketSlug,
                        MarketId = market.MarketId,
                        YesPrice = yesAsk,
                        NoPrice = noAsk,
                        TotalCost = totalCost,
                        Size = _settings.OrderSize,
                        ExpectedProfit = profit * _settings.OrderSize,
                        IsDryRun = _settings.DryRun,
                        Status = "Pending"
                    };

                    if (!_settings.DryRun)
                    {
                        var size = _settings.OrderSize;
                        // Execute
                        _logger.LogInformation($"Placing Orders for Size {size}...");
                        
                        try
                        {
                            var orderYes = _signerService.CreateOrder(market.YesTokenId, yesAsk, size, true, isNegRisk);
                            var orderNo = _signerService.CreateOrder(market.NoTokenId, noAsk, size, true, isNegRisk);

                            // Post in parallel
                            var t1 = _apiService.PostOrderAsync(orderYes, isNegRisk);
                            var t2 = _apiService.PostOrderAsync(orderNo, isNegRisk);

                            await Task.WhenAll(t1, t2);
                            
                            trade.Status = "Filled";
                            trade.ActualProfit = profit * size; // Simplified - actual would need order fill confirmation
                            _logger.LogInformation("Orders Placed.");
                            _riskManager.RegisterTrade(0); // PnL unknown yet
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Error placing orders");
                            trade.Status = "Failed";
                            trade.ErrorMessage = ex.Message;
                            trade.ActualProfit = 0;
                        }
                    }
                    else
                    {
                        _logger.LogInformation("[DRY RUN] Would place orders.");
                        trade.Status = "DryRun";
                        trade.ActualProfit = profit * _settings.OrderSize;
                    }

                    // Store trade
                    _tradeStore.AddTrade(trade);
                    
                    // Cooldown
                    await Task.Delay(_settings.CooldownSeconds * 1000, token);
                }
                else
                {
                    await Task.Delay(1000, token);
                }
            }
        }
    }
}
