import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import styled from "styled-components";
import * as Yup from "yup";
import { Form } from "formik-semantic-ui-react";
import { Formik } from "formik";

import InputSelect from "../InputSelect";

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
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  float: right;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
`;

const TestResultModalEdit = ({
  code,
  selectedTestResult,
  show,
  handleClick,
  handleEdit,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    values = { target: parseInt(values.diseaseCategory), id: code };
    handleEdit(values);
    setLoading(false);
  };

  const formConfig = {
    options: [
      { key: 1, text: "Laka", value: 1 }, // Assuming "Laka" corresponds to 1
      { key: 2, text: "Srednja", value: 2 }, // Assuming "Srednja" corresponds to 2
      { key: 3, text: "Teška", value: 3 }, // Assuming "Teška" corresponds to 3
    ],
  };

  const validationSchema = Yup.object({
    diseaseCategory: Yup.mixed()
      .oneOf(["1", "2", "3"], "Invalid disease category")
      .required("Please select a disease category"),
  });

  return (
    <Modal open={show} onClose={handleClick}>
      <Modal.Header>Disease Category</Modal.Header>
      <Modal.Content>
        {selectedTestResult && (
          <Formik
            initialValues={{ diseaseCategory: selectedTestResult }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <StyledTopContainer>
                  <TopInfo>
                    <FlexContainer>
                      <InputSelect
                        label="Disease Category"
                        name="diseaseCategory"
                        options={formConfig.options}
                        placeholder="Please select Disease Category"
                      />
                    </FlexContainer>
                  </TopInfo>
                </StyledTopContainer>
                <Modal.Actions>
                  <ButtonGroup>
                    <Button
                      color="grey"
                      onClick={handleClick}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      content="Update"
                      positive
                      disabled={loading}
                      loading={loading}
                    />
                  </ButtonGroup>
                </Modal.Actions>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default TestResultModalEdit;
