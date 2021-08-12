import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { smallUsdFormatter } from "utils/bigUtils";
import { useFuseTVL } from "hooks/fuse/useFuseTVL";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";

const FuseStatsBar = () => {
  const { t } = useTranslation();
  const { data: fuseTVL } = useFuseTVL();

  return (
    <Flex
      id="stats-bar"
      marginRight="auto"
      marginLeft="auto"
      flexDir={{ base: "column", lg: "row" }}
      alignItems="center"
      justifyContent="center"
      py="72px"
      px={{ base: "5vw", lg: 0 }}
      w="100%"
      maxWidth={{ lg: "1200px" }}
      gridGap="1.5rem"
    >
      <Flex
        flexDir="column"
        expand
        w={{ base: "100%" }}
        fontSize="sm"
        marginRight={{ base: "0px", lg: "84.5px" }}
      >
        <Text fontSize="32px" lineHeight="40px" fontWeight="bold" zIndex="100">
          {t("Fuse")}
        </Text>
        <Text
          fontSize="18px"
          lineHeight="31px"
          mt="19px"
          textColor="#141212"
          fontWeight="medium"
          zIndex="100"
        >
          {t(
            "There's {{tvl}} supplied to Fuse, the first truly open interest rate protocol. Lend, borrow, and create isolated lending markets with unlimited flexibility.",
            { tvl: fuseTVL ? smallUsdFormatter(fuseTVL) : "?" }
          )}
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        h={{ base: "10rem", lg: "15rem" }}
        w={{ base: "100%", lg: "50%" }}
        px={{ lg: "10vw" }}
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        boxShadow="0px 21px 27px -12px rgba(9, 27, 177, 0.332741)"
        borderRadius="20px"
        bg="linear-gradient(to bottom right,#9b61cd 0,#f21587 60%,#f2ef15 100%)"
      >
        <Text
          fontWeight="extrabold"
          fontSize={["36px", "48px"]}
          lineHeight={["60px"]}
          textColor="white"
        >
          {fuseTVL ? smallUsdFormatter(fuseTVL) : "?"}
        </Text>
        <Text textColor="white" whiteSpace="nowrap">
          {t("Total value supplied across fuse")}
        </Text>
      </Flex>
    </Flex>
  );
};

export default FuseStatsBar;
