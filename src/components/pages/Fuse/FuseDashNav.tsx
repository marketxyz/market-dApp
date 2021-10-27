import { Dispatch, useState } from "react";

import {
  Text,
  Box,
  InputLeftElement,
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
  Select,
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
  const [sortBy, setSortBy] = useState(() => {
    const query = new URLSearchParams(window.location.search);
    return query.get("sort") ?? "";
  });

  useEffect(() => {
    const value = encodeURIComponent(debouncedSearchTerm);

    if (value) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.set("filter", value);

      navigate("?" + urlSearchParams.toString());
    } else {
      navigate("");
    }
  }, [debouncedSearchTerm, navigate]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (sortBy) {
      urlSearchParams.set("sort", sortBy);
      navigate("?" + urlSearchParams.toString());
    }
  }, [sortBy, navigate]);

  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("black", "white");
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
        w="90%"
        alignSelf="center"
        pt={4}
        backgroundColor={bgColor}
      >
        <Flex
          direction={isMobile ? "column" : "row-reverse"}
          justifyContent={isMobile ? "center" : "space-between"}
          alignItems={isMobile ? "center" : "space-between"}
        >
          <Box display="flex" mt={isMobile ? 3 : 0} ml={2}>
            <InputGroup mr={3} display={{ base: "none", lg: "flex" }}>
              <InputLeftElement
                children={<Text>Sort By</Text>}
                pointerEvents="none"
                width={"4.5rem"}
              />
              <Select
                pl={"4.5rem"}
                borderRadius="12px"
                _focus={{}}
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option value="supply">Highest Supply</option>
                <option value="borrow">Highest Borrow</option>
              </Select>
            </InputGroup>

            <span style={{ display: "inline-block" }}>
              <InputGroup width={"250px"}>
                <InputLeftAddon
                  pointerEvents="none"
                  children={<SearchIcon color="#d9d8da" opacity={"0.7"} />}
                  backgroundColor={bgColor}
                  border="2.5px solid"
                  borderColor="inherit"
                  borderRadius="12px"
                />
                <Input
                borderRadius="12px"
                  _focus={{}}
                  _hover={{}}
                  border="2.5px solid #d9d8da"
                  fontSize="18px"
                  borderLeft="none"
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
        All Pools
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
        My Pools
      </Button>
    </ButtonGroup>
  );
};
