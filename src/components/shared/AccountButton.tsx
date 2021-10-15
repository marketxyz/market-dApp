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
} from "@chakra-ui/react";

import { Row, Column } from "utils/chakraUtils";
import DashboardBox from "./DashboardBox";

// @ts-ignore
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { shortAddress } from "../../utils/shortAddress";

import { useTranslation } from "react-i18next";
import { MODAL_PROPS, ModalDivider, ModalTitleWithCloseButton } from "./Modal";
import { LanguageSelect } from "./TranslateButton";

import { ClaimRGTModal } from "./ClaimRGTModal";
import { version } from "../..";

import MoonpayModal from "../pages/MoonpayModal";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import { useAuthedCallback } from "../../hooks/useAuthedCallback";
import { networkData } from "constants/networkData";

export const AccountButton = memo(() => {
  const {
    isOpen: isSettingsModalOpen,
    onOpen: openSettingsModal,
    onClose: closeSettingsModal,
  } = useDisclosure();

  const authedOpenSettingsModal = useAuthedCallback(openSettingsModal);

  const {
    isOpen: isClaimRGTModalOpen,
    onOpen: openClaimRGTModal,
    onClose: closeClaimRGTModal,
  } = useDisclosure();

  const authedOpenClaimRGTModal = useAuthedCallback(openClaimRGTModal);

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
        openClaimRGTModal={openClaimRGTModal}
        openMoonpayModal={openMoonpayModal}
      />
      <ClaimRGTModal
        isOpen={isClaimRGTModalOpen}
        onClose={closeClaimRGTModal}
      />
      <MoonpayModal isOpen={isMoonpayModalOpen} onClose={closeMoonpayModal} />
      <Buttons
        openModal={authedOpenSettingsModal}
        openClaimRGTModal={authedOpenClaimRGTModal}
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
  openClaimRGTModal,
  openMoonpayModal,
}: {
  openModal: () => any;
  openClaimRGTModal: () => any;
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

  return (
    <Row mainAxisAlignment="center" crossAxisAlignment="center">
      {isNetworkChangeable ? (
        <Button
          justifyContent="left"
          onClick={() => switchChainId(rari.userWallet?.appChainId)}
        >
          <Image src="/static/metamask.svg" h={"7"} mr={"2"} />
          Switch to {chainIdToName[rari.userWallet?.appChainId]}
        </Button>
      ) : (
        <DashboardBox
          ml={isMobile ? 0 : 2}
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
  openClaimRGTModal,
  openMoonpayModal,
}: {
  isOpen: boolean;
  onClose: () => any;
  openClaimRGTModal: () => any;
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
            <Link isExternal href="https://docs.rari.capital/">
              <Text mx={2} text="sm" textDecoration="underline">
                {t("Developer Docs")}
              </Text>
            </Link>
            <Link
              isExternal
              href="https://www.notion.so/Rari-Capital-3d762a07d2c9417e9cd8c2e4f719e4c3"
            >
              <Text mx={2} text="sm" textDecoration="underline">
                {t("Learn")}
              </Text>
            </Link>
            <Link
              isExternal
              href="https://info.rari.capital/security/#smart-contract-audits"
            >
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
