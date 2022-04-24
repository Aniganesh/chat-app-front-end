import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React, { FC } from "react";
import { useStoreState, useStoreActions } from "Stores";
import { v4 as uuid } from "uuid";

interface NewConversationProps {
  handleClose: () => void;
}

const NewConversation: FC<NewConversationProps> = ({ handleClose }) => {
  const { contacts } = useStoreState(({ ContactsStore: { contacts } }) => ({
    contacts,
  }));
  const { addConversation } = useStoreActions(
    ({ ConversationsStore: { addConversation } }) => ({ addConversation })
  );
  const handleSubmit = (
    values: { recipients: string[] },
    formikHelpers: FormikHelpers<{ recipients: string[] }>
  ) => {
    addConversation({ id: uuid(), ...values });
    handleClose();
  };
  return (
    <Box p={2} minWidth={350}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Typography>New Conversation</Typography>
        <Fab size="small" onClick={handleClose}>
          <Close />
        </Fab>
      </Box>
      <Formik<{ recipients: string[] }>
        initialValues={{ recipients: [] }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form>
            <Box display="flex" flexDirection="column">
              {contacts?.map((contact) => (
                <FormControlLabel
                  value={contact.id}
                  control={<Checkbox name="recipients" />}
                  key={contact.id}
                  label={contact.name}
                  onChange={handleChange}
                  checked={values.recipients.includes(contact.id)}
                />
              ))}
            </Box>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NewConversation;
