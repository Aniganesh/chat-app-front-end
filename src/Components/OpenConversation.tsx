import React, { FC, useEffect, useMemo, useRef } from "react";
import { useTheme } from "@mui/styles";
import { Box, Fab, TextField, Theme, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "Stores";
import { Form, Formik, FormikHelpers } from "formik";
import { Send } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

interface OpenConversationProps {}

const OpenConversation: FC<OpenConversationProps> = (props) => {
  const { currentConversationId, conversations, userId, socket } =
    useStoreState(
      ({
        AppStore: { currentConversationId, userId },
        ConversationsStore: { conversations },
        SocketStore: { socket },
      }) => ({ currentConversationId, conversations, userId, socket })
    );
  const { addMessageToConversation } = useStoreActions(
    ({ ConversationsStore: { addMessageToConversation } }) => ({
      addMessageToConversation,
    })
  );
  useEffect(() => {
    socket?.on("receive-message", addMessageToConversation);

    return () => {
      socket?.off("receive-message");
    };
  }, [addMessageToConversation, socket]);

  const currentConversation = useMemo(
    () => conversations?.find((c) => c.id === currentConversationId),
    [conversations, currentConversationId]
  );
  const lastMessage = useRef<HTMLDivElement | null>(null);
  const theme = useTheme<Theme>();
  const handleSubmit = (
    { message }: { message: string },
    formikHelpers: FormikHelpers<{ message: string }>
  ) => {
    if (message.trim())
      if (currentConversationId && socket) {
        socket.emit("send-message", {
          recipients: currentConversation?.recipients ?? [],
          message,
          conversationId: currentConversationId ?? uuidv4(),
        });
        addMessageToConversation({
          conversationId: currentConversationId,
          message,
          recipients: currentConversation?.recipients ?? [],
          sender: userId ?? "",
        });
        formikHelpers.resetForm();
      } else {
        console.log("missingSocket or conversationId", {
          currentConversationId,
          socket,
        });
      }
  };
  useEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    // console.log({ lastMessage });
  }, [currentConversation?.messages?.length]);

  if (!currentConversationId)
    return (
      <Box
        display="flex"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>Select a conversation to see it here</Typography>
      </Box>
    );
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      width="100%"
      height="100vh"
      pt={2}
      sx={{ backgroundColor: theme.palette.grey[200] }}
    >
      <Box overflow="auto" flex={1} maxHeight={"calc(100vh - 100px)"}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          px={3}
        >
          {currentConversation?.messages?.map((message, index) => {
            return (
              <Box
                key={index}
                ref={
                  index === (currentConversation.messages?.length ?? 0) - 1
                    ? lastMessage
                    : undefined
                }
                ml={message.fromMe ? "auto" : 0}
                mr={message.fromMe ? 0 : "auto"}
              >
                <Box
                  p={1}
                  pb={0.5}
                  borderRadius={2}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Typography>{message.text}</Typography>
                </Box>
                {message.fromMe ? (
                  <Typography color="textSecondary" variant="caption">
                    You
                  </Typography>
                ) : null}
              </Box>
            );
          })}
        </Box>
      </Box>
      <Formik initialValues={{ message: "" }} onSubmit={handleSubmit}>
        {({ handleChange, values }) => (
          <Form>
            <Box display="flex" alignItems="center" p={2}>
              <Box flex={1} p={2}>
                <TextField
                  name="message"
                  onChange={handleChange}
                  value={values["message"]}
                  fullWidth
                  multiline
                  maxRows={5}
                />
              </Box>
              <Fab type="submit" size="small">
                <Send />
              </Fab>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default OpenConversation;
