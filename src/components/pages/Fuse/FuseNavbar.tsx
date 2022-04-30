import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
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
  Divider,
} from "@chakra-ui/react";
import { AccountButton } from "../../shared/AccountButton";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { networkData, chainIdOrder } from "../../../constants/networkData";
import { useRari } from "context/RariContext";
import { CHAIN_ID } from "../../../utils/chainId";

const selectedNetworkBorder = "1px solid #DF2EAC";

const changeNetworkWithUrl = async (
  userWallet: Record<string, any> | null,
  isAuthed: boolean,
  chainId: number
) => {
  console.log(userWallet, isAuthed, chainId);

  const _network = networkData[chainId];

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
  const { userWallet, isAuthed } = useRari();
  const btnBg = useColorModeValue("gray.300", "#2c313d");
  const btnBgActive = useColorModeValue("", "mktgray.200");

  return (
    <>
      <Button borderRadius="12px" m={2} onClick={onOpen}>
        <Image
          src={networkData[CHAIN_ID].img}
          h={"6"}
          borderRadius={"50%"}
          justifyContent="flex-start"
          mr={{ base: "none", md: "2" }}
        ></Image>
        <Text mr={3} display={{ base: "none", md: "block" }}>
          {networkData[CHAIN_ID].name}
        </Text>
        <ChevronDownIcon fontSize={"25px"} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue("gray.50", "mktgray.700")}
          borderRadius="20px"
          border="2px"
          borderColor={"rgba(184, 50, 123, 1)"}
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
                color={networkData[CHAIN_ID]?.color}
                fontWeight={"extrabold"}
              >
                {networkData[CHAIN_ID].shortName}
              </Text>{" "}
              network.
            </Heading>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
              gap={4}
              mt={6}
            >
              {chainIdOrder.map((chainId) => {
                const d = networkData[chainId];

                return (
                  <Button
                    key={d.chainId}
                    h={"12"}
                    justifyContent={"flex-start"}
                    fontSize={"md"}
                    border={CHAIN_ID === d.chainId ? selectedNetworkBorder : ""}
                    borderRadius="12px"
                    disabled={!d.enabled}
                    bg={CHAIN_ID === d.chainId ? btnBgActive : btnBg}
                    onClick={() =>
                      changeNetworkWithUrl(userWallet, isAuthed, chainId)
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
                );
              })}
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
      
      <Alert width="100vw" status="error">
        <AlertIcon />
        <Text as="b">
          We have paused borrowing of all assets in solidarity due to Tribe DAO's lending platform exploit 
          <Link
            ml={"1.5"}
            href="https://twitter.com/feiprotocol/status/1520344430242254849"
            as={"a"}
            target="_blank"
            textDecor="underline"
          >
            today
          </Link>
          . We are investigating and this is just a precaution.
        </Text>
      </Alert>

      {isNetworkChangeable ? (
        <Alert width="100vw" status="error" style={{ marginTop: "0" }}>
          <AlertIcon />
          <Text>
            To be able to use the Market Protocol on{" "}
            {networkData[CHAIN_ID].name}, switch to {networkData[CHAIN_ID].name}{" "}
            on your Wallet or use the network switcher!
          </Text>
        </Alert>
      ) : null}
      <Box bgColor={bgColor} overflowX="hidden" mx="auto" w={"100%"}>
        <Flex
          mx="auto"
          alignItems="center"
          justifyContent="space-between"
          w={"90%"}
          py={2}
        >
          <Link href="/">
            <chakra.img
              src={
                colorMode === "light"
                  ? isMobile
                    ? "/static/market-symbol.svg"
                    : "/static/blacktext-market.svg"
                  : isMobile
                  ? "/static/market-symbol.svg"
                  : "/static/whitetext-market.svg"
              }
              alt="market logo"
              w={isMobile ? "auto" : "30"}
              h={isMobile ? "40px" : "auto"}
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
      <Divider />
    </>
  );
};

export default FuseNavbar;
