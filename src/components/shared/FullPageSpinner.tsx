/* istanbul ignore file */
import { Box, Spinner } from "@chakra-ui/react";

const FullPageSpinner = () => {
  return (
    <Box
      background="white"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        {/* <Text fontSize="4xl" fontWeight="bold" p="0" m="0">
          Loading
        </Text> */}
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
