import Vibrant from "node-vibrant";
import { Palette } from "node-vibrant/lib/color";
import fetch from "node-fetch";
import Web3 from "web3";
import ERC20ABI from "../src/common/abi/ERC20.json";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { infuraURL } from "../src/utils/web3Providers";

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

export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "max-age=3600, s-maxage=3600");

  const address = web3.utils.toChecksumAddress(request.query.address as string);

  const tokenContract = new web3.eth.Contract(ERC20ABI as any, address);
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID ?? "1");
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
  let extraData: Record<any, any> = {
    hasAPY: false,
  };

  if (rawData.error) {
    name = await tokenContract.methods.name().call();
    symbol = await tokenContract.methods.symbol().call();
    // Fetch the logo from yearn if possible:
    const yearnLogoURL = `https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/tokens/${address}/logo-128.png`;
    const yearnLogoResponse = await fetch(yearnLogoURL);
    if (yearnLogoResponse.ok) {
      // A lot of the yearn tokens are curve tokens with long names,
      // so we flatten them here and just remove the Curve part
      symbol = symbol.replace("Curve-", "");
      logoURL = yearnLogoURL;
    }
  } else {
    let {
      symbol: _symbol,
      name: _name,
      image: { small },
    } = rawData;

    symbol = _symbol == _symbol.toLowerCase() ? _symbol.toUpperCase() : _symbol;
    name = _name;
    logoURL = small;
  }

  //////////////////
  // Edge cases: //
  /////////////////
  if (chainId === 1) {
    if (
      address ===
      web3.utils.toChecksumAddress("0xFD4D8a17df4C27c1dD245d153ccf4499e806C87D")
    ) {
      name = "linkCRV Gauge Deposit";
      symbol = "[G]linkCRV";
      logoURL =
        "https://raw.githubusercontent.com/Rari-Capital/rari-dApp/master/src/static/crvLINKGauge.png";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0")
    ) {
      name = "Wrapped Staked Ether";
      logoURL =
        "https://raw.githubusercontent.com/Rari-Capital/rari-dApp/master/src/static/wstETH.png";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0x04f2694c8fcee23e8fd0dfea1d4f5bb8c352111f")
    ) {
      logoURL =
        "https://raw.githubusercontent.com/Rari-Capital/rari-dApp/master/src/static/token_sOHM_2.png";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9")
    ) {
      // FTX swapped the name and symbol so we will correct for that.
      symbol = "FTT";
      name = "FTX Token";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0x8fcb1783bf4b71a51f702af0c266729c4592204a")
    ) {
      // OT token names are too long.
      symbol = "OT-aUSDC22";
      name = "OT-aUSDC DEC22-20";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0x3d4e7f52efafb9e0c70179b688fc3965a75bcfea")
    ) {
      // OT token names are too long.
      symbol = "OT-cDAI22";
      name = "OT-cDAI DEC22-20";
    }

    const trustWalletURL = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
    const trustWalletLogoResponse = await fetch(trustWalletURL);
    if (trustWalletLogoResponse.ok) {
      logoURL = trustWalletURL;
    }
  } else if (chainId === 137) {
    if (
      address ===
      web3.utils.toChecksumAddress("0x5A0801BAd20B6c62d86C566ca90688A6b9ea1d3f")
    ) {
      symbol = "mCrvATC3";
      extraData.shortName = "mCrvLP";
      logoURL = `${uriProtocol}://${vercelURL}/static/aTriCrypto3.png`;
      const apyData = await requestBeefy();
      if (apyData && apyData["curve-poly-atricrypto3"]) {
        extraData.hasAPY = true;
        extraData.apy = apyData["curve-poly-atricrypto3"];
      }
      extraData.partnerURL =
        "https://app.beefy.finance/#/polygon/vault/curve-poly-atricrypto3";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0xAA7C2879DaF8034722A0977f13c343aF0883E92e")
    ) {
      symbol = "mCrvAM3";
      extraData.shortName = "mCrvLP";
      name = "Moo Crv DAI/USDC/USDT";
      logoURL = `${uriProtocol}://${vercelURL}/static/am3CRV.png`;
      const apyData = await requestBeefy();
      if (apyData && apyData["curve-am3crv"]) {
        extraData.hasAPY = true;
        extraData.apy = apyData["curve-am3crv"];
      }
      extraData.partnerURL =
        "https://app.beefy.finance/#/polygon/vault/curve-am3crv";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0x8c9d3bc4425773bd2f00c4a2ac105c5ad73c8141")
    ) {
      symbol = "mCrvRen";
      extraData.shortName = "mCrvLP";
      logoURL = `${uriProtocol}://${vercelURL}/static/renBTC.png`;
      const apyData = await requestBeefy();
      if (apyData && apyData["curve-poly-ren"]) {
        extraData.hasAPY = true;
        extraData.apy = apyData["curve-poly-ren"];
      }
      extraData.partnerURL =
        "https://app.beefy.finance/#/polygon/vault/curve-poly-ren";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0xC1A2e8274D390b67A7136708203D71BF3877f158")
    ) {
      symbol = "mQLP-MATIC/USDC";
      extraData.shortName = "mQLP";
      logoURL = `${uriProtocol}://${vercelURL}/static/MATIC-USDC-QLP.png`;
      const apyData = await requestBeefy();
      if (apyData && apyData["quick-matic-usdc"]) {
        extraData.hasAPY = true;
        extraData.apy = apyData["quick-matic-usdc"];
      }
      extraData.partnerURL =
        "https://app.beefy.finance/#/polygon/vault/quick-matic-usdc";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0xE4DB97A2AAFbfef40D1a4AE8B709f61d6756F8e1")
    ) {
      symbol = "mSLP-USDC/ETH";
      extraData.shortName = "mSLP";
      // logoURL = `${uriProtocol}://${vercelURL}/static/MATIC-USDC-QLP.png`;
      const apyData = await requestBeefy();
      if (apyData && apyData["sushi-usdc-eth"]) {
        extraData.hasAPY = true;
        extraData.apy = apyData["sushi-usdc-eth"];
      }
      extraData.partnerURL =
        "https://app.beefy.finance/#/polygon/vault/sushi-usdc-eth";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0xC8e809a9180d637Cc23dAf60b41B70CA1ad5Fc08")
    ) {
      symbol = "mSLP-MATIC/ETH";
      extraData.shortName = "mSLP";
      const apyData = await requestBeefy();
      // logoURL = `${uriProtocol}://${vercelURL}/static/MATIC-USDC-QLP.png`;
      if (apyData && apyData["sushi-matic-eth"]) {
        extraData.hasAPY = true;
        extraData.apy = apyData["sushi-matic-eth"];
      }
      extraData.partnerURL =
        "https://app.beefy.finance/#/polygon/vault/sushi-matic-eth";
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89")
    ) {
      // logoURL = `${uriProtocol}://${vercelURL}/static/`;
    }

    if (
      address ===
      web3.utils.toChecksumAddress("0xa3fa99a148fa48d14ed51d610c367c61876997f1")
    ) {
      symbol = "MAI";
    }
    const sushiURL = `https://raw.githubusercontent.com/sushiswap/default-token-list/master/tokens/matic.json`;
    const sushiResponse = await fetch(sushiURL);

    if (sushiResponse.ok) {
      const sushiArr: Record<any, any>[] = await sushiResponse.json();
      const sushiItem = sushiArr.find(
        (x) => web3.utils.toChecksumAddress(x.address) === address
      );

      if (sushiItem) logoURL = sushiItem.logoURI;
    }
  }

  const basicTokenInfo = {
    symbol,
    name,
    decimals,
    extraData,
  };

  let color: Palette;
  try {
    if (logoURL == undefined) {
      // If we have no logo no need to try to get the color
      // just go to the catch block and return the default logo.
      throw "Go to the catch block";
    }

    color = await Vibrant.from(logoURL).getPalette();
    if (!color.Vibrant) {
      throw "Go to the catch block";
    }
  } catch (error) {
    return response.json({
      ...basicTokenInfo,
      color: "#FFFFFF",
      overlayTextColor: "#000",
      logoURL:
        logoURL ??
        "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg",
      address,
    });
  }

  response.json({
    ...basicTokenInfo,
    color: color.Vibrant.getHex(),
    overlayTextColor: color.Vibrant.getTitleTextColor(),
    logoURL,
    address,
  });
};
