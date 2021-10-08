import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  initFuseWithProviders,
  turboGethURL,
} from "../src/utils/web3Providers";

const fuse = initFuseWithProviders(turboGethURL);

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let pools = await fuse.contracts.FusePoolLens.methods
    .getPublicPoolsWithData()
    .call({ gas: 1e18 });

  let owner = req.query.owner;
  let matchedPool = {};
  pools[1].map((p) => {
    if (p.comptroller === owner) {
      matchedPool = p;
    }
  });

  res.setHeader("Cache-Control", "maxage=600, s-maxage=600");
  
  return res.json(matchedPool);
};
