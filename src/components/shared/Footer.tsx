import CopyrightSpacer from "./CopyrightSpacer";
import { Link, Text, useColorModeValue } from "@chakra-ui/react";
import { Row, Column } from "utils/chakraUtils";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const textColor = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("gray.50", "gray.800");
  return (
    <>
      <Column
        mainAxisAlignment="center"
        crossAxisAlignment="center"
        py={3}
        width="100%"
        flexShrink={0}
        mt="auto"
        bgColor={bgColor}
      >
        <Row
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          mt={4}
          width="100%"
        >
          <Link isExternal href="https://docs.market.xyz">
            <Text color={textColor} mx={2} text="sm" textDecoration="underline">
              {t("Developer Docs")}
            </Text>
          </Link>

          <Text color={textColor} text="sm">
            &middot;
          </Text>

          <Link isExternal href="https://docs.market.xyz/audit-reports">
            <Text color={textColor} mx={2} text="sm" textDecoration="underline">
              {t("Audits")}
            </Text>
          </Link>
        </Row>
        <CopyrightSpacer forceShow />
      </Column>
    </>
  );
};

export default Footer;
