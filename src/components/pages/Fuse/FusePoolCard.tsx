import {
  Flex,
  Box,
  Tooltip,
  AvatarGroup,
  chakra,
  Text,
  useColorModeValue,
  Heading,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MergedPool } from "hooks/fuse/useFusePools";
import { usePoolRSS, letterScore } from "hooks/useRSS";
import { useMemo } from "react";
import { smallUsdFormatter } from "utils/bigUtils";
import { Row, Column } from "utils/chakraUtils";
import CTokenIcon from "./CTokenIcon";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

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
  const rss = usePoolRSS(pool.id);
  const rssScore = rss ? letterScore(rss.totalScore) : "?";
  const tokens = useMemo(() => {
    const tokens = pool.underlyingTokens.map((address, index) => ({
      address,
      symbol: pool.underlyingSymbols[index],
    }));
    return tokens;
  }, [pool.underlyingSymbols, pool.underlyingTokens]);
  const scoreGradient = usePoolRiskScoreGradient(rssScore);
  const bgColor = useColorModeValue("white", "#21262e");
  const dividerColor = useColorModeValue("gray.200", "gray.700");
  const boxShadow = useColorModeValue(
    "0px 0px 20px rgba(71, 29, 97, 0.105141)",
    "0px 0px 20px rgb(71 29 97 / 19%)"
  );
  const hoverBoxShadow = useColorModeValue(
    "0px 15px 25px rgb(71 0 97 / 21%)",
    "0px 0px 30px rgb(242 21 139 / 16%)"
  );

  const navigate = useNavigate();

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Flex
        w="100%"
        key={pool.id}
        pt={6}
        bgColor={bgColor}
        borderRadius={12}
        boxShadow={boxShadow}
        _hover={{
          boxShadow: hoverBoxShadow,
        }}
        flexDir="column"
        gridGap="6"
        onClick={() => navigate("/pool/" + pool.id)}
        cursor="pointer"
      >
        <Row
          mainAxisAlignment="space-between"
          crossAxisAlignment="flex-start"
          gridGap="6"
          mx="6"
        >
          <Row mainAxisAlignment="center" crossAxisAlignment="center">
            <Heading fontWeight="bold" fontSize={"xl"} ml="2">
              {pool.pool.name}
            </Heading>
          </Row>
        </Row>
        <Row
          crossAxisAlignment="center"
          mainAxisAlignment="space-between"
          mx="6"
        >
          {pool.underlyingTokens.length === 0 ? null : (
            <Tooltip label={tokens.map((item) => item.symbol).join(" / ")}>
              <AvatarGroup size="sm" max={30}>
                {tokens.slice(0, 10).map(({ address }) => {
                  return <CTokenIcon key={address} address={address} />;
                })}
              </AvatarGroup>
            </Tooltip>
          )}
          <Row mainAxisAlignment="center" crossAxisAlignment="center">
            <Tooltip
              label={
                "Underlying RSS: " +
                (rss ? rss.totalScore.toFixed(2) : "?") +
                "%"
              }
              placement="top"
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
        <chakra.div w="100%" h="1px" bgColor={dividerColor} />
        <Row
          mx="6"
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          gridGap="6"
        >
          <Column mainAxisAlignment="flex-start" crossAxisAlignment="center">
            <Text
              fontWeight="normal"
              textAlign="center"
              color={useColorModeValue("", "gray.300")}
            >
              Total Supply
            </Text>
            <Text mt="1.5" fontWeight="bold" fontFamily="Manrope">
              {smallUsdFormatter(pool.suppliedUSD)}
            </Text>
          </Column>
          <chakra.div h="16" w="2px" bgColor={dividerColor} />
          <Column mainAxisAlignment="flex-start" crossAxisAlignment="center">
            <Text
              fontWeight="normal"
              textAlign="center"
              color={useColorModeValue("", "gray.300")}
            >
              Total borrowed
            </Text>
            <Text mt="1.5" fontWeight="bold" fontFamily="Manrope">
              {smallUsdFormatter(pool.borrowedUSD)}
            </Text>
          </Column>
        </Row>
        <Link
          as={RouterLink}
          borderTopWidth="1px"
          borderTopColor={dividerColor}
          to={"/pool/" + pool.id}
          w="100%"
          py="4"
          _hover={{ bgColor: useColorModeValue("gray.100", "#2a303a"), borderBottomRadius: 12 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderBottomRadius="20px"
        >
          View Details <ArrowForwardIcon ml="4" />
        </Link>
      </Flex>
    </motion.div>
  );
};

export default PoolCard;
