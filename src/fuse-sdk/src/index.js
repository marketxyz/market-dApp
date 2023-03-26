/* eslint-disable */
import Web3 from "web3";

import JumpRateModel from "./irm/JumpRateModel.js";
import JumpRateModelV2 from "./irm/JumpRateModelV2.js";

import BigNumber from "bignumber.js";
import axios from "axios";
import { CHAIN_ID } from "./utils.js";

var fusePoolDirectoryAbi = require(__dirname + "/abi/FusePoolDirectory.json");
var fusePoolLensAbi = require(__dirname + "/abi/FusePoolLens.json");
var marketLensAbi = require(__dirname + "/abi/MarketLens.json");
var contracts = require(__dirname +
  `/abi/compound-protocol.min.json`).contracts;

const chainAddress = require("./addrs");
const addressList = chainAddress[CHAIN_ID];

export default class Fuse {
  static FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS =
    addressList.FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS;
  static FUSE_POOL_LENS_CONTRACT_ADDRESS =
    addressList.FUSE_POOL_LENS_CONTRACT_ADDRESS;

  static ORACLES = addressList.ORACLES;

  static BYTECODE_HASHES = addressList.BYTECODE_HASHES;

  static BLOCKS_PER_MIN = addressList.BLOCKS_PER_MIN;

  constructor(web3Provider) {
    this.web3 = new Web3(web3Provider);

    this.getEthUsdPriceBN = async function () {
      return Web3.utils.toBN(
        new BigNumber(
          (
            await axios.get(
              "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum"
            )
          ).data.ethereum.usd
        )
          .multipliedBy(1e18)
          .toFixed(0)
      );
    };
    this.OWNED_ACCOUNTS = addressList.OWNED_ACCOUNTS;
    this.contracts = {
      FusePoolDirectory: new this.web3.eth.Contract(
        fusePoolDirectoryAbi,
        Fuse.FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS
      ),
      FusePoolLens: new this.web3.eth.Contract(
        fusePoolLensAbi,
        Fuse.FUSE_POOL_LENS_CONTRACT_ADDRESS
      ),
      MarketLens: null,
    };

    if (CHAIN_ID.toString() === "250") {
      this.contracts.MarketLens = new this.web3.eth.Contract(
        marketLensAbi,
        addressList.MARKET_LENS
      );
    }

    this.compoundContracts = contracts;

    this.identifyInterestRateModel = async function (interestRateModelAddress) {
      // Get interest rate model type from runtime bytecode hash and init class
      var interestRateModels = {
        JumpRateModel: JumpRateModel,
        JumpRateModelV2: JumpRateModelV2,
      };

      var runtimeBytecodeHash = Web3.utils.sha3(
        await this.web3.eth.getCode(interestRateModelAddress)
      );
      console.log("runtime bytecode hash: ", runtimeBytecodeHash);
      var interestRateModel = null;

      outerLoop: for (const model of Object.keys(interestRateModels)) {
        if (interestRateModels[model].RUNTIME_BYTECODE_HASHES !== undefined) {
          for (const hash of interestRateModels[model]
            .RUNTIME_BYTECODE_HASHES) {
            if (runtimeBytecodeHash == hash) {
              interestRateModel = new interestRateModels[model]();
              break outerLoop;
            }
          }
        } else if (
          runtimeBytecodeHash == interestRateModels[model].RUNTIME_BYTECODE_HASH
        ) {
          interestRateModel = new interestRateModels[model]();
          break;
        }
      }

      return interestRateModel;
    };

    this.getInterestRateModel = async function (assetAddress) {
      // Get interest rate model address from asset address
      var assetContract = new this.web3.eth.Contract(
        JSON.parse(
          contracts["contracts/CTokenInterfaces.sol:CTokenInterface"].abi
        ),
        assetAddress
      );

      var interestRateModelAddress = await assetContract.methods
        .interestRateModel()
        .call();

      var interestRateModel = await this.identifyInterestRateModel(
        interestRateModelAddress
      );

      await interestRateModel.init(
        this.web3,
        interestRateModelAddress,
        assetAddress
      );
      return interestRateModel;
    };

    this.getPriceOracle = async function (oracleAddress) {
      // Get price oracle contract name from runtime bytecode hash
      var runtimeBytecodeHash = Web3.utils.sha3(
        await this.web3.eth.getCode(oracleAddress)
      );
      for (const model of Object.keys(Fuse.BYTECODE_HASHES.oracle))
        if (runtimeBytecodeHash == Fuse.BYTECODE_HASHES.oracle[model])
          return model;
      return null;
    };
  }

  static Web3 = Web3;
  static BN = Web3.utils.BN;
}
