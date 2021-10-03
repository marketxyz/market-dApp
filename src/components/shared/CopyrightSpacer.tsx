import { Text, useColorModeValue } from "@chakra-ui/react";

const CopyrightSpacer = ({ forceShow = false }: { forceShow?: boolean }) => {
  const textColor = useColorModeValue("black", "white");
  return (
    <Text
      color={textColor}
      fontSize="xs"
      display={forceShow ? "block" : { md: "none", base: "block" }}
      textAlign="center"
      width="100%"
      bottom={0}
      py={2}
      mt="auto"
    >
      Fronted by Marsbase Inc, BVI. Protocol by Market DAO.
    </Text>
  );
};

export default CopyrightSpacer;
