/* eslint-disable import/no-anonymous-default-export */
import Vibrant from "node-vibrant";
import { Palette } from "node-vibrant/lib/color";
import fetch from "node-fetch";
import Web3 from "web3";
import ERC20ABI from "../src/common/abi/ERC20.json";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { infuraURL } from "../src/utils/web3Providers";
import tokenInfo from "./tokenJSON";

const web3 = new Web3(infuraURL);
const cacheFetch = (fetcher: () => any) => {
  let jsonData;
  return async () => {
    if (jsonData) {
      return jsonData;
    }
    try {
      const data = await fetcher();
      jsonData = data;
      return data;
    } catch (e) {
      return null;
    }
  };
};

const vercelURL = process.env.VERCEL_URL!.toLowerCase();
const isLocal =
  vercelURL.includes("localhost") || vercelURL.includes("127.0.0.1");
const uriProtocol = isLocal ? "http" : "https";

const requestBeefy = cacheFetch(async () => {
  const data = await fetch(`${uriProtocol}://${vercelURL}/api/beefyAPY`);
  const json = await data.json();

  return json;
});

const requestKlima = cacheFetch(async () => {
  const data = await fetch(`${uriProtocol}://${vercelURL}/api/klimaAPY`);
  const json = await data.json();

  return json.stakingAPY;
});

const fns = {
  requestBeefy: async (name) => {
    const APYs = await requestBeefy();
    return { apy: APYs[name], hasApy: true };
  },
  requestKlima: async () => {
    const klimaAPY = await requestKlima();
    return {
      apy: klimaAPY,
      hasApy: true,
    };
  },
};

export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=3600, s-maxage=3600");

  const address = web3.utils.toChecksumAddress(request.query.address as string);

  const tokenContract = new web3.eth.Contract(ERC20ABI as any, address);
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID!) || 137;
  const coingeckoNetwork = chainId === 1 ? "ethereum" : "polygon-pos";

  const [decimals, rawData] = await Promise.all([
    tokenContract.methods
      .decimals()
      .call()
      .then((res) => parseFloat(res)),

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coingeckoNetwork}/contract/` +
        address
    ).then((res) => res.json()),
  ]);

  let name: string;
  let symbol: string;
  let logoURL: string | undefined;

  let tokenObj = {
    symbol: "",
    name: "",
    decimals: "",
    logoURL: "",
    extraData: {
      shortName: "",
      partnerURL: "",
      metaDataFn: "",
      metaDataArgs: [],
    },
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

  //////////////////
  // Edge cases: //
  /////////////////

  if (tokenInfo?.[chainId]?.[address]) {
    tokenObj = { ...tokenInfo[chainId][address] };
    if (tokenObj.extraData?.metaDataFn) {
      const apyData = await fns[tokenObj.extraData.metaDataFn](
        ...tokenObj.extraData.metaDataArgs
      );

      tokenObj.extraData = {
        ...apyData,
        ...tokenInfo[chainId][address].extraData,
      };
    } else {
      tokenObj.extraData = { ...tokenInfo[chainId][address].extraData };
    }
    tokenObj.decimals = decimals;
    tokenObj.name = name;
  } else {
    tokenObj.name = name;
    tokenObj.symbol = symbol;
    tokenObj.decimals = decimals;
    tokenObj.logoURL = logoURL ?? "";
  }

  const sushiURL = `https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/matic.json`;
  const sushiResponse = await fetch(sushiURL);

  if (sushiResponse.ok) {
    const sushiArr: Record<any, any>[] = await sushiResponse.json();
    const sushiItem = sushiArr.find(
      (x) => web3.utils.toChecksumAddress(x.address) === address
    );
    if (sushiItem && sushiItem.logoURI !== "")
      tokenObj.logoURL = sushiItem.logoURI;
  }

  let color: Palette;
  try {
    if (tokenObj.logoURL === undefined) {
      // If we have no logo no need to try to get the color
      // just go to the catch block and return the default logo.
      throw Error("Go to the catch block");
    }

    color = await Vibrant.from(tokenObj.logoURL).getPalette();
    if (!color.Vibrant) {
      throw Error("Go to the catch block");
    }
  } catch (error) {
    return response.json({
      ...tokenObj,
      color: "#FFFFFF",
      overlayTextColor: "#000",
      address,
    });
  }

  return response.json({
    ...tokenObj,
    color: color.Vibrant.getHex(),
    overlayTextColor: color.Vibrant.getTitleTextColor(),
    address,
  });
};
