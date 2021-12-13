export const chainIdToData: Record<
  number,
  { name: string; chainName: string; color: string; scanner: string }
> = {
  137: {
    name: "Polygon",
    chainName: "matic",
    color: "#a557fe",
    scanner: "https://polygonscan.com/token",
  },
  250: {
    name: "Fantom",
    chainName: "fantom",
    color: "#1969ff",
    scanner: "https://ftmscan.com/token",
  },
};

export const networkData: Record<string, any> = {
  polygon: {
    chainId: 137,
    chainIdHex: "0x89",
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
  },
  fantom: {
    chainId: 250,
    name: "Fantom",
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
  },
  optimism: {
    chainId: 10,
    name: "Optimism",
    shortName: "Optimism",
    img: "/static/optimism.png",
    url: "optimism.market.xyz",
    enabled: false,
  },
  arbitrum: {
    chainId: 42161,
    name: "Arbitrum",
    shortName: "Arbitrum",
    img: "/static/arbitrum.png",
    url: "arb.market.xyz",
    enabled: false,
  },
};
