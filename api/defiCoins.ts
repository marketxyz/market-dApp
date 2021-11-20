import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=600, s-maxage=600");

  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized_finance_defi&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  )
    .then((res) => res.json())
    .then((array) => array.slice(0, 30));

  return response.json(data);
};
