import { MouseEventHandler } from "react";

import {
  Box,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  InputGroup,
  InputLeftAddon,
  Input,
  Center,
} from "@chakra-ui/react";
import { PixelSize, Row, useWindowSize } from "utils/chakraUtils";

import { useTranslation } from "react-i18next";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import DashboardBox from "components/shared/DashboardBox";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFilter } from "./FuseTabBar";

import { Link as RouterLink } from "react-router-dom";

const activeStyle = { bg: "#FFF", color: "#000" };
const noop = {};
const selectedTabStyles = {borderColor: "#DF2EAC", fontSize: "18px"}
const tabStyles = {paddingBottom: "20px", fontSize: "18px"}

export const FuseDashNav = ({
  isAuthed,
  isPool,
  isFuse,
  padding,
}: {
  isAuthed: boolean;
  isFuse?: boolean;
  isPool?: boolean;
  padding?: boolean;
}) => {
  const { t } = useTranslation();

  let { poolId } = useParams();

  let navigate = useNavigate();

  const filter = useFilter();
  const location = useLocation();

  return (
    <Row
      color="#000000"
      paddingTop="15px"
      mainAxisAlignment="space-between"
      crossAxisAlignment="center"
      overflowX="visible"
      overflowY="visible"
      width="100%"
      borderBottom="1px solid #e6e4e7"
      borderTop="1px solid #e6e4e7"
      backgroundColor="#FFFFFF"
    >

        <Row
            mainAxisAlignment="space-between"
            crossAxisAlignment="center"
            maxWidth="1200px"
            marginRight="auto"
            marginLeft="auto"
            width="100%"
        >

          <Tabs defaultIndex={1}>
              <TabList>
                  <Tab _selected={selectedTabStyles}>
                    <TabLink route="/fuse?filter=my-pools" text={t("Your Pools")} />
                  </Tab>
                  <Tab  _selected={selectedTabStyles}>
                    <TabLink route="/fuse" text={t("All Pools")} />
                  </Tab>
                  <Tab _selected={selectedTabStyles}>
                    <TabLink route="/fuse" text={t("Token")} />
                  </Tab>
              </TabList>
          </Tabs>

          <InputGroup paddingBottom="15px" width="35%">
              <InputLeftAddon
                  pointerEvents="none"
                  children={<SearchIcon color="#62526A" />}
                  backgroundColor="#FFFFFF"
                  border="2.5px solid #d9d8da"
              />
              <Input
                _focus={{outline: "none"}}
                _hover={{}}
                border="2.5px solid #d9d8da"
                fontSize="18px"
                borderLeft="none"
                borderRadius="11px"
                type="text"
                value={filter ?? ""}
                onChange={(event) => {
                  const value = encodeURIComponent(event.target.value);

                  if (value) {
                    navigate("?filter=" + value);
                  } else {
                    navigate("");
                  }
                }}
                placeholder="Try searching for USDC"
              />
          </InputGroup>

        </Row>
    </Row>
  );
};

// copied code

const TabLink = ({ route, text }: { route: string; text: string }) => {
  const isMobile = useIsSmallScreen();

  const location = useLocation();

  return (
    <Link
      /* @ts-ignore */
      style={tabStyles}
      as={RouterLink}
      className="no-underline"
      to={route}
      ml={isMobile ? 0 : 4}
      mt={isMobile ? 4 : 0}
      {...(route ===
      location.pathname.replace(/\/+$/, "") + window.location.search
        ? activeStyle
        : noop)}
    >
        {text}
    </Link>
  );
};

const TabExternalLink = ({ route, text }: { route: string; text: string }) => {
  const isMobile = useIsSmallScreen();

  return (
    <Link
      className="no-underline"
      href={route}
      isExternal
      ml={isMobile ? 0 : 4}
      mt={isMobile ? 4 : 0}
    >
      <DashboardBox height="35px">
        <Center expand px={2} fontWeight="bold">
          {text}
        </Center>
      </DashboardBox>
    </Link>
  );
};