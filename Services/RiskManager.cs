using BotA.Configuration;
using Microsoft.Extensions.Options;

namespace BotA.Services
{
    public class RiskManager
    {
        private readonly BotSettings _settings;
        private decimal _dailyLoss = 0m;
        private int _tradesToday = 0;
        private DateTime _lastReset = DateTime.UtcNow.Date;

        public RiskManager(IOptions<BotSettings> settings)
        {
            _settings = settings.Value;
        }

        public bool CanTrade(decimal requestedCost, decimal currentBalance)
        {
            // Reset daily counters
            if (DateTime.UtcNow.Date > _lastReset)
            {
                _dailyLoss = 0;
                _tradesToday = 0;
                _lastReset = DateTime.UtcNow.Date;
            }

            if (_settings.MaxTradesPerDay > 0 && _tradesToday >= _settings.MaxTradesPerDay)
            {
                return false;
            }

            if (_settings.MaxDailyLoss > 0 && _dailyLoss >= _settings.MaxDailyLoss)
            {
                return false;
            }

            if (currentBalance < _settings.MinBalanceRequired)
            {
                return false;
            }

            return true;
        }

        public void RegisterTrade(decimal pnl)
        {
            _tradesToday++;
            if (pnl < 0)
            {
                _dailyLoss += Math.Abs(pnl);
            }
        }
    }
}
