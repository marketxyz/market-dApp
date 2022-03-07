/* eslint-disable import/no-anonymous-default-export */
import Vibrant from "node-vibrant";
import { Palette } from "node-vibrant/lib/color";
import fetch from "node-fetch";
import Web3 from "web3";
import ERC20ABI from "../src/common/abi/ERC20.json";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { primaryRPC } from "../src/utils/web3Providers";
import tokenInfo from "./tokenJSON";
import { APIExtraFunctions } from "./utils/functions";
import { CHAIN_ID } from "../src/utils/chainId";
import { networkData } from "../src/constants/networkData";

const web3 = new Web3(primaryRPC);
const fns = APIExtraFunctions[CHAIN_ID];

type TokenData = {
  symbol: string;
  name: string;
  decimals: string;
  logoURL: string;
  color: string;
  overlayTextColor: string;
  extraData: null | {
    shortName: string;
    partnerURL: string;
    metaDataFn: string;
    metaDataArgs: any[];
  };
};

export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=3600, s-maxage=3600");

  const address = web3.utils.toChecksumAddress(request.query.address as string);

  const tokenContract = new web3.eth.Contract(ERC20ABI as any, address);
  const coingeckoNetwork = networkData[CHAIN_ID].extraData.coingeckoNetwork;

  const [decimals, rawData] = await Promise.all([
    tokenContract.methods
      .decimals()
      .call()
      .then((res) => parseFloat(res)),

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coingeckoNetwork}/contract/` +
        address.toLowerCase()
    ).then((res) => res.json()),
  ]);

  let name: string;
  let symbol: string;
  let logoURL: string | undefined;

  let tokenObj: TokenData = {
    symbol: "",
    name: "",
    decimals: "",
    logoURL: "",
    color: "",
    overlayTextColor: "",
    extraData: null,
  };

  if (rawData.error) {
    name = await tokenContract.methods.name().call();
    symbol = await tokenContract.methods.symbol().call();
  } else {
    let {
      symbol: _symbol,
      name: _name,
      image: { small },
    } = rawData;

    symbol =
      _symbol === _symbol.toLowerCase() ? _symbol.toUpperCase() : _symbol;
    name = _name;
    logoURL = small;
  }

  tokenObj.name = name;
  tokenObj.symbol = symbol;
  tokenObj.decimals = decimals;
  tokenObj.logoURL = logoURL ?? "";

  //////////////////
  // Edge cases: //
  /////////////////

  if (tokenInfo?.[CHAIN_ID]?.[address]) {
    tokenObj = { ...tokenObj, ...tokenInfo[CHAIN_ID][address] };
    if (tokenObj.extraData?.metaDataFn) {
      let apyData = {};
      try {
        apyData = await fns[tokenObj.extraData.metaDataFn](
          ...tokenObj.extraData.metaDataArgs
        );
      } catch (e) {
        console.log("failed to capture apyData because: ", e);
      }

      tokenObj.extraData = {
        ...apyData,
        ...tokenInfo[CHAIN_ID][address].extraData,
        metaDataArgs: undefined,
        metaDataFn: undefined,
      };
    } else {
      tokenObj.extraData = {
        ...tokenInfo[CHAIN_ID][address].extraData,
      };
    }
  }

  const sushiURL = networkData[CHAIN_ID].extraData.sushiURL;
  const sushiResponse = await fetch(sushiURL);

  if (sushiResponse.ok) {
    const sushiArr: Record<any, any>[] = await sushiResponse.json();
    const sushiItem = sushiArr.find(
      (x) => web3.utils.toChecksumAddress(x.address) === address
    );
    if (sushiItem && sushiItem.logoURI !== "")
      tokenObj.logoURL = sushiItem.logoURI;
  }

  if (tokenObj.color === "") {
    try {
      let color: Palette;
      if (tokenObj.logoURL === undefined) {
        // If we have no logo no need to try to get the color
        // just go to the catch block and return the default logo.
        throw Error("Go to the catch block");
      }

      color = await Vibrant.from(tokenObj.logoURL).getPalette();
      if (!color.Vibrant) {
        throw Error("Go to the catch block");
      }

      tokenObj.color = color.Vibrant.getHex();
      tokenObj.overlayTextColor = color.Vibrant.getTitleTextColor();
    } catch (error) {
      return response.json({
        ...tokenObj,
        color: "#FFFFFF",
        overlayTextColor: "#000",
        address,
      });
    }
  }

  return response.json({
    ...tokenObj,
    color: tokenObj.color,
    overlayTextColor: tokenObj.overlayTextColor,
    address,
  });
};
