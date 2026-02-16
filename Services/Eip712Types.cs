using Nethereum.ABI.FunctionEncoding.Attributes;
using System.Numerics;

namespace BotA.Services
{
    // EIP-712 Domain: "Polymarket CTF Exchange", Version "1", ChainId 137
    // Verifying Contract: 0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E (Binary)
    // or 0xC5d563A36AE78145C45a50134d48A1215220f80a (NegRisk)

    [Struct("Order")]
    public class Order
    {
        [Parameter("uint256", "salt", 1)]
        public BigInteger Salt { get; set; }

        [Parameter("address", "maker", 2)]
        public string Maker { get; set; }

        [Parameter("address", "signer", 3)]
        public string Signer { get; set; }

        [Parameter("address", "taker", 4)]
        public string Taker { get; set; }

        [Parameter("uint256", "tokenId", 5)]
        public BigInteger TokenId { get; set; }

        [Parameter("uint256", "makerAmount", 6)]
        public BigInteger MakerAmount { get; set; }

        [Parameter("uint256", "takerAmount", 7)]
        public BigInteger TakerAmount { get; set; }

        [Parameter("uint256", "expiration", 8)]
        public BigInteger Expiration { get; set; }

        [Parameter("uint256", "nonce", 9)]
        public BigInteger Nonce { get; set; }

        [Parameter("uint256", "feeRateBps", 10)]
        public BigInteger FeeRateBps { get; set; }

        [Parameter("uint8", "side", 11)]
        public int Side { get; set; } // 0 = BUY, 1 = SELL

        [Parameter("uint8", "signatureType", 12)]
        public int SignatureType { get; set; }
    }
}
