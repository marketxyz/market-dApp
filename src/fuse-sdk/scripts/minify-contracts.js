const fs = require("fs");

let minContracts = {};
const compoundContracts = require(__dirname +
  `/../src/contracts/compound-protocol.json`).contracts;
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

for (const contractKey of usedAbiKeys) {
  if (!minContracts[contractKey]) minContracts[contractKey] = {};
  minContracts[contractKey].abi = compoundContracts[contractKey].abi;
}

fs.writeFileSync(
  __dirname + `/../src/abi/compound-protocol.min.json`,
  JSON.stringify({ contracts: minContracts })
);
