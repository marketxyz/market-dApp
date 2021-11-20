import Fuse from "../fuse-sdk/src";

export const infuraURL = process.env.REACT_APP_INFURA_RPC!;
export const turboGethURL = process.env.REACT_APP_ALCHEMY_RPC!;

declare let window: any;

export function chooseBestWeb3Provider() {
  if (typeof window === "undefined") {
    return infuraURL;
  }
  
  // if (window.ethereum) {
  //   return window.ethereum;
  // } else 
  if (window.web3 && window.web3.currentProvider.chainId === "0x89") {
    return window.web3.currentProvider;
  } else {
    return infuraURL;
  }
}

export const initFuseWithProviders = (provider = chooseBestWeb3Provider()) => {
  const fuse = new Fuse(provider);

  // @ts-ignore We have to do this to avoid Infura ratelimits on our large calls.
  fuse.contracts.FusePoolLens.setProvider(turboGethURL);

  return fuse;
};
