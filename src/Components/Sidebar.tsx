import { Box, Tab, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import React, { FC, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Conversations from "Components/Conversations";
import Contacts from "Components/Contacts";
import { useStoreState } from "Stores";

interface SidebarProps {}
const CONVERSATIONS_KEY = "CONVERSATIONS";
const CONTACTS_KEY = "CONTACTS";
const sidebarTabs = [CONVERSATIONS_KEY, CONTACTS_KEY];
const Sidebar: FC<SidebarProps> = (props) => {
  const [tab, setTab] = useState<string>(sidebarTabs[0]);
  const { userId } = useStoreState(({ AppStore: { userId } }) => ({ userId }));
  const classes = useStyles();
  return (
    <Box width={300} display="flex" flexDirection="column">
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(_: any, newValue: string) => setTab(newValue)}
            aria-label="lab API tabs example"
          >
            {sidebarTabs.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </TabList>
        </Box>
        <TabPanel className={classes.tabPanel} value={CONVERSATIONS_KEY}>
          <Conversations />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={CONTACTS_KEY}>
          <Contacts />
        </TabPanel>
      </TabContext>
      <Box mt={"auto"} mb={0}>
        Your id: <Typography color="textSecondary">{userId}</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
const useStyles: () => Record<string, string> = makeStyles((theme: Theme) =>
  createStyles({
    tabPanel: {
      padding: theme.spacing(3, 0),
    },
  })
);
