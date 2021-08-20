import { useState } from "react";

import {
  Box,
  Link,
  Tab,
  TabList,
  Tabs,
  InputGroup,
  InputLeftAddon,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { Row } from "utils/chakraUtils";

import { useTranslation } from "react-i18next";
import { SearchIcon } from "@chakra-ui/icons";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { useNavigate } from "react-router-dom";

// import { AddPoolButton } from "./AddPoolButton";
import { CreatePoolConfiguration } from "./FusePoolCreatePage";
import { useDebounce } from "../../../hooks/useDebounce";
import { useEffect } from "react";

const selectedTabStyles = {
  borderBottomWidth: "3.5px",
  borderColor: "#DF2EAC",
  fontSize: "18px",
  fontWeight: "800",
};
const tabStyles = { paddingBottom: "8px", fontSize: "18px" };

export const FuseDashNav = (props: any) => {
  const { t } = useTranslation();
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
        borderBottom={`1px solid`}
        borderTop={`1px solid`}
        borderColor={borderColor}
        backgroundColor={bgColor}
      >
        <Row
          mainAxisAlignment="space-between"
          crossAxisAlignment="center"
          maxWidth="1200px"
          marginRight="auto"
          marginLeft="auto"
          width="100%"
        >
          <Tabs index={searchText === "my-pools" ? 1 : 0}>
            <TabList>
              <Tab _active={{ bg: "none" }} _selected={selectedTabStyles}>
                <TabBtn
                  onClick={() => setSearchText("")}
                  text={t("All Pools")}
                />
              </Tab>
              <Tab _active={{ bg: "none" }} _selected={selectedTabStyles}>
                <TabBtn
                  onClick={() => setSearchText("my-pools")}
                  text={t("My Pools")}
                />
              </Tab>
              {/* <Tab _active={{ bg: "none" }} _selected={selectedTabStyles}>
                <TabLink route="/fuse" text={t("Token")} />
              </Tab> */}
            </TabList>
          </Tabs>

          <Box display="inline-block">
            <span style={{ display: "inline-block", marginRight: "15px" }}>
              <InputGroup marginBottom="10px">
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
                  placeholder="Try searching for USDC"
                />
              </InputGroup>
            </span>

            {/* <span style={{ display: "inline-block" }}>
              <AddPoolButton
                switchModalVisibility={() =>
                  setCreatePoolModal(!createPoolModal)
                }
              />
            </span> */}
          </Box>
        </Row>
      </Box>
    </>
  );
};

// copied code

const TabBtn = ({ onClick, text }: { onClick: any; text: string }) => {
  const isMobile = useIsSmallScreen();

  return (
    <Link
      /* @ts-ignore */
      style={tabStyles}
      onClick={onClick}
      fontWeight={"400"}
      background={"transparent"}
      _hover={{ background: "transparent" }}
      className="no-underline"
      ml={isMobile ? 0 : 4}
      mt={isMobile ? 4 : 0}
    >
      {text}
    </Link>
  );
};

// const TabLink = ({ route, text }: { route: string; text: string }) => {
//   const isMobile = useIsSmallScreen();

//   const location = useLocation();

//   return (
//     <Link
//       /* @ts-ignore */
//       style={tabStyles}
//       href={route}
//       as={RouterLink}
//       className="no-underline"
//       to={route}
//       ml={isMobile ? 0 : 4}
//       mt={isMobile ? 4 : 0}
//       {...(route ===
//       location.pathname.replace(/\/+$/, "") + window.location.search
//         ? activeStyle
//         : noop)}
//     >
//       {text}
//     </Link>
//   );
// };

// const TabExternalLink = ({ route, text }: { route: string; text: string }) => {
//   const isMobile = useIsSmallScreen();

//   return (
//     <Link
//       className="no-underline"
//       href={route}
//       isExternal
//       ml={isMobile ? 0 : 4}
//       mt={isMobile ? 4 : 0}
//     >
//       <DashboardBox height="35px">
//         <Center expand px={2} fontWeight="bold">
//           {text}
//         </Center>
//       </DashboardBox>
//     </Link>
//   );
// };
