import { Box, Button, Dialog, Divider, MenuItem, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { FC, useState } from "react";
import { useStoreActions, useStoreState } from "Stores";
import NewConversation from "./NewConversation";

interface ConversationsProps {}

const Conversations: FC<ConversationsProps> = (props) => {
  const [open, setOpen] = useState(false);
  const { conversations, contacts, currentConversationId } = useStoreState(
    ({
      ConversationsStore: { conversations },
      ContactsStore: { contacts },
      AppStore: { currentConversationId },
    }) => ({ conversations, contacts, currentConversationId })
  );
  const { setCurrentConversation } = useStoreActions(
    ({ AppStore: { setCurrentConversation } }) => ({ setCurrentConversation })
  );
  const getContactNameForId = (id: string): string => {
    return contacts?.find((contact) => contact.id === id)?.name ?? id;
  };
  const classes = useStyles();
  return (
    <Box position="relative" height="100%">
      {conversations?.map((conversation) => (
        <>
          <MenuItem
            className={`${classes.conversation} ${
              currentConversationId === conversation.id
                ? classes.selectedConversation
                : ""
            }`}
            onClick={() => {
              setCurrentConversation(conversation.id);
            }}
          >
            {conversation.recipients.map(getContactNameForId).join(", ")}
          </MenuItem>
          <Divider />
        </>
      ))}

      <Box position="sticky" bottom={0} mx={2} mt={"auto"}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setOpen(true)}
        >
          New Conversation
        </Button>
      </Box>
      <Dialog open={open}>
        <NewConversation handleClose={() => setOpen(false)} />
      </Dialog>
    </Box>
  );
};

export default Conversations;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    conversation: {
      flexWrap: "wrap",
      whiteSpace: "break-spaces",
    },
    selectedConversation: {
      backgroundColor: theme.palette.grey[100],
    },
  })
);
