const vercelURL = process.env.VERCEL_URL.toLowerCase();
const isLocal =
  vercelURL.includes("localhost") || vercelURL.includes("127.0.0.1");
const uriProtocol = isLocal ? "http" : "https";

module.exports = {
  137: {
    "0x5A0801BAd20B6c62d86C566ca90688A6b9ea1d3f": {
      symbol: "mCrvATC3",
      logoURL: `${uriProtocol}://${vercelURL}/static/aTriCrypto3.png`,
      shortName: "mCrvLP",
      partnerURL:
        "https://app.beefy.finance/#/polygon/vault/curve-poly-atricrypto3",
      extraData: {
        metaDataFn: "requestBeefy",
        metaDataArgs: ["curve-poly-atricrypto3"],
      },
    },

    "0xAA7C2879DaF8034722A0977f13c343aF0883E92e": {
      symbol: "mCrvAM3",
      logoURL: `${uriProtocol}://${vercelURL}/static/am3CRV.png`,
      name: "Moo Crv DAI/USDC/USDT",
      shortName: "mCrvLP",
      partnerURL: "https://app.beefy.finance/#/polygon/vault/curve-am3crv",
      extraData: {
        metaDataFn: "requestBeefy",
        metaDataArgs: ["curve-am3crv"],
      },
    },

    "0x8c9d3Bc4425773BD2F00C4a2aC105c5Ad73c8141": {
      symbol: "mCrvRen",
      logoURL: `${uriProtocol}://${vercelURL}/static/renBTC.png`,
      partnerURL: "https://app.beefy.finance/#/polygon/vault/curve-poly-ren",
      extraData: {
        metaDataFn: "requestBeefy",
        metaDataArgs: ["curve-poly-ren"],
      },
    },

    "0xC1A2e8274D390b67A7136708203D71BF3877f158": {
      symbol: "mQLP-MATIC/USDC",
      logoURL: `${uriProtocol}://${vercelURL}/static/MATIC-USDC-QLP.png`,
      name: "Moo Crv DAI/USDC/USDT",
      shortName: "mQLP",
      partnerURL: "https://app.beefy.finance/#/polygon/vault/quick-matic-usdc",
      extraData: {
        metaDataFn: "requestBeefy",
        metaDataArgs: ["quick-matic-usdc"],
      },
    },

    "0xE4DB97A2AAFbfef40D1a4AE8B709f61d6756F8e1": {
      symbol: "mSLP-USDC/ETH",
      shortName: "mSLP",
      partnerURL: "https://app.beefy.finance/#/polygon/vault/sushi-usdc-eth",
      logoURL: `${uriProtocol}://${vercelURL}/static/mSLP-USDC-ETH.png`,
      extraData: {
        metaDataFn: "requestBeefy",
        metaDataArgs: ["sushi-usdc-eth"],
      },
    },

    "0xC8e809a9180d637Cc23dAf60b41B70CA1ad5Fc08": {
      symbol: "mSLP-MATIC/ETH",
      logoURL: `${uriProtocol}://${vercelURL}/static/mSLP-MATIC-ETH.png`,
      shortName: "mSLP",
      partnerURL: "https://app.beefy.finance/#/polygon/vault/sushi-matic-eth",
      extraData: {
        metaDataFn: "requestBeefy",
        metaDataArgs: ["sushi-matic-eth"],
      },
    },

    "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89": {
      logoURL: `${uriProtocol}://${vercelURL}/static/frax.png`,
    },

    "0x1a3acf6D19267E2d3e7f898f42803e90C9219062": {
      logoURL: `${uriProtocol}://${vercelURL}/static/fxs.png`,
    },
    "0xa3fa99a148fa48d14ed51d610c367c61876997f1": {
      symbol: "MAI",
	  shortName: "MAI"
    },

    "0xb0C22d8D350C67420f06F48936654f567C73E8C8": {
      logoURL: `${uriProtocol}://${vercelURL}/static/klima.png`,
      extraData: {
        metaDataFn: "requestKlima",
        metaDataArgs: [],
      },
    },
  },
};
