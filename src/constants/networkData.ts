export const chainIdOrder = [137, 250, 56, 43114, 10, 42161];
export const networkData: Record<string, any> = {
  56: {
    chainIdHex: "0x38",
    chainName: "bsc",
    color: "#f8cf2e",
    scanner: "https://bscscan.com/token",
    name: "Binance Chain (BSC)",
    shortName: "BSC",
    img: "https://raw.githubusercontent.com/sushiswap/icons/master/network/bsc.jpg",
    url: "https://bsc.market.xyz",
    enabled: true,
    addData: {
      chainId: "0x38",
      chainName: "Binance Smart Chain",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed1.binance.org"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },
    extraData: {
      coingeckoNetwork: "binance-smart-chain",
      sushiURL:
        "https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/bsc.json",
    },
  },
  137: {
    chainIdHex: "0x89",
    chainName: "matic",
    color: "#a557fe",
    scanner: "https://polygonscan.com/token",
    name: "Polygon (Matic)",
    shortName: "Polygon",
    img: "https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg",
    url: "https://polygon.market.xyz",
    enabled: true,
    addData: {
      chainId: "0x89",
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    extraData: {
      coingeckoNetwork: "polygon-pos",
      sushiURL:
        "https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/matic.json",
    },
  },
  250: {
    name: "Fantom",
    chainName: "fantom",
    color: "#1969ff",
    scanner: "https://ftmscan.com/token",
    shortName: "Fantom",
    img: "/static/fantom.jpeg",
    url: "https://fantom.market.xyz",
    enabled: true,
    addData: {
      chainId: "0xFA",
      chainName: "Fantom",
      nativeCurrency: {
        name: "Fantom",
        symbol: "FTM",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ftm.tools/"],
      blockExplorerUrls: ["https://ftmscan.com/"],
    },
    extraData: {
      coingeckoNetwork: "fantom",
      sushiURL:
        "https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/fantom.json",
    },
  },
  43114: {
    name: "Avalanche",
    chainName: "avalanche",
    color: "#e84142",
    scanner: "https://snowtrace.io/token",
    shortName: "AVAX",
    img: "/static/avax.png",
    url: "https://avax.market.xyz",
    enabled: true,
    addData: {
      chainId: "0xA86A",
      chainName: "Avalanche",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      blockExplorerUrls: ["https://snowtrace.io/"],
    },
    extraData: {
      coingeckoNetwork: "avalanche",
      sushiURL:
        "https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/avalanche.json",
    },
  },
  10: {
    name: "Optimism",
    shortName: "Optimism",
    img: "/static/optimism.png",
    url: "optimism.market.xyz",
    enabled: false,
  },
  42161: {
    name: "Arbitrum",
    shortName: "Arbitrum",
    img: "/static/arbitrum.png",
    url: "arb.market.xyz",
    enabled: false,
  },
};
