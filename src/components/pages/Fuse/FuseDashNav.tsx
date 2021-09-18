import { Dispatch, useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  InputGroup,
  InputLeftAddon,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { SearchIcon } from "@chakra-ui/icons";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { useNavigate } from "react-router-dom";

// import { AddPoolButton } from "./AddPoolButton";
import { CreatePoolConfiguration } from "./FusePoolCreatePage";
import { useDebounce } from "../../../hooks/useDebounce";
import { useEffect } from "react";

export const FuseDashNav = (props: any) => {
  let navigate = useNavigate();

  const [createPoolModal, setCreatePoolModal] = useState(false);
  const [searchText, setSearchText] = useState(() => {
    const query = new URLSearchParams(window.location.search);
    return query.get("filter") ?? "";
  });
  const debouncedSearchTerm = useDebounce(searchText, 400);

  useEffect(() => {
    const value = encodeURIComponent(debouncedSearchTerm);

    if (value) {
      navigate("?filter=" + value);
    } else {
      navigate("");
    }
  }, [debouncedSearchTerm, navigate]);

  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("#e6e4e7", "gray.700");
  const isMobile = useIsSmallScreen();

  return (
    <>
      <Modal
        size="4xl"
        isOpen={createPoolModal}
        onClose={() => setCreatePoolModal(!createPoolModal)}
      >
        <ModalOverlay />
        <ModalContent p="5">
          <CreatePoolConfiguration />
        </ModalContent>
      </Modal>
      <Box
        color={textColor}
        overflowX="visible"
        overflowY="visible"
        w="100%"
        pt={4}
        borderTop={`1px solid`}
        borderColor={borderColor}
        backgroundColor={bgColor}
      >
        <Flex
          alignItems="center"
          direction={isMobile ? "column" : "row-reverse"}
          justifyContent={isMobile ? "center" : "space-between"}
          px={isMobile ? 0 : "8"}
        >
          <Box display="inline-block" mt={isMobile ? 3 : 0} ml={2}>
            <span style={{ display: "inline-block" }}>
              <InputGroup>
                <InputLeftAddon
                  pointerEvents="none"
                  children={<SearchIcon color="#d9d8da" opacity={"0.7"} />}
                  backgroundColor={bgColor}
                  border="2.5px solid"
                  borderColor="inherit"
                />
                <Input
                  _focus={{}}
                  _hover={{}}
                  border="2.5px solid #d9d8da"
                  fontSize="18px"
                  borderLeft="none"
                  borderRadius="11px"
                  paddingLeft="0px"
                  type="text"
                  value={searchText ?? ""}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="ETH, DAI, FRAX, etc."
                />
              </InputGroup>
            </span>
          </Box>

          <PoolButtons searchText={searchText} setSearchText={setSearchText} />
        </Flex>
      </Box>
    </>
  );
};

const PoolButtons = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: Dispatch<string>;
}) => {
  const { t } = useTranslation();
  const gradient = useColorModeValue(
    "linear-gradient(109.28deg, #F21587 1.05%, #B476EA 89.98%)",
    "linear-gradient(109.28deg, #F21587 1.05%, #B476EA 89.98%)"
  );
  const whiteAlpha = useColorModeValue("gray.200", "rgba(255, 255, 255, 0.08)");
  const selectedTextColor = "white";
  const unselectedTextColor = useColorModeValue("black", "white");
  const isAllPoolSelected = searchText === "";
  const isMyPoolSelected = searchText === "my-pools";
  return (
    <ButtonGroup spacing={3} mt={{ base: 4, lg: 0 }}>
      <Button
        borderRadius={"xl"}
        background={isAllPoolSelected ? gradient : whiteAlpha}
        opacity={isAllPoolSelected ? "1" : "0.8"}
        fontFamily={"heading"}
        _hover={{
          opacity: isAllPoolSelected ? "0.8" : "1",
        }}
        _active={{
          background: gradient,
          opacity: "1",
          color: selectedTextColor,
        }}
        color={isAllPoolSelected ? selectedTextColor : unselectedTextColor}
        onClick={() => setSearchText("")}
      >
        {t("All Pools")}
      </Button>
      <Button
        onClick={() => setSearchText("my-pools")}
        background={isMyPoolSelected ? gradient : whiteAlpha}
        opacity={isMyPoolSelected ? "1" : "0.8"}
        fontFamily={"heading"}
        color={isMyPoolSelected ? selectedTextColor : unselectedTextColor}
        _hover={{
          opacity: isMyPoolSelected ? "0.8" : "1",
        }}
        borderRadius={"xl"}
        _active={{
          background: gradient,
          opacity: "1",
          color: selectedTextColor,
        }}
      >
        {t("My Pools")}
      </Button>
    </ButtonGroup>
  );
};
