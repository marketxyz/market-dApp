import { MouseEventHandler } from "react";

import {
  Box,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import { PixelSize, Row } from "utils/chakraUtils";

import { useTranslation } from "react-i18next";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";

export const FuseDashNav = ({
  isAuthed,
  isPool,
  isFuse,
  padding,
}: {
  isAuthed: boolean;
  isFuse?: boolean;
  isPool?: boolean;
  padding?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Row
      color="#000000"
      paddingTop="20px"
      mainAxisAlignment="space-between"
      crossAxisAlignment="center"
      overflowX="visible"
      overflowY="visible"
      width="100%"
      borderBottom="1px solid #D8D8D8"
      borderTop="1px solid #D8D8D8"
      backgroundColor="#FFFFFF"
    >

        <Row
            mainAxisAlignment="space-between"
            crossAxisAlignment="center"
            maxWidth="1200px"
            marginRight="auto"
            marginLeft="auto"
            width="100%"
        >

            <Tabs>
                <TabList>
                    <Tab style={tabStyles} _selected={selectedTabStyles}>Your Pools</Tab>
                    <Tab style={tabStyles} _selected={selectedTabStyles}>All Pools</Tab>
                    <Tab style={tabStyles} _selected={selectedTabStyles}>Token</Tab>
                </TabList>
            </Tabs>

            <InputGroup paddingBottom="15px" width="35%">
                <InputLeftAddon
                    pointerEvents="none"
                    children={<SearchIcon color="#62526A" />}
                    backgroundColor="#FFFFFF"
                    borderRight="none"
                />
                <Input type="tel" placeholder="Search..." />
            </InputGroup>

        </Row>
    </Row>
  );
};

const selectedTabStyles = {
    borderColor: "pink"
}

const tabStyles = {
    paddingBottom: "20px"
}