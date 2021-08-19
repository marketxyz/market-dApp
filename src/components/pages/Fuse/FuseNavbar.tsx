import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { AccountButton } from "../../shared/AccountButton";

const FuseNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.900");

  return (
    <Box bgColor={bgColor} overflowX="hidden" w="100%" px={["0px", "25px"]}>
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
          src={
            colorMode === "light"
              ? "/static/logo-black-text.png"
              : "/static/logo-text.png"
          }
          alt="market logo"
          width={"36"}
          paddingTop={"2"}
        />
        <Box display="flex" flexDir="row">
          {/* <Button
            bgGradient="linear(to-r, #f21587, #9b61cd)"
            color="white"
            fontSize="lg"
            borderRadius="7px"
            fontWeight="bold"
            _hover={{}}
            _active={{}}
          >
            {t("Buy Crypto")}
          </Button> */}
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <MoonIcon w={5} h={5} />
            ) : (
              <SunIcon color="yellow.300" w={5} h={5} />
            )}
          </Button>
          <AccountButton></AccountButton>
        </Box>
      </Flex>
    </Box>
  );
};

export default FuseNavbar;
