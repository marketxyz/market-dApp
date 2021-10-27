import { Tooltip, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export const SimpleTooltip = ({
  label,
  children,
  placement,
}: {
  label: string;
  placement?:
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  children: ReactNode;
}) => {

  const bgColor = useColorModeValue("#faf7fa", "#2f2f2f")
  const textColor = useColorModeValue("#2f2f2f", "#f2f2f2")

  return (
    <Tooltip
      p={2}
      borderRadius={"12px"}
      hasArrow
      bg={bgColor}
      textAlign="center"
      textColor={textColor}
      zIndex={999999999}
      placement={placement ?? "top"}
      aria-label={label}
      label={label}
    >
      {children}
    </Tooltip>
  );
};
