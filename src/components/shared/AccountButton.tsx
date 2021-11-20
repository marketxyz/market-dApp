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
} from "@chakra-ui/react";

import { Row, Column } from "utils/chakraUtils";
import DashboardBox from "./DashboardBox";

// @ts-ignore
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { shortAddress } from "../../utils/shortAddress";

import { useTranslation } from "react-i18next";
import { MODAL_PROPS, ModalDivider, ModalTitleWithCloseButton } from "./Modal";
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

const chainIdToName: Record<number, string> = {
  1: "Ethereum",
  137: "Polygon",
};
const chainIdToChainName: Record<number, string> = {
  1: "mainnet",
  137: "polygon",
};

const switchChainId = async (chainId: number) => {
  if (chainId === 1) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  } else {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkData[chainIdToChainName[chainId]].addData],
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
  const { address, isAuthed, login, isAttemptingLogin } = useRari();

  const { t } = useTranslation();

  const isMobile = useIsSmallScreen();

  const bgColor = useColorModeValue("white", "gray.800");

  const handleAccountButtonClick = useCallback(() => {
    if (isAuthed) {
      openModal();
    } else login();
  }, [isAuthed, login, openModal]);

  const rari = useRari();
  const isNetworkChangeable =
    rari.userWallet?.isMetaMask &&
    rari.isAuthed &&
    rari.userWallet?.appChainId !== rari.userWallet?.chainId;

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
          onClick={() => switchChainId(rari.userWallet?.appChainId)}
        >
          <Image src="/static/metamask.svg" h={"7"} mr={"2"} />
          Switch to {chainIdToName[rari.userWallet?.appChainId]}
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
                <Jazzicon diameter={23} seed={jsNumberForAddress(address)} />
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

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent {...MODAL_PROPS} bgColor={bgColor} textColor={textColor}>
        <ModalTitleWithCloseButton text={t("Account")} onClose={onClose} />

        <ModalDivider />

        <Column
          width="100%"
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          p={4}
        >
          <Button
            bg="cyan.500"
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
            bg={"whatsapp.500"}
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
            bg="red.500"
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
            <Link
              isExternal
              href="https://marketxyz.medium.com/"
            >
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
