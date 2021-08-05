import { ChevronRightIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import FuseNavbar from "./FuseNavbar";

const FuseHeader = () => {
  return (
    <chakra.div
      position="relative"
      w="100%"
      paddingTop="210px"
      maxH="870px"
      overflowY="hidden"
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
          zIndex="100"
        />
      </Flex>
      <chakra.div
        bgColor="#ff00b3"
        h="800px"
        w="400px"
        filter="blur(350px)"
        position="absolute"
        top="100%"
        left="20%"
        bottom="0"
        transform="translate(-50%, -50%)"
      />
      <chakra.div
        bgColor="#ff00b3"
        h="800px"
        w="400px"
        filter="blur(350px)"
        position="absolute"
        top="100%"
        right="10%"
        bottom="0"
        transform="translate(-50%, -50%)"
      />
      <chakra.img
        src="/static/fuse/Icon4.svg"
        position="absolute"
        bottom="0"
        left="10%"
      />
      <chakra.img
        src="/static/fuse/Icon3.svg"
        position="absolute"
        bottom="calc(20% - 16px)"
        left="10%"
      />
      <chakra.img
        src="/static/fuse/Icon0.svg"
        position="absolute"
        top="30%"
        left="15%"
      />
      <chakra.img
        src="/static/fuse/Icon5.svg"
        position="absolute"
        bottom="-15%"
        right="20%"
        transform="rotate(15deg)"
      />
      <chakra.img
        src="/static/fuse/Icon1.svg"
        position="absolute"
        bottom="45%"
        right="25%"
      />
      <chakra.img
        src="/static/fuse/Icon2.svg"
        position="absolute"
        bottom="20%"
        right="15%"
        transform="rotate(15deg)"
      />
      <chakra.img
        src="/static/fuse/Icon6.png"
        position="absolute"
        bottom="-15%"
        right="10%"
        transform="rotate(15deg)"
      />
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
