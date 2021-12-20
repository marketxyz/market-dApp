import {
  Avatar,
  Skeleton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useFusePoolData } from "hooks/useFusePoolData";
import { useTokenData } from "hooks/useTokenData";
import { smallUsdFormatter } from "utils/bigUtils";
import { Column, Row, RowOrColumn, useIsMobile } from "utils/chakraUtils";
import { USDPricedFuseAsset } from "utils/fetchFusePoolData";
import { PoolDashboardBox } from "./FusePoolPage";

export const FusePositions = ({
  data,
}: {
  data: ReturnType<typeof useFusePoolData>;
}) => {
  const isMobile = useIsMobile();

  const suppliedAssets = data?.assets.filter(
    (asset) => asset.supplyBalanceUSD > 1
  );

  const borrowedAssets = data?.assets.filter(
    (asset) => asset.borrowBalanceUSD > 1
  );

  return (
    <RowOrColumn
      crossAxisAlignment={"flex-start"}
      mainAxisAlignment={"center"}
      isRow={!isMobile}
      mt={4}
    >
      <PoolDashboardBox
        mt={isMobile ? 4 : 0}
        borderRadius={12}
        width={isMobile ? "100%" : "50%"}
      >
        {data ? (
          <Table variant={"unstyled"} size={"sm"}>
            <TableCaption
              my="2"
              placement="top"
              textAlign={"left"}
              fontWeight={"bold"}
              fontSize={{ base: "3.8vw", sm: "lg" }}
            >
              Collateralized Assets
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Assets/Cur. Price</Th>
                <Th textAlign={"right"} isNumeric>
                  Supplied
                </Th>
                <Th textAlign={"right"} isNumeric>
                  Liq. Price/Health
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {suppliedAssets
                ? suppliedAssets.length > 0
                  ? suppliedAssets.map((asset, index) => {
                      return (
                        <CollateralizedAssetRow
                          assets={suppliedAssets}
                          totalBorrowBalanceUSD={data.totalBorrowBalanceUSD}
                          totalSupplyBalanceUSD={data.totalSupplyBalanceUSD}
                          index={index}
                        />
                      );
                    })
                  : null
                : null}
            </Tbody>
          </Table>
        ) : (
          <Skeleton w="100%" h="100%" />
        )}
      </PoolDashboardBox>
      <PoolDashboardBox
        ml={isMobile ? 0 : 4}
        mt={isMobile ? 4 : 0}
        borderRadius={12}
        width={isMobile ? "100%" : "50%"}
      >
        {data ? (
          <Table variant={"unstyled"} size={"sm"}>
            <TableCaption
              my="2"
              placement="top"
              textAlign={"left"}
              fontWeight={"bold"}
              fontSize={{ base: "3.8vw", sm: "lg" }}
            >
              Borrowed Assets
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Assets/Cur. Price</Th>
                <Th textAlign={"right"} isNumeric>
                  Borrowed
                </Th>
                <Th textAlign={"right"} isNumeric>
                  Liq. Price/Health
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {borrowedAssets
                ? borrowedAssets.length > 0
                  ? borrowedAssets.map((asset, index) => {
                      return (
                        <BorrowedAssetRow
                          assets={borrowedAssets}
                          totalBorrowBalanceUSD={data.totalBorrowBalanceUSD}
                          totalSupplyBalanceUSD={data.totalSupplyBalanceUSD}
                          index={index}
                        />
                      );
                    })
                  : null
                : null}
            </Tbody>
          </Table>
        ) : (
          <Skeleton w="100%" h="100%" />
        )}
      </PoolDashboardBox>
    </RowOrColumn>
  );
};

const CollateralizedAssetRow = ({
  assets,
  totalBorrowBalanceUSD,
  totalSupplyBalanceUSD,
  index,
}: {
  assets: USDPricedFuseAsset[];
  totalBorrowBalanceUSD: any;
  totalSupplyBalanceUSD: any;
  index: number;
}) => {
  const asset = assets[index];

  const suppliedAssets = assets.filter((asset) => asset.supplyBalanceUSD > 1);
  const ltv = asset.collateralFactor / 1e16;
  const deltaAmount = (totalBorrowBalanceUSD * 100) / ltv;
  const deltaPer = deltaAmount / totalSupplyBalanceUSD;
  const tokenData = useTokenData(asset.underlyingToken);
  let liqPrice = 0;
  if (tokenData?.currPrice) {
    liqPrice = tokenData.currPrice * deltaPer;
  }

  return (
    <>
      {suppliedAssets.map((asset) => {
        return (
          <Tr height={"70px"}>
            <Td>
              <Row
                mainAxisAlignment={"flex-start"}
                crossAxisAlignment={"center"}
              >
                <Avatar
                  bg={"transparent"}
                  boxSize={{ base: "5vw", sm: "2.2rem" }}
                  name={asset.underlyingSymbol}
                  src={
                    tokenData?.logoURL ??
                    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                  }
                />
                <Column
                  maxW={"70%"}
                  ml={2}
                  mainAxisAlignment={"center"}
                  crossAxisAlignment={"flex-start"}
                >
                  <Text fontWeight={"bold"}>{asset.underlyingSymbol}</Text>
                  {tokenData?.currPrice ? (
                    <Text wordBreak={"break-all"} mt={1}>
                      {smallUsdFormatter(tokenData.currPrice)}
                    </Text>
                  ) : null}
                </Column>
              </Row>
            </Td>
            <Td textAlign={"right"} isNumeric>
              {smallUsdFormatter(asset.supplyBalanceUSD)}
            </Td>
            <Td textAlign={"right"} isNumeric>
              {smallUsdFormatter(liqPrice)}
            </Td>
          </Tr>
        );
      })}
    </>
  );
};

const BorrowedAssetRow = ({
  assets,
  totalBorrowBalanceUSD,
  totalSupplyBalanceUSD,
  index,
}: {
  assets: USDPricedFuseAsset[];
  totalBorrowBalanceUSD: any;
  totalSupplyBalanceUSD: any;
  index: number;
}) => {
  const asset = assets[index];
  const borrowedAssets = assets.filter((asset) => asset.borrowBalanceUSD > 1);
  const ltv = asset.collateralFactor / 1e16;
  const tokenData = useTokenData(asset.underlyingToken);
  const deltaAmount = (totalBorrowBalanceUSD * 100) / ltv;
  const deltaPer = deltaAmount / totalBorrowBalanceUSD;
  let liqPrice = 0;
  if (tokenData?.currPrice) {
    liqPrice = tokenData.currPrice * deltaPer;
  }

  return (
    <>
      {borrowedAssets.map((asset) => {
        return (
          <Tr height={"70px"}>
            <Td>
              <Row
                mainAxisAlignment={"flex-start"}
                crossAxisAlignment={"center"}
              >
                <Avatar
                  bg={"transparent"}
                  boxSize={{ base: "5vw", sm: "2.2rem" }}
                  name={asset.underlyingSymbol}
                  src={
                    tokenData?.logoURL ??
                    "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
                  }
                />
                <Column
                  maxW={"70%"}
                  ml={2}
                  mainAxisAlignment={"center"}
                  crossAxisAlignment={"flex-start"}
                >
                  <Text fontWeight={"bold"}>{asset.underlyingSymbol}</Text>
                  {tokenData?.currPrice ? (
                    <Text wordBreak={"break-all"} mt={1}>
                      {smallUsdFormatter(tokenData?.currPrice)}
                    </Text>
                  ) : null}
                </Column>
              </Row>
            </Td>
            <Td textAlign={"right"} isNumeric>
              {smallUsdFormatter(asset.borrowBalanceUSD)}
            </Td>
            <Td textAlign={"right"} isNumeric>
              {smallUsdFormatter(liqPrice)}
            </Td>
          </Tr>
        );
      })}
    </>
  );
};
