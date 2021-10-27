import { DeleteIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  Input,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { RowOrColumn, Row, Center, useWindowSize } from "utils/chakraUtils";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useIsSmallScreen } from "../../../hooks/useIsSmallScreen";
import DashboardBox from "../../shared/DashboardBox";
import { Link as RouterLink } from "react-router-dom";

const activeStyle = { bg: "#2f2f2f", color: "white" };

const noop = {};

export function useFilter() {
  return new URLSearchParams(useLocation().search).get("filter");
}

export function useSort() {
  return new URLSearchParams(useLocation().search).get("sort");
}

function useIsMediumScreen() {
  const { width } = useWindowSize();
  return width < 1150;
}
const FuseTabBar = () => {
  const isMobile = useIsSmallScreen();
  const isMediumScreen = useIsMediumScreen();

  const { t } = useTranslation();

  let { poolId } = useParams();

  let navigate = useNavigate();

  const filter = useFilter();
  const location = useLocation();

  const bgColor = useColorModeValue("white", "gray.900");

  return (
    <DashboardBox width="100%" mt={4} height={isMobile ? "auto" : "65px"}>
      <RowOrColumn
        isRow={!isMobile}
        expand
        mainAxisAlignment="flex-start"
        crossAxisAlignment="center"
        bgColor={bgColor}
        borderRadius="9px"
        p={4}
      >
        <ButtonGroup size="sm" isAttached variant="outline" height="35px">
          <DashboardBox bgColor="#df2eac" height="35px">
            <Row
              pl={2}
              expand
              crossAxisAlignment="center"
              mainAxisAlignment="flex-start"
              fontWeight="bold"
            >
              <Text flexShrink={0}>Search:</Text>

              <Input
                value={filter ?? ""}
                onChange={(event) => {
                  const value = encodeURIComponent(event.target.value);

                  if (value) {
                    navigate("?filter=" + value);
                  } else {
                    navigate("");
                  }
                }}
                width="185px"
                height="100%"
                ml={2}
                placeholder={"Try searching for USDC"}
                variant="filled"
                size="sm"
                _placeholder={{ color: "#e0e0e0" }}
                _focus={{ bg: "#282727" }}
                _hover={{ bg: "#282727" }}
                bg="#282727"
                borderRadius={filter ? "0px" : "0px 9px 9px 0px"}
              />
            </Row>
          </DashboardBox>
          {filter ? (
            <DashboardBox bg="#282727" ml={-1}>
              <Link
                /* @ts-ignore */
                as={RouterLink}
                to=""
              >
                <Center expand pr={2} fontWeight="bold">
                  <DeleteIcon mb="2px" />
                </Center>
              </Link>
            </DashboardBox>
          ) : null}
        </ButtonGroup>

        <TabLink route="/fuse?filter=my-pools" text={"My Pools"} />
        <TabLink route="/" text={"All Pools"} />
        <TabLink route="/fuse?filter=created-pools" text={"Created Pools"} />
        <TabExternalLink
          route="https://metrics.market.xyz/goto/61kctV_Gk"
          text={"Metrics"}
        />

        {/* Show the liquidations link if is on mobile, large screen or not on a pool page. We do this to prevent the buttons from overflowing the tab bar on medium screens. */}
        {isMobile || !isMediumScreen || !poolId ? (
          <TabLink route="/fuse/liquidations" text={"Liquidations"} />
        ) : null}

        {poolId ? (
          <>
            <DashboardBox
              {...(!location.pathname.includes("info") ? activeStyle : {})}
              ml={isMobile ? 0 : 4}
              mt={isMobile ? 4 : 0}
              height="35px"
            >
              <Link
                /* @ts-ignore */
                as={RouterLink}
                to={`/pool/${poolId}`}
                className="no-underline"
              >
                <Center expand px={2} fontWeight="bold">
                  {`Pool #${poolId}`}
                </Center>
              </Link>
            </DashboardBox>

            <DashboardBox
              {...(location.pathname.includes("info") ? activeStyle : {})}
              ml={isMobile ? 0 : 4}
              mt={isMobile ? 4 : 0}
              height="35px"
            >
              <Link
                /* @ts-ignore */
                as={RouterLink}
                to={`/pool/${poolId}/info`}
                className="no-underline"
              >
                <Center expand px={2} fontWeight="bold">
                  {`Pool #${poolId} Info`}
                </Center>
              </Link>
            </DashboardBox>
          </>
        ) : null}

        {/* <NewPoolButton /> */}
      </RowOrColumn>
    </DashboardBox>
  );
};

const TabLink = ({ route, text }: { route: string; text: string }) => {
  const isMobile = useIsSmallScreen();

  const location = useLocation();

  const bgColor = useColorModeValue("white", "#28292D");
  const textColor = useColorModeValue("black", "white");

  return (
    <Link
      /* @ts-ignore */
      as={RouterLink}
      className="no-underline"
      color={textColor}
      borderRadius="10px"
      to={route}
      ml={isMobile ? 0 : 4}
      mt={isMobile ? 4 : 0}
    >
      <DashboardBox
        height="35px"
        bgColor={bgColor}
        borderRadius="10px"
        padding="2px"
        {...(route ===
        location.pathname.replace(/\/+$/, "") + window.location.search
          ? activeStyle
          : noop)}
      >
        <Center expand px={2} fontWeight="bold">
          {text}
        </Center>
      </DashboardBox>
    </Link>
  );
};

const TabExternalLink = ({ route, text }: { route: string; text: string }) => {
  const isMobile = useIsSmallScreen();
  const bgColor = useColorModeValue("white", "#28292D");
  const textColor = useColorModeValue("black", "white");

  return (
    <Link
      className="no-underline"
      href={route}
      color={textColor}
      borderRadius="10px"
      isExternal
      ml={isMobile ? 0 : 4}
      mt={isMobile ? 4 : 0}
    >
      <DashboardBox bgColor={bgColor} height="35px">
        <Center expand px={2} fontWeight="bold">
          {text}
        </Center>
      </DashboardBox>
    </Link>
  );
};

// eslint-disable-next-line
const NewPoolButton = () => {
  const isMobile = useIsSmallScreen();
  const { t } = useTranslation();

  const location = useLocation();

  return (
    <DashboardBox
      mt={isMobile ? 4 : 0}
      ml={isMobile ? 0 : "auto"}
      height="35px"
      {...("/fuse/new-pool" ===
      location.pathname.replace(/\/+$/, "") + window.location.search
        ? activeStyle
        : noop)}
    >
      <Link
        /* @ts-ignore */
        as={RouterLink}
        to={`/fuse/new-pool`}
        className="no-underline"
      >
        <Center expand pl={2} pr={3} fontWeight="bold">
          <SmallAddIcon mr={1} /> {t("New Pool")}
        </Center>
      </Link>
    </DashboardBox>
  );
};

export default FuseTabBar;
