import { memo, useCallback } from "react";
import { useRari } from "../../context/RariContext";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  Link,
  Text,
  Spinner,
  useColorModeValue,
  Image,
  ButtonProps,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";

import { Row, Column } from "utils/chakraUtils";
import DashboardBox from "./DashboardBox";

import { shortAddress } from "../../utils/shortAddress";

import { useTranslation } from "react-i18next";
import { LanguageSelect } from "./TranslateButton";

import { version } from "../..";

import MoonpayModal from "../pages/MoonpayModal";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import { useAuthedCallback } from "../../hooks/useAuthedCallback";
import { networkData } from "constants/networkData";
import { motion } from "framer-motion";

export const AccountButton = memo(() => {
  const {
    isOpen: isSettingsModalOpen,
    onOpen: openSettingsModal,
    onClose: closeSettingsModal,
  } = useDisclosure();

  const authedOpenSettingsModal = useAuthedCallback(openSettingsModal);

  const {
    isOpen: isMoonpayModalOpen,
    onOpen: openMoonpayModal,
    onClose: closeMoonpayModal,
  } = useDisclosure();

  const authedOpenMoonpayModal = useAuthedCallback(openMoonpayModal);

  return (
    <>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={closeSettingsModal}
        openMoonpayModal={openMoonpayModal}
      />
      <MoonpayModal isOpen={isMoonpayModalOpen} onClose={closeMoonpayModal} />
      <Buttons
        openModal={authedOpenSettingsModal}
        openMoonpayModal={authedOpenMoonpayModal}
      />
    </>
  );
});

const switchChainId = async (chainId: number) => {
  if (chainId === 1) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  } else {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkData[chainId]?.addData],
    });
  }
};

const Buttons = ({
  openModal,
  openMoonpayModal,
}: {
  openModal: () => any;
  openMoonpayModal: () => any;
}) => {
  const {
    address,
    isAuthed,
    login,
    isAttemptingLogin,
    userWallet,
    logout,
    web3ModalProvider,
  } = useRari();

  const { t } = useTranslation();

  const isMobile = useIsSmallScreen();

  const bgColor = useColorModeValue("white", "gray.800");

  const handleAccountButtonClick = useCallback(() => {
    if (isAuthed) {
      openModal();
    } else login();
  }, [isAuthed, login, openModal]);

  const isNetworkChangeable =
    isAuthed && userWallet?.appChainId !== userWallet?.chainId;

  const MotionBox = motion<ButtonProps>(Button);

  return (
    <Row mainAxisAlignment="center" crossAxisAlignment="center">
      {isNetworkChangeable ? (
        <MotionBox
          justifyContent="left"
          borderRadius={"12px"}
          border={"2px"}
          borderColor={"#DF2EAC"}
          animate={{
            scale: [1, 1, 1.5, 1],
          }}
          onClick={() =>
            userWallet?.isMetaMask
              ? switchChainId(userWallet?.appChainId)
              : logout()
          }
        >
          <Image
            src={
              userWallet?.isMetaMask
                ? "/static/metamask.svg"
                : web3ModalProvider?.walletMeta?.icons?.[0] || "/static/wc.png"
            }
            rounded="lg"
            h={"7"}
            mr={"2"}
          />
          Switch to {networkData[userWallet?.appChainId].name}
        </MotionBox>
      ) : (
        <DashboardBox
          mx={isMobile ? 0 : 2}
          as="button"
          height="40px"
          flexShrink={0}
          flexGrow={0}
          width="133px"
          onClick={handleAccountButtonClick}
          bgColor={bgColor}
          boxShadow={"base"}
          borderColor="#DF2EAC"
          borderWidth="2px"
          borderRadius="12px"
          _hover={{ boxShadow: "md" }}
          _focus={{ boxShadow: "md" }}
        >
          <Row
            expand
            mainAxisAlignment="space-around"
            crossAxisAlignment="center"
            px={3}
            py={1}
          >
            {/* Conditionally display Connect button or Account button */}
            {!isAuthed ? (
              isAttemptingLogin ? (
                <Spinner />
              ) : (
                <Text fontWeight="semibold">{t("Connect")}</Text>
              )
            ) : (
              <>
                <Image
                  src={
                    userWallet?.isMetaMask
                      ? "/static/metamask.svg"
                      : web3ModalProvider?.walletMeta?.icons?.[0] ||
                        "/static/wc.png"
                  }
                  rounded="lg"
                  h={"7"}
                />
                <Text ml={2} fontWeight="semibold">
                  {shortAddress(address)}
                </Text>
              </>
            )}
          </Row>
        </DashboardBox>
      )}
    </Row>
  );
};

export const SettingsModal = ({
  isOpen,
  onClose,
  openMoonpayModal,
}: {
  isOpen: boolean;
  onClose: () => any;
  openMoonpayModal: () => any;
}) => {
  const { t } = useTranslation();

  const { login, logout } = useRari();

  const onSwitchWallet = () => {
    onClose();
    setTimeout(() => login(false), 100);
  };

  const handleDisconnectClick = () => {
    onClose();
    logout();
  };

  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        bg={useColorModeValue("gray.50", "mktgray.700")}
        borderRadius="20px"
        border="1px"
        px={6}
        py={2}
        borderColor={"rgba(184, 50, 123, 0.5)"}
        textColor={textColor}
      >
        <ModalHeader pl={4} fontSize="1.5rem">
          Account
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <Column
          width="100%"
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          alignSelf={"center"}
          p={4}
        >
          <Button
            bg={useColorModeValue("cyan.600", "cyan.700")}
            color="white"
            width="100%"
            height="45px"
            fontSize="xl"
            borderRadius="7px"
            fontWeight="bold"
            onClick={openMoonpayModal}
            _hover={{}}
            _active={{}}
            mb={4}
          >
            {t("Buy Crypto")}
          </Button>

          <Button
            bg={useColorModeValue("whatsapp.500", "whatsapp.700")}
            color={"white"}
            width="100%"
            height="45px"
            fontSize="xl"
            borderRadius="7px"
            fontWeight="bold"
            onClick={onSwitchWallet}
            _hover={{}}
            _active={{}}
            mb={4}
          >
            {t("Switch Wallet")}
          </Button>

          <Button
            bg={useColorModeValue("red.500", "red.600")}
            color={"white"}
            width="100%"
            height="45px"
            fontSize="xl"
            borderRadius="7px"
            fontWeight="bold"
            onClick={handleDisconnectClick}
            _hover={{}}
            _active={{}}
            mb={4}
          >
            {t("Disconnect")}
          </Button>

          <LanguageSelect />

          <Row
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            mt={4}
            width="100%"
          >
            <Link isExternal href="https://docs.market.xyz/">
              <Text mx={2} text="sm" textDecoration="underline">
                {t("Developer Docs")}
              </Text>
            </Link>
            <Link isExternal href="https://marketxyz.medium.com/">
              <Text mx={2} text="sm" textDecoration="underline">
                {t("Read")}
              </Text>
            </Link>
            <Link isExternal href="https://docs.market.xyz/audit-reports">
              <Text mx={2} text="sm" textDecoration="underline">
                {t("Audits")}
              </Text>
            </Link>
          </Row>

          <Text mt={4} fontSize="10px">
            {t("Version")} {version}
          </Text>
        </Column>
      </ModalContent>
    </Modal>
  );
};
