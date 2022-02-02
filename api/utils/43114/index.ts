import { requestBeefy } from "./requestBeefy";

const AvaxAPIFunctions = {
  requestBeefy: async (name: string) => {
    const APYs = await requestBeefy();
    return { apy: APYs[name], hasApy: true };
  },
};
export default AvaxAPIFunctions;
