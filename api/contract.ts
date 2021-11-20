import { VercelRequest, VercelResponse } from "@vercel/node";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: VercelRequest, response: VercelResponse) => {
  const address = request.query;

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=1200, s-maxage=1200");

  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`
  );
  const json = await data.json();

  return response.json(json);
};
