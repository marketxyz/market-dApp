import { InfoOutlineIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex,
  Box,
  Tooltip,
  AvatarGroup,
  chakra,
  Link,
  Text,
} from "@chakra-ui/react";
import Avatar from "boring-avatars";
import { SimpleTooltip } from "components/shared/SimpleTooltip";
import { MergedPool } from "hooks/fuse/useFusePools";
import { usePoolRSS, letterScore } from "hooks/useRSS";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { smallUsdFormatter } from "utils/bigUtils";
import { Row, Column } from "utils/chakraUtils";
import CTokenIcon from "./CTokenIcon";

export const usePoolRiskScoreGradient = (
  rssScore: ReturnType<typeof letterScore> | "?"
) => {
  return useMemo(() => {
    return {
      A: "linear-gradient(180deg, #3DD630 0%, #26B61A 100%)",
      B: "linear-gradient(180deg, #309AD6 0%, #1A6BB6 100%)",
      C: "linear-gradient(185deg, #ffcb02 0%, #D8C625 100%)",
      D: "linear-gradient(180deg, #FDAA2D 0%, #B6811A 100%)",
      U: "linear-gradient(180deg, #FE4848 0%, #B61A1A 100%)",
      "?": "linear-gradient(180deg, #FE4848 0%, #B61A1A 100%)",
    }[rssScore];
  }, [rssScore]);
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
  const scoreGradient = usePoolRiskScoreGradient(rssScore);

  return (
    <Flex
      w="100%"
      key={pool.id}
      pt={6}
      bgColor="white"
      borderRadius="20px"
      boxShadow="0px 21px 44px rgba(71, 29, 97, 0.105141)"
      _hover={{ boxShadow: "0px 21px 44px rgba(71, 29, 97, 0.205141)" }}
      flexDir="column"
      gridGap="6"
    >
      <Row
        mainAxisAlignment="space-between"
        crossAxisAlignment="flex-start"
        gridGap="6"
        mx="6"
      >
        <Row mainAxisAlignment="center" crossAxisAlignment="center">
          <Link
            as={RouterLink}
            to={"/pool/" + pool.id}
            _hover={{ textDecor: "none" }}
          >
            <Text fontWeight="bold" fontSize={"xl"} ml="2">
              {pool.pool.name}
            </Text>
          </Link>
        </Row>
      </Row>
      <Row crossAxisAlignment="center" mainAxisAlignment="space-between" mx="6">
        {pool.underlyingTokens.length === 0 ? null : (
          <SimpleTooltip label={tokens.map((item) => item.symbol).join(" / ")}>
            <AvatarGroup size="sm" max={30}>
              {tokens.slice(0, 10).map(({ address }) => {
                return <CTokenIcon key={address} address={address} />;
              })}
            </AvatarGroup>
          </SimpleTooltip>
        )}
        <Row mainAxisAlignment="center" crossAxisAlignment="center">
          <Tooltip
            label={
              "Underlying RSS: " + (rss ? rss.totalScore.toFixed(2) : "?") + "%"
            }
            placement="top"
            bg="black"
            hasArrow
          >
            <Box
              ml="4"
              background={scoreGradient}
              px="4"
              py="2"
              borderRadius="5px"
            >
              <Text fontSize="lg" textColor="white" fontWeight="semibold">
                {rssScore}
              </Text>
            </Box>
          </Tooltip>
        </Row>
      </Row>
      <chakra.div w="100%" h="1px" bgColor="gray.200" />
      <Row
        mx="6"
        mainAxisAlignment="center"
        crossAxisAlignment="center"
        gridGap="6"
      >
        <Column mainAxisAlignment="flex-start" crossAxisAlignment="center">
          <Text fontWeight="bold" textAlign="center">
            {t("Total Supply")}
          </Text>
          <Text mt="2">{smallUsdFormatter(pool.suppliedUSD)}</Text>
        </Column>
        <chakra.div h="16" w="1px" bgColor="gray.300" />
        <Column mainAxisAlignment="flex-start" crossAxisAlignment="center">
          <Text fontWeight="bold" textAlign="center">
            {t("Total borrowed")}
          </Text>
          <Text mt="2">{smallUsdFormatter(pool.borrowedUSD)}</Text>
        </Column>
        <chakra.div h="16" w="1px" bgColor="gray.300" />
        <Column mainAxisAlignment="center" crossAxisAlignment="center">
          <Text fontWeight="bold" textAlign="center">
            Max APY
          </Text>
          <Text mt="2">20%</Text>
        </Column>
      </Row>
      <Link
        as={RouterLink}
        borderTopWidth="1px"
        borderTopColor="gray.200"
        to={"/pool/" + pool.id}
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

export default PoolCard;
