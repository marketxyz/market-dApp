import {
  SimpleGrid as Grid,
  Spinner,
  Center,
  Text,
  Box,
  TextProps,
  useColorModeValue,
} from "@chakra-ui/react";
import PageTransitionLayout from "components/shared/PageTransitionLayout";
import { useFusePools } from "hooks/fuse/useFusePools";
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
      {currentPools.length ? (
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
            return <PoolCard data={pool} key={pool.id} />;
          })}
        </Grid>
      ) : (
        <Box
          textAlign="center"
          width="100%"
          py="10"
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
    bgGradient: "linear(to-bl, #9b61cd, #f21587)",
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
          borderColor={"black"}
          key={num}
        >
          {num}
        </Text>
      ))}
    </Box>
  );
};
