import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

// note: this acts like a proxy for beefy APY and caches it for 10mins
export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=600, s-maxage=600");

  const data = await fetch("https://api.beefy.finance/apy");
  const json = await data.json();

  return response.json(json);
};
