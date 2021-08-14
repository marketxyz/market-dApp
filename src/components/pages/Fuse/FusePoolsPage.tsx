import {
  SimpleGrid as Grid,
  Spinner,
  Center,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/react";
import PageTransitionLayout from "components/shared/PageTransitionLayout";
import { useRari } from "context/RariContext";
import { useFusePools } from "hooks/fuse/useFusePools";
import { useIsSmallScreen } from "hooks/useIsSmallScreen";
import { memo, useState } from "react";
import { FuseDashNav } from "./FuseDashNav";
import FusePageLayout from "./FusePageLayout";
import PoolCard from "./FusePoolCard";
import FuseStatsBar from "./FuseStatsBar";
import { useFilter } from "./FuseTabBar";

const FusePoolsPage = memo(() => {
  return (
    <PageTransitionLayout>
      <FusePageLayout>
        <FuseStatsBar />
        <FuseDashNav isFuse />
        <PoolList />
      </FusePageLayout>
    </PageTransitionLayout>
  );
});

export default FusePoolsPage;

const PoolList = () => {
  const filter = useFilter();
  const { filteredPools }: any = useFusePools(filter);

  const [currentPage, setCurrentPage] = useState(1);
  const poolsPerPage = 6;
  const indexOfLastPool = currentPage * poolsPerPage;
  const indexOfFirstPool = indexOfLastPool - poolsPerPage;
  const currentPools = filteredPools?.slice(indexOfFirstPool, indexOfLastPool);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return filteredPools ? (
    <>
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
        {currentPools.map((pool: any, index: any) => {
          return <PoolCard data={pool} />;
        })}
      </Grid>
      <Box
        maxW={{ lg: "1200px" }}
        w="100%"
        mx="auto"
        mb="10"
        textAlign="center"
      >
        <Pagination
          currentPage={currentPage}
          poolsPerPage={poolsPerPage}
          totalPools={filteredPools.length}
          paginate={paginate}
        />
      </Box>
    </>
  ) : (
    <Center width="100%">
      <Spinner my={40} />
    </Center>
  );
};

const Pagination = ({
  totalPools,
  poolsPerPage,
  paginate,
  currentPage,
}: any) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPools / poolsPerPage); i++) {
    pageNumbers.push(i);
  }

  const selectedProps = {
    bgGradient: "linear(to-bl, #9b61cd, #f21587)",
    color: "#FFF",
  };
  const unSelectedProps = {
    bg: "white",
    _hover: { bg: "gray.100" },
    color: "#606060",
  };

  return (
    <Box py="4" width="100%">
      {pageNumbers.map((num: any) => (
        <Text
          {...(currentPage === num ? selectedProps : unSelectedProps)}
          fontSize="lg"
          display="inline"
          px="4"
          py="2"
          borderRadius="5px"
          onClick={() => paginate(num)}
          cursor="pointer"
          shadow="lg"
          mx="2"
          borderColor={"black"}
        >
          {num}
        </Text>
      ))}
    </Box>
  );
};
