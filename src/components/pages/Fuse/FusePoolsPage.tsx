import { SimpleGrid as Grid, Spinner } from "@chakra-ui/react";
import { useRari } from "context/RariContext";
import { useFusePools } from "hooks/fuse/useFusePools";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { memo } from "react";
import { FuseDashNav } from "./FuseDashNav";
import FusePageLayout from "./FusePageLayout";
import PoolCard from "./FusePoolCard";
import FuseStatsBar from "./FuseStatsBar";
import { useFilter } from "./FuseTabBar";

const FusePoolsPage = memo(() => {
  const { isAuthed } = useRari();
  const isMobile = useIsSmallScreen();

  return (
    <FusePageLayout>
      <FuseStatsBar />
      <FuseDashNav isAuthed={isAuthed} isFuse />
      <PoolList />
    </FusePageLayout>
  );
});

export default FusePoolsPage;

const PoolList = () => {
  const filter = useFilter();
  const { filteredPools } = useFusePools(filter);

  return (
    <Grid
      templateRows={{
        base: "repeat(1, minmax(0, 1fr))",
        lg: "repeat(2, minmax(0, 1fr))",
      }}
      autoFlow="row"
      columns={{ base: 1, lg: 2 }}
      my="2rem"
      w={{ base: "90%", lg: "100%" }}
      maxW={{ lg: "1200px" }}
      mx="auto"
      gridGap="8"
    >
      {filteredPools ? (
        filteredPools.map((pool, index) => {
          return <PoolCard data={pool} />;
        })
      ) : (
        <Spinner my={8} />
      )}
    </Grid>
  );
};
