import { requestBeefy } from "./requestBeefy";

const FantomAPIFunctions = {
  requestBeefy: async (name: string) => {
    const APYs = await requestBeefy();
    return { apy: APYs[name], hasApy: true };
  },
};
export default FantomAPIFunctions;
