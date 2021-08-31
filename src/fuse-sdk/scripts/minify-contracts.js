const fs = require("fs");
const networks = ["mainnet", "matic"];

for (const network of networks) {
  let minContracts = {};
  const compoundContracts = require(__dirname +
    `/../src/contracts/${network}/compound-protocol.json`).contracts;
  let usedAbiKeys = [
    "contracts/Comptroller.sol:Comptroller",
    "contracts/Unitroller.sol:Unitroller",
    "contracts/CEtherDelegate.sol:CEtherDelegate",
    "contracts/CEtherDelegator.sol:CEtherDelegator",
    "contracts/EIP20Interface.sol:EIP20Interface",
    "contracts/CErc20Delegate.sol:CErc20Delegate",
    "contracts/CErc20Delegator.sol:CErc20Delegator",
    "contracts/CTokenInterfaces.sol:CTokenInterface",
    "contracts/WhitePaperInterestRateModel.sol:WhitePaperInterestRateModel",
    "contracts/JumpRateModel.sol:JumpRateModel",
    "contracts/DAIInterestRateModelV2.sol:DAIInterestRateModelV2",
    "contracts/SimplePriceOracle.sol:SimplePriceOracle",
  ];
  let usedBinKeys = [
    "contracts/Comptroller.sol:Comptroller",
    "contracts/Unitroller.sol:Unitroller",
    "contracts/CEtherDelegate.sol:CEtherDelegate",
    "contracts/CEtherDelegator.sol:CEtherDelegator",
    "contracts/CErc20Delegate.sol:CErc20Delegate",
    "contracts/CErc20Delegator.sol:CErc20Delegator",
    "contracts/WhitePaperInterestRateModel.sol:WhitePaperInterestRateModel",
    "contracts/JumpRateModel.sol:JumpRateModel",
    "contracts/DAIInterestRateModelV2.sol:DAIInterestRateModelV2",
    "contracts/SimplePriceOracle.sol:SimplePriceOracle",
  ];

  for (const contractKey of usedAbiKeys) {
    if (!minContracts[contractKey]) minContracts[contractKey] = {};
    minContracts[contractKey].abi = compoundContracts[contractKey].abi;
  }

  for (const contractKey of usedBinKeys) {
    if (!minContracts[contractKey]) minContracts[contractKey] = {};
    minContracts[contractKey].bin = compoundContracts[contractKey].bin;
  }

  fs.writeFileSync(
    __dirname + `/../src/contracts/${network}/compound-protocol.min.json`,
    JSON.stringify({ contracts: minContracts })
  );

  minContracts = {};
  fs.readdirSync(__dirname + `/../src/contracts/${network}/oracles/`).forEach(
    (file) => {
      var contract = JSON.parse(
        fs.readFileSync(
          __dirname + `/../src/contracts/${network}/oracles/` + file
        )
      );
      minContracts[contract.contractName] = {
        abi: contract.abi,
        bin: contract.bytecode,
      };
    }
  );
  fs.writeFileSync(
    __dirname + `/../src/contracts/${network}/oracles.min.json`,
    JSON.stringify({ contracts: minContracts })
  );
}

/// only mainnet
const openOracleContracts = require(__dirname +
  "/../src/contracts/mainnet/open-oracle.json").contracts;
let minContracts = {};
const usedContractAbiKeys = [
  "contracts/Uniswap/UniswapAnchoredView.sol:UniswapAnchoredView",
  "contracts/OpenOraclePriceData.sol:OpenOraclePriceData",
  "contracts/Uniswap/UniswapView.sol:UniswapView",
];
for (const contractKey of usedContractAbiKeys) {
  if (!minContracts[contractKey]) minContracts[contractKey] = {};
  minContracts[contractKey].abi = openOracleContracts[contractKey].abi;
}
const usedContractBinKeys = [
  "contracts/Uniswap/UniswapAnchoredView.sol:UniswapAnchoredView",
  "contracts/Uniswap/UniswapView.sol:UniswapView",
];
for (const contractKey of usedContractBinKeys) {
  if (!minContracts[contractKey]) minContracts[contractKey] = {};
  minContracts[contractKey].bin = openOracleContracts[contractKey].bin;
}
fs.writeFileSync(
  __dirname + "/../src/contracts/mainnet/open-oracle.min.json",
  JSON.stringify({ contracts: minContracts })
);
