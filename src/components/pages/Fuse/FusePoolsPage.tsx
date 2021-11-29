import {
  SimpleGrid as Grid,
  Spinner,
  Center,
  Text,
  Box,
  TextProps,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import PageTransitionLayout from "components/shared/PageTransitionLayout";
import { useFusePools } from "hooks/fuse/useFusePools";
import { memo, useMemo, useState } from "react";
import { FuseDashNav } from "./FuseDashNav";
import FusePageLayout from "./FusePageLayout";
import PoolCard from "./FusePoolCard";
import FuseStatsBar from "./FuseStatsBar";
import { useFilter, useSort } from "./FuseTabBar";

const FusePoolsPage = memo(() => {
  return (
    <PageTransitionLayout>
      <FusePageLayout>
        <FuseStatsBar />
        <Divider />
        <FuseDashNav isFuse />
        <PoolList />
      </FusePageLayout>
    </PageTransitionLayout>
  );
});

export default FusePoolsPage;

const usePoolSorting = (pools: any, sortBy: string | null): any => {
  const [sortedPools, setSortedPools] = useState(pools);
  useMemo(() => {
    setSortedPools(
      pools?.sort((a: any, b: any) => {
        if (!sortBy || sortBy.toLowerCase() === "supply") {
          if (b.suppliedUSD > a.suppliedUSD) {
            return 1;
          }

          if (b.suppliedUSD < a.suppliedUSD) {
            return -1;
          }
        } else {
          if (b.borrowedUSD > a.borrowedUSD) {
            return 1;
          }

          if (b.borrowedUSD < a.borrowedUSD) {
            return -1;
          }
        }
        return b.id > a.id ? 1 : -1;
      })
    );
  }, [pools, sortBy]);

  return sortedPools;
};

const PoolList = () => {
  const filter = useFilter();
  const sortBy = useSort();
  const { filteredPools: filteredPoolsList }: any = useFusePools(filter);
  const filteredPools = usePoolSorting(filteredPoolsList, sortBy);

  const [currentPage, setCurrentPage] = useState(1);
  const poolsPerPage = 6;
  const indexOfLastPool = currentPage * poolsPerPage;
  const indexOfFirstPool = indexOfLastPool - poolsPerPage;
  const currentPools = filteredPools?.slice(indexOfFirstPool, indexOfLastPool);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return filteredPools ? (
    <>
      {currentPools.length ? (
        <Grid
          templateRows={{
            base: "repeat(1, minmax(0, 1fr))",
            lg: "repeat(2, minmax(0, 1fr))",
          }}
          autoFlow="row"
          columns={{ base: 1, md: 2, lg: 2, xl: 3 }}
          my="2rem"
          w={"90%"}
          mx="auto"
          gridGap="8"
          gridRowGap="8"
        >
          {currentPools.map((pool: any) => {
            return <PoolCard data={pool} key={pool.id} />;
          })}
        </Grid>
      ) : (
        <Box
          alignSelf={"center"}
          textAlign="center"
          width="90%"
          py="20"
          fontSize="3xl"
          fontWeight="semibold"
        >
          <Text>No Pools Found</Text>
        </Box>
      )}
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

  const selectedProps: TextProps = {
    bgGradient: useColorModeValue("linear(to-br, rgba(202, 0, 102, 1), rgba(144, 49, 217, 0.75))", "linear(to-br, rgba(202, 0, 102, 0.6), rgba(144, 49, 217, 0.75))"),
    color: "#FFF",
  };
  const unSelectedProps: TextProps = {
    bg: useColorModeValue("white", "gray.700"),
    _hover: { bg: useColorModeValue("gray.100", "gray.600") },
    color: useColorModeValue("#606060", "white"),
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
          fontWeight={"bold"}
          borderColor={"black"}
          key={num}
        >
          {num}
        </Text>
      ))}
    </Box>
  );
};
