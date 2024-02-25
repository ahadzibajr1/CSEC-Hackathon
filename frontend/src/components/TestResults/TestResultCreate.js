import { Formik } from "formik";
import { Form, SubmitButton } from "formik-semantic-ui-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Divider } from "semantic-ui-react";
import styled from "styled-components";
import InputSelect from "../InputSelect";
import * as Yup from "yup";

import InputField from "../InputField";
import { postTestResult } from "../../api/test-results";

const StyledContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

const StyledTopContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 5rem;
`;

const TopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const StyledHeader = styled.h1`
  margin-bottom: 2rem;
`;

const StyledButton = styled(SubmitButton)`
  padding-top: 1rem;
  float: right;
`;

const initialValues = {
  code: "",
  sex: "",
  glucose: "",
  creatinine: "",
  potassium: "",
  sodium: "",
  crp: "",
  ph: "",
};

const validationSchema = Yup.object().shape({
  /*code: Yup.number()
    .integer("Code must be an integer")
    .min(0, "Code must be a non-negative integer")
    .required("Code is required"),
  sex: Yup.string().required("Sex is required"),
  glucose: Yup.number()
    .min(0, "Glucose must be a non-negative number")
    .required("Glucose is required"),
  creatinine: Yup.number()
    .min(0, "Creatinine must be a non-negative number")
    .required("Creatinine is required"),
  potassium: Yup.number()
    .min(0, "Potassium must be a non-negative number")
    .required("Potassium is required"),
  urea: Yup.number()
    .min(0, "Urea must be a non-negative number")
    .required("Urea is required"),
  sodium: Yup.number()
    .min(0, "Sodium must be a non-negative number")
    .required("Sodium is required"),
  crp: Yup.number()
    .min(0, "CRP must be a non-negative number")
    .required("CRP is required"),
  ph: Yup.number()
    .min(0, "pH must be a non-negative number")
    .required("pH is required"),*/
});

const TestResultCreate = () => {
  const navigate = useNavigate();

  const formConfig = {
    options: [
      { key: 1, text: "Žensko", value: 1 },
      { key: 2, text: "Muško", value: 0 },
    ],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let value = { ...values };
      value.sex = parseInt(values.sex);
      console.log(value);
      await postTestResult(value);
      toast.success("New Test Result!");
      navigate("/test-results/all");
    } catch (error) {
      toast.error("Unable to create Test Result!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledContainer>
      <StyledHeader>Create Test Result</StyledHeader>
      <Divider />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <StyledTopContainer>
              <TopInfo>
                <InputField
                  label="Code"
                  name="code"
                  type="number"
                  placeholder="123"
                />

                <InputSelect
                  label="Sex"
                  name="sex"
                  options={formConfig.options}
                  placeholder="Please select vital"
                />

                <InputField
                  label="Glucose"
                  name="glucose"
                  type="number"
                  placeholder="1.23"
                />

                <InputField
                  label="Creatinine"
                  name="creatinine"
                  type="number"
                  placeholder="1.23"
                />

                <InputField
                  label="Potassium"
                  name="potassium"
                  type="number"
                  placeholder="1.23"
                />

                <InputField
                  label="Urea"
                  name="urea"
                  type="number"
                  placeholder="1.23"
                />

                <InputField
                  label="Sodium"
                  name="sodium"
                  type="number"
                  placeholder="1.23"
                />

                <InputField
                  label="CRP"
                  name="crp"
                  type="number"
                  placeholder="1.23"
                />
                <InputField
                  label="PH"
                  name="ph"
                  type="number"
                  placeholder="1.23"
                />
              </TopInfo>
            </StyledTopContainer>
            <StyledButton primary style={{ width: "120px" }} type="submit">
              Create
            </StyledButton>
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default TestResultCreate;
