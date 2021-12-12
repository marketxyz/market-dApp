import { NowRequest, NowResponse } from "@vercel/node";

import { variance, median, add } from "mathjs";
import fetch from "node-fetch";
import Web3 from "web3";
import { CHAIN_ID } from "../src/fuse-sdk/src/utils";

import { fetchFusePoolData } from "../src/utils/fetchFusePoolData";
import {
  initFuseWithProviders,
  turboGethURL,
} from "../src/utils/web3Providers";

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

const weightedCalculation = async (
  calculation: () => Promise<number>,
  weight: number
) => {
  return clamp((await calculation()) ?? 0, 0, 1) * weight;
};

const fuse = initFuseWithProviders(turboGethURL);
const appChainId = CHAIN_ID;

async function computeAssetRSS_137(address: string) {
  // max score for WETH.
  const WETH = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619".toLowerCase();
  const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174".toLowerCase();
  const WMATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270".toLowerCase();
  const miMATIC = "0xa3fa99a148fa48d14ed51d610c367c61876997f1".toLowerCase();
  const mooCrvAm3 = "0xaa7c2879daf8034722a0977f13c343af0883e92e".toLowerCase();
  const mooCrvRen = "0x8c9d3bc4425773bd2f00c4a2ac105c5ad73c8141".toLowerCase();
  const mooQLPMU = "0xC1A2e8274D390b67A7136708203D71BF3877f158".toLowerCase();
  const aTriCrypto3 =
    "0x5A0801BAd20B6c62d86C566ca90688A6b9ea1d3f".toLowerCase();
  const WBTC = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6".toLowerCase();

  switch (address) {
    case aTriCrypto3: {
      address = WBTC;
      break;
    }
    case mooCrvAm3: {
      address = USDC; // DAI-USDC-USDT, taking USDC as score
      break;
    }
    case mooCrvRen: {
      address = WBTC; // WBTC
      break;
    }
    case mooQLPMU: {
      address = WMATIC;
      break;
    }
  }

  if (address === WETH) {
    return {
      liquidityUSD: 4_000_000_000,

      mcap: 33,
      volatility: 20,
      liquidity: 32,
      swapCount: 7,
      coingeckoMetadata: 2,
      exchanges: 3,
      transfers: 3,

      totalScore: 100,
    };
  }
  // Fetch all the data in parallel
  const [
    {
      market_data: {
        market_cap: { usd: asset_market_cap },
        current_price: { usd: price_usd },
      },
      tickers,
      community_data: { twitter_followers },
    },

    sushiData,

    quickData,

    defiCoins,

    assetVariation,

    ethVariation,
  ] = await Promise.all([
    fetch(
      `https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${address}`
    ).then((res) => res.json()),

    fetch("https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange", {
      method: "post",

      body: JSON.stringify({
        query: `{
          token(id: "${address}") {
          liquidity
          txCount
        }
      }`,
      }),

      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),

    fetch("https://api.thegraph.com/subgraphs/name/sameepsi/quickswap03", {
      method: "post",

      body: JSON.stringify({
        query: `{
            token(id: "${address}") {
              totalLiquidity
              txCount
            }
          }`,
      }),

      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized_finance_defi&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    )
      .then((res) => res.json())
      .then((array) => array.slice(0, 50)),

    fetch(
      `https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${address}/market_chart/?vs_currency=usd&days=30`
    )
      .then((res) => res.json())
      .then((data) => data.prices.map(([, price]) => price))
      .then((prices) => variance(prices)),

    fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/market_chart/?vs_currency=usd&days=30`
    )
      .then((res) => res.json())
      .then((data) => data.prices.map(([, price]) => price))
      .then((prices) => variance(prices)),
  ]);

  const mcap = await weightedCalculation(async () => {
    const medianDefiCoinMcap = median(defiCoins.map((coin) => coin.market_cap));

    // Make exception for WETH
    if ([WETH, WMATIC, WBTC, USDC].includes(address)) {
      return 1;
    }

    if (address === miMATIC) {
      return 0.9;
    }

    if (asset_market_cap < 1_000_000) {
      return 0;
    } else {
      return asset_market_cap / medianDefiCoinMcap;
    }
  }, 33);

  let liquidityUSD = 0;

  const liquidity = await weightedCalculation(async () => {
    const sushiLiquidity = parseFloat(sushiData.data.token?.liquidity ?? "0");
    const quickLiquidity = parseFloat(
      quickData.data.token?.totalLiquidity ?? "0"
    );

    const totalLiquidity = (sushiLiquidity + quickLiquidity) * price_usd;

    liquidityUSD = totalLiquidity;

    return totalLiquidity / 220_000_000;
  }, 32);

  const volatility = await weightedCalculation(async () => {
    const peak = ethVariation * 3;

    return 1 - assetVariation / peak;
  }, 20);

  const swapCount = await weightedCalculation(async () => {
    const sushiTxCount = parseFloat(sushiData.data.token?.txCount ?? "0");

    // const sushiTxCount = parseFloat(quickData.data.token?.txCount ?? "0");
    const quickTxCount = parseFloat(quickData.data.token?.txCount ?? "0");

    const totalTxCount = sushiTxCount + quickTxCount;

    return totalTxCount >= 10_000 ? 1 : 0;
  }, 7);

  const exchanges = await weightedCalculation(async () => {
    let reputableExchanges: any[] = [];

    for (const exchange of tickers) {
      const name = exchange.market.identifier;

      if (
        !reputableExchanges.includes(name) &&
        name !== "uniswap" &&
        exchange.trust_score === "green"
      ) {
        reputableExchanges.push(name);
      }
    }

    return reputableExchanges.length >= 3 ? 1 : 0;
  }, 3);

  const transfers = await weightedCalculation(async () => {
    return 1;
  }, 3);

  const coingeckoMetadata = await weightedCalculation(async () => {
    // USDC needs an exception because Circle twitter is not listed on Coingecko.
    if ([USDC, WMATIC, miMATIC].includes(address)) {
      return 1;
    }

    return twitter_followers >= 1000 ? 1 : 0;
  }, 2);

  return {
    liquidityUSD,

    mcap,
    volatility,
    liquidity,
    swapCount,
    coingeckoMetadata,
    exchanges,
    transfers,

    totalScore:
      mcap +
        volatility +
        liquidity +
        swapCount +
        coingeckoMetadata +
        exchanges +
        transfers || 0,
  };
}

type RSSOutput = {
  liquidityUSD: number;
  mcap: number;
  volatility: number;
  liquidity: number;
  swapCount: number;
  coingeckoMetadata: number;
  exchanges: number;
  transfers: number;
  totalScore: number;
};

async function computeAssetRSS(address: string): Promise<RSSOutput> {
  address = address.toLowerCase();

  try {
    if (appChainId === 137) {
      return await computeAssetRSS_137(address);
    } else {
      throw "get to catch!";
    }
  } catch (e) {
    console.log(e);

    return {
      liquidityUSD: 0,

      mcap: 0,
      volatility: 0,
      liquidity: 0,
      swapCount: 0,
      coingeckoMetadata: 0,
      exchanges: 0,
      transfers: 0,

      totalScore: 0,
    };
  }
}

export default async (request: NowRequest, response: NowResponse) => {
  const { address, poolID } = <Record<string, string>>request.query;

  response.setHeader("Access-Control-Allow-Origin", "*");

  let lastUpdated = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });

  if (address) {
    response.setHeader("Cache-Control", "s-maxage=3600");

    return response.json({ ...(await computeAssetRSS(address)), lastUpdated });
  } else if (poolID) {
    console.time("poolData");
    const { assets, totalLiquidityUSD, comptroller } = (await fetchFusePoolData(
      poolID,
      "0x0000000000000000000000000000000000000000",
      fuse
    ))!;

    console.timeEnd("poolData");

    const liquidity = await weightedCalculation(async () => {
      return totalLiquidityUSD > 50_000 ? totalLiquidityUSD / 2_000_000 : 0;
    }, 25);

    const collateralFactor = await weightedCalculation(async () => {
      if (parseInt(poolID) == 3) {
        return 0.8;
      }

      // @ts-ignore
      const avgCollatFactor = assets.reduce(
        (a, b, _, { length }) => a + b.collateralFactor / 1e16 / length,
        0
      );

      // Returns a percentage in the range of 45% -> 90% (where 90% is 0% and 45% is 100%)
      return -1 * (1 / 45) * avgCollatFactor + 2;
    }, 10);

    const reserveFactor = await weightedCalculation(async () => {
      // @ts-ignore
      const avgReserveFactor = assets.reduce(
        (a, b, _, { length }) => a + b.reserveFactor / 1e16 / length,
        0
      );

      return avgReserveFactor <= 2 ? 0 : avgReserveFactor / 10;
    }, 10);

    const utilization = await weightedCalculation(async () => {
      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];

        // If this asset has more than 75% utilization, fail
        if (
          // @ts-ignore
          asset.totalSupply === "0"
            ? false
            : asset.totalBorrow / asset.totalSupply >= 0.75
        ) {
          return 0;
        }
      }

      return 1;
    }, 10);

    let assetsRSS: ThenArg<ReturnType<typeof computeAssetRSS>>[] = [];
    let totalRSS = 0;

    let promises: Promise<any>[] = [];

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];

      console.time(asset.underlyingSymbol);

      const vercelURL = process.env.VERCEL_URL!.toLowerCase();
      const isLocal =
        vercelURL.includes("localhost") || vercelURL.includes("127.0.0.1");

      promises.push(
        fetch(
          `${isLocal ? "http" : "https"}://${vercelURL}/api/rss?address=` +
            asset.underlyingToken
        )
          .then((res) => res.json())
          .then((rss) => {
            assetsRSS[i] = rss;
            totalRSS += rss.totalScore;

            console.timeEnd(asset.underlyingSymbol);
          })
      );
    }

    await Promise.all(promises);

    const averageRSS = await weightedCalculation(async () => {
      return totalRSS / assets.length / 100;
    }, 15);

    const upgradeable = await weightedCalculation(async () => {
      try {
        const { 0: admin, 1: upgradeable } =
          await fuse.contracts.FusePoolLens.methods
            .getPoolOwnership(comptroller)
            .call({ gas: 1e18 });

        // Market Multisig(s)
        let ownedAccounts: string[] = fuse.OWNED_ACCOUNTS;

        if (
          ownedAccounts
            .map((x) => Web3.utils.toChecksumAddress(x))
            .includes(Web3.utils.toChecksumAddress(admin))
        ) {
          return 1;
        }

        return upgradeable ? 0 : 1;
      } catch (e) {
        // Assume upgradeable.
        return 0;
      }
    }, 10);

    const mustPass = await weightedCalculation(async () => {
      const comptrollerContract = new fuse.web3.eth.Contract(
        JSON.parse(
          fuse.compoundContracts["contracts/Comptroller.sol:Comptroller"].abi
        ),
        comptroller
      );

      // Ex: 8
      const liquidationIncentive =
        (await comptrollerContract.methods
          .liquidationIncentiveMantissa()
          .call()) /
          1e16 -
        100;

      for (let i = 0; i < assetsRSS.length; i++) {
        const rss = assetsRSS[i];
        const asset = assets[i];

        // Ex: 75
        const collateralFactor = asset.collateralFactor / 1e16;

        // If the AMM liquidity is less than 2x the $ amount supplied, fail
        if (rss.liquidityUSD < 2 * asset.totalSupplyUSD) {
          return 0;
        }

        // If any of the RSS asset scores are less than 60, fail
        if (rss.totalScore < 60) {
          return 0;
        }

        // If the collateral factor and liquidation incentive do not have at least a 5% safety margin, fail
        if (collateralFactor + liquidationIncentive > 95) {
          /* 
        
          See this tweet for why: https://twitter.com/transmissions11/status/1378862288266960898
        
          TLDR: If CF and LI add up to be greater than 100 then any liquidation will result in instant insolvency. 95 has been determined to be the highest sum that could be considered "safe".
        
          */

          return 0;
        }

        // If the liquidation incentive is less than or equal to 1/10th of the collateral factor, fail
        if (liquidationIncentive <= collateralFactor / 10) {
          return 0;
        }
      }

      return 1;
    }, 20);

    response.setHeader("Cache-Control", "s-maxage=3600");
    response.json({
      liquidity,
      collateralFactor,
      reserveFactor,
      utilization,
      averageRSS,
      upgradeable,
      mustPass,

      totalScore:
        liquidity +
          collateralFactor +
          reserveFactor +
          utilization +
          averageRSS +
          upgradeable +
          mustPass || 0,

      lastUpdated,
    });

    console.log("done!");
  } else {
    return response.status(404).send("Specify address or poolID!");
  }
};
