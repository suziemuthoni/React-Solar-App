using BotA.Models;
using BotA.Services;
using Microsoft.AspNetCore.Mvc;

namespace BotA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly TradeStore _tradeStore;
        private readonly BotControlService _botControl;
        private readonly PolymarketApiService _apiService;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(
            TradeStore tradeStore,
            BotControlService botControl,
            PolymarketApiService apiService,
            ILogger<DashboardController> logger)
        {
            _tradeStore = tradeStore;
            _botControl = botControl;
            _apiService = apiService;
            _logger = logger;
        }

        [HttpGet("statistics")]
        public async Task<ActionResult<BotStatistics>> GetStatistics()
        {
            try
            {
                var balance = await _apiService.GetBalanceAsync();
                var stats = _tradeStore.GetStatistics(balance, _botControl.IsRunning, _botControl.Status);
                return Ok(stats);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting statistics");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("trades")]
        public ActionResult<List<Trade>> GetTrades([FromQuery] int limit = 50)
        {
            try
            {
                var trades = _tradeStore.GetRecentTrades(limit);
                return Ok(trades);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting trades");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("trades/all")]
        public ActionResult<List<Trade>> GetAllTrades()
        {
            try
            {
                var trades = _tradeStore.GetAllTrades();
                return Ok(trades);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all trades");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("bot/start")]
        public ActionResult StartBot()
        {
            try
            {
                _botControl.Start();
                _logger.LogInformation("Bot started via dashboard");
                return Ok(new { message = "Bot started", status = _botControl.Status });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error starting bot");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("bot/stop")]
        public ActionResult StopBot()
        {
            try
            {
                _botControl.Stop();
                _logger.LogInformation("Bot stopped via dashboard");
                return Ok(new { message = "Bot stopped", status = _botControl.Status });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error stopping bot");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("bot/pause")]
        public ActionResult PauseBot()
        {
            try
            {
                _botControl.Pause();
                _logger.LogInformation("Bot paused via dashboard");
                return Ok(new { message = "Bot paused", status = _botControl.Status });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error pausing bot");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("bot/resume")]
        public ActionResult ResumeBot()
        {
            try
            {
                _botControl.Resume();
                _logger.LogInformation("Bot resumed via dashboard");
                return Ok(new { message = "Bot resumed", status = _botControl.Status });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resuming bot");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("bot/status")]
        public ActionResult GetBotStatus()
        {
            try
            {
                return Ok(new
                {
                    isRunning = _botControl.IsRunning,
                    isPaused = _botControl.IsPaused,
                    status = _botControl.Status,
                    startTime = _botControl.StartTime,
                    stopTime = _botControl.StopTime,
                    uptime = _botControl.GetUptime()?.ToString(@"hh\:mm\:ss")
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting bot status");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("trades")]
        public ActionResult ClearTrades()
        {
            try
            {
                _tradeStore.ClearTrades();
                _logger.LogInformation("Trade history cleared via dashboard");
                return Ok(new { message = "Trade history cleared" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error clearing trades");
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
