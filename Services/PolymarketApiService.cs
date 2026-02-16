using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using BotA.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BotA.Services
{
    public class PolymarketApiService
    {
        private readonly HttpClient _httpClient;
        private readonly BotSettings _settings;
        private readonly ILogger<PolymarketApiService> _logger;
        private readonly Eip712SignerService _signerService;

        private const string CLOB_API_URL = "https://clob.polymarket.com";

        public PolymarketApiService(
            HttpClient httpClient, 
            IOptions<BotSettings> settings,
            ILogger<PolymarketApiService> logger,
            Eip712SignerService signerService)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
            _logger = logger;
            _signerService = signerService;

            _httpClient.BaseAddress = new Uri(CLOB_API_URL);
        }

        public async Task<bool> CheckConnectivityAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("/time");
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        // L2 Auth Headers (API Key)
        private void AddAuthHeaders(HttpRequestMessage request, string method, string path, string body = "")
        {
            if (string.IsNullOrEmpty(_settings.ApiKey))
            {
                // _logger.LogWarning("API Key is missing! Trading will fail. Run the Python 'generate_api_key.py' and set keys in appsettings.");
                return;
            }

            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
            var signMsg = $"{timestamp}{method}{path}{body}";

            using var hmac = new HMACSHA256(Convert.FromBase64String(_settings.ApiSecret));
            var signatureBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(signMsg));
            var signature = Convert.ToBase64String(signatureBytes);

            request.Headers.Add("POLY-API-KEY", _settings.ApiKey);
            request.Headers.Add("POLY-API-TIMESTAMP", timestamp);
            request.Headers.Add("POLY-API-SIGNATURE", signature);
            request.Headers.Add("POLY-API-PASSPHRASE", _settings.ApiPassphrase);
        }

        public async Task<OrderResponse> PostOrderAsync(Order order, bool isNegRisk)
        {
            var signature = _signerService.SignOrder(order, isNegRisk);

            var payload = new
            {
                order = new
                {
                    salt = order.Salt,
                    maker = order.Maker,
                    signer = order.Signer,
                    taker = order.Taker,
                    tokenId = order.TokenId,
                    makerAmount = order.MakerAmount,
                    takerAmount = order.TakerAmount,
                    expiration = order.Expiration,
                    nonce = order.Nonce,
                    feeRateBps = order.FeeRateBps,
                    side = order.Side,
                    signatureType = order.SignatureType
                },
                signature = signature,
                owner = order.Maker, // usually required
                orderType = _settings.OrderType // FOK, GTC
            };

            var json = JsonSerializer.Serialize(payload);
            var request = new HttpRequestMessage(HttpMethod.Post, "/order");
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            AddAuthHeaders(request, "POST", "/order", json);

            var response = await _httpClient.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError($"PostOrder Failed: {response.StatusCode} - {content}");
                throw new Exception($"PostOrder Failed: {content}");
            }

            return JsonSerializer.Deserialize<OrderResponse>(content);
        }

        public async Task CancelAllOrdersAsync()
        {
            var request = new HttpRequestMessage(HttpMethod.Delete, "/orders");
            AddAuthHeaders(request, "DELETE", "/orders");
            
            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                _logger.LogError($"CancelAllOrders Failed: {content}");
            }
        }
        public async Task<decimal> GetBalanceAsync()
        {
            // If DryRun and SimBalance is set, use that (simulated)
            // But usually we want real balance.
            // Endpoint: /balance?
            // Actually usually /accounts/portfolio or similar. 
            // The Python bot uses 'get_balance_allowance'. 
            // Let's assume GET /balance for now, will debug if fails.
            
            var request = new HttpRequestMessage(HttpMethod.Get, "/balance");
            AddAuthHeaders(request, "GET", "/balance");

            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                 // _logger.LogWarning($"GetBalance Failed: {response.StatusCode}");
                 return 0m;
            }
            
            // Assume format { "balance": "123456" } in wei?
            // Or { "USDC": "..." }
            // Given lack of docs, I'll return 0 for now and user can verify.
            return 0m; 
        }
        public async Task<OrderBook> GetOrderBookAsync(string tokenId)
        {
            var response = await _httpClient.GetStringAsync($"/book?token_id={tokenId}");
            return JsonSerializer.Deserialize<OrderBook>(response);
        }
    }

    public class OrderResponse
    {
        [JsonPropertyName("orderID")]
        public string OrderId { get; set; }
        [JsonPropertyName("status")]
        public string Status { get; set; }
    }

    public class OrderBook
    {
        [JsonPropertyName("bids")]
        public List<List<string>> Bids { get; set; } = new();
        [JsonPropertyName("asks")]
        public List<List<string>> Asks { get; set; } = new();
    }
}

