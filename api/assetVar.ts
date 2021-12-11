import { VercelRequest, VercelResponse } from "@vercel/node";
import { variance } from "mathjs";
import fetch from "node-fetch";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=600, s-maxage=600");
  const queryBody = <Record<string, string>>request.query;
  const address = queryBody.address;

  if (address) {
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}/market_chart/?vs_currency=usd&days=30`
    )
      .then((res) => res.json())
      .then((data) => data.prices.map(([, price]) => price))
      .then((prices) => variance(prices));

    const jsonBody = { assetVariance: data };
    return response.json(jsonBody);
  } else {
    return response.status(404).json({ "Error message: ": "Provide address along with the query!" });
  }
};
