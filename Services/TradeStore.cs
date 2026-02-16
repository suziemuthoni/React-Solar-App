using BotA.Models;
using System.Collections.Concurrent;

namespace BotA.Services
{
    public class TradeStore
    {
        private readonly ConcurrentBag<Trade> _trades = new();
        private readonly object _lockObject = new();
        private decimal _totalProfit = 0m;
        private decimal _totalLoss = 0m;

        public void AddTrade(Trade trade)
        {
            _trades.Add(trade);
            
            lock (_lockObject)
            {
                if (trade.ActualProfit > 0)
                    _totalProfit += trade.ActualProfit;
                else if (trade.ActualProfit < 0)
                    _totalLoss += Math.Abs(trade.ActualProfit);
            }
        }

        public List<Trade> GetAllTrades()
        {
            return _trades.OrderByDescending(t => t.Timestamp).ToList();
        }

        public List<Trade> GetRecentTrades(int count = 50)
        {
            return _trades.OrderByDescending(t => t.Timestamp).Take(count).ToList();
        }

        public BotStatistics GetStatistics(decimal currentBalance, bool isBotRunning, string botStatus)
        {
            var trades = _trades.ToList();
            var successfulTrades = trades.Where(t => t.Status == "Filled").ToList();
            var failedTrades = trades.Where(t => t.Status == "Failed").ToList();

            var totalProfit = successfulTrades.Where(t => t.ActualProfit > 0).Sum(t => t.ActualProfit);
            var totalLoss = Math.Abs(successfulTrades.Where(t => t.ActualProfit < 0).Sum(t => t.ActualProfit));
            var netPnL = totalProfit - totalLoss;

            return new BotStatistics
            {
                TotalTrades = trades.Count,
                SuccessfulTrades = successfulTrades.Count,
                FailedTrades = failedTrades.Count,
                TotalProfit = totalProfit,
                TotalLoss = totalLoss,
                NetProfitLoss = netPnL,
                WinRate = trades.Count > 0 ? (decimal)successfulTrades.Count / trades.Count * 100 : 0,
                AverageProfit = successfulTrades.Count > 0 ? successfulTrades.Average(t => t.ActualProfit) : 0,
                CurrentBalance = currentBalance,
                LastTradeTime = trades.OrderByDescending(t => t.Timestamp).FirstOrDefault()?.Timestamp,
                IsBotRunning = isBotRunning,
                BotStatus = botStatus
            };
        }

        public void ClearTrades()
        {
            _trades.Clear();
            lock (_lockObject)
            {
                _totalProfit = 0m;
                _totalLoss = 0m;
            }
        }
    }
}
