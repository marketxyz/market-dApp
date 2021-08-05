import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowRightIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {
  AvatarGroup,
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Avatar from "boring-avatars";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { useRari } from "context/RariContext";
import { MergedPool, useFusePools } from "hooks/fuse/useFusePools";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { letterScore, usePoolRSS } from "hooks/useRSS";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import { ModalDivider } from "../../shared/Modal";
import CTokenIcon from "./CTokenIcon";
import { FuseDashNav } from "./FuseDashNav";
import FusePageLayout from "./FusePageLayout";
import FuseStatsBar from "./FuseStatsBar";
import { useFilter } from "./FuseTabBar";
import { useMemo } from "react";
import { smallUsdFormatter } from "utils/bigUtils";
import { usePoolAPY, usePoolsAPY } from "hooks/usePoolAPY";
import { Pool } from "utils/poolUtils";

const FusePoolsPage = memo(() => {
  const { isAuthed } = useRari();
  const isMobile = useIsSmallScreen();

  return (
    <FusePageLayout>
      <FuseStatsBar />
      <FuseDashNav isAuthed={isAuthed} isFuse />
      <PoolList />
    </FusePageLayout>
  );
});

export default FusePoolsPage;

const PoolList = () => {
  const filter = useFilter();
  const { t } = useTranslation();

  const { filteredPools } = useFusePools(filter);
  const isMobile = useIsMobile();

  return (
    <SimpleGrid
      columns={2}
      w="100%"
      maxW={["0px", "1200px"]}
      my="2rem"
      mx="auto"
      gridGap="8"
    >
      {filteredPools ? (
        filteredPools.map((pool, index) => {
          return <PoolCard data={pool} />;
        })
      ) : (
        <Spinner my={8} />
      )}
    </SimpleGrid>
  );
};

const PoolCard = ({ data: pool }: { data: MergedPool }) => {
  const { t } = useTranslation();
  const rss = usePoolRSS(pool.id);
  const rssScore = rss ? letterScore(rss.totalScore) : "?";
  const tokens = useMemo(() => {
    const tokens = pool.underlyingTokens.map((address, index) => ({
      address,
      symbol: pool.underlyingSymbols[index],
    }));
    return tokens.length >= 10 ? tokens.splice(0, 10) : tokens;
  }, [pool.underlyingSymbols, pool.underlyingTokens]);

  return (
    <Flex
      key={pool.id}
      w="100%"
      pt={6}
      bgColor="white"
      borderRadius="20px"
      boxShadow="0px 21px 44px rgba(71, 29, 97, 0.105141)"
      flexDir="column"
      gridGap="6"
    >
      <Flex alignItems="center" justifyContent="start" gridGap="6" mx="6">
        <Avatar size={40} name={pool.pool.name} variant="marble" />
        <Row mainAxisAlignment="center" crossAxisAlignment="center">
          <Text fontWeight="bold">{pool.pool.name}</Text>
          <Box
            ml="4"
            background="linear-gradient(210.72deg, #F03EC3 -13.86%, #8E09B0 105.5%)"
            px="4"
            py="2"
            borderRadius="5px"
          >
            <Text fontSize="lg" textColor="white" fontWeight="medium">
              {rssScore}
            </Text>
          </Box>
          <Tooltip
            label="Some tooltip text"
            placement="top"
            bg="black"
            hasArrow
          >
            <InfoOutlineIcon ml="2" />
          </Tooltip>
        </Row>
      </Flex>
      <Row crossAxisAlignment="center" mainAxisAlignment="space-between" mx="6">
        {pool.underlyingTokens.length === 0 ? null : (
          <SimpleTooltip label={tokens.map((item) => item.symbol).join(" / ")}>
            <AvatarGroup size="sm" max={30}>
              {tokens.map(({ address }) => {
                return <CTokenIcon key={address} address={address} />;
              })}
            </AvatarGroup>
          </SimpleTooltip>
        )}
        <Column mainAxisAlignment="center" crossAxisAlignment="center">
          <Text fontWeight="bold">Max APY Percentage</Text>
          <Text mt="2">20%</Text>
        </Column>
      </Row>
      <chakra.div w="100%" h="1px" bgColor="gray.200" />
      <Row
        mx="6"
        mainAxisAlignment="center"
        crossAxisAlignment="center"
        gridGap="6"
      >
        <Column mainAxisAlignment="flex-start" crossAxisAlignment="center">
          <Text fontWeight="bold">{t("Total value supplied")}</Text>
          <Text mt="2">{smallUsdFormatter(pool.suppliedUSD)}</Text>
        </Column>
        <chakra.div h="16" w="1px" bgColor="gray.300" />
        <Column mainAxisAlignment="flex-start" crossAxisAlignment="center">
          <Text fontWeight="bold">{t("Total borrowed")}</Text>
          <Text mt="2">{smallUsdFormatter(pool.borrowedUSD)}</Text>
        </Column>
      </Row>
      <Link
        as={RouterLink}
        borderTopWidth="1px"
        borderTopColor="gray.200"
        to={"/fuse/pool/" + pool.id}
        w="100%"
        py="4"
        _hover={{ bgColor: "gray.100" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        View details <ArrowForwardIcon ml="4" />
      </Link>
    </Flex>
  );
};
