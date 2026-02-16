using BotA.Configuration;
using BotA.Services; // For Eip712Types
using Microsoft.Extensions.Options;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Signer;
using Nethereum.ABI.EIP712; // Required for Domain type
using Nethereum.Signer.EIP712;
using Nethereum.Util;
using System.Numerics;

namespace BotA.Services
{
    public class Eip712SignerService
    {
        private readonly BotSettings _settings;
        private readonly Eip712TypedDataSigner _signer;

        // CTF Exchange Contract (Binary)
        private const string VERIFYING_CONTRACT_BINARY = "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E";
        // NegRisk Adapter / CTF Exchange (NegRisk)
        private const string VERIFYING_CONTRACT_NEGRISK = "0xC5d563A36AE78145C45a50134d48A1215220f80a";

        private const string DOMAIN_NAME = "Polymarket CTF Exchange";
        private const string DOMAIN_VERSION = "1";
        private const int CHAIN_ID = 137;

        public Eip712SignerService(IOptions<BotSettings> settings)
        {
            _settings = settings.Value;
            _signer = new Eip712TypedDataSigner();
        }

        public string GetSignerAddress()
        {
            if (string.IsNullOrEmpty(_settings.PrivateKey)) return "";
            return new EthECKey(_settings.PrivateKey).GetPublicAddress();
        }

        public string GetMakerAddress()
        {
            // If Funder is provided, use it (Proxy). Otherwise use the Signer address (EOA).
            if (!string.IsNullOrEmpty(_settings.Funder))
            {
                return _settings.Funder;
            }
            return GetSignerAddress();
        }

        public Order CreateOrder(string tokenId, decimal price, decimal size, bool isBuy, bool isNegRisk)
        {
            var maker = GetMakerAddress();
            var signer = GetSignerAddress();

            // Decimals: USDC = 6, Tokens = 6
            // Price is USDC per Token
            // Size is Number of Tokens

            BigInteger makerAmount;
            BigInteger takerAmount;

            var sizeWei = UnitConversion.Convert.ToWei(size, 6);
            var costWei = UnitConversion.Convert.ToWei(price * size, 6);

            if (isBuy)
            {
                // Buying: I give USDC (Cost), I get Tokens (Size)
                makerAmount = costWei;
                takerAmount = sizeWei;
            }
            else
            {
                // Selling: I give Tokens (Size), I get USDC (Cost)
                makerAmount = sizeWei;
                takerAmount = costWei;
            }

            var salt = GenerateSalt();

            return new Order
            {
                Salt = salt,
                Maker = maker,
                Signer = signer,
                Taker = "0x0000000000000000000000000000000000000000",
                TokenId = BigInteger.Parse(tokenId),
                MakerAmount = makerAmount,
                TakerAmount = takerAmount,
                Expiration = 0,
                Nonce = 0,
                FeeRateBps = 0,
                Side = isBuy ? 0 : 1,
                SignatureType = _settings.SignatureType
            };
        }

        public string SignOrder(Order order, bool isNegRisk)
        {
            var verifyingContract = isNegRisk ? VERIFYING_CONTRACT_NEGRISK : VERIFYING_CONTRACT_BINARY;
            
            var domain = new Domain
            {
                Name = DOMAIN_NAME,
                Version = DOMAIN_VERSION,
                ChainId = CHAIN_ID,
                VerifyingContract = verifyingContract
            };

            var typedData = new TypedData<Domain>
            {
                Domain = domain,
                Types = MemberDescriptionFactory.GetTypesMemberDescription(typeof(Domain), typeof(Order)),
                PrimaryType = "Order",
            };

            var key = new EthECKey(_settings.PrivateKey);
            
            // Use overload: SignTypedDataV4<T, TDomain>(T message, TypedData<TDomain> typedData, EthECKey key)
            var signature = _signer.SignTypedDataV4<Order, Domain>(order, typedData, key);
            
            return signature;
        }

        private BigInteger GenerateSalt()
        {
            // Random salt
            var rng = new Random();
            var bytes = new byte[32];
            rng.NextBytes(bytes);
            return new BigInteger(bytes, isUnsigned: true);
        }
    }
}
