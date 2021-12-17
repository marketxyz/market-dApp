import { requestBeefy } from "./requestBeefy";
import { requestKlima } from "./requestKlima";

const PolygonAPIFunctions = {
  requestBeefy: async (name: string) => {
    const APYs = await requestBeefy();
    return { apy: APYs[name], hasApy: true };
  },
  requestKlima: async () => {
    const klimaAPY = await requestKlima();
    return {
      apy: klimaAPY,
      hasApy: true,
    };
  },
};
export default PolygonAPIFunctions;
