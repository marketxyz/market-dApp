import Web3 from "web3";
import { vercelURL as URL } from "./utils/getVercelURL";

const tokens = {
  137: {
    [Web3.utils.toChecksumAddress(
      "0x5A0801BAd20B6c62d86C566ca90688A6b9ea1d3f"
    )]: {
      symbol: "mCrvATC3",
      logoURL: `${URL}/static/polygon/aTriCrypto3.png`,
      extraData: {
        shortName: "mCrvLP",
        partnerURL:
          "https://app.beefy.finance/#/polygon/vault/curve-poly-atricrypto3",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["curve-poly-atricrypto3"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xAA7C2879DaF8034722A0977f13c343aF0883E92e"
    )]: {
      symbol: "mCrvAM3",
      logoURL: `${URL}/static/polygon/am3CRV.png`,
      name: "Moo Crv DAI/USDC/USDT",
      extraData: {
        shortName: "mCrvLP",
        partnerURL: "https://app.beefy.finance/#/polygon/vault/curve-am3crv",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["curve-am3crv"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x8c9d3Bc4425773BD2F00C4a2aC105c5Ad73c8141"
    )]: {
      symbol: "mCrvRen",
      logoURL: `${URL}/static/polygon/renBTC.png`,
      extraData: {
        partnerURL: "https://app.beefy.finance/#/polygon/vault/curve-poly-ren",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["curve-poly-ren"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xC1A2e8274D390b67A7136708203D71BF3877f158"
    )]: {
      symbol: "mQLP-MATIC/USDC",
      logoURL: `${URL}/static/polygon/MATIC-USDC-QLP.png`,
      name: "Moo Crv DAI/USDC/USDT",
      extraData: {
        shortName: "mQLP",
        partnerURL:
          "https://app.beefy.finance/#/polygon/vault/quick-matic-usdc",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["quick-matic-usdc"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xE4DB97A2AAFbfef40D1a4AE8B709f61d6756F8e1"
    )]: {
      symbol: "mSLP-USDC/ETH",
      logoURL: `${URL}/static/polygon/mSLP-USDC-ETH.png`,
      extraData: {
        shortName: "mSLP",
        partnerURL: "https://app.beefy.finance/#/polygon/vault/sushi-usdc-eth",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["sushi-usdc-eth"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xC8e809a9180d637Cc23dAf60b41B70CA1ad5Fc08"
    )]: {
      symbol: "mSLP-MATIC/ETH",
      logoURL: `${URL}/static/polygon/mSLP-MATIC-ETH.png`,
      extraData: {
        shortName: "mSLP",
        partnerURL: "https://app.beefy.finance/#/polygon/vault/sushi-matic-eth",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["sushi-matic-eth"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89"
    )]: {
      logoURL: `${URL}/static/polygon/frax.png`,
    },

    [Web3.utils.toChecksumAddress(
      "0x1a3acf6D19267E2d3e7f898f42803e90C9219062"
    )]: {
      logoURL: `${URL}/static/polygon/fxs.png`,
    },

    [Web3.utils.toChecksumAddress(
      "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1"
    )]: {
      symbol: "MAI",
      extraData: { shortName: "MAI" },
    },

    [Web3.utils.toChecksumAddress(
      "0xb0C22d8D350C67420f06F48936654f567C73E8C8"
    )]: {
      logoURL: `${URL}/static/polygon/klima.png`,
      extraData: {
        metaDataFn: "requestKlima",
        metaDataArgs: [],
      },
    },
  },
  250: {
    [Web3.utils.toChecksumAddress(
      "0xfB98B335551a418cD0737375a2ea0ded62Ea213b"
    )]: {
      symbol: "MAI",
      extraData: { shortName: "MAI" },
    },
    [Web3.utils.toChecksumAddress(
      "0xee3a7c885fd3cc5358ff583f2dab3b8bc473316f"
    )]: {
      symbol: "mSPLP-BOO/FTM",
      logoURL: `${URL}/static/fantom/BOO-FTM-SPLP.png`,
      name: "Moo Boo Boo/FTM",
      extraData: {
        shortName: "mSPLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/boo-boo-ftm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["boo-boo-ftm"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0xa48d959AE2E88f1dAA7D5F611E01908106dE7598"
    )]: {
      logoURL: `${URL}/static/fantom/xBOO.png`,
    },
  },
  43114: {
    [Web3.utils.toChecksumAddress(
      "0x5c49b268c9841AFF1Cc3B0a418ff5c3442eE3F3b"
    )]: {
      logoURL:
        "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/polygon/assets/0xa3Fa99A148fA48D14Ed51d610c367C61876997F1/logo.png",
    },

    [Web3.utils.toChecksumAddress(
      "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64"
    )]: {
      logoURL: `${URL}/static/avax/frax.png`,
    },
    [Web3.utils.toChecksumAddress(
      "0xea75ff4F580418A1430Bd3EBaF26B03C096D9489"
    )]: {
      logoURL: "/static/avax/mooJoeUsdc.png",
      symbol: "mJLP-JOE/USDC",
      name: "Moo Joe/USDC",
      extraData: {
        shortName: "mJLP",
        partnerURL:
          "https://app.beefy.finance/#/avalanche/vault/joe-joe-usdc.e",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["joe-joe-usdc.e"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xD0B0B19f2DC29a17175A2afc47b29C6DDd74d3D4"
    )]: {
      logoURL: "/static/avax/mooJoeUSDT.png",
      symbol: "mJLP-JOE/USDT",
      name: "Moo Joe/USDT",
      extraData: {
        shortName: "mJLP",
        partnerURL:
          "https://app.beefy.finance/#/avalanche/vault/joe-joe-usdt.e",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["joe-joe-usdt.e"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x3D81A269E05e6057e4dF9E2D76E254E65a65Eb66"
    )]: {
      logoURL: "/static/avax/mooJoeAvax.png",
      symbol: "mJLP-JOE/AVAX",
      name: "Moo Joe/Avax",
      extraData: {
        shortName: "mJLP",
        partnerURL: "https://app.beefy.finance/#/avalanche/vault/joe-joe-wavax",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["joe-joe-wavax"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x282B11E65f0B49363D4505F91c7A44fBEe6bCc0b"
    )]: {
      logoURL: "/static/avax/mooxJoe.png",
      symbol: "mooXJOE",
      name: "Moo xJOE",
      extraData: {
        partnerURL: "https://app.beefy.finance/#/avalanche/vault/joe-joe",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["joe-joe"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x670AF270FeE3BbC89e32DDd7B8ec43663A910793"
    )]: {
      logoURL: "/static/avax/mooxPNG.png",
      symbol: "MooXPNG",
      name: "Moo Staked PNG",
      extraData: {
        partnerURL: "https://app.beefy.finance/#/avax/vault/png-png",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["png-png"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xAf9f33df60CA764307B17E62dde86e9F7090426c"
    )]: {
      logoURL: "/static/avax/mooADAI.png",
      symbol: "MooADAI.e",
      name: "Moo Aave DAI.e",
      extraData: {
        partnerURL: "https://app.beefy.finance/#/avax/vault/aave-dai.e",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["aave-dai.e"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xb6767518b205ea8B312d2EF4d992A2a08C2f2416"
    )]: {
      logoURL: "/static/avax/mooAUSDT.png",
      symbol: "MooAUSDT.e",
      name: "Moo Aave USDT.e",
      extraData: {
        partnerURL: "https://app.beefy.finance/#/avax/vault/aave-usdt.e",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["aave-usdt.e"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xD795d70ec3C7b990ffED7a725a18Be5A9579c3b9"
    )]: {
      logoURL: "/static/avax/mooAUSDC.png",
      symbol: "MooAUSDC.e",
      name: "Moo Aave USDC.e",
      extraData: {
        partnerURL: "https://app.beefy.finance/#/avax/vault/aave-usdc.e",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["aave-usdc.e"],
      },
    },
  },
};

export default tokens;
