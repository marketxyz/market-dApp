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
      logoURL:
        "https://assets.coingecko.com/coins/images/15264/small/mimatic-red.png",
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

    [Web3.utils.toChecksumAddress(
      "0xa926db7a4CC0cb1736D5ac60495ca8Eb7214B503"
    )]: {
      logoURL: "/static/polygon/jSGD.png",
    },

    [Web3.utils.toChecksumAddress(
      "0x8ca194A3b22077359b5732DE53373D4afC11DeE3"
    )]: {
      logoURL: "/static/polygon/jCAD.png",
    },

    [Web3.utils.toChecksumAddress(
      "0x8343091F2499FD4b6174A46D067A920a3b851FF9"
    )]: {
      logoURL: "/static/polygon/jJPY.png",
    },

    [Web3.utils.toChecksumAddress(
      "0xfdE69969f4527343D78F9C9AC797ded29098B215"
    )]: {
      symbol: "mSLP-JRT/ETH",
      logoURL: `/static/polygon/mSLP-JRT-ETH.png`,
      extraData: {
        shortName: "mSLP",
        partnerURL: "https://app.beefy.finance/#/polygon/vault/sushi-jrt-eth",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["sushi-jrt-eth"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x94F64bb5046Ee377bFBb664736547B7f78e5AE06"
    )]: {
      symbol: "m2JPY",
      logoURL: `/static/polygon/m2JPY.png`,
      extraData: {
        shortName: "m2JPY",
        partnerURL: "https://app.beefy.finance/#/polygon/vault/jarvis-2jpy",
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xcf9Dd1de1D02158B3d422779bd5184032674A6D1"
    )]: {
      symbol: "m2CAD",
      logoURL: `/static/polygon/m2CAD.png`,
      extraData: {
        shortName: "m2CAD",
        partnerURL: "https://app.beefy.finance/#/polygon/vault/jarvis-2cad",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["jarvis-2cad"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xf49cB3B72d170407AeD7ED5B34d6e7bbE58Ac917"
    )]: {
      symbol: "mGohmEth",
      logoURL: `/static/polygon/mGohmEth.png`,
      extraData: {
        shortName: "mGohmEth",
        partnerURL: "https://app.beefy.finance/#/polygon/vault/sushi-eth-gohm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["sushi-eth-gohm"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x18DAdac6d0AAF37BaAAC811F6338427B46815a81"
    )]: {
      symbol: "m2SGD",
      logoURL: "/static/polygon/m2SGD.png",
      extraData: {
        shortName: "m2SGD",
        partnerURL: "https://app.beefy.finance/#/polygon/vault/jarvis-2sgd",
        metaDataFn: ["requestBeefy"],
        metaDataArgs: ["jarvis-2sgd"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x6b526Daf03B4C47AF2bcc5860B12151823Ff70E0"
    )]: {
      logoURL: "/static/polygon/jNZD.png",
    },

    [Web3.utils.toChecksumAddress(
      "0x6720c2b7fd7de1cad3242dd3e8a86d033d4ed3f9"
    )]: {
      symbol: "m2NZD",
      logoURL: "/static/polygon/m2NZD.png",
      extraData: {
        shortName: "m2NZD",
        partnerURL: "https://app.beefy.finance/polygon/vault/jarvis-2nzd",
        metaDataFn: ["requestBeefy"],
        metaDataArgs: ["jarvis-2nzd"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x122e09fdd2ff73c8cea51d432c45a474baa1518a"
    )]: {
      symbol: "m2JPY2",
      logoURL: "/static/polygon/m2JPY.png",
      extraData: {
        shortName: "m2JPY2",
        partnerURL: "https://app.beefy.finance/vault/jarvis-2jpy2",
        metaDataFn: ["requestBeefy"],
        metaDataArgs: ["jarvis-2jpy2"],
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
        shortName: "mBooLP",
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
    [Web3.utils.toChecksumAddress(
      "0x27c77411074ba90cA35e6f92A79dAd577c05A746"
    )]: {
      symbol: "mSPLP-TOMB/FTM",
      logoURL: `${URL}/static/fantom/TOMB-FTM-SPLP.png`,
      name: "Moo TOMB TOMB/FTM",
      extraData: {
        shortName: "mBooLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/tomb-tomb-ftm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["tomb-tomb-ftm"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0xae94e96bF81b3a43027918b138B71a771D381150"
    )]: {
      symbol: "mSPLP-TSHARE/FTM",
      logoURL: `${URL}/static/fantom/TSHARE-FTM-SPLP.png`,
      name: "Moo TOMB TSHARE/FTM",
      extraData: {
        shortName: "mBooLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/tomb-tshare-ftm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["tomb-tshare-ftm"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x15DD4398721733D8273FD4Ed9ac5eadC6c018866"
    )]: {
      symbol: "mBOO",
      logoURL: `${URL}/static/fantom/MOO-BOO.png`,
      name: "Moo Boo",
      extraData: {
        shortName: "mBooLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/boo-boo",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["boo-boo"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0xA4e2EE5a7fF51224c27C98098D8DB5C770bAAdbE"
    )]: {
      symbol: "mSpirit-USDC/FTM",
      logoURL: `${URL}/static/fantom/SPIRIT-FTM-USDC.png`,
      name: "Moo Spirit USDC-FTM",
      extraData: {
        shortName: "mSpiritLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/spirit-ftm-usdc",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["spirit-ftm-usdc"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0xD8dd2EA228968F7f043474Db610A20aF887866c7"
    )]: {
      symbol: "mSpirit-fUSDT/FTM",
      logoURL: `${URL}/static/fantom/SPIRIT-FUSDT-FTM.png`,
      name: "Moo Spirit fUSDT-FTM",
      extraData: {
        shortName: "mSpiritLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/spirit-fusdt-ftm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["spirit-fusdt-ftm"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x11d4D27364952b972AC74Fb6676DbbFa67fDa72F"
    )]: {
      symbol: "mSpirit-FRAX/USDC",
      logoURL: `${URL}/static/fantom/SPIRIT-FRAX-USDC.png`,
      name: "Moo Spirit FRAX-USDC",
      extraData: {
        shortName: "mSpiritLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/spirit-frax-usdc",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["spirit-frax-usdc"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x5d2EF803D6e255eF4D1c66762CBc8845051B54dB"
    )]: {
      symbol: "mSpirit-USDC/DAI",
      logoURL: `${URL}/static/fantom/SPIRIT-DAI-USDC.png`,
      name: "Moo Spirit USDC-DAI",
      extraData: {
        shortName: "mSpiritLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/spirit-dai-usdc",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["spirit-dai-usdc"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x7345a537A975d9Ca588eE631BEFdDfEF34fD5e8f"
    )]: {
      symbol: "mooBinSpirit",
      logoURL: `${URL}/static/fantom/binSpirit.png`,
      name: "Moo BinSpirit",
      extraData: {
        shortName: "mBinSpirit",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/beefy-binspirit",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["beefy-binspirit"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x794cEaD3c864B5390254ffca7ecd6a9aE868661a"
    )]: {
      symbol: "mBinSpirit/Spirit",
      logoURL: `${URL}/static/fantom/binSpirit-Spirit.png`,
      name: "Moo BinSpirit/Spirit",
      extraData: {
        shortName: "mSpiritLP",
        partnerURL:
          "https://app.beefy.finance/#/fantom/vault/spirit-binspirit-spirit",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["spirit-binspirit-spirit"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x30A9Eb3EC69eD8e68c147B47b9C2E826380024a3"
    )]: {
      symbol: "rf-FTM/TSHARE",
      logoURL: `${URL}/static/fantom/TSHARE-FTM-REAPER.png`,
      name: "Reaper FTM/TSHARE",
      extraData: {
        shortName: "rfBooLP",
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xAD48320c7e3D3e9fF0c7e51608869cbbfFE7422C"
    )]: {
      symbol: "rf-FTM/CREDIT",
      logoURL: `${URL}/static/fantom/FTM-CREDIT-REAPER.png`,
      name: "Reaper FTM/CREDIT",
      extraData: {
        shortName: "rfBooLP",
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355"
    )]: {
      logoURL: `${URL}/static/fantom/FRAX.png`,
    },

    [Web3.utils.toChecksumAddress(
      "0x38Da23Ef41333bE0d309Cd63166035FF3b7E2000"
    )]: {
      symbol: "rvWFTM",
      logoURL: `https://raw.githubusercontent.com/sushiswap/icons/master/token/ftm.jpg`,
      name: "RoboVault WFTM",
      extraData: {
        shortName: "rvWFTM",
        // partnerURL: "",
        // metaDataFn: "",
        // metaDataArgs: [""],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x92D2DdF8eed6f2bdB9a7890a00B07a48C9c7A658"
    )]: {
      symbol: "rvMIM",
      logoURL: `https://raw.githubusercontent.com/sushiswap/logos/main/token/mim.jpg`,
      name: "RoboVault MIM",
      extraData: {
        shortName: "rvMIM",
        // partnerURL: "",
        // metaDataFn: "",
        // metaDataArgs: [""],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x1B6ecdA7Fd559793c0Def1F1D90A2Df4887B9718"
    )]: {
      symbol: "rvUSDC",
      logoURL: `https://raw.githubusercontent.com/sushiswap/logos/main/token/usdc.jpg`,
      name: "RoboVault USDC",
      extraData: {
        shortName: "rvUSDC",
        // partnerURL: "",
        // metaDataFn: "",
        // metaDataArgs: [""],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x82f0B8B456c1A451378467398982d4834b6829c1"
    )]: {
      logoURL: `https://raw.githubusercontent.com/sushiswap/logos/main/token/mim.jpg`,
    },

    [Web3.utils.toChecksumAddress(
      "0x41D44B276904561Ac51855159516FD4cB2c90968"
    )]: {
      symbol: "mSPLP-FTM/USDC",
      logoURL: `${URL}/static/fantom/BOO-USDC-FTM.png`,
      name: "Moo Spooky FTM-USDC",
      extraData: {
        shortName: "mBooLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/boo-ftm-usdc",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["boo-ftm-usdc"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x5d89017d2465115007AbA00da1E6446dF2C19f34"
    )]: {
      symbol: "mSPLP-FTM/fUSDT",
      logoURL: `${URL}/static/fantom/BOO-fUSDT-FTM.png`,
      name: "Moo Spooky FTM-fUSDT",
      extraData: {
        shortName: "mBooLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/boo-usdt-ftm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["boo-usdt-ftm"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x2a30C5e0d577108F694d2A96179cd73611Ee069b"
    )]: {
      symbol: "mSPLP-ETH/FTM",
      logoURL: `${URL}/static/fantom/BOO-ETH-FTM.png`,
      name: "Moo Spooky ETH-FTM",
      extraData: {
        shortName: "mBooLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/boo-eth-ftm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["boo-eth-ftm"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xA3e3Af161943CfB3941B631676134bb048739727"
    )]: {
      symbol: "mSPLP-BTC/FTM",
      logoURL: `${URL}/static/fantom/BOO-BTC-FTM.png`,
      name: "Moo Spooky BTC-FTM",
      extraData: {
        shortName: "mBooLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/boo-btc-ftm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["boo-btc-ftm"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x8316b990De26eB530B7B1bb0d87f5b0a304637cd"
    )]: {
      symbol: "mSPLP-DAI/FTM",
      logoURL: `${URL}/static/fantom/BOO-DAI-FTM.png`,
      name: "Moo Spooky DAI-FTM",
      extraData: {
        shortName: "mBooLP",
        partnerURL: "https://app.beefy.finance/#/fantom/vault/boo-dai-ftm",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["boo-dai-ftm"],
      },
    },
    [Web3.utils.toChecksumAddress(
      "0x3F569724ccE63F7F24C5F921D5ddcFe125Add96b"
    )]: {
      logoURL: `${URL}/static/fantom/slinSpirit.png`,
    },

    [Web3.utils.toChecksumAddress(
      "0xaa67d669027adA5CD3B996c12394823FBb9dbA27"
    )]: {
      logoURL: `${URL}/static/fantom/rvSFTMx.png`,
      name: "Reaper sFTMx/FTM",
      extraData: {
        shortName: "rfBooLP",
      },
    },
    [Web3.utils.toChecksumAddress(
      "0xd7028092c830b5C8FcE061Af2E593413EbbC1fc1"
    )]: {
      logoURL: `${URL}/static/fantom/sFTMx.png`,
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

    [Web3.utils.toChecksumAddress(
      "0xDf306fBdA58527729A8D5185aB8fEF96BFa94c7A"
    )]: {
      logoURL: "/static/avax/mPNG-UST_AVAX.png",
      symbol: "mPNG-UST/AVAX",
      name: "Moo PNG UST/AVAX",
      extraData: {
        partnerURL: "https://app.beefy.finance/#/avax/vault/png-ust-wavax",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["png-ust-wavax"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0xe6f6466E1cA56ab02eBb909C8228eD76534686D7"
    )]: {
      logoURL: "/static/avax/mJOE-UST_AVAX.png",
      symbol: "mJOE-UST/AVAX",
      name: "Moo JOE UST/AVAX",
      extraData: {
        partnerURL: "https://app.beefy.finance/#/avax/vault/joe-ust-wavax",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["joe-ust-wavax"],
      },
    },

    [Web3.utils.toChecksumAddress(
      "0x6399A5E96CD627404b203Ea80517C3F8F9F78Fe6"
    )]: {
      logoURL: "/static/avax/mPNG-UST_USDC.png",
      symbol: "mPNG-UST/USDC",
      name: "Moo PNG UST/USDC",
      extraData: {
        partnerURL: "https://app.beefy.finance/#/avax/vault/png-ust-usdc",
        metaDataFn: "requestBeefy",
        metaDataArgs: ["png-ust-usdc"],
      },
    },
  },
};

export default tokens;
