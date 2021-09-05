/* istanbul ignore file */
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";

const FullPageSpinner = () => {
  return (
    <Box
      background={useColorModeValue("white", "black")}
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Spinner
          thickness="4.5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#f21587"
          size="xl"
        />
      </Box>
    </Box>
  );
};

export default FullPageSpinner;
