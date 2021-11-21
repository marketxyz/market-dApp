import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Image,
  Button,
  chakra,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Grid,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AccountButton } from "../../shared/AccountButton";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { networkData } from "../../../constants/networkData";
import { useRari } from "context/RariContext";

const selectedNetworkBorder = "1px solid #DF2EAC";
const ethereumColor = "#0993ec";
const polygonColor = "#a557fe";

const changeNetworkWithUrl = async (
  userWallet: Record<string, any> | null,
  isAuthed: boolean,
  networkName: string
) => {
  console.log(userWallet, isAuthed, networkName);

  const _network = networkData[networkName];

  if (!_network.enabled) {
    return;
  }

  if (!isAuthed || !userWallet) {
    window.location.href = _network.url;
    return;
  }

  if (!_network.isMetaMask) {
    if (userWallet.appChainId !== _network.chainId)
      window.location.href = _network.url;
  }

  if (userWallet.chainId !== _network.chainId) {
    if (_network.chainId === 1) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: _network.chainIdHex }],
      });
    } else {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [_network.addData],
      });
    }
  }

  if (userWallet.appChainId !== _network.chainId)
    window.location.href = _network.url;
};

const NetworkSwitcher = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID!) ?? 1;
  const chainName = chainId === 1 ? "mainnet" : "polygon";
  const { userWallet, isAuthed } = useRari();
  const btnBg = useColorModeValue("gray.300", "#2c313d");
  const btnBgActive = useColorModeValue("", "gray.800");

  return (
    <>
      <Button borderRadius="12px" m={2} onClick={onOpen}>
        <Image
          src={networkData[chainName].img}
          h={"6"}
          borderRadius={"50%"}
          justifyContent="flex-start"
          mr={{ base: "none", md: "2" }}
        ></Image>
        <Text display={{ base: "none", md: "block" }}>
          {networkData[chainName].name}
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue("gray.100", "gray.800")}
          border={"medium"}
          borderColor="#DF2EAC"
          borderStyle="solid"
          borderRadius="20px"
        >
          <ModalHeader fontSize="1.5rem">Select a Network</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize={"lg"} fontWeight={"medium"} lineHeight={"tall"}>
              Currently using{" "}
              <Text
                as="span"
                bgGradient="linear(to-bl, #b971f8,#f645a0)"
                bgClip="text"
                fontWeight={"extrabold"}
              >
                Market
              </Text>{" "}
              on the{" "}
              <Text
                as="span"
                color={chainId === 1 ? ethereumColor : polygonColor}
                fontWeight={"extrabold"}
              >
                {networkData[chainName].shortName}
              </Text>{" "}
              network.
            </Heading>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
              gap={{ base: 4, sm: 6 }}
              mt={6}
            >
              {Object.entries(networkData).map(([networkName, d]) => (
                <Button
                  key={d.chainId}
                  h={"12"}
                  justifyContent={"flex-start"}
                  fontSize={"md"}
                  border={chainId === d.chainId ? selectedNetworkBorder : ""}
                  borderRadius="12px"
                  disabled={!d.enabled}
                  bg={chainId === d.chainId ? btnBgActive : btnBg}
                  onClick={() =>
                    changeNetworkWithUrl(userWallet, isAuthed, networkName)
                  }
                >
                  <Image
                    h={"8"}
                    mr={"4"}
                    borderRadius={"50%"}
                    src={d.img}
                  ></Image>
                  {d.name}
                  {d.enabled ? "" : " (Soon)"}
                </Button>
              ))}
            </Grid>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const FuseNavbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.900");
  const isMobile = useIsSmallScreen();

  const rari = useRari();

  const isNetworkChangeable =
    rari.isAuthed && rari.userWallet?.appChainId !== rari.userWallet?.chainId;

  return (
    <>
      <Alert width="100vw" status="warning">
        <AlertIcon />
        <Text>
          Market is currently in beta mode. Please be mindful of the
          SmartContract risks, Learn more at:
          <Link
            ml={"1.5"}
            href="https://docs.market.xyz"
            as={"a"}
            target="_blank"
            textDecor="underline"
          >
            docs.market.xyz
          </Link>
        </Text>
      </Alert>
      {isNetworkChangeable ? (
        <Alert width="100vw" status="error" style={{ marginTop: "0" }}>
          <AlertIcon />
          <Text>
            To be able to use the Market Protocol, switch to Polygon network
            using your Wallet.
          </Text>
        </Alert>
      ) : null}
      <Box bgColor={bgColor} overflowX="hidden" mx="auto" w={"100%"}>
        <Flex
          mx="auto"
          alignItems="center"
          justifyContent="space-between"
          w={"90%"}
          py={{ base: 2, lg: 4 }}
        >
          <Link href="/">
            <chakra.img
              src={
                colorMode === "light"
                  ? isMobile
                    ? "/static/market-logo.png"
                    : "/static/logo-black-text.png"
                  : isMobile
                  ? "/static/market-logo.png"
                  : "/static/logo-text.png"
              }
              alt="market logo"
              w={isMobile ? "auto" : "40"}
              h={isMobile ? "36px" : "auto"}
              mt={isMobile ? 0 : 2}
            />
          </Link>
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
            <NetworkSwitcher />
            <AccountButton />
            <Button
              bgColor={"transparent"}
              borderRadius="12px"
              onClick={toggleColorMode}
              m={2}
            >
              {colorMode === "light" ? (
                <MoonIcon color="gray.700" w={5} h={5} />
              ) : (
                <SunIcon color="gray.200" w={5} h={5} />
              )}
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default FuseNavbar;
