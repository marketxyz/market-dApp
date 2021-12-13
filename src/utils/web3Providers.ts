import Fuse from "../fuse-sdk/src";
import rpcData from "../rpc";
import { CHAIN_ID } from "./chainId";

type RpcData = { [key in number]: Record<string, any> };
const rpc = rpcData as RpcData;

export const primaryRPC = rpc[CHAIN_ID].primary!;
export const secondaryRPC = rpc[CHAIN_ID].secondary!;

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
