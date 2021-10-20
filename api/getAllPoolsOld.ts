import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  initFuseWithProviders,
  turboGethURL,
} from "../src/utils/web3Providers";

const fuse = initFuseWithProviders(turboGethURL);

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let pools = await fuse.contracts.FusePoolDirectory.methods
    .getAllPools()
    .call({ gas: 1e18 });

  pools = pools.map((pool) => ({
    ...pool,
    name: pool[0],
    creator: pool[1],
    comptroller: pool[2],
    blockPosted: pool[3],
    timestampPosted: pool[4],
  }));

  const indexes = pools.map((_, i) => i);
  const totalSupply = pools.map((_) => 0);
  const totalBorrow = pools.map((_) => 0);
  const underlyingTokens = pools.map((_) => []);
  const underlyingSymbols = pools.map((_) => []);
  const errored = pools.map((_) => 0);
  let idx = 0;
  for (const pool of pools) {
    const { 2: comptroller } = pool;
    try {
      const data = await fuse.contracts.FusePoolLens.methods
        .getPoolSummary(comptroller)
        .call({ gas: 1e18 });
      const {
        0: _totalSupply,
        1: _totalBorrow,
        2: _underlyingTokens,
        3: _underlyingSymbols,
      } = data;
      totalSupply[idx] = _totalSupply;
      totalBorrow[idx] = _totalBorrow;
      underlyingTokens[idx] = _underlyingTokens;
      underlyingSymbols[idx] = _underlyingSymbols;
      errored[idx] = 0;
    } catch (e) {
      errored[idx] = 1;
    }
    idx++;
  }
  res.setHeader("Cache-Control", "maxage=180, s-maxage=3600");
  return res.json({
    0: indexes,
    1: pools,
    2: totalSupply,
    3: totalBorrow,
    4: underlyingTokens,
    5: underlyingSymbols,
    6: errored,
    indexes,
    pools,
    totalSupply,
    totalBorrow,
    underlyingSymbols,
    underlyingTokens,
    errored,
  });
};
