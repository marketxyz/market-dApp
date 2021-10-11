import { Box, BoxProps } from "@chakra-ui/react";
import { PixelMeasurement } from "utils/chakraUtils";

export const DASHBOARD_BOX_SPACING = new PixelMeasurement(15);

export const DASHBOARD_BOX_PROPS = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
};

const DashboardBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box {...DASHBOARD_BOX_PROPS} {...props}>
      {children}
    </Box>
  );
};

export default DashboardBox;
