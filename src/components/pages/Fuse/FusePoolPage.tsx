import { ArrowBackIcon, QuestionIcon } from "@chakra-ui/icons";
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
  Switch,
  Text,
  useDisclosure,
  useToast,
  Skeleton,
  StatLabelProps,
  StatNumberProps,
  StatProps,
  useColorModeValue,
  Tooltip,
  Link as ChakraLink,
  Button,
  Table,
  Tr,
  Tbody,
  Td,
  Thead,
  TableCaption,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { ModalDivider } from "components/shared/Modal";
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
import PageTransitionLayout from "components/shared/PageTransitionLayout";
import { SimpleTooltip } from "components/shared/SimpleTooltip";

const StatLabel = (props: StatLabelProps) => (
  <ChakraStatLabel
    fontWeight="medium"
    fontFamily="Manrope"
    isTruncated
    color={useColorModeValue("gray.500", "gray.400")}
    {...props}
  />
);

const StatNumber = (props: StatNumberProps) => (
  <ChakraStatNumber
    fontSize={["3xl", "3xl", "2xl", "3xl"]}
    fontWeight="medium"
    fontFamily="Manrope"
    color={useColorModeValue("gray.900", "gray.200")}
    {...props}
  />
);

const Stat = (props: StatProps) => (
  <ChakraStat
    px={{ base: 4, sm: 6 }}
    py="5"
    bg={useColorModeValue("white", "#21262e")}
    fontFamily="Manrope"
    shadow="base"
    rounded="lg"
    {...props}
  />
);

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID ?? "1");
const scanner =
  chainId === 1
    ? "https://etherscan.io/token"
    : "https://polygonscan.com/token";

const FusePoolPage = memo(() => {
  const isMobile = useIsSemiSmallScreen();
  const { poolId } = useParams();
  const data = useFusePoolData(poolId);
  const bgColor = useColorModeValue("white", "gray.900");

  return (
    <PageTransitionLayout>
      <Flex
        w="100vw"
        minH="100vh"
        flexDir="column"
        alignItems="flex-start"
        bgColor={bgColor}
        justifyContent="flex-start"
      >
        <FuseNavbar />
        <Divider />
        <HStack
          width={"90%"}
          my={8}
          mx="auto"
          maxW={{ lg: "1200px" }}
          spacing={6}
        >
          <Link to="/">
            <ArrowBackIcon fontSize="2xl" fontWeight="extrabold" />
          </Link>

          {data ? (
            <Heading textAlign="left" fontSize="xl" fontWeight="bold">
              {data.name}
            </Heading>
          ) : (
            <Skeleton>hello</Skeleton>
          )}
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
          bg={bgColor}
          py="4"
          width={{ base: "90%", xl: "100%" }}
          alignSelf={"center"}
        >
          <Box maxW="1200px" mx="auto">
            <Heading marginBottom={"4"} fontWeight="semibold" fontSize={"2xl"}>
              Pool Statistics
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing="3">
              <Stat>
                <StatLabel>{"Total Supply"}</StatLabel>
                <StatNumber>
                  {data ? (
                    midUsdFormatter(data.totalSuppliedUSD)
                  ) : (
                    <Skeleton mt="2">Num</Skeleton>
                  )}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>{"Total Borrow"}</StatLabel>
                <StatNumber>
                  {data ? (
                    midUsdFormatter(data?.totalBorrowedUSD)
                  ) : (
                    <Skeleton mt="2">Num</Skeleton>
                  )}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>{"Liquidity"}</StatLabel>
                <StatNumber>
                  {data ? (
                    midUsdFormatter(data?.totalLiquidityUSD)
                  ) : (
                    <Skeleton mt="2">Num</Skeleton>
                  )}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>{"Pool Utilization"}</StatLabel>
                <StatNumber>
                  {data ? (
                    data.totalSuppliedUSD.toString() === "0" ? (
                      "0%"
                    ) : (
                      (
                        (data?.totalBorrowedUSD / data?.totalSuppliedUSD) *
                        100
                      ).toFixed(2) + "%"
                    )
                  ) : (
                    <Skeleton mt="2">Num</Skeleton>
                  )}
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
          width={isMobile ? "100%" : "90%"}
          mainAxisAlignment="flex-start"
          crossAxisAlignment={isMobile ? "center" : "flex-start"}
          maxW={{ lg: "1200px" }}
          bgColor={bgColor}
          mx="auto"
          mt={4}
          isRow={!isMobile}
        >
          <PoolDashboardBox pb={2} width={isMobile ? "90%" : "50%"}>
            {data ? (
              <SupplyList
                assets={data.assets}
                comptrollerAddress={data.comptroller}
                supplyBalanceUSD={data.totalSupplyBalanceUSD}
              />
            ) : (
              <TableSkeleton tableHeading="Your Supply Balance" />
            )}
          </PoolDashboardBox>

          <PoolDashboardBox
            ml={isMobile ? 0 : 4}
            mt={isMobile ? 4 : 0}
            pb={2}
            width={isMobile ? "90%" : "50%"}
          >
            {data ? (
              <BorrowList
                comptrollerAddress={data.comptroller}
                assets={data.assets}
                borrowBalanceUSD={data.totalBorrowBalanceUSD}
              />
            ) : (
              <TableSkeleton tableHeading="Your Borrow Balance" />
            )}
          </PoolDashboardBox>
        </RowOrColumn>
        <PoolInfoBox data={data} />
        <Box h={"20"}></Box>
      </Flex>
    </PageTransitionLayout>
  );
});

export default FusePoolPage;

export const PoolDashboardBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      backgroundColor={useColorModeValue("white", "#21262e")}
      borderRadius="10px"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      boxShadow={useColorModeValue(
        "0px 21px 44px rgba(71, 29, 97, 0.105141)",
        "0px 2px 44px rgb(71 29 97 / 29%)"
      )}
      _hover={{
        boxShadow: useColorModeValue(
          "0px 3px 29px rgb(71 0 97 / 21%)",
          "0px 5px 44px rgb(242 21 139 / 19%)"
        ),
      }}
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
    <PoolDashboardBox
      width={{ base: "90%", md: "95%", lg: "100%" }}
      maxW={{ lg: "1200px" }}
      height="65px"
      mt={4}
      p={4}
      mx="auto"
    >
      <Row mainAxisAlignment="flex-start" crossAxisAlignment="center" expand>
        <Tooltip
          label={"Keep this bar from filling up to avoid being liquidated!"}
        >
          <Text flexShrink={0} mr={4}>
            Borrow Limit
          </Text>
        </Tooltip>

        <Tooltip label={"This is how much you have borrowed."}>
          <Text flexShrink={0} mt="2px" mr={3} fontSize="10px">
            {smallUsdFormatter(borrowUSD)}
          </Text>
        </Tooltip>

        <Tooltip
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
        </Tooltip>

        <Tooltip
          label={t(
            "If your borrow amount reaches this value, you will be liquidated."
          )}
        >
          <Text flexShrink={0} mt="2px" ml={3} fontSize="10px">
            {smallUsdFormatter(maxBorrow)}
          </Text>
        </Tooltip>
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
  const suppliedAssets = assets.filter((asset) => asset.supplyBalanceUSD > 1);
  const nonSuppliedAssets = assets.filter(
    (asset) => asset.supplyBalanceUSD < 1 && !asset.isSupplyPaused
  );

  const isMobile = useIsMobile();

  return (
    <Table variant={"unstyled"} size={"sm"}>
      <TableCaption mt="0" placement="top" textAlign={"left"} fontSize={{ base: "3.8vw", sm: "lg" }}>
        Your Supply Balance: {smallUsdFormatter(supplyBalanceUSD)}
      </TableCaption>
      <Thead>
        {assets.length > 0 ? (
          <Tr>
            <Td
              colSpan={isMobile ? 1 : 3}
              fontWeight={"bold"}
              fontSize={{ base: "2.9vw", sm: "0.9rem" }}
              maxW={isMobile ? "100px" : "250px"}
            >
              Asset
            </Td>

            {isMobile ? null : (
              <Td
                fontWeight={"bold"}
                fontSize={{ base: "2.9vw", sm: "0.9rem" }}
                textAlign={"right"}
              >
                APY
              </Td>
            )}

            <Td
              isNumeric
              fontWeight={"bold"}
              textAlign={"right"}
              fontSize={{ base: "2.9vw", sm: "0.9rem" }}
            >
              Balance
            </Td>

            <Td
              maxW={isMobile ? "80px" : "140px"}
              fontWeight={"bold"}
              textAlign="center"
              fontSize={{ base: "2.9vw", sm: "0.9rem" }}
            >
              Collateral
            </Td>
          </Tr>
        ) : null}
      </Thead>
      <Tbody>
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
            There are no assets in this pool.
          </Center>
        )}
      </Tbody>
    </Table>
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

  const textColor = useColorModeValue("#2f2f2f", "#f2f2f2");

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
      <Tr
        onClick={authedOpenModal}
        cursor={"pointer"}
        height={"70px"}
        _hover={{ bgColor: useColorModeValue("gray.100", "gray.900") }}
      >
        <Td maxW={isMobile ? "100px" : "140px"}>
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            // width={isMobile ? "8%" : "6%"}
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
              mainAxisAlignment={"space-between"}
              crossAxisAlignment={"flex-start"}
            >
              <Text
                fontWeight="bold"
                textAlign={"left"}
                fontSize={{ base: "2.8vw", sm: "0.9rem" }}
                mx={2}
              >
                {tokenData?.symbol ?? asset.underlyingSymbol}
              </Text>
              <SimpleTooltip
                label={t(
                  "The Loan to Value (LTV) ratio defines the maximum amount of tokens in the pool that can be borrowed with a specific collateral. It’s expressed in percentage: if in a pool ETH has 75% LTV, for every 1 ETH worth of collateral, borrowers will be able to borrow 0.75 ETH worth of other tokens in the pool."
                )}
              >
                <Text
                  textAlign={"right"}
                  mx={2}
                  color={useColorModeValue("gray.800", "gray.400")}
                  fontSize={{ base: "2.8vw", sm: "0.8rem" }}
                >
                  {asset.collateralFactor / 1e16}% LTV
                </Text>
              </SimpleTooltip>
            </Column>
          </Row>
        </Td>

        {isMobile ? null : tokenData?.symbol !== undefined ? (
          <Td maxW={"30px"}>
            {asset.underlyingSymbol.toLowerCase() !==
            tokenData?.symbol?.toLowerCase() ? (
              <SimpleTooltip placement="auto" label={asset.underlyingSymbol}>
                <QuestionIcon />
              </SimpleTooltip>
            ) : (
              ""
            )}
          </Td>
        ) : null}

        {isMobile ? null : (
          <Td maxW={"30px"}>
            <SimpleTooltip
              placement="top-start"
              label={
                tokenData?.extraData?.partnerURL ??
                `${scanner}/${asset.underlyingToken}`
              }
            >
              <Button
                variant={"link"}
                as={ChakraLink}
                href={
                  tokenData?.extraData?.partnerURL ??
                  `${scanner}/${asset.underlyingToken}`
                }
                isExternal
              >
                <LinkIcon h={{ base: 3, sm: 6 }} />
              </Button>
            </SimpleTooltip>
          </Td>
        )}

        {isMobile ? null : (
          <Td isNumeric textAlign={"right"} minW={"140px"}>
            {tokenData?.extraData?.hasAPY ? (
              <Row crossAxisAlignment="center" mainAxisAlignment="flex-end">
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "3.2vw", sm: "0.9rem" }}
                  mr={1}
                >
                  +
                </Text>
                <AvatarGroup size="xs" max={30} ml={2} mr={1} spacing={1}>
                  {/* <SimpleTooltip label={displayedSupplyAPRLabel}> */}
                  <CTokenIcon
                    address={asset.underlyingToken}
                    boxSize="22px"
                    _hover={{
                      zIndex: 9,
                    }}
                  />
                  {/* </SimpleTooltip> */}
                </AvatarGroup>
                <Column
                  crossAxisAlignment="flex-end"
                  mainAxisAlignment="center"
                >
                  <Text
                    color={tokenData?.color ?? "#FF"}
                    fontWeight="bold"
                    fontSize={{ base: "2.8vw", sm: "md" }}
                  >
                    {isStakedOHM
                      ? stakedOHMApyData
                        ? (stakedOHMApyData.supplyApy * 100).toFixed(3)
                        : "?"
                      : supplyAPY.toFixed(2)}
                    %
                  </Text>
                  <SimpleTooltip
                    label={`The APY accrued by this auto-compounding asset and the value of each token grows in price. This is not controlled by Market!`}
                  >
                    <Text mt={1} fontSize={{ base: "2.8vw", sm: "0.8rem" }}>
                      {(tokenData?.extraData.apy * 100).toFixed(1)}% APY
                    </Text>
                  </SimpleTooltip>
                </Column>
              </Row>
            ) : (
              <SimpleTooltip
                label={
                  "The Supply APY is the forecasted APY you earn by supplying this asset based on the current utilisation ratios of this pool!"
                }
              >
                <Text
                  color={tokenData?.color ?? "#FF"}
                  fontWeight="bold"
                  fontSize={{ base: "2.8vw", sm: "1.1rem" }}
                >
                  {isStakedOHM
                    ? stakedOHMApyData
                      ? (stakedOHMApyData.supplyApy * 100).toFixed(3)
                      : "?"
                    : supplyAPY.toFixed(2)}
                  %
                </Text>
              </SimpleTooltip>
            )}
          </Td>
        )}

        <Td minW={isMobile ? "20px" : "110px"} isNumeric textAlign={"right"}>
          <Column mainAxisAlignment="center" crossAxisAlignment="flex-end">
            <Text
              color={tokenData?.color ?? textColor}
              fontWeight="bold"
              fontSize={{ base: "2.8vw", sm: "md" }}
            >
              {smallUsdFormatter(asset.supplyBalanceUSD)}
            </Text>
            <Text mt={1} fontSize={{ base: "2.8vw", sm: "0.8rem" }}>
              {smallUsdFormatter(
                asset.supplyBalance / 10 ** asset.underlyingDecimals
              ).replace("$", "")}{" "}
              {tokenData?.extraData?.shortName ??
                tokenData?.symbol ??
                asset.underlyingSymbol}
            </Text>
          </Column>
        </Td>

        <Td>
          <Row mainAxisAlignment={"center"} crossAxisAlignment="center">
            <SwitchCSS
              symbol={asset.underlyingSymbol}
              color={tokenData?.color}
            />
            <Switch
              isChecked={asset.membership}
              className={asset.underlyingSymbol + "-switch"}
              onChange={onToggleCollateral}
              size={isMobile ? "sm" : "md"}
            />
          </Row>
        </Td>
      </Tr>
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
  const borrowedAssets = assets.filter((asset) => asset.borrowBalanceUSD > 1);
  const nonBorrowedAssets = assets.filter(
    (asset) => asset.borrowBalanceUSD < 1
  );

  const isMobile = useIsMobile();

  return (
    <Table variant={"unstyled"} size={"sm"}>
      <TableCaption mt="0" placement="top" textAlign={"left"} fontSize={{ base: "3.8vw", sm: "lg" }}>
        Your Supply Balance: {smallUsdFormatter(borrowBalanceUSD)}
      </TableCaption>
      <Thead>
        {assets.length > 0 ? (
          <Tr>
            <Td
              colSpan={isMobile ? 1 : 2}
              fontSize={{ base: "2.9vw", sm: "0.9rem" }}
              fontWeight={"bold"}
            >
              Asset
            </Td>

            {isMobile ? null : (
              <Td
                fontSize={{ base: "2.9vw", sm: "0.9rem" }}
                fontWeight={"bold"}
                isNumeric
                textAlign={"right"}
              >
                APR/TVL
              </Td>
            )}

            <Td
              fontSize={{ base: "2.9vw", sm: "0.9rem" }}
              fontWeight={"bold"}
              isNumeric
              textAlign={"right"}
            >
              Balance
            </Td>

            <Td
              fontSize={{ base: "2.9vw", sm: "0.9rem" }}
              fontWeight={"bold"}
              isNumeric
              textAlign={"right"}
            >
              Liquidity
            </Td>
          </Tr>
        ) : null}
      </Thead>
      <Tbody>
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
            There are no assets in this pool.
          </Center>
        )}
      </Tbody>
    </Table>
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

  const textColor = useColorModeValue("#2f2f2f", "#f2f2f2");

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

      <Tr
        onClick={authedOpenModal}
        height={"70px"}
        cursor={"pointer"}
        _hover={{ bgColor: useColorModeValue("gray.100", "gray.900") }}
      >
        <Td maxW={isMobile ? "100px" : "140px"}>
          <Row
            mainAxisAlignment="flex-start"
            crossAxisAlignment="center"
            width={isMobile ? "8%" : "6%"}
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
            <Text
              fontWeight="bold"
              fontSize={{ base: "2.8vw", sm: "0.9rem" }}
              mx={2}
            >
              {tokenData?.symbol ?? asset.underlyingSymbol}
            </Text>
          </Row>
        </Td>

        {isMobile ? null : tokenData?.symbol !== undefined ? (
          asset.underlyingSymbol.toLowerCase() !==
          tokenData?.symbol?.toLowerCase() ? (
            <Td maxW={"30px"}>
              <SimpleTooltip
                placement="auto"
                label={asset?.underlyingSymbol ?? ""}
              >
                <QuestionIcon />
              </SimpleTooltip>
            </Td>
          ) : (
            <Box></Box>
          )
        ) : null}

        {isMobile ? null : (
          <Td isNumeric>
            <Column
              mainAxisAlignment="flex-start"
              crossAxisAlignment="flex-end"
            >
              <Text
                color={tokenData?.color ?? "#FF"}
                fontSize={{ base: "2.8vw", sm: "md" }}
                fontWeight={"bold"}
              >
                {borrowAPR.toFixed(3)}%
              </Text>

              <SimpleTooltip
                label={t(
                  "Total Value Lent (TVL) measures how much of this asset has been supplied in total. TVL does not account for how much of the lent assets have been borrowed, use 'liquidity' to determine the total unborrowed assets lent."
                )}
              >
                <Text
                mt={1}
                  wordBreak={"keep-all"}
                  fontSize={{ base: "2.8vw", sm: "0.8rem" }}
                >
                  {shortUsdFormatter(asset.totalSupplyUSD)} TVL
                </Text>
              </SimpleTooltip>
            </Column>
          </Td>
        )}

        <Td isNumeric>
          <Column mainAxisAlignment="flex-start" crossAxisAlignment="flex-end">
            <Text
              color={tokenData?.color ?? textColor}
              fontWeight={"bold"}
              fontSize={{ base: "2.8vw", sm: "md" }}
            >
              {smallUsdFormatter(asset.borrowBalanceUSD)}
            </Text>

            <Text mt={1} fontSize={{ base: "2.8vw", sm: "0.8rem" }}>
              {smallUsdFormatter(
                asset.borrowBalance / 10 ** asset.underlyingDecimals
              ).replace("$", "")}{" "}
              {tokenData?.symbol ?? asset.underlyingSymbol}
            </Text>
          </Column>
        </Td>

        <Td>
          <SimpleTooltip
            label={t(
              "Liquidity is the amount of this asset that is available to borrow (unborrowed). To see how much has been supplied and borrowed in total, navigate to the Pool Info tab."
            )}
            placement="top-end"
          >
            <Box>
              <Column
                mainAxisAlignment="flex-start"
                crossAxisAlignment="flex-end"
              >
                <Text
                  color={tokenData?.color ?? textColor}
                  fontWeight={"bold"}
                  fontSize={{ base: "2.8vw", sm: "md" }}
                >
                  {shortUsdFormatter(asset.liquidityUSD)}
                </Text>

                <Text mt={1} fontSize={{ base: "2.8vw", sm: "0.8rem" }}>
                  {shortUsdFormatter(
                    asset.liquidity / 10 ** asset.underlyingDecimals
                  ).replace("$", "")}{" "}
                  {tokenData?.symbol}
                </Text>
              </Column>
            </Box>
          </SimpleTooltip>
        </Td>
        {/* </Row> */}
      </Tr>
    </>
  );
};

const TableSkeleton = ({ tableHeading }: any) => (
  <Column
    mainAxisAlignment="flex-start"
    crossAxisAlignment="flex-start"
    height="100%"
    pb={1}
  >
    <Heading size="md" px={4} py={3}>
      {tableHeading}: <Skeleton display="inline">Loading</Skeleton>
    </Heading>

    <Divider color="#F4F6F9" />

    <Skeleton w="100%" h="40" />
  </Column>
);
