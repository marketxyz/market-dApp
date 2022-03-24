export const chainIdOrder = [137, 250, 43114, 1285, 1666600000];

export const networkData: Record<string, any> = {
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
    chainName: "avalanche-fuji-mainnet",
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
  1285: {
    name: "Moonriver",
    chainName: "moonriver",
    color: "",
    scanner: "https://moonriver.moonscan.io/token",
    shortName: "MOVR",
    img: "/static/moonriver.jpg",
    url: "https://moonriver.market.xyz",
    enabled: true,
    addData: {
      chainId: "0x505",
      chainName: "Moonriver",
      nativeCurrency: {
        name: "MOVR",
        symbol: "MOVR",
        decimals: 18,
      },
      rpcUrls: ["https://moonriver.api.onfinality.io/public"],
      blockExplorerUrls: ["https://moonriver.moonscan.io/"],
    },
    extraData: {
      coingeckoNetwork: "moonriver",
      sushiURL:
        "https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/moonriver.json",
    },
  },
  1666600000: {
    chainIdHex: "0x63564c40",
    chainName: "harmony",
    color: "",
    scanner: "https://explorer.harmony.one/token",
    name: "Harmony",
    shortName: "Harmony",
    img: "/static/harmonyone.jpg",
    url: "https://harmony.market.xyz",
    enabled: true,
    addData: {
      chainId: "0x63564c40",
      chainName: "Harmony",
      nativeCurrency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18,
      },
      rpcUrls: ["https://api.harmony.one"],
      blockExplorerUrls: ["https://explorer.harmony.one/"],
    },
    extraData: {
      coingeckoNetwork: "harmony-shard-0",
      sushiURL:
        "https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/harmony.json",
    },
  },
};
