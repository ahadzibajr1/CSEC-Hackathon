import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form } from "formik-semantic-ui-react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useStore } from "./LogIn/StoreContext";
import { changePassword, logIn } from "../api/users";
import { jwtDecode } from "jwt-decode";
import InputField from "./InputField";

const StyledTopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 5rem;
  margin-top: 3rem;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem;
`;

const TopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  padding-top: 2rem;
  padding-bottom: 1.5rem;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const initialValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .min(8, "Must be 8 characters or more")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

function ChangePassword() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await changePassword(values);
      toast.success("Password changed");
      navigate("/test-results/all");
    } catch (err) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <StyledTopContainer>
          <Form>
            <h1>Change Password</h1>
            <TopInfo>
              <InputField
                label="Old Password"
                name="oldPassword"
                type="password"
                placeholder="***********"
              />

              <InputField
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="***********"
              />

              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="***********"
              />
            </TopInfo>

            <ButtonGroup>
              <FullWidthButton
                type="submit"
                content="Change Password"
                color="teal"
              />
            </ButtonGroup>
          </Form>
        </StyledTopContainer>
      )}
    </Formik>
  );
}

export default ChangePassword;
