//@ts-nocheck

import { Box } from "@chakra-ui/react";
import { Column } from "utils/chakraUtils";
import Footer from "./Footer";

const Layout = ({ children }: { children: any }) => {
  return (
    <Column height="100%" flex={1}>
      {children}
      <Footer />
    </Column>
  );
};

export default Layout;
