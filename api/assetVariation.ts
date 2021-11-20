import { VercelRequest, VercelResponse } from "@vercel/node";
import { variance } from "mathjs";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=1200, s-maxage=1200");

  const address = request.query;

  await fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}/market_chart/?vs_currency=usd&days=30`
  )
    .then((res) => res.json())
    .then((data) => data.prices.map(([, price]) => price))
    .then((prices) => response.json(variance(prices)));
};
