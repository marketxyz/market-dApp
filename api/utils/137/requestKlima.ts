import { vercelURL } from "../getVercelURL";
import fetch from "node-fetch";

export const requestKlima = async () => {
  const data = await fetch(`${vercelURL}/api/chain/137/klimaAPY`);
  const json = await data.json();

  return json.stakingAPY;
};
