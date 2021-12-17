import { useQuery } from "react-query";

import { useRari } from "../context/RariContext";
import ERC20ABI from "../../src/common/abi/ERC20.json";
import Web3 from "web3";

export const fetchTokenBalance = async (
  tokenAddress: string,
  web3: Web3,
  address: string
) => {
  const contract = new web3.eth.Contract(ERC20ABI as any, tokenAddress);

  const stringBalance = await contract.methods.balanceOf(address).call();

  return web3.utils.toBN(stringBalance);
};

export function useTokenBalance(tokenAddress: string) {
  const { rari, address } = useRari();

  return useQuery(tokenAddress + " balanceOf " + address, () =>
    fetchTokenBalance(tokenAddress, rari.web3, address)
  );
}
