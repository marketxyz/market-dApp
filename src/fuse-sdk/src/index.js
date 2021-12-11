/* eslint-disable */
import Web3 from "web3";

import JumpRateModel from "./irm/JumpRateModel.js";
import DAIInterestRateModelV2 from "./irm/DAIInterestRateModelV2.js";
import WhitePaperInterestRateModel from "./irm/WhitePaperInterestRateModel.js";
import JumpRateModelV2 from "./irm/JumpRateModelV2.js";

import BigNumber from "bignumber.js";

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID) ?? 1;
const network = chainId === 1 ? "mainnet" : "matic";

var fusePoolDirectoryAbi = require(__dirname + "/abi/FusePoolDirectory.json");
var fusePoolLensAbi = require(__dirname + "/abi/FusePoolLens.json");
var fuseSafeLiquidatorAbi = require(__dirname + "/abi/FuseSafeLiquidator.json");
var fuseFeeDistributorAbi = require(__dirname + "/abi/FuseFeeDistributor.json");
var contracts = require(__dirname +
  `/contracts/${network}/compound-protocol.min.json`).contracts;
var openOracleContracts = {};
var oracleContracts = require(__dirname +
  `/contracts/${network}/oracles.min.json`).contracts;

const axios = require("axios");
const chainAddress = require("./addrs");
const addressList = chainAddress[chainId];

export default class Fuse {
  static FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS =
    addressList.FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS;
  static FUSE_SAFE_LIQUIDATOR_CONTRACT_ADDRESS =
    addressList.FUSE_SAFE_LIQUIDATOR_CONTRACT_ADDRESS;
  static FUSE_FEE_DISTRIBUTOR_CONTRACT_ADDRESS =
    addressList.FUSE_FEE_DISTRIBUTOR_CONTRACT_ADDRESS;
  static FUSE_POOL_LENS_CONTRACT_ADDRESS =
    addressList.FUSE_POOL_LENS_CONTRACT_ADDRESS;

  static COMPTROLLER_IMPLEMENTATION_CONTRACT_ADDRESS =
    addressList.COMPTROLLER_IMPLEMENTATION_CONTRACT_ADDRESS;
  static CERC20_DELEGATE_CONTRACT_ADDRESS =
    addressList.CERC20_DELEGATE_CONTRACT_ADDRESS;
  static CETHER_DELEGATE_CONTRACT_ADDRESS =
    addressList.CETHER_DELEGATE_CONTRACT_ADDRESS;

  static OPEN_ORACLE_PRICE_DATA_CONTRACT_ADDRESS =
    addressList.OPEN_ORACLE_PRICE_DATA_CONTRACT_ADDRESS;
  static COINBASE_PRO_REPORTER_ADDRESS =
    addressList.COINBASE_PRO_REPORTER_ADDRESS;

  static PUBLIC_PRICE_ORACLE_CONTRACT_ADDRESSES =
    addressList.PUBLIC_PRICE_ORACLE_CONTRACT_ADDRESSES;

  static DAI_POT = addressList.DAI_POT;
  static DAI_JUG = addressList.DAI_JUG;

  static UNISWAP_V2_FACTORY_ADDRESS = addressList.UNISWAP_V2_FACTORY_ADDRESS;
  static UNISWAP_V2_PAIR_INIT_CODE_HASH =
    addressList.UNISWAP_V2_PAIR_INIT_CODE_HASH;
  static WETH_ADDRESS = addressList.WETH_ADDRESS;

  static PRICE_ORACLE_RUNTIME_BYTECODE_HASHES =
    addressList.PRICE_ORACLE_RUNTIME_BYTECODE_HASHES;

  static ORACLES = addressList.ORACLES;

  static PUBLIC_INTEREST_RATE_MODEL_CONTRACT_ADDRESSES =
    addressList.PUBLIC_INTEREST_RATE_MODEL_CONTRACT_ADDRESSES;

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

    this.contracts = {
      FusePoolDirectory: new this.web3.eth.Contract(
        fusePoolDirectoryAbi,
        Fuse.FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS
      ),
      FusePoolLens: new this.web3.eth.Contract(
        fusePoolLensAbi,
        Fuse.FUSE_POOL_LENS_CONTRACT_ADDRESS
      ),
      FuseSafeLiquidator: new this.web3.eth.Contract(
        fuseSafeLiquidatorAbi,
        Fuse.FUSE_SAFE_LIQUIDATOR_CONTRACT_ADDRESS
      ),
      FuseFeeDistributor: new this.web3.eth.Contract(
        fuseFeeDistributorAbi,
        Fuse.FUSE_FEE_DISTRIBUTOR_CONTRACT_ADDRESS
      ),
    };

    this.compoundContracts = contracts;
    this.openOracleContracts = openOracleContracts;
    this.oracleContracts = oracleContracts;

    this.getCreate2Address = function (creatorAddress, salts, byteCodeHash) {
      return `0x${this.web3.utils
        .sha3(
          `0x${[
            "ff",
            creatorAddress,
            this.web3.utils.soliditySha3(...salts),
            byteCodeHash,
          ]
            .map((x) => x.replace(/0x/, ""))
            .join("")}`
        )
        .slice(-40)}`.toLowerCase();
    };

    this.identifyInterestRateModel = async function (interestRateModelAddress) {
      // Get interest rate model type from runtime bytecode hash and init class
      var interestRateModels = {
        JumpRateModel: JumpRateModel,
        JumpRateModelV2: JumpRateModelV2,
        DAIInterestRateModelV2: DAIInterestRateModelV2,
        WhitePaperInterestRateModel: WhitePaperInterestRateModel,
      };

      var runtimeBytecodeHash = Web3.utils.sha3(
        await this.web3.eth.getCode(interestRateModelAddress)
      );
      console.log("runtime bytecode hash: ", runtimeBytecodeHash);
      var interestRateModel = null;

      outerLoop: for (const model of [
        "JumpRateModel",
        "JumpRateModelV2",
        "DAIInterestRateModelV2",
        "WhitePaperInterestRateModel",
      ]) {
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

    this.checkForCErc20PriceFeed = async function (comptroller, conf) {
      // Check for ChainlinkPriceOracle with a corresponding feed
      var priceOracle = await comptroller.methods.oracle().call();
      var chainlinkPriceOracle = new this.web3.eth.Contract(
        oracleContracts["ChainlinkPriceOracle"].abi,
        priceOracle
      );

      if (conf.underlying.toLowerCase() == Fuse.WETH_ADDRESS.toLowerCase())
        var chainlinkPriceFeed = true;
      else
        try {
          var chainlinkPriceFeed = await chainlinkPriceOracle.methods
            .hasPriceFeed(conf.underlying)
            .call();
        } catch {}

      if (chainlinkPriceFeed === undefined || !chainlinkPriceFeed) {
        // Check for PreferredPriceOracle with underlying ChainlinkPriceOracle with a corresponding feed
        var preferredPriceOracle = new this.web3.eth.Contract(
          oracleContracts["PreferredPriceOracle"].abi,
          priceOracle
        );

        try {
          var chainlinkPriceOracle = await preferredPriceOracle.methods
            .chainlinkOracle()
            .call();
          chainlinkPriceOracle = new this.web3.eth.Contract(
            oracleContracts["ChainlinkPriceOracle"].abi,
            chainlinkPriceOracle
          );
          var chainlinkPriceFeed = await chainlinkPriceOracle.methods
            .hasPriceFeed(conf.underlying)
            .call();
        } catch {}
      }

      if (chainlinkPriceFeed === undefined || !chainlinkPriceFeed) {
        // Check if we can get a UniswapAnchoredView
        var isUniswapAnchoredView = false;

        try {
          var uniswapOrUniswapAnchoredView = new this.web3.eth.Contract(
            JSON.parse(
              openOracleContracts[
                "contracts/Uniswap/UniswapAnchoredView.sol:UniswapAnchoredView"
              ].abi
            ),
            priceOracle
          );
          await uniswapOrUniswapAnchoredView.methods
            .IS_UNISWAP_ANCHORED_VIEW()
            .call();
          isUniswapAnchoredView = true;
        } catch {
          try {
            var uniswapOrUniswapAnchoredView = new this.web3.eth.Contract(
              JSON.parse(
                openOracleContracts[
                  "contracts/Uniswap/UniswapView.sol:UniswapView"
                ].abi
              ),
              priceOracle
            );
            await uniswapOrUniswapAnchoredView.methods.IS_UNISWAP_VIEW().call();
          } catch {
            // Check for PreferredPriceOracle with underlying UniswapAnchoredView
            var preferredPriceOracle = new this.web3.eth.Contract(
              oracleContracts["PreferredPriceOracle"].abi,
              priceOracle
            );

            try {
              var uniswapOrUniswapAnchoredView =
                await preferredPriceOracle.methods.secondaryOracle().call();
            } catch {
              throw "Underlying token price for this asset is not available via this oracle.";
            }

            try {
              uniswapOrUniswapAnchoredView = new this.web3.eth.Contract(
                JSON.parse(
                  openOracleContracts[
                    "contracts/Uniswap/UniswapAnchoredView.sol:UniswapAnchoredView"
                  ].abi
                ),
                uniswapOrUniswapAnchoredView
              );
              await uniswapOrUniswapAnchoredView.methods
                .IS_UNISWAP_ANCHORED_VIEW()
                .call();
              isUniswapAnchoredView = true;
            } catch {
              try {
                uniswapOrUniswapAnchoredView = new this.web3.eth.Contract(
                  JSON.parse(
                    openOracleContracts[
                      "contracts/Uniswap/UniswapView.sol:UniswapView"
                    ].abi
                  ),
                  uniswapOrUniswapAnchoredView
                );
                await uniswapOrUniswapAnchoredView.methods
                  .IS_UNISWAP_VIEW()
                  .call();
              } catch {
                throw "Underlying token price not available via ChainlinkPriceOracle, and no UniswapAnchoredView or UniswapView was found.";
              }
            }
          }
        }

        // Check if the token already exists
        try {
          await uniswapOrUniswapAnchoredView.methods
            .getTokenConfigByUnderlying(conf.underlying)
            .call();
        } catch {
          // If not, add it!
          var underlyingToken = new this.web3.eth.Contract(
            JSON.parse(
              contracts["contracts/EIP20Interface.sol:EIP20Interface"].abi
            ),
            conf.underlying
          );
          var underlyingSymbol = await underlyingToken.methods.symbol().call();
          var underlyingDecimals = await underlyingToken.methods
            .decimals()
            .call();

          const PriceSource = {
            FIXED_ETH: 0,
            FIXED_USD: 1,
            REPORTER: 2,
            TWAP: 3,
          };

          if (
            conf.underlying.toLowerCase() == Fuse.WETH_ADDRESS.toLowerCase()
          ) {
            // WETH
            await uniswapOrUniswapAnchoredView.methods
              .add([
                {
                  underlying: conf.underlying,
                  symbolHash: Web3.utils.soliditySha3(underlyingSymbol),
                  baseUnit: Web3.utils
                    .toBN(10)
                    .pow(Web3.utils.toBN(underlyingDecimals))
                    .toString(),
                  priceSource: PriceSource.FIXED_ETH,
                  fixedPrice: Web3.utils.toBN(1e18).toString(),
                  uniswapMarket: "0x0000000000000000000000000000000000000000",
                  isUniswapReversed: false,
                },
              ])
              .send({ ...options });
          } else if (
            conf.underlying === "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
          ) {
            // USDC
            if (isUniswapAnchoredView) {
              await uniswapOrUniswapAnchoredView.methods
                .add([
                  {
                    underlying: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    symbolHash: Web3.utils.soliditySha3("USDC"),
                    baseUnit: Web3.utils.toBN(1e6).toString(),
                    priceSource: PriceSource.FIXED_USD,
                    fixedPrice: 1e6,
                    uniswapMarket: "0x0000000000000000000000000000000000000000",
                    isUniswapReversed: false,
                  },
                ])
                .send({ ...options });
            } else {
              await uniswapOrUniswapAnchoredView.methods
                .add([
                  {
                    underlying: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    symbolHash: Web3.utils.soliditySha3("USDC"),
                    baseUnit: Web3.utils.toBN(1e6).toString(),
                    priceSource: PriceSource.TWAP,
                    fixedPrice: 0,
                    uniswapMarket: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
                    isUniswapReversed: false,
                  },
                ])
                .send({ ...options });
              await uniswapOrUniswapAnchoredView.methods
                .postPrices(["0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"])
                .send({ ...options });
            }
          } else {
            // Ask about fixed prices if UniswapAnchoredView or if UniswapView is not public; otherwise, prompt for Uniswap V2 pair
            if (
              isUniswapAnchoredView ||
              !(await uniswapOrUniswapAnchoredView.methods.isPublic().call())
            ) {
              // Check for fixed ETH
              var fixedEth = confirm(
                "Should the price of this token be fixed to 1 ETH?"
              );

              if (fixedEth) {
                await uniswapOrUniswapAnchoredView.methods
                  .add([
                    {
                      underlying: conf.underlying,
                      symbolHash: Web3.utils.soliditySha3(underlyingSymbol),
                      baseUnit: Web3.utils
                        .toBN(10)
                        .pow(Web3.utils.toBN(underlyingDecimals))
                        .toString(),
                      priceSource: PriceSource.FIXED_ETH,
                      fixedPrice: Web3.utils.toBN(1e18).toString(),
                      uniswapMarket:
                        "0x0000000000000000000000000000000000000000",
                      isUniswapReversed: false,
                    },
                  ])
                  .send({ ...options });
              } else {
                // Check for fixed USD
                var msg = "Should the price of this token be fixed to 1 USD?";
                if (!isUniswapAnchoredView)
                  msg +=
                    " If so, please note that you will need to run postPrices on your UniswapView for USDC instead of " +
                    underlyingSymbol +
                    " (as technically, the " +
                    underlyingSymbol +
                    " price would be fixed to 1 USDC).";
                var fixedUsd = confirm(msg);

                if (fixedUsd) {
                  var tokenConfigs = [
                    {
                      underlying: conf.underlying,
                      symbolHash: Web3.utils.soliditySha3(underlyingSymbol),
                      baseUnit: Web3.utils
                        .toBN(10)
                        .pow(Web3.utils.toBN(underlyingDecimals))
                        .toString(),
                      priceSource: PriceSource.FIXED_USD,
                      fixedPrice: Web3.utils.toBN(1e6).toString(),
                      uniswapMarket:
                        "0x0000000000000000000000000000000000000000",
                      isUniswapReversed: false,
                    },
                  ];

                  // UniswapView only: add USDC token config if not present so price oracle can convert from USD to ETH
                  if (!isUniswapAnchoredView) {
                    try {
                      await uniswapOrUniswapAnchoredView.methods
                        .getTokenConfigByUnderlying(
                          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
                        )
                        .call();
                    } catch (error) {
                      tokenConfigs.push({
                        underlying:
                          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                        symbolHash: Web3.utils.soliditySha3("USDC"),
                        baseUnit: Web3.utils.toBN(1e6).toString(),
                        priceSource: PriceSource.TWAP,
                        fixedPrice: 0,
                        uniswapMarket:
                          "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
                        isUniswapReversed: false,
                      });
                    }
                  }

                  // Add token config(s)
                  await uniswapOrUniswapAnchoredView.methods
                    .add(tokenConfigs)
                    .send({ ...options });

                  // UniswapView only: post USDC price
                  if (!isUniswapAnchoredView)
                    await uniswapOrUniswapAnchoredView.methods
                      .postPrices([
                        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                      ])
                      .send({ ...options });
                } else await promptForUniswapV2Pair(this); // Prompt for Uniswap V2 pair
              }
            } else await promptForUniswapV2Pair(this); // Prompt for Uniswap V2 pair

            async function promptForUniswapV2Pair(self) {
              // Predict correct Uniswap V2 pair
              var isNotReversed =
                conf.underlying.toLowerCase() < Fuse.WETH_ADDRESS.toLowerCase();
              var tokens = isNotReversed
                ? [conf.underlying, Fuse.WETH_ADDRESS]
                : [Fuse.WETH_ADDRESS, conf.underlying];
              var uniswapV2Pair = self.getCreate2Address(
                Fuse.UNISWAP_V2_FACTORY_ADDRESS,
                tokens,
                Fuse.UNISWAP_V2_PAIR_INIT_CODE_HASH
              );

              // Double-check with user that pair is correct
              var correctUniswapV2Pair = confirm(
                "We have determined that the correct Uniswap V2 pair for " +
                  (isNotReversed
                    ? underlyingSymbol + "/ETH"
                    : "ETH/" + underlyingSymbol) +
                  " is " +
                  uniswapV2Pair +
                  ". Is this correct?"
              );

              if (!correctUniswapV2Pair) {
                uniswapV2Pair = prompt(
                  "Please enter the underlying token's ETH-based Uniswap V2 pair address:"
                );
                if (uniswapV2Pair.length == 0)
                  throw isUniswapAnchoredView
                    ? "Reported prices must have a Uniswap V2 pair as an anchor!"
                    : "Non-fixed prices must have a Uniswap V2 pair from which to source prices!";
                isNotReversed = confirm(
                  "Press OK if the Uniswap V2 pair is " +
                    underlyingSymbol +
                    "/ETH. If it is reversed (ETH/" +
                    underlyingSymbol +
                    "), press Cancel."
                );
              }

              // Add asset to oracle
              await uniswapOrUniswapAnchoredView.methods
                .add([
                  {
                    underlying: conf.underlying,
                    symbolHash: Web3.utils.soliditySha3(underlyingSymbol),
                    baseUnit: Web3.utils
                      .toBN(10)
                      .pow(Web3.utils.toBN(underlyingDecimals))
                      .toString(),
                    priceSource: isUniswapAnchoredView
                      ? PriceSource.REPORTER
                      : PriceSource.TWAP,
                    fixedPrice: 0,
                    uniswapMarket: uniswapV2Pair,
                    isUniswapReversed: !isNotReversed,
                  },
                ])
                .send({ ...options });

              // Post first price
              if (isUniswapAnchoredView) {
                // Post reported price or (if price has never been reported) have user report and post price
                var priceData = new self.web3.eth.Contract(
                  JSON.parse(
                    openOracleContracts[
                      "contracts/OpenOraclePriceData.sol:OpenOraclePriceData"
                    ].abi
                  ),
                  await uniswapOrUniswapAnchoredView.methods.priceData().call()
                );
                var reporter = await uniswapOrUniswapAnchoredView.methods
                  .reporter()
                  .call();
                if (
                  Web3.utils
                    .toBN(
                      await priceData.methods
                        .getPrice(reporter, underlyingSymbol)
                        .call()
                    )
                    .gt(Web3.utils.toBN(0))
                )
                  await uniswapOrUniswapAnchoredView.methods
                    .postPrices([], [], [underlyingSymbol])
                    .send({ ...options });
                else
                  prompt(
                    "It looks like prices have never been reported for " +
                      underlyingSymbol +
                      ". Please click OK once you have reported and posted prices for" +
                      underlyingSymbol +
                      "."
                  );
              } else {
                await uniswapOrUniswapAnchoredView.methods
                  .postPrices([conf.underlying])
                  .send({ ...options });
              }
            }
          }
        }
      }
    };

    this.getPriceOracle = async function (oracleAddress) {
      // Get price oracle contract name from runtime bytecode hash
      var runtimeBytecodeHash = Web3.utils.sha3(
        await this.web3.eth.getCode(oracleAddress)
      );
      for (const model of Object.keys(
        Fuse.PRICE_ORACLE_RUNTIME_BYTECODE_HASHES
      ))
        if (
          runtimeBytecodeHash ==
          Fuse.PRICE_ORACLE_RUNTIME_BYTECODE_HASHES[model]
        )
          return model;
      return null;
    };
  }

  static Web3 = Web3;
  static BN = Web3.utils.BN;
}
