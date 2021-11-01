import { Avatar, useColorModeValue } from "@chakra-ui/react";
import { useTokenData } from "hooks/useTokenData";

const CTokenIcon = ({
  address,
  ...avatarProps
}: {
  address: string;
  [key: string]: any;
}) => {
  const tokenData = useTokenData(address);
  const tokenBg = useColorModeValue("gray.50", "gray.700")

  return (
    <Avatar
      {...avatarProps}
      key={address}
      bg={tokenBg}
      borderWidth="1px"
      name={tokenData?.symbol ?? "Loading..."}
      src={
        tokenData?.logoURL ??
        "https://raw.githubusercontent.com/feathericons/feather/master/icons/help-circle.svg"
      }
    />
  );
};

export default CTokenIcon;
