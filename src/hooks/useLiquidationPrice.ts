import { useMemo } from "react";
import { useBorrowLimit } from "./useBorrowLimit";
import { USDPricedFuseAsset } from "utils/fetchFusePoolData";

export const useLiquidationPriceForSuppliedAsset = (
  asset: USDPricedFuseAsset,
  assets: USDPricedFuseAsset[],
  borrowBalanceUSD: number,
  options?: { ignoreIsEnabledCheckFor: string }): number => {

  const borrowLimit = useBorrowLimit(assets, options);
  const borrowLimitForAsset = useBorrowLimit([asset], options);
  const borrowLimitWithoutAsset = borrowLimit - borrowLimitForAsset;
  const difference = borrowBalanceUSD - borrowLimitWithoutAsset;
  
  if (
    difference <= 0 ||
    options?.ignoreIsEnabledCheckFor === asset.cToken ||
    asset.membership
  ) {
    const totalSupplyNeededUSD = difference / (asset.collateralFactor / 1e18);
    const liquidationPriceUSD = totalSupplyNeededUSD / asset.supplyBalance;

    return liquidationPriceUSD;
  } else {
    return 0;
  }
};

export const useLiquidationPricesForSuppliedAssets = (
  assets: USDPricedFuseAsset[],
  borrowBalanceUSD: number,
  options?: { ignoreIsEnabledCheckFor: string }): number[] => {

  const borrowLimit = useBorrowLimit(assets, options);

  const liquidationPricesUSD = useMemo(() => {
    return assets.map(asset => {
      const borrowLimitForAsset = useBorrowLimit([asset], options);
      const borrowLimitWithoutAsset = borrowLimit - borrowLimitForAsset;

      const difference = borrowBalanceUSD - borrowLimitWithoutAsset;
      
      if (
        difference <= 0 ||
        options?.ignoreIsEnabledCheckFor === asset.cToken ||
        asset.membership
      ) {
        const totalSupplyNeededUSD = difference / (asset.collateralFactor / 1e18);
        const liquidationPriceUSD = totalSupplyNeededUSD / asset.supplyBalance;

        return liquidationPriceUSD;
      } else {
        return 0;
      }
    });
  }, [assets, borrowBalanceUSD, options?.ignoreIsEnabledCheckFor]);

  return liquidationPricesUSD;
};

export const useLiquidationPriceForBorrowedAsset = (
  asset: USDPricedFuseAsset,
  assets: USDPricedFuseAsset[],
  borrowBalanceUSD: number,
  options?: { ignoreIsEnabledCheckFor: string }): number => {

  const borrowLimit = useBorrowLimit(assets, options);
  const difference = borrowLimit - borrowBalanceUSD;
  const liquidationPriceUSD = (asset.borrowBalanceUSD + difference)/asset.borrowBalance;

  return liquidationPriceUSD;
};

export const useLiquidationPricesForBorrowedAssets = (
  assets: USDPricedFuseAsset[],
  borrowBalanceUSD: number,
  options?: { ignoreIsEnabledCheckFor: string }): number[] => {

  const borrowLimit = useBorrowLimit(assets, options);

  const liquidationPricesUSD = useMemo(() => {
    return assets.map(asset => {
      const difference = borrowLimit - borrowBalanceUSD;
      const liquidationPriceUSD = (asset.borrowBalanceUSD + difference)/asset.borrowBalance;

      return liquidationPriceUSD;
    });
  }, [assets, borrowBalanceUSD, options?.ignoreIsEnabledCheckFor]);

  return liquidationPricesUSD;
};
