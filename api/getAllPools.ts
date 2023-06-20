import { NowRequest, NowResponse } from "@vercel/node";
import {
  initFuseWithProviders,
  secondaryRPC,
} from "../src/utils/web3Providers";

const fuse = initFuseWithProviders(secondaryRPC);

function formatPools(pools: any) {
  if (!(pools["0"] && pools["0"].length)) {
    return [];
  }

  const _pools: Record<number, any> = {};
  for (let idx = 0; idx < pools["0"].length; idx++) {
    _pools[idx] = {
      name: pools["1"][idx].name,
      creator: pools["1"][idx].creator,
      comptroller: pools["1"][idx].comptroller,
      blockPosted: pools["1"][idx].blockPosted,
      timestampPosted: pools["1"][idx].timestampPosted,
      supplyInETH: pools["2"][idx],
      borrowInETH: pools["3"][idx],
      underlyingTokens: pools["4"][idx],
      underlyingSymbols: pools["5"][idx],
      errored: pools["6"][idx],
    };
  }

  return _pools;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let pools = await fuse.contracts.FusePoolLens.methods
    .getPublicPoolsWithData()
    .call({ gas: 1e18 });

  res.setHeader("Cache-Control", "maxage=300, s-maxage=300");

  if (!req.query?.format || parseInt(req.query?.format as string) !== 1)
    return res.json(pools);
  else return res.json(formatPools(pools));
};
