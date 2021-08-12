import { Box, chakra, Flex, Image } from "@chakra-ui/react";
import { AccountButton } from "../../shared/AccountButton";

const FuseNavbar = () => {
  return (
    <Box bgColor="white" overflowX="hidden" w="100%" px={["0px", "25px"]}>
      <Flex
        mx="auto"
        maxWidth="1200px"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        px={{ base: 4, lg: 0 }}
        py={{ base: 2, lg: 6 }}
      >
        <chakra.img
          src="/static/logo-black-text.png"
          alt="market logo"
          width={"36"}
          paddingTop={"2"}
        />
        {/* <Text fontWeight="bold" fontSize="xl" zIndex="100">

        </Text> */}
        {/* <chakra.button
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
        </chakra.button> */}

        <AccountButton></AccountButton>
      </Flex>
    </Box>
  );
};

export default FuseNavbar;
