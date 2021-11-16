import { VercelRequest, VercelResponse } from "@vercel/node";
import { variance } from "mathjs";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: VercelRequest, response: VercelResponse) => {
  const {address, poolId} = <Record<string, string>>request.query;
  
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=600, s-maxage=600");

  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}/market_chart/?vs_currency=usd&days=30`
  )
    .then((res) => res.json())
    .then((data) => data.prices.map(([, price]) => price))
    .then((prices) => variance(prices));

  const json = await data.json();

  return response.json(json);
};
