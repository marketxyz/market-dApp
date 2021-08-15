import { Divider, Flex, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import FuseNavbar from "./FuseNavbar";

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
    >
      <VStack overflowY="hidden" position="relative" w="100%">
        {/* <chakra.div
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
        /> */}
        <FuseNavbar />
        <Divider orientation="horizontal" />
        {/* <FuseHeader /> */}
      </VStack>
      {children}
    </Flex>
  );
};

export default FusePageLayout;
