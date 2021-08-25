import {
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { FlexProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { smallUsdFormatter } from "utils/bigUtils";
import { useFuseTVL } from "hooks/fuse/useFuseTVL";
import { motion } from "framer-motion";

const MotionFlex = motion<FlexProps>(Flex);

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
        expand={"true"}
        w={{ base: "100%" }}
        fontSize="sm"
        marginRight={{ base: "0px", lg: "84.5px" }}
      >
        <Heading
          fontSize="40px"
          lineHeight="40px"
          fontWeight="bold"
          zIndex="100"
        >
          {t("Fuse")}
        </Heading>
        <Text
          fontSize="18px"
          lineHeight="31px"
          mt="19px"
          textColor={useColorModeValue("#141212", "gray.300")}
          fontWeight="medium"
          zIndex="100"
        >
          {t(
            "There's {{tvl}} supplied to Fuse, the first truly open interest rate protocol. Lend, borrow, and create isolated lending markets with unlimited flexibility.",
            { tvl: fuseTVL ? smallUsdFormatter(fuseTVL) : "?" }
          )}
        </Text>
      </Flex>
      <MotionFlex
        flexDir="column"
        h={{ base: "10rem", lg: "15rem" }}
        w={{ base: "100%", lg: "50%" }}
        px={{ lg: "10vw" }}
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        boxShadow="3px 18px 23px -26px rgb(92 31 70 / 51%)"
        borderRadius="20px"
        bg={useColorModeValue(
          "radial-gradient(circle, rgb(242 21 135 / 90%) 35%, rgba(180,118,234,0.10) 150%)",
          "radial-gradient(circle, rgb(242 21 225 / 60%) -239%, rgba(180,118,234,0.059) 71%)"
        )}
        backdropFilter={useColorModeValue("brightness(0.8)", "brightness(0.5)")}
        whileHover={{ scale: 1.06 }}
      >
        {fuseTVL ? (
          <Heading
            fontWeight="extrabold"
            fontSize={["36px", "48px"]}
            lineHeight={["60px"]}
            textColor="white"
          >
            {smallUsdFormatter(fuseTVL)}
          </Heading>
        ) : (
          <Spinner color="#FFF" />
        )}
        <Text textColor="white" whiteSpace="nowrap">
          {t("Total value supplied across fuse")}
        </Text>
      </MotionFlex>
    </Flex>
  );
};

export default FuseStatsBar;
