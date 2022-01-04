import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  initFuseWithProviders,
  secondaryRPC,
} from "../src/utils/web3Providers";

const fuse = initFuseWithProviders(secondaryRPC);

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "maxage=15, s-maxage=15");

  const { comptroller, address } = req.query;

  if (comptroller && address) {
    const output = await fuse.contracts.FusePoolLens.methods
      .getPoolAssetsWithData(comptroller)
      .call({ from: address, gas: 1e18 });
    console.log(output);

    return res.json(output);
  }

  res.status(400);
  return "Comptroller or Address not provided!";
};
