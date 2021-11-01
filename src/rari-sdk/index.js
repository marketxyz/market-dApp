/* eslint-disable */
import Web3 from "web3";
import axios from "axios";
import Big from "big.js";
import Cache from "./cache.js";
var erc20Abi = require("." + "/abi/ERC20.json");

export default class Rari {
  constructor(web3Provider) {
    this.web3 = new Web3(web3Provider);
    this.cache = new Cache({ allTokens: 86400, ethUsdPrice: 300 });
    var self = this;

    this.getEthUsdPriceBN = async function () {
      return await self.cache.getOrUpdate("ethUsdPrice", async function () {
        try {
          return Web3.utils.toBN(
            new Big(
              (
                await axios.get(
                  "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum"
                )
              ).data.ethereum.usd
            )
              .mul(1e18)
              .toFixed(0)
          );
        } catch (error) {
          throw new Error("Error retrieving data from Coingecko API: " + error);
        }
      });
    };
  }
  static Web3 = Web3;
  static BN = Web3.utils.BN;
}
