import { useQuery } from "react-query";

export const useAssetRSS = (address: string) => {
  const { data } = useQuery(
    address + " rss",
    () => {
      return fetch(
        // Since running the vercel functions requires a Vercel account and is super slow,
        // just fetch this data from the live site in development:
        (process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_API_HOST
          : "") +
          "/api/rss?address=" +
          address
      )
        .then((res) => res.json())
        .catch((e) => {
          console.log("Could not fetch RSS!");
          console.log(e);
        }) as Promise<{
        mcap: number;
        volatility: number;
        liquidity: number;
        swapCount: number;
        coingeckoMetadata: number;
        exchanges: number;
        transfers: number;

        lastUpdated: string;
        totalScore: number;
      }>;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // 1 day
      cacheTime: 8.64e7,
    }
  );

  return data;
};

export const letterScore = (
  totalScore: number
): "A" | "B" | "C" | "D" | "U" => {
  switch (true) {
    case totalScore >= 70: {
      return "A";
    }
    case totalScore >= 60: {
      return "B";
    }
    case totalScore >= 50: {
      return "C";
    }
    case totalScore >= 40: {
      return "D";
    }
    default: {
      return "U";
    }
  }
};

export const usePoolRSS = (poolId: string | number) => {
  const { data } = useQuery(
    poolId + " rss",
    () => {
      return fetch(
        // Since running the vercel functions requires a Vercel account and is super slow,
        // just fetch this data from the live site in development:
        (process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_API_HOST
          : "") +
          "/api/rss?poolID=" +
          poolId
      )
        .then((res) => res.json())
        .catch((e) => {
          console.log("Could not fetch RSS!");
          console.log(e);
        }) as Promise<{
        liquidity: number;
        collateralFactor: number;
        reserveFactor: number;
        utilization: number;
        averageRSS: number;
        upgradeable: number;
        mustPass: number;
        totalScore: number;
        lastUpdated: string;
      }>;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // 1 day
      cacheTime: 8.64e7,
    }
  );

  return data;
};
