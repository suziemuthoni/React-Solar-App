namespace BotA.Models
{
    public class Trade
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string MarketSlug { get; set; } = string.Empty;
        public string MarketId { get; set; } = string.Empty;
        public decimal YesPrice { get; set; }
        public decimal NoPrice { get; set; }
        public decimal TotalCost { get; set; }
        public decimal Size { get; set; }
        public decimal ExpectedProfit { get; set; }
        public decimal ActualProfit { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Filled, Failed
        public bool IsDryRun { get; set; }
        public string? YesOrderId { get; set; }
        public string? NoOrderId { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public class BotStatistics
    {
        public int TotalTrades { get; set; }
        public int SuccessfulTrades { get; set; }
        public int FailedTrades { get; set; }
        public decimal TotalProfit { get; set; }
        public decimal TotalLoss { get; set; }
        public decimal NetProfitLoss { get; set; }
        public decimal WinRate { get; set; }
        public decimal AverageProfit { get; set; }
        public decimal CurrentBalance { get; set; }
        public DateTime? LastTradeTime { get; set; }
        public bool IsBotRunning { get; set; }
        public string BotStatus { get; set; } = "Stopped";
    }
}
