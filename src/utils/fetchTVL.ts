import Fuse from "../fuse-sdk";
import BigNumber from "bignumber.js";
import { fetchPoolsAPI } from "hooks/fuse/useFusePools";

export const fetchFuseTVL = async (fuse: Fuse) => {
  const { 2: totalSuppliedETH } = await fetchPoolsAPI();

  return fuse.web3.utils.toBN(
    new BigNumber(
      totalSuppliedETH
        .slice(1)
        .reduce((a: number, b: string) => a + parseInt(b), 0)
        .toString()
    ).toFixed(0)
  );
};
