/* istanbul ignore file */
import { useEffect, useState } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";

const FullPageSpinner = () => {
  return (
    <Box background="white" height="100vh">
      <Text
        fontSize="4xl"
        fontWeight="bold"
        p="0"
        style={{
          position: "fixed",
          left: "46%",
          top: "30%",
          marginTop: "-1.5rem",
        }}
      >
        Loading
      </Text>
      <Spinner
        data-testid="full-page-spinner"
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          marginTop: "-1.5rem",
          marginLeft: "-1.5rem",
        }}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#121212"
        size="xl"
      />
    </Box>
  );
};

export default FullPageSpinner;
