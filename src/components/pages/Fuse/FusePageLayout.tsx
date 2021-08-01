import { ChevronRightIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import { Box, chakra, Flex, Text } from "@chakra-ui/react";

const FuseNavbar = () => {
  return (
    <Box bgColor="white" overflowX="hidden" w="100%" maxWidth="1200px" marginLeft="auto" marginRight="auto" px={["0px", "25px"]}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        py="26px"
      >
        <Text fontWeight="bold" fontSize="lg">
          Market
        </Text>
        <chakra.button
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="34.5px"
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

const FuseHeader = () => {
  return (
    <chakra.div
      position="relative"
      w="100%"
      paddingTop="102px"
      maxH="762px"
      overflow="hidden"
    >
      <Flex
        flexDir="column"
        w="100%"
        textColor="#361648"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="56px" lineHeight="71px" fontWeight="bold" zIndex="50">
          Stake & borrow on XYZ Market
        </Text>
        <Text
          fontSize="22px"
          lineHeight="37px"
          fontWeight="medium"
          marginTop="38px"
          zIndex="50"
        >
          Our DeFi product uses Fuse by Protocol to allow anyone to create{" "}
          <br />a monety-market with the super-low fees by being built on XYZ
          Market.
        </Text>
        <chakra.button
          mt="55px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="34.5px"
          py="4"
          textColor="white"
          px="6"
          fontWeight="bold"
          gridGap="2"
          variant="unstyled"
          background="linear-gradient(140.11deg, #FF3E5D -14.22%, #DF28A6 44.8%, #AD0AED 94.01%)"
          transition="background 0.15s ease-out"
          boxShadow="inset 0px 16px 19px rgba(255, 255, 255, 0.702594), inset 0px -8px 20px rgba(120, 15, 114, 0.596268)"
          zIndex="50"
        >
          <span>Put your money to work</span>
          <ChevronRightIcon />
        </chakra.button>
        <chakra.img
          mt="78px"
          src="/static/fuse-header-dashboard-2.png"
          maxW="839px"
          objectFit="contain"
          zIndex="50"
        />
      </Flex>
      {/* <chakra.img
        src="/static/fuse-header-bg.png"
        position="absolute"
        top="100%"
        left="50%"
        bottom="0"
        transform="translate(-50%, -50%)"
      /> */}
    </chakra.div>
  );
};

type FusePageLayoutProps = {
  children?: ReactNode;
};

const FusePageLayout = ({ children }: FusePageLayoutProps) => {
  return (
    <Flex
      w="100vw"
      minH="100vh"
      flexDir="column"
      alignItems="flex-start"
      bgColor="white"
      justifyContent="flex-start"
      fontFamily="Plus Jakarta Sans"
    >
      <FuseNavbar />
      <FuseHeader />
      {children}
    </Flex>
  );
};

export default FusePageLayout;
