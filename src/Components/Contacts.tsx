import { Box, Button, Dialog, MenuItem, Divider } from "@mui/material";
import { useStoreState } from "Stores";
import React, { FC, useState } from "react";
import NewContact from "./NewContact";

interface ContactsProps {}

const Contacts: FC<ContactsProps> = (props) => {
  const [open, setOpen] = useState(false);
  const { contacts } = useStoreState(({ ContactsStore: { contacts } }) => ({
    contacts,
  }));

  return (
    <Box position="relative" width="100%">
      {contacts?.map((contact) => (
        <React.Fragment key={contact.id}>
          <MenuItem
            key={contact.id}
            onClick={() => {
              console.log({ contact });
            }}
          >
            {contact.name}
          </MenuItem>
          <Divider />
        </React.Fragment>
      ))}
      <Box position="sticky" mt="auto" bottom={0} mx={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            setOpen(true);
          }}
        >
          New Contact
        </Button>
      </Box>
      <Dialog open={open}>
        <Box display="flex" justifyContent="center" flexDirection={"column"}>
          <NewContact handleClose={() => setOpen(false)} />
        </Box>
      </Dialog>
    </Box>
  );
};

export default Contacts;
