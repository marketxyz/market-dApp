import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Link,
  Select,
  Spinner,
  Text,
  useClipboard,
  Skeleton,
  useColorModeValue,
  Table,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Center,
  Column,
  Row,
  RowOrColumn,
  useIsMobile,
} from "utils/chakraUtils";
import { useRari } from "../../../context/RariContext";
import Fuse from "../../../fuse-sdk";
import { useFusePoolData } from "../../../hooks/useFusePoolData";
import { useIsSemiSmallScreen } from "../../../hooks/useIsSemiSmallScreen";
import { useTokenData } from "../../../hooks/useTokenData";
import { shortUsdFormatter } from "../../../utils/bigUtils";
import { FuseUtilizationChartOptions } from "../../../utils/chartOptions";
import { createComptroller } from "../../../utils/createComptroller";
import { USDPricedFuseAsset } from "../../../utils/fetchFusePoolData";
import { shortAddress } from "../../../utils/shortAddress";
import CaptionedStat from "../../shared/CaptionedStat";
import { ModalDivider } from "../../shared/Modal";
import { PoolDashboardBox } from "./FusePoolPage";
import FuseStatsBar from "./FuseStatsBar";
import FuseTabBar from "./FuseTabBar";

export const useExtraPoolInfo = (comptrollerAddress: string) => {
  const { fuse, address } = useRari();

  const { data } = useQuery(comptrollerAddress + " extraPoolInfo", async () => {
    const comptroller = createComptroller(comptrollerAddress, fuse);

    const [
      { 0: admin, 1: upgradeable },
      oracle,
      closeFactor,
      liquidationIncentive,
      enforceWhitelist,
      whitelist,
      pendingAdmin,
    ] = await Promise.all([
      fuse.contracts.FusePoolLens.methods
        .getPoolOwnership(comptrollerAddress)
        .call({ gas: 1e18 }),

      fuse.getPriceOracle(await comptroller.methods.oracle().call()),

      comptroller.methods.closeFactorMantissa().call(),

      comptroller.methods.liquidationIncentiveMantissa().call(),

      (() => {
        return comptroller.methods
          .enforceWhitelist()
          .call()
          .then((x: boolean) => x)
          .catch((_: any) => false);
      })(),

      (() => {
        return comptroller.methods
          .getWhitelist()
          .call()
          .then((x: string[]) => x)
          .catch((_: any) => []);
      })(),

      comptroller.methods.pendingAdmin().call(),
    ]);

    return {
      admin,
      upgradeable,
      enforceWhitelist,
      whitelist: whitelist as string[],
      isPowerfulAdmin:
        admin.toLowerCase() === address.toLowerCase() && upgradeable,
      oracle,
      closeFactor,
      liquidationIncentive,
      pendingAdmin,
    };
  });

  return data;
};

const FusePoolInfoPage = memo(() => {
  const isMobile = useIsSemiSmallScreen();
  const { poolId } = useParams();
  const data = useFusePoolData(poolId);

  return (
    <>
      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        color="#FFFFFF"
        mx="auto"
        width={isMobile ? "100%" : "1150px"}
        height="100%"
        px={isMobile ? 4 : 0}
      >
        <FuseStatsBar />
        <FuseTabBar />
        <PoolInfoBox data={data} />
      </Column>
    </>
  );
});

export const PoolInfoBox = ({
  data,
}: {
  data: ReturnType<typeof useFusePoolData>;
}) => {
  const isMobile = useIsMobile();
  const bgColor = useColorModeValue("white", "gray.900");

  return (
    <RowOrColumn
      width="90%"
      maxW={{ lg: "1200px" }}
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      mx="auto"
      isRow={!isMobile}
      bgColor={bgColor}
    >
      <PoolDashboardBox
        borderRadius={12}
        width={isMobile ? "100%" : "50%"}
        height={isMobile ? "auto" : "450px"}
        mt={4}
      >
        {data ? (
          <OracleAndInterestRates
            assets={data.assets}
            name={data.name}
            totalSuppliedUSD={data.totalSuppliedUSD}
            totalBorrowedUSD={data.totalBorrowedUSD}
            totalLiquidityUSD={data.totalLiquidityUSD}
            comptrollerAddress={data.comptroller}
          />
        ) : (
          <Skeleton w="100%" h="100%" />
        )}
      </PoolDashboardBox>
      <PoolDashboardBox
        ml={isMobile ? 0 : 4}
        width={isMobile ? "100%" : "50%"}
        borderRadius={12}
        height={"100%"}
        mt={4}
      >
        {data ? (
          data.assets.length > 0 ? (
            <AssetAndOtherInfo assets={data.assets} />
          ) : (
            <Center expand>{"There are no assets in this pool."}</Center>
          )
        ) : (
          <Skeleton w="100%" h="100%" />
        )}
      </PoolDashboardBox>
    </RowOrColumn>
  );
};

export default FusePoolInfoPage;

const OracleAndInterestRates = ({
  assets,
  name,
  totalSuppliedUSD,
  totalBorrowedUSD,
  totalLiquidityUSD,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  name: string;
  totalSuppliedUSD: number;
  totalBorrowedUSD: number;
  totalLiquidityUSD: number;
  comptrollerAddress: string;
}) => {
  let { poolId } = useParams();

  const data = useExtraPoolInfo(comptrollerAddress);

  const { hasCopied, onCopy } = useClipboard(data?.admin ?? "");

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height="100%"
      width="100%"
      pb={2}
    >
      <Row
        mainAxisAlignment="space-between"
        crossAxisAlignment="center"
        width="100%"
        px={4}
        height="60px"
        flexShrink={0}
      >
        <Heading size="sm">{`Pool ${poolId} Info`}</Heading>

        <Link
          className="no-underline"
          isExternal
          ml="auto"
          href={`https://metrics.market.xyz/d/HChNahwGk/fuse-pool-details?orgId=1&refresh=10s&var-poolID=${poolId}`}
        >
          <Box
            p={5}
            borderRadius={"lg"}
            bgColor={useColorModeValue("gray.50", "mktgray.700")}
            height="35px"
          >
            <Center expand px={2} fontWeight="bold">
              Metrics
              <ExternalLinkIcon ml={2} />
            </Center>
          </Box>
        </Link>

        {data?.isPowerfulAdmin ? (
          <Link
            /* @ts-ignore */
            as={RouterLink}
            className="no-underline"
            to={`/pool/${poolId}/edit`}
            ml={2}
          >
            <PoolDashboardBox height="35px">
              <Center expand px={2} fontWeight="bold">
                Edit
              </Center>
            </PoolDashboardBox>
          </Link>
        ) : null}
      </Row>
      <ModalDivider bg={useColorModeValue("gray.200", "gray.700")} />
      <Table variant={"simple"} size={"sm"} width="100%" height={"100%"}>
        <Tbody>
          <StatRow
            statATitle={"Total Supplied"}
            statA={shortUsdFormatter(totalSuppliedUSD)}
            statBTitle={"Total Borrowed"}
            statB={shortUsdFormatter(totalBorrowedUSD)}
          />

          <StatRow
            statATitle={"Available Liquidity"}
            statA={shortUsdFormatter(totalLiquidityUSD)}
            statBTitle={"Pool Utilization"}
            statB={
              totalSuppliedUSD.toString() === "0"
                ? "0%"
                : ((totalBorrowedUSD / totalSuppliedUSD) * 100).toFixed(2) + "%"
            }
          />

          <StatRow
            statATitle={"Upgradeable"}
            statA={data ? (data.upgradeable ? "Yes" : "No") : "?"}
            statBTitle={hasCopied ? "Admin (copied!)" : "Admin (click to copy)"}
            statB={data?.admin ? shortAddress(data.admin) : "?"}
            onClick={onCopy}
          />

          <StatRow
            statATitle={"Platform Fee"}
            statA={
              assets.length > 0
                ? (assets[0].fuseFee / 1e16).toPrecision(2) + "%"
                : "10%"
            }
            statBTitle={"Average Admin Fee"}
            statB={
              assets
                .reduce(
                  (a, b, _, { length }) => a + b.adminFee / 1e16 / length,
                  0
                )
                .toFixed(1) + "%"
            }
          />

          <StatRow
            statATitle={"Close Factor"}
            statA={data?.closeFactor ? data.closeFactor / 1e16 + "%" : "?%"}
            statBTitle={"Liquidation Incentive"}
            statB={
              data?.liquidationIncentive
                ? data.liquidationIncentive / 1e16 - 100 + "%"
                : "?%"
            }
          />

          <StatRow
            statATitle={"Oracle"}
            statA={data ? data.oracle ?? "Unrecognized Oracle" : "?"}
            statBTitle={"Whitelist"}
            statB={data ? (data.enforceWhitelist ? "Yes" : "No") : "?"}
          />
        </Tbody>
      </Table>
    </Column>
  );
};

const StatRow = ({
  statATitle,
  statA,
  statBTitle,
  statB,
  ...other
}: {
  statATitle: string;
  statA: string;
  statBTitle: string;
  statB: string;
  [key: string]: any;
}) => {
  return (
    <Tr
      // border={"1px"}
      // borderColor={useColorModeValue("gray.50", "gray.700")}
      // p={4}
      {...other}
    >
      <Td
        fontSize={{ base: "3vw", sm: "0.9rem" }}
        wordBreak={"break-all"}
        width={"50%"}
        lineHeight={1.5}
        textAlign="left"
      >
        {statATitle}: <b>{statA}</b>
      </Td>

      <Td
        fontSize={{ base: "3vw", sm: "0.9rem" }}
        wordBreak={"break-all"}
        width={"50%"}
        lineHeight={1.5}
        textAlign="left"
      >
        {statBTitle}: <b>{statB}</b>
      </Td>
    </Tr>
  );
};

const AssetOption = ({ asset }: { asset: USDPricedFuseAsset }) => {
  const tokenData = useTokenData(asset.underlyingToken);
  return (
    <option
      style={{ background: "black", color: "white" }}
      value={asset.cToken}
      key={asset.cToken}
    >
      {tokenData?.symbol ?? asset.underlyingSymbol}
    </option>
  );
};

const AssetAndOtherInfo = ({ assets }: { assets: USDPricedFuseAsset[] }) => {
  let { poolId } = useParams();

  const { fuse } = useRari();

  const [selectedAsset, setSelectedAsset] = useState(
    assets.length > 3 ? assets[2] : assets[0]
  );
  const selectedTokenData = useTokenData(selectedAsset.underlyingToken);
  const selectedAssetUtilization =
    // @ts-ignore
    selectedAsset.totalSupply === "0"
      ? 0
      : parseFloat(
          // Use Max.min() to cap util at 100%
          Math.min(
            (selectedAsset.totalBorrow / selectedAsset.totalSupply) * 100,
            100
          ).toFixed(0)
        );

  const { data } = useQuery(selectedAsset.cToken + " curves", async () => {
    const interestRateModel = await fuse.getInterestRateModel(
      selectedAsset.cToken
    );

    if (interestRateModel === null) {
      return { borrowerRates: null, supplierRates: null };
    }

    return convertIRMtoCurve(interestRateModel, fuse);
  });

  const isMobile = useIsMobile();
  const borrowLineColor = useColorModeValue("#2D3748", "#fff");
  const bgColor = useColorModeValue("gray.50", "mktgray.700");
  const textColor = useColorModeValue("#2f2f2f", "white");

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      width="100%"
      height="100%"
    >
      <Row
        mainAxisAlignment="space-between"
        crossAxisAlignment="center"
        height="60px"
        width="100%"
        px={4}
        flexShrink={0}
      >
        <Heading size="sm" py={3}>
          {`Pool ${poolId}'s ${
            selectedTokenData?.symbol ?? selectedAsset.underlyingSymbol
          } Stats`}
        </Heading>

        <Select
          bgColor={bgColor}
          textColor={textColor}
          borderRadius="7px"
          fontWeight="bold"
          width="130px"
          _focus={{ outline: "none" }}
          color={selectedTokenData?.color ?? "#FFF"}
          onChange={(event) =>
            setSelectedAsset(
              assets.find((asset) => asset.cToken === event.target.value)!
            )
          }
          value={selectedAsset.cToken}
        >
          {assets.map((asset) => (
            <AssetOption asset={asset} key={asset.cToken} />
          ))}
        </Select>
      </Row>

      <ModalDivider bg={useColorModeValue("gray.200", "gray.700")} />

      <Box
        height="200px"
        width="100%"
        color="#000000"
        overflow="hidden"
        px={3}
        className="hide-bottom-tooltip"
        flexShrink={0}
      >
        {data ? (
          data.supplierRates === null ? (
            <Center expand color="#FFFFFF">
              <Text>
                No graph is available for this asset's interest curves.
              </Text>
            </Center>
          ) : (
            <Chart
              options={
                {
                  ...FuseUtilizationChartOptions,
                  annotations: {
                    points: [
                      {
                        x: selectedAssetUtilization,
                        y: data.borrowerRates[selectedAssetUtilization].y,
                        marker: {
                          size: 6,
                          fillColor: "#FFF",
                          strokeColor: "#DDDCDC",
                        },
                      },
                      {
                        x: selectedAssetUtilization,
                        y: data.supplierRates[selectedAssetUtilization].y,
                        marker: {
                          size: 6,
                          fillColor: selectedTokenData?.color ?? "#A6A6A6",
                          strokeColor: "#FFF",
                        },
                      },
                    ],
                    xaxis: [
                      {
                        x: selectedAssetUtilization,
                        label: {
                          text: "Current Utilization",
                          orientation: "horizontal",
                          style: {
                            background: "#121212",
                            color: "#FFF",
                          },
                        },
                      },
                    ],
                  },

                  colors: [
                    borrowLineColor,
                    selectedTokenData?.color ?? "#A6A6A6",
                  ],
                } as any
              }
              type="line"
              width="100%"
              height="100%"
              series={[
                {
                  name: "Borrow Rate",
                  data: data.borrowerRates,
                },
                {
                  name: "Deposit Rate",
                  data: data.supplierRates,
                },
              ]}
            />
          )
        ) : (
          <Center expand color="#FFFFFF">
            <Spinner />
          </Center>
        )}
      </Box>

      <ModalDivider bg={useColorModeValue("gray.200", "gray.700")} />

      <Row
        mainAxisAlignment="space-around"
        crossAxisAlignment="center"
        height="100%"
        width="100%"
        pt={4}
        px={4}
        pb={2}
      >
        <CaptionedStat
          stat={(selectedAsset.collateralFactor / 1e16).toFixed(0) + "%"}
          statSize="lg"
          captionSize="xs"
          caption={"Collateral Factor"}
          crossAxisAlignment="center"
          captionFirst={true}
        />

        <CaptionedStat
          stat={(selectedAsset.reserveFactor / 1e16).toFixed(0) + "%"}
          statSize="lg"
          captionSize="xs"
          caption={"Reserve Factor"}
          crossAxisAlignment="center"
          captionFirst={true}
        />
      </Row>

      <ModalDivider bg={useColorModeValue("gray.200", "gray.700")} />

      <Row
        mainAxisAlignment="space-around"
        crossAxisAlignment="center"
        height="100%"
        width="100%"
        p={4}
        mt={3}
      >
        <CaptionedStat
          stat={shortUsdFormatter(selectedAsset.totalSupplyUSD)}
          statSize="lg"
          captionSize="xs"
          caption={"Total Supplied"}
          crossAxisAlignment="center"
          captionFirst={true}
        />

        {isMobile ? null : (
          <CaptionedStat
            stat={
              selectedAsset.totalSupplyUSD.toString() === "0"
                ? "0%"
                : (
                    (selectedAsset.totalBorrowUSD /
                      selectedAsset.totalSupplyUSD) *
                    100
                  ).toFixed(0) + "%"
            }
            statSize="lg"
            captionSize="xs"
            caption={"Utilization"}
            crossAxisAlignment="center"
            captionFirst={true}
          />
        )}

        <CaptionedStat
          stat={shortUsdFormatter(selectedAsset.totalBorrowUSD)}
          statSize="lg"
          captionSize="xs"
          caption={"Total Borrowed"}
          crossAxisAlignment="center"
          captionFirst={true}
        />
      </Row>
    </Column>
  );
};

export const convertIRMtoCurve = (interestRateModel: any, fuse: Fuse) => {
  let borrowerRates = [];
  let supplierRates = [];
  const blocksPerMin = Fuse.BLOCKS_PER_MIN;
  for (var i = 0; i <= 100; i++) {
    const supplyLevel =
      (Math.pow(
        (interestRateModel.getSupplyRate(
          fuse.web3.utils.toBN((i * 1e16).toString())
        ) /
          1e18) *
          (blocksPerMin * 60 * 24) +
          1,
        365
      ) -
        1) *
      100;

    const borrowLevel =
      (Math.pow(
        (interestRateModel.getBorrowRate(
          fuse.web3.utils.toBN((i * 1e16).toString())
        ) /
          1e18) *
          (blocksPerMin * 60 * 24) +
          1,
        365
      ) -
        1) *
      100;

    supplierRates.push({ x: i, y: supplyLevel });
    borrowerRates.push({ x: i, y: borrowLevel });
  }

  return { borrowerRates, supplierRates };
};
