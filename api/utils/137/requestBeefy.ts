import { cacheFetch } from "../cacheFetch";
import { vercelURL } from "../getVercelURL";

export const requestBeefy = cacheFetch(async () => {
  const data = await fetch(`${vercelURL}/api/chain/137/beefyAPY`);
  const json = await data.json();

  return json;
});
