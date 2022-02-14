export const getRPC = (chainId: number, secondary: boolean) => {
  return process.env[
    `REACT_APP_${!secondary ? "PRIMARY" : "SECONDARY"}_RPC_${chainId}`.trim()
  ]!;
};
