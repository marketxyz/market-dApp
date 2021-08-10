import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, chakra, Text } from "@chakra-ui/react";

const FuseNavbar = () => {
  return (
    <Box bgColor="white" overflowX="hidden" w="100%" px={["0px", "25px"]}>
      <Flex
        mx="auto"
        maxWidth="1200px"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        py="26px"
      >
        <Text fontWeight="bold" fontSize="lg" zIndex="100">
          MarketXYZ
        </Text>
        <chakra.button
          display="flex"
          alignItems="center"
          zIndex="100"
          justifyContent="center"
          borderRadius="34.5px"
          bgColor="white"
          boxShadow="base"
          py="4"
          px="6"
          transitionProperty="all"
          transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
          transitionDuration="150ms"
          _hover={{
            boxShadow: "lg",
          }}
          fontWeight="bold"
          gridGap="2"
        >
          <span>Put your money to work</span>
          <ChevronRightIcon />
        </chakra.button>
      </Flex>
    </Box>
  );
};

export default FuseNavbar;
