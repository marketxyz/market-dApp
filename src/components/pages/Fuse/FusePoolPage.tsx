import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Stat as ChakraStat,
  StatLabel as ChakraStatLabel,
  StatNumber as ChakraStatNumber,
  Avatar,
  AvatarGroup,
  Box,
  BoxProps,
  SimpleGrid,
  Divider,
  Flex,
  Heading,
  HStack,
  Progress,
  Spinner,
  Switch,
  Text,
  useDisclosure,
  useToast,
  VStack,
  StatLabelProps,
  StatNumberProps,
  StatProps,
} from "@chakra-ui/react";
import Footer from "components/shared/Footer";
import { ModalDivider } from "components/shared/Modal";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { SwitchCSS } from "components/shared/SwitchCSS";
import { useRari } from "context/RariContext";
import { useAuthedCallback } from "hooks/useAuthedCallback";
import { useBorrowLimit } from "hooks/useBorrowLimit";
import { useFusePoolData } from "hooks/useFusePoolData";
import { useIsSemiSmallScreen } from "hooks/useIsSemiSmallScreen";
import { useTokenData } from "hooks/useTokenData";
import LogRocket from "logrocket";
import { memo, useEffect } from "react";
// Hooks
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
// Utils
import { convertMantissaToAPR, convertMantissaToAPY } from "utils/apyUtils";
import {
  midUsdFormatter,
  shortUsdFormatter,
  smallUsdFormatter,
} from "utils/bigUtils";
import {
  Center,
  Column,
  Row,
  RowOrColumn,
  useIsMobile,
} from "utils/chakraUtils";
import { createComptroller } from "utils/createComptroller";
import { USDPricedFuseAsset } from "utils/fetchFusePoolData";
import CTokenIcon from "./CTokenIcon";
import FuseNavbar from "./FuseNavbar";
import { PoolInfoBox } from "./FusePoolInfoPage";
// import FuseStatsBar from "./FuseStatsBar";
import PoolModal, { Mode } from "./Modals/PoolModal";

import { Link } from "react-router-dom";

const StatLabel = (props: StatLabelProps) => (
  <ChakraStatLabel
    fontWeight="medium"
    isTruncated
    color={"gray.500"}
    {...props}
  />
);

const StatNumber = (props: StatNumberProps) => (
  <ChakraStatNumber
    fontSize={["3xl", "3xl", "2xl", "3xl"]}
    fontWeight="medium"
    color={"gray.900"}
    {...props}
  />
);

const Stat = (props: StatProps) => (
  <ChakraStat
    px={{ base: 4, sm: 6 }}
    py="5"
    bg={"white"}
    shadow="base"
    rounded="lg"
    {...props}
  />
);

const FusePoolPage = memo(() => {
  const isMobile = useIsSemiSmallScreen();
  const { poolId } = useParams();
  const data = useFusePoolData(poolId);

  return (
    <>
      <Flex
        w="100vw"
        minH="100vh"
        flexDir="column"
        alignItems="flex-start"
        bgColor="white"
        justifyContent="flex-start"
      >
        <VStack overflowY="hidden" position="relative" w="100%">
          {/* <chakra.div
            bgColor="#ff00b3"
            h="400px"
            w="800px"
            filter="blur(350px)"
            position="absolute"
            top="100%"
            left="50%"
            bottom="0"
            transform="translate(-50%, -50%)"
          />
          <chakra.img
            src="/static/fuse/header-artifact-bottom-left.svg"
            position="absolute"
            bottom={{ base: "15%", lg: "-30%" }}
            transform={{ base: "scale(0.50) rotate(-5deg)", lg: "initial" }}
            left={{ base: "-30%", lg: "17%" }}
          />
          <chakra.img
            src="/static/fuse/header-artifact-left.svg"
            position="absolute"
            bottom={{ base: "calc(20% - 16px)", lg: "-12px" }}
            left={{ base: "-15%", lg: "12%" }}
          />
          <chakra.img
            src="/static/fuse/header-bitcoin.svg"
            position="absolute"
            top="25%"
            left={{ base: "-10%", lg: "12%" }}
          />
          <chakra.img
            src="/static/fuse/Icon5.svg"
            position="absolute"
            bottom={{ base: "20%", lg: "-25%" }}
            right={{ base: "-30%", lg: "10%" }}
            transform={{
              base: "scale(0.7) rotate(15deg)",
              lg: "rotate(15deg)",
            }}
          />
          <chakra.img
            src="/static/fuse/header-eth.svg"
            position="absolute"
            top={{ base: "15%" }}
            right={{ base: "0", lg: "10%" }}
          />
          <chakra.img
            src="/static/fuse/Icon2.svg"
            position="absolute"
            bottom="30%"
            right="10%"
            transform="rotate(15deg)"
          />
          <chakra.img
            src="/static/fuse/Icon6.png"
            position="absolute"
            bottom="-15%"
            right="10%"
            transform="rotate(15deg)"
          /> */}
          <FuseNavbar />
          {/* <FuseStatsBar /> */}
        </VStack>
        <Divider />
        <HStack
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          width="100%"
          my={8}
          mx="auto"
          maxW={{ lg: "1200px" }}
          spacing={6}
        >
          <Link to="/">
            <ArrowBackIcon fontSize="2xl" fontWeight="extrabold" />
          </Link>
          <Text
            lineHeight={1}
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
          >
            {data?.name}
          </Text>
          {data?.assets && data?.assets?.length > 0 ? (
            <>
              <AvatarGroup size="sm" max={30}>
                {data?.assets.map(
                  ({
                    underlyingToken,
                    cToken,
                  }: {
                    underlyingToken: string;
                    cToken: string;
                  }) => {
                    return (
                      <CTokenIcon key={cToken} address={underlyingToken} />
                    );
                  }
                )}
              </AvatarGroup>
            </>
          ) : null}
        </HStack>
        <Box
          as="section"
          bg={"gray.50"}
          px="10"
          py="4"
          pb="8"
          width={"100%"}
          display={{ sm: "none", md: "block" }}
        >
          <Box maxW="7xl" mx="auto" px={{ base: "6", md: "8" }}>
            <Text marginBottom={"2"} fontWeight="semibold" fontSize={"2xl"}>
              Pool Statistics
            </Text>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing="3">
              <Stat>
                <StatLabel>{"Total Supply"}</StatLabel>
                <StatNumber>
                  {midUsdFormatter(data?.totalSuppliedUSD)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>{"Total Borrow"}</StatLabel>
                <StatNumber>
                  {midUsdFormatter(data?.totalBorrowedUSD)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>{"Liquidity"}</StatLabel>
                <StatNumber>
                  {midUsdFormatter(data?.totalLiquidityUSD)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>{"Pool Utilization"}</StatLabel>
                <StatNumber>
                  {data?.totalSuppliedUSD.toString() === "0"
                    ? "0%"
                    : (
                        (data?.totalBorrowedUSD / data?.totalSuppliedUSD) *
                        100
                      ).toFixed(2) + "%"}
                </StatNumber>
              </Stat>
              {/* {[{label: ""}].map(({ label, value }) => (
          <Stat key={label}>
            <StatLabel>{label}</StatLabel>
            <StatNumber>{value}</StatNumber>
          </Stat>
        ))} */}
            </SimpleGrid>
          </Box>
        </Box>
        {
          /* If they have some asset enabled as collateral, show the collateral ratio bar */
          data && data.assets.some((asset) => asset.membership) ? (
            <CollateralRatioBar
              assets={data.assets}
              borrowUSD={data.totalBorrowBalanceUSD}
            />
          ) : null
        }
        <RowOrColumn
          width="100%"
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          maxW={{ lg: "1200px" }}
          bgColor="white"
          textColor="black"
          px={{ base: 6, lg: 0 }}
          mx="auto"
          mt={4}
          isRow={!isMobile}
        >
          <PoolDashboardBox width={isMobile ? "100%" : "50%"}>
            {data ? (
              <SupplyList
                assets={data.assets}
                comptrollerAddress={data.comptroller}
                supplyBalanceUSD={data.totalSupplyBalanceUSD}
              />
            ) : (
              <Center height="200px">
                <Spinner />
              </Center>
            )}
          </PoolDashboardBox>

          <PoolDashboardBox
            ml={isMobile ? 0 : 4}
            mt={isMobile ? 4 : 0}
            width={isMobile ? "100%" : "50%"}
          >
            {data ? (
              <BorrowList
                comptrollerAddress={data.comptroller}
                assets={data.assets}
                borrowBalanceUSD={data.totalBorrowBalanceUSD}
              />
            ) : (
              <Center height="200px">
                <Spinner />
              </Center>
            )}
          </PoolDashboardBox>
        </RowOrColumn>
        <PoolInfoBox data={data} />
        <Footer />
      </Flex>
    </>
  );
});

export default FusePoolPage;

export const PoolDashboardBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      backgroundColor="white"
      borderRadius="10px"
      border="1px"
      borderColor="gray.200"
      {...props}
    >
      {children}
    </Box>
  );
};

const CollateralRatioBar = ({
  assets,
  borrowUSD,
}: {
  assets: USDPricedFuseAsset[];
  borrowUSD: number;
}) => {
  const { t } = useTranslation();

  const maxBorrow = useBorrowLimit(assets);

  const ratio = (borrowUSD / maxBorrow) * 100;

  useEffect(() => {
    if (ratio > 95) {
      LogRocket.track("Fuse-AtRiskOfLiquidation");
    }
  }, [ratio]);

  return (
    <PoolDashboardBox width="100%" height="65px" mt={4} p={4}>
      <Row mainAxisAlignment="flex-start" crossAxisAlignment="center" expand>
        <SimpleTooltip
          label={t("Keep this bar from filling up to avoid being liquidated!")}
        >
          <Text flexShrink={0} mr={4}>
            {t("Borrow Limit")}
          </Text>
        </SimpleTooltip>

        <SimpleTooltip label={t("This is how much you have borrowed.")}>
          <Text flexShrink={0} mt="2px" mr={3} fontSize="10px">
            {smallUsdFormatter(borrowUSD)}
          </Text>
        </SimpleTooltip>

        <SimpleTooltip
          label={`You're using ${ratio.toFixed(1)}% of your ${smallUsdFormatter(
            maxBorrow
          )} borrow limit.`}
        >
          <Box width="100%">
            <Progress
              size="xs"
              width="100%"
              colorScheme={
                ratio <= 40
                  ? "whatsapp"
                  : ratio <= 60
                  ? "yellow"
                  : ratio <= 80
                  ? "orange"
                  : "red"
              }
              borderRadius="10px"
              value={ratio}
            />
          </Box>
        </SimpleTooltip>

        <SimpleTooltip
          label={t(
            "If your borrow amount reaches this value, you will be liquidated."
          )}
        >
          <Text flexShrink={0} mt="2px" ml={3} fontSize="10px">
            {smallUsdFormatter(maxBorrow)}
          </Text>
        </SimpleTooltip>
      </Row>
    </PoolDashboardBox>
  );
};

const SupplyList = ({
  assets,
  supplyBalanceUSD,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  supplyBalanceUSD: number;
  comptrollerAddress: string;
}) => {
  const { t } = useTranslation();

  const suppliedAssets = assets.filter((asset) => asset.supplyBalanceUSD > 1);
  const nonSuppliedAssets = assets.filter(
    (asset) => asset.supplyBalanceUSD < 1
  );

  const isMobile = useIsMobile();

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height="100%"
      pb={1}
    >
      <Heading size="md" px={4} py={3}>
        {t("Supply Balance:")} {smallUsdFormatter(supplyBalanceUSD)}
      </Heading>

      <Divider color="#F4F6F9" />

      {assets.length > 0 ? (
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
          px={4}
          mt={4}
        >
          <Text width="27%" fontWeight="bold" pl={1}>
            {t("Asset")}
          </Text>

          {isMobile ? null : (
            <Text width="27%" fontWeight="bold" textAlign="right">
              {t("APY/LTV")}
            </Text>
          )}

          <Text
            width={isMobile ? "40%" : "27%"}
            fontWeight="bold"
            textAlign="right"
          >
            {t("Balance")}
          </Text>

          <Text
            width={isMobile ? "34%" : "20%"}
            fontWeight="bold"
            textAlign="right"
          >
            {t("Collateral")}
          </Text>
        </Row>
      ) : null}

      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        expand
        mt={1}
      >
        {assets.length > 0 ? (
          <>
            {suppliedAssets.map((asset, index) => {
              return (
                <AssetSupplyRow
                  comptrollerAddress={comptrollerAddress}
                  key={asset.underlyingToken}
                  assets={suppliedAssets}
                  index={index}
                />
              );
            })}

            {suppliedAssets.length > 0 ? <ModalDivider my={2} /> : null}

            {nonSuppliedAssets.map((asset, index) => {
              return (
                <AssetSupplyRow
                  comptrollerAddress={comptrollerAddress}
                  key={asset.underlyingToken}
                  assets={nonSuppliedAssets}
                  index={index}
                />
              );
            })}
          </>
        ) : (
          <Center expand my={8}>
            {t("There are no assets in this pool.")}
          </Center>
        )}
      </Column>
    </Column>
  );
};

const AssetSupplyRow = ({
  assets,
  index,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  index: number;
  comptrollerAddress: string;
}) => {
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const authedOpenModal = useAuthedCallback(openModal);

  const asset = assets[index];

  const { fuse, address } = useRari();

  const tokenData = useTokenData(asset.underlyingToken);

  const supplyAPY = convertMantissaToAPY(asset.supplyRatePerBlock, 365);

  const queryClient = useQueryClient();

  const toast = useToast();

  const onToggleCollateral = async () => {
    const comptroller = createComptroller(comptrollerAddress, fuse);

    let call;
    if (asset.membership) {
      call = comptroller.methods.exitMarket(asset.cToken);
    } else {
      call = comptroller.methods.enterMarkets([asset.cToken]);
    }

    let response = await call.call({ from: address });
    // For some reason `response` will be `["0"]` if no error but otherwise it will return a string number.
    if (response[0] !== "0") {
      if (asset.membership) {
        toast({
          title: "Error! Code: " + response,
          description:
            "You cannot disable this asset as collateral as you would not have enough collateral posted to keep your borrow. Try adding more collateral of another type or paying back some of your debt.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error! Code: " + response,
          description:
            "You cannot enable this asset as collateral at this time.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }

      return;
    }

    await call.send({ from: address });

    LogRocket.track("Fuse-ToggleCollateral");

    queryClient.refetchQueries();
  };

  const isStakedOHM =
    asset.underlyingToken.toLowerCase() ===
    "0x04F2694C8fcee23e8Fd0dfEA1d4f5Bb8c352111F".toLowerCase();

  const { data: stakedOHMApyData } = useQuery("sOHM_APY", async () => {
    const data = (
      await fetch("https://api.rari.capital/fuse/pools/18/apy")
    ).json();

    return data as Promise<{ supplyApy: number; supplyWpy: number }>;
  });

  const isMobile = useIsMobile();

  const { t } = useTranslation();

  return (
    <>
      <PoolModal
        defaultMode={Mode.SUPPLY}
        comptrollerAddress={comptrollerAddress}
        assets={assets}
        index={index}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        width="100%"
        px={4}
        py={1.5}
        _hover={{
          bgColor: "gray.200",
        }}
      >
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="27%"
          as="button"
          onClick={authedOpenModal}
        >
          <Avatar
            bg="#FFF"
            boxSize="37px"
            name={asset.underlyingSymbol}
            src={
              tokenData?.logoURL ??
              "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
            }
          />
          <Text fontWeight="bold" fontSize="lg" ml={2} flexShrink={0}>
            {tokenData?.symbol ?? asset.underlyingSymbol}
          </Text>
        </Row>

        {isMobile ? null : (
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-end"
            width="27%"
            as="button"
            onClick={authedOpenModal}
          >
            <Text
              color={tokenData?.color ?? "#FF"}
              fontWeight="bold"
              fontSize="17px"
            >
              {isStakedOHM
                ? stakedOHMApyData
                  ? (stakedOHMApyData.supplyApy * 100).toFixed(3)
                  : "?"
                : supplyAPY.toFixed(3)}
              %
            </Text>

            <SimpleTooltip
              label={t(
                "The Loan to Value (LTV) ratio defines the maximum amount of tokens in the pool that can be borrowed with a specific collateral. It’s expressed in percentage: if in a pool ETH has 75% LTV, for every 1 ETH worth of collateral, borrowers will be able to borrow 0.75 ETH worth of other tokens in the pool."
              )}
            >
              <Text fontSize="sm">{asset.collateralFactor / 1e16}% LTV</Text>
            </SimpleTooltip>
          </Column>
        )}

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-end"
          width={isMobile ? "40%" : "27%"}
          as="button"
          onClick={authedOpenModal}
        >
          <Text
            color={tokenData?.color ?? "#FFF"}
            fontWeight="bold"
            fontSize="17px"
          >
            {smallUsdFormatter(asset.supplyBalanceUSD)}
          </Text>

          <Text fontSize="sm">
            {smallUsdFormatter(
              asset.supplyBalance / 10 ** asset.underlyingDecimals
            ).replace("$", "")}{" "}
            {tokenData?.symbol ?? asset.underlyingSymbol}
          </Text>
        </Column>

        <Row
          width={isMobile ? "34%" : "20%"}
          mainAxisAlignment="flex-end"
          crossAxisAlignment="center"
        >
          <SwitchCSS symbol={asset.underlyingSymbol} color={tokenData?.color} />

          <Switch
            isChecked={asset.membership}
            className={asset.underlyingSymbol + "-switch"}
            onChange={onToggleCollateral}
            size="md"
            mt={1}
            mr={5}
          />
        </Row>
      </Row>
    </>
  );
};

const BorrowList = ({
  assets,
  borrowBalanceUSD,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  borrowBalanceUSD: number;
  comptrollerAddress: string;
}) => {
  const { t } = useTranslation();
  const borrowedAssets = assets.filter((asset) => asset.borrowBalanceUSD > 1);
  const nonBorrowedAssets = assets.filter(
    (asset) => asset.borrowBalanceUSD < 1
  );

  const isMobile = useIsMobile();

  return (
    <Column
      mainAxisAlignment="flex-start"
      crossAxisAlignment="flex-start"
      height="100%"
      pb={1}
    >
      <Heading size="md" px={4} py={3}>
        {t("Borrow Balance:")} {smallUsdFormatter(borrowBalanceUSD)}
      </Heading>

      <Divider color="#F4F6F9" />

      {assets.length > 0 ? (
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-start"
          width="100%"
          px={4}
          mt={4}
        >
          <Text width="27%" fontWeight="bold" pl={1}>
            {t("Asset")}
          </Text>

          {isMobile ? null : (
            <Text width="27%" fontWeight="bold" textAlign="right">
              {t("APR/TVL")}
            </Text>
          )}

          <Text
            fontWeight="bold"
            textAlign="right"
            width={isMobile ? "40%" : "27%"}
          >
            {t("Balance")}
          </Text>

          <Text
            fontWeight="bold"
            textAlign="right"
            width={isMobile ? "34%" : "20%"}
          >
            {t("Liquidity")}
          </Text>
        </Row>
      ) : null}

      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        expand
        mt={1}
      >
        {assets.length > 0 ? (
          <>
            {borrowedAssets.map((asset, index) => {
              // Don't show paused assets.
              if (asset.isPaused) {
                return null;
              }

              return (
                <AssetBorrowRow
                  comptrollerAddress={comptrollerAddress}
                  key={asset.underlyingToken}
                  assets={borrowedAssets}
                  index={index}
                />
              );
            })}

            {borrowedAssets.length > 0 ? <ModalDivider my={2} /> : null}

            {nonBorrowedAssets.map((asset, index) => {
              // Don't show paused assets.
              if (asset.isPaused) {
                return null;
              }

              return (
                <AssetBorrowRow
                  comptrollerAddress={comptrollerAddress}
                  key={asset.underlyingToken}
                  assets={nonBorrowedAssets}
                  index={index}
                />
              );
            })}
          </>
        ) : (
          <Center expand my={8}>
            {t("There are no assets in this pool.")}
          </Center>
        )}
      </Column>
    </Column>
  );
};

const AssetBorrowRow = ({
  assets,
  index,
  comptrollerAddress,
}: {
  assets: USDPricedFuseAsset[];
  index: number;
  comptrollerAddress: string;
}) => {
  const asset = assets[index];

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();

  const authedOpenModal = useAuthedCallback(openModal);

  const tokenData = useTokenData(asset.underlyingToken);

  const borrowAPR = convertMantissaToAPR(asset.borrowRatePerBlock);

  const { t } = useTranslation();

  const isMobile = useIsMobile();

  return (
    <>
      <PoolModal
        comptrollerAddress={comptrollerAddress}
        defaultMode={Mode.BORROW}
        assets={assets}
        index={index}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Row
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        width="100%"
        px={4}
        _hover={{
          bgColor: "gray.200",
        }}
        py={1.5}
        as="button"
        onClick={authedOpenModal}
      >
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          width="27%"
        >
          <Avatar
            bg="#FFF"
            boxSize="37px"
            name={asset.underlyingSymbol}
            src={
              tokenData?.logoURL ??
              "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
            }
          />
          <Text fontWeight="bold" fontSize="lg" ml={2} flexShrink={0}>
            {tokenData?.symbol ?? asset.underlyingSymbol}
          </Text>
        </Row>

        {isMobile ? null : (
          <Column
            mainAxisAlignment="flex-start"
            crossAxisAlignment="flex-end"
            width="27%"
          >
            <Text
              color={tokenData?.color ?? "#FF"}
              fontWeight="bold"
              fontSize="17px"
            >
              {borrowAPR.toFixed(3)}%
            </Text>

            <SimpleTooltip
              label={t(
                "Total Value Lent (TVL) measures how much of this asset has been supplied in total. TVL does not account for how much of the lent assets have been borrowed, use 'liquidity' to determine the total unborrowed assets lent."
              )}
            >
              <Text fontSize="sm">
                {shortUsdFormatter(asset.totalSupplyUSD)} TVL
              </Text>
            </SimpleTooltip>
          </Column>
        )}

        <Column
          mainAxisAlignment="flex-start"
          crossAxisAlignment="flex-end"
          width={isMobile ? "40%" : "27%"}
        >
          <Text
            color={tokenData?.color ?? "#FFF"}
            fontWeight="bold"
            fontSize="17px"
          >
            {smallUsdFormatter(asset.borrowBalanceUSD)}
          </Text>

          <Text fontSize="sm">
            {smallUsdFormatter(
              asset.borrowBalance / 10 ** asset.underlyingDecimals
            ).replace("$", "")}{" "}
            {tokenData?.symbol ?? asset.underlyingSymbol}
          </Text>
        </Column>

        <SimpleTooltip
          label={t(
            "Liquidity is the amount of this asset that is available to borrow (unborrowed). To see how much has been supplied and borrowed in total, navigate to the Pool Info tab."
          )}
          placement="top-end"
        >
          <Box width={isMobile ? "34%" : "20%"}>
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-end"
            >
              <Text
                color={tokenData?.color ?? "#FFF"}
                fontWeight="bold"
                fontSize="17px"
              >
                {shortUsdFormatter(asset.liquidityUSD)}
              </Text>

              <Text fontSize="sm">
                {shortUsdFormatter(
                  asset.liquidity / 10 ** asset.underlyingDecimals
                ).replace("$", "")}{" "}
                {tokenData?.symbol}
              </Text>
            </Column>
          </Box>
        </SimpleTooltip>
      </Row>
    </>
  );
};
