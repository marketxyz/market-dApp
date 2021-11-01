import { NowRequest, NowResponse } from "@vercel/node";
import {
  initFuseWithProviders,
  turboGethURL,
} from "../src/utils/web3Providers";

const fuse = initFuseWithProviders(turboGethURL);

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let pools = await fuse.contracts.FusePoolLens.methods
    .getPublicPoolsWithData()
    .call({ gas: 1e18 });

  res.setHeader("Cache-Control", "maxage=300, s-maxage=300");
  return res.json(pools);
};
