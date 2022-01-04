import { vercelURL } from "../getVercelURL";
import fetch from "node-fetch";

export const requestBeefy = async () => {
  const data = await fetch(`${vercelURL}/api/chain/250/beefyAPY`);
  const json = await data.json();

  return json;
};
