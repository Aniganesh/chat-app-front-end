import React, { FC } from "react";
import { Form, Formik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useStoreActions } from "Stores";
import { v4 as uuid } from "uuid";

interface LoginProps {}

const Login: FC<LoginProps> = (props) => {
  const { setUserId } = useStoreActions(({ AppStore: { setUserId } }) => ({
    setUserId,
  }));
  const handleSubmit = ({ userId }: { userId: string }) => {
    setUserId(userId);
  };
  const handleCreateNewUUID = () => {
    handleSubmit({ userId: uuid() });
  };
  return (
    <Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ userId: "" }}
        validationSchema={validationSchema}
      >
        {({ handleChange, isSubmitting, isValid }) => (
          <Form>
            <Box
              display="flex"
              flexDirection="column"
              maxWidth={300}
              margin="0 auto"
              sx={{ gap: 2.5 }}
            >
              <Typography>Login</Typography>
              <TextField
                onChange={handleChange}
                label="User id"
                name="userId"
              />
              {/* <TextField
                onChange={handleChange}
                label="Password"
                type="password"
                name="password"
              /> */}
              <Button
                type="submit"
                color="primary"
                disabled={!isValid || isSubmitting}
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Button
        onClick={handleCreateNewUUID}
        color="secondary"
        variant="contained"
      >
        Create a new id
      </Button>
    </Box>
  );
};

export default Login;

const validationSchema = Yup.object({
  userId: Yup.string().required("User id is required"),
//   password: Yup.string().required("Password is required"),
});
