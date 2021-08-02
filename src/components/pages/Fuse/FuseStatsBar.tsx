import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { smallUsdFormatter } from "utils/bigUtils";
import { useFuseTVL } from "hooks/fuse/useFuseTVL";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";

const FuseStatsBar = () => {
  const { t } = useTranslation();
  const { data: fuseTVL } = useFuseTVL();
  const isMobile = useIsSmallScreen();

  return (
    <Flex
      id="stats-bar"
      marginRight="auto"
      marginLeft="auto"
      flexDir={isMobile ? "column" : "row"}
      alignItems="center"
      justifyContent="center"
      py="72px"
      px={["5vw", "0"]}
      w="100%"
      maxWidth={["100%", "1200px"]}
      gridGap="1.5rem"
    >
      <Flex
        flexDir="column"
        expand
        w={["100%", "50%"]}
        fontSize="sm"
        marginRight={["0", "84.5px"]}
      >
        <Text fontSize="32px" lineHeight="40px" fontWeight="extrabold">
          {t("Fuse")}
        </Text>
        <Text
          fontSize="18px"
          lineHeight="31px"
          mt="19px"
          textColor="#141212"
          fontWeight="medium"
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
        w={["100%", "50%"]}
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        boxShadow="0px 21px 27px -12px rgba(9, 27, 177, 0.332741)"
        borderRadius="20px"
        background="linear-gradient(to right top, #271C3F 5%, #442471 44.8%, #7F3EB1 94.01%)"
      >
        <Text
          fontWeight="bold"
          fontSize={["36px", "48px"]}
          lineHeight={["60px"]}
          textColor="white"
        >
          {fuseTVL ? smallUsdFormatter(fuseTVL) : "?"}
        </Text>
        <Text textColor="white">{t("Total value supplied across fuse")}</Text>
        {/* <chakra.img src="/static/fuse-supply-bitmap.svg" position="absolute" /> */}
      </Flex>
    </Flex>
  );
};

export default FuseStatsBar;
