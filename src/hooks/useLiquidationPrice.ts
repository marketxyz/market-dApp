import { useMemo } from "react";
import { useBorrowLimit, useBorrowLimits } from "./useBorrowLimit";
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
    asset.supplyBalance == 0 ||
    options?.ignoreIsEnabledCheckFor === asset.cToken
  ) {
    return 0;
  }
  const totalSupplyNeededUSD = difference * 1e18 / (asset.collateralFactor);
  const liquidationPriceUSD = totalSupplyNeededUSD / (asset.supplyBalance / 10 ** asset.underlyingDecimals);

  return liquidationPriceUSD;
};

export const useLiquidationPricesForSuppliedAssets = (
  assets: USDPricedFuseAsset[],
  borrowBalanceUSD: number,
  options?: { ignoreIsEnabledCheckFor: string }): number[] => {

  const borrowLimit = useBorrowLimit(assets, options);
  const borrowLimits = useBorrowLimits(assets.map(asset => [asset]), options);

  const liquidationPricesUSD = useMemo(() => {
    return assets.map((asset, i) => {
      const borrowLimitForAsset = borrowLimits![i];
      const borrowLimitWithoutAsset = borrowLimit - borrowLimitForAsset;
      const difference = borrowBalanceUSD - borrowLimitWithoutAsset;
      
      if (
        difference <= 0 ||
        asset.supplyBalance == 0 ||
        options?.ignoreIsEnabledCheckFor === asset.cToken
      ) {
        return 0;
      }
      const totalSupplyNeededUSD = difference / (asset.collateralFactor / 1e18);
      const liquidationPriceUSD = totalSupplyNeededUSD / (asset.supplyBalance / 10 ** asset.underlyingDecimals);

      return liquidationPriceUSD;

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
  
  if(asset.borrowBalance == 0){
    return 0;
  }
  const difference = borrowLimit - borrowBalanceUSD;
  const liquidationPriceUSD = (asset.borrowBalanceUSD + difference) / (asset.borrowBalance / 10 ** asset.underlyingDecimals);

  return liquidationPriceUSD;
};

export const useLiquidationPricesForBorrowedAssets = (
  assets: USDPricedFuseAsset[],
  borrowBalanceUSD: number,
  options?: { ignoreIsEnabledCheckFor: string }): number[] => {

  const borrowLimit = useBorrowLimit(assets, options);

  const liquidationPricesUSD = useMemo(() => {
    return assets.map(asset => {
      if(asset.borrowBalance == 0){
        return 0;
      }
      const difference = borrowLimit - borrowBalanceUSD;
      const liquidationPriceUSD = (asset.borrowBalanceUSD + difference) / (asset.borrowBalance / 10 ** asset.underlyingDecimals);

      return liquidationPriceUSD;
    });
  }, [assets, borrowBalanceUSD, options?.ignoreIsEnabledCheckFor]);

  return liquidationPricesUSD;
};
