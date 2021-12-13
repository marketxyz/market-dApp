import Fuse from "../fuse-sdk/src";
import rpc from "../rpc";

export const primaryRPC = rpc[137].primary!;
export const secondaryRPC = rpc[137].secondary!;

declare let window: any;

export function chooseBestWeb3Provider() {
  if (typeof window === "undefined") {
    return primaryRPC;
  }

  if (window?.web3?.currentProvider?.chainId === "0x89") {
    return window.web3.currentProvider;
  } else {
    return primaryRPC;
  }
}

export const initFuseWithProviders = (provider = chooseBestWeb3Provider()) => {
  const fuse = new Fuse(provider);

  // @ts-ignore We have to do this to avoid Infura ratelimits on our large calls.
  fuse.contracts.FusePoolLens.setProvider(secondaryRPC);

  return fuse;
};
