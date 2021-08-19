import Fuse from "../fuse-sdk/src";

export const infuraURL = `https://mainnet.infura.io/v3/5740d6972b5641bbad68560dbb166ae7`;
export const turboGethURL = `https://eth-mainnet.alchemyapi.io/v2/ipwJjMI1ECT-Lxxi8B80zCIAaFMdQK4K`;

declare let window: any;

export function chooseBestWeb3Provider() {
  if (typeof window === "undefined") {
    return turboGethURL;
  }

  if (window.ethereum) {
    return window.ethereum;
  } else if (window.web3) {
    return window.web3.currentProvider;
  } else {
    return turboGethURL;
  }
}

export const initFuseWithProviders = (provider = chooseBestWeb3Provider()) => {
  const fuse = new Fuse(provider);

  // @ts-ignore We have to do this to avoid Infura ratelimits on our large calls.
  fuse.contracts.FusePoolLens.setProvider(turboGethURL);

  return fuse;
};
