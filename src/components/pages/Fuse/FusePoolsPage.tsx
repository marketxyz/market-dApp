import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import Footer from "components/shared/Footer";
import { useRari } from "context/RariContext";
import { useFusePools } from "hooks/fuse/useFusePools";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Column, Row, useIsMobile } from "utils/chakraUtils";
import DashboardBox from "../../shared/DashboardBox";
import { Header } from "../../shared/Header";
import { ModalDivider } from "../../shared/Modal";
import FusePageLayout from "./FusePageLayout";
import FuseStatsBar from "./FuseStatsBar";
import FuseTabBar, { useFilter } from "./FuseTabBar";
import { FuseDashNav } from "./FuseDashNav";

const FusePoolsPage = memo(() => {
  const { isAuthed } = useRari();
  const isMobile = useIsSmallScreen();

  return (
    <FusePageLayout>
      <FuseStatsBar />
      <FuseDashNav isAuthed={isAuthed} isFuse />
    </FusePageLayout>
  );
});

export default FusePoolsPage;

const PoolList = () => {
  const filter = useFilter();
  const { t } = useTranslation();

  const { filteredPools } = useFusePools(filter);
  const isMobile = useIsMobile();

  return (
    <>
      <Column
        mainAxisAlignment="flex-start"
        crossAxisAlignment="flex-start"
        expand
      >
        <Row
          mainAxisAlignment="flex-start"
          crossAxisAlignment="center"
          height="45px"
          width="100%"
          flexShrink={0}
          pl={4}
          pr={1}
        >
          <Text fontWeight="bold" width={isMobile ? "100%" : "40%"}>
            {!isMobile ? t("Pool Assets") : t("Pool Directory")}
          </Text>

          {isMobile ? null : (
            <>
              <Text fontWeight="bold" textAlign="center" width="13%">
                {t("Pool Number")}
              </Text>

              <Text fontWeight="bold" textAlign="center" width="16%">
                {t("Total Supplied")}
              </Text>

              <Text fontWeight="bold" textAlign="center" width="16%">
                {t("Total Borrowed")}
              </Text>

              <Text fontWeight="bold" textAlign="center" width="15%">
                {t("Pool Risk Score")}
              </Text>
            </>
          )}
        </Row>

        <ModalDivider />
      </Column>
    </>
  );
};
