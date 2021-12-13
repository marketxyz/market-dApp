import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  initFuseWithProviders,
  secondaryRPC,
} from "../src/utils/web3Providers";

const fuse = initFuseWithProviders(secondaryRPC);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let poolData = await fuse.contracts.FusePoolLens.methods
    .getPublicPoolsWithData()
    .call({ gas: 1e18 });

  let owner = req.query.owner;
  if (!owner) {
    return res.status(404).json({ msg: "query parameter not provided" });
  }
  let matchedPools: Record<any, any>[] = [];
  for (let [idx, p] of Object.entries(poolData[1]) as any) {
    const contract = new fuse.web3.eth.Contract(
      JSON.parse(
        fuse.compoundContracts["contracts/Comptroller.sol:Comptroller"].abi
      ),
      p.comptroller
    );

    try {
      let admin = await contract.methods.admin().call({ gas: 1e18 });
      if (admin === owner) {
        matchedPools.push({
          name: p.name,
          creator: p.creator,
          comptroller: p.comptroller,
          blockPosted: p.blockPosted,
          timestampPosted: p.timestampPosted,
          supply: poolData[2][idx],
          borrow: poolData[3][idx],
          underlyingTokens: poolData[4][idx],
          underlyingSymbols: poolData[5][idx],
        });
      }
    } catch (e) {
      // ignore
    }
  }

  res.setHeader("Cache-Control", "maxage=600, s-maxage=600");

  return res.json(matchedPools);
};
