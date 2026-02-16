using System;

namespace BotA.Configuration
{
    public class BotSettings
    {
        // API Credentials
        public string ApiKey { get; set; } = string.Empty;
        public string ApiSecret { get; set; } = string.Empty;
        public string ApiPassphrase { get; set; } = string.Empty;
        public string PrivateKey { get; set; } = string.Empty;
        public int SignatureType { get; set; } = 1;
        public string Funder { get; set; } = string.Empty;

        // Market Configuration
        public string MarketSlug { get; set; } = string.Empty;
        public string MarketId { get; set; } = string.Empty;
        public string YesTokenId { get; set; } = string.Empty;
        public string NoTokenId { get; set; } = string.Empty;
        
        // Trading Parameters
        public decimal TargetPairCost { get; set; } = 0.99m;
        public decimal BalanceSlack { get; set; } = 0.15m;
        public decimal OrderSize { get; set; } = 50m;
        public string OrderType { get; set; } = "FOK";
        public decimal YesBuyThreshold { get; set; } = 0.45m;
        public decimal NoBuyThreshold { get; set; } = 0.45m;
        public int CooldownSeconds { get; set; } = 10;

        // Simulation
        public bool DryRun { get; set; } = false;
        public decimal SimBalance { get; set; } = 0m;

        // Risk Management
        public decimal MaxDailyLoss { get; set; } = 0m;
        public decimal MaxPositionSize { get; set; } = 0m;
        public int MaxTradesPerDay { get; set; } = 0;
        public decimal MinBalanceRequired { get; set; } = 10.0m;
        public decimal MaxBalanceUtilization { get; set; } = 0.8m;
    }
}
