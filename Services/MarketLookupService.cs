using System.Text.RegularExpressions;
using System.Text.Json;
using BotA.Configuration;
using Microsoft.Extensions.Logging;

namespace BotA.Services
{
    public class MarketInfo
    {
        public string MarketId { get; set; }
        public string YesTokenId { get; set; }
        public string NoTokenId { get; set; }
        public string Question { get; set; }
        public bool Active { get; set; }
    }

    public class MarketLookupService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<MarketLookupService> _logger;

        public MarketLookupService(HttpClient httpClient, ILogger<MarketLookupService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
        }

        public async Task<MarketInfo> GetMarketFromSlugAsync(string slug)
        {
            // Use Gamma API instead of web scraping to avoid 403 errors
            var url = $"https://gamma-api.polymarket.com/events?slug={slug}";
            try 
            {
                _logger.LogInformation($"Fetching market from Gamma API: {slug}");
                var response = await _httpClient.GetStringAsync(url);
                
                using var doc = JsonDocument.Parse(response);
                var root = doc.RootElement;
                
                // The response is an array of events
                if (root.ValueKind == JsonValueKind.Array && root.GetArrayLength() > 0)
                {
                    var eventData = root[0];
                    
                    // Get markets array from the event
                    if (eventData.TryGetProperty("markets", out var markets) && markets.GetArrayLength() > 0)
                    {
                        // For simplicity, use the first market
                        // In a real bot, you might want to select a specific market
                        var market = markets[0];
                        
                        var id = market.GetProperty("id").GetString();
                        var question = market.GetProperty("question").GetString();
                        var active = market.GetProperty("active").GetBoolean();
                        
                        // Get token IDs
                        var clobTokenIds = market.GetProperty("clobTokenIds");
                        var yesToken = clobTokenIds[0].GetString();
                        var noToken = clobTokenIds[1].GetString();
                        
                        _logger.LogInformation($"Found Market: {question} (ID: {id})");
                        _logger.LogInformation($"Yes Token: {yesToken}, No Token: {noToken}");
                        
                        return new MarketInfo
                        {
                            MarketId = id,
                            YesTokenId = yesToken,
                            NoTokenId = noToken,
                            Question = question,
                            Active = active
                        };
                    }
                }
                
                throw new Exception($"Market slug '{slug}' not found in Gamma API response.");
            }
            catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogError($"Market Slug '{slug}' not found (404). Please check the 'MarketSlug' in appsettings.json. Go to polymarket.com, find the market, and copy the slug from the URL.");
                throw new Exception("Market Not Found", ex);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"HTTP error fetching market: {ex.StatusCode} - {ex.Message}");
                throw new Exception($"Failed to fetch market: {ex.Message}", ex);
            }
        }

    }
}
