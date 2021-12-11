import { VercelRequest, VercelResponse } from "@vercel/node";
import { variance } from "mathjs";
import fetch from "node-fetch";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=600, s-maxage=600");

  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/ethereum/market_chart/?vs_currency=usd&days=30"
  )
    .then((res) => res.json())
    .catch((_) => [])
    .then((data) => data.prices.map(([, price]) => price))
    .then((prices) => variance(prices));

  const jsonBody = { ethVariance: data };

  return response.json(jsonBody);
};
