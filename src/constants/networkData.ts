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
  mainnet: {
    chainId: 1,
    chainIdHex: "0x1",
    name: "Ethereum",
    shortName: "Ethereum",
    img: "https://raw.githubusercontent.com/sushiswap/icons/master/network/mainnet.jpg",
    url: "https://eth.market.xyz",
    addData: null,
    enabled: true,
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
