import { ChevronRightIcon } from "@chakra-ui/icons";
import { chakra, Flex, Text } from "@chakra-ui/react";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";

const FuseHeader = () => {
  const isMobile = useIsSmallScreen();

  return (
    <chakra.div
      position="relative"
      w="100%"
      maxH="870px"
      overflowY="hidden"
      pt="16"
    >
      <Flex
        flexDir="column"
        w="100%"
        textColor="#361648"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize={{ base: "36px", lg: "56px" }}
          textAlign="center"
          lineHeight={{ base: "51px", lg: "71px" }}
          fontWeight="bold"
          zIndex="50"
        >
          Stake & borrow on MarketXYZ
        </Text>
        <Text
          fontSize={{ lg: "22px" }}
          lineHeight={{ lg: "37px" }}
          fontWeight="medium"
          marginTop="38px"
          textAlign="center"
          zIndex="50"
          mx={{ base: 12, lg: 0 }}
        >
          Our DeFi product uses Fuse by Protocol to allow anyone to create{" "}
          <br hidden={isMobile} />a monety-market with the super-low fees by
          being built on XYZ Market.
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
          mb="-4"
          zIndex="100"
        />
      </Flex>
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
    </chakra.div>
  );
};

export default FuseHeader;
