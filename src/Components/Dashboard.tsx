import { Box } from "@mui/material";
import React, { FC, useEffect } from "react";
import Sidebar from "Components/Sidebar";
import OpenConversation from "./OpenConversation";
import { useStoreActions, useStoreState } from "Stores";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = (props) => {
  const { userId } = useStoreState(({ AppStore: { userId } }) => ({ userId }));
  const { createSocket, destroySocket } = useStoreActions(
    ({ SocketStore: { createSocket, destroySocket } }) => ({
      createSocket,
      destroySocket,
    })
  );
  useEffect(() => {
    if (userId) {
      createSocket(userId);
      console.log("Socket created!");
    }

    return () => {
      destroySocket();
    };
  }, [createSocket, destroySocket, userId]);

  return (
    <Box display="flex">
      <Sidebar />
      <OpenConversation />
    </Box>
  );
};

export default Dashboard;
