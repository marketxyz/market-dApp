import { cacheFetch } from "../cacheFetch";
import { vercelURL } from "../getVercelURL";

export const requestKlima = cacheFetch(async () => {
  const data = await fetch(`${vercelURL}/api/chain/137/klimaAPY`);
  const json = await data.json();

  return json.stakingAPY;
});
