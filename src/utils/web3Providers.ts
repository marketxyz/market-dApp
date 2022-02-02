import Fuse from "../fuse-sdk/src";
import { getRPC } from "../rpc";
import { CHAIN_ID } from "./chainId";

export const primaryRPC = getRPC(CHAIN_ID, false);
export const secondaryRPC = getRPC(CHAIN_ID, true);

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
