import { Close } from "@mui/icons-material";
import { Box, Button, Fab, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React, { FC } from "react";
import { useStoreActions } from "Stores";

interface NewContactProps {
  handleClose: () => void;
}

const NewContact: FC<NewContactProps> = ({ handleClose }) => {
  const { addContact } = useStoreActions(
    ({ ContactsStore: { addContact } }) => ({ addContact })
  );
  const handleSubmit = (
    values: { name: string; id: string },
    helpers: FormikHelpers<{ name: string; id: string }>
  ) => {
    addContact(values);
    helpers.resetForm();
  };
  return (
    <Box p={4} minWidth={350}>
      <Box
        display="flex"
        justifyContent={"space-between"}
        flexDirection={"row-reverse"}
        alignItems={"center"}
        py={2}
      >
        <Fab size="small" onClick={handleClose}>
          <Close />
        </Fab>
        <Typography variant="h5">New contact</Typography>
      </Box>
      <Formik initialValues={{ name: "", id: "" }} onSubmit={handleSubmit}>
        {({ handleChange, isSubmitting, isValid }) => (
          <Form>
            <Box
              display="flex"
              flexDirection="column"
              maxWidth={300}
              margin="0 auto"
              sx={{ gap: 2.5 }}
            >
              <TextField
                onChange={handleChange}
                label="New contact name"
                name="name"
              />
              <TextField onChange={handleChange} label="Contact id" name="id" />
              <Button
                onClick={handleClose}
                type="submit"
                color="primary"
                disabled={!isValid || isSubmitting}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NewContact;
