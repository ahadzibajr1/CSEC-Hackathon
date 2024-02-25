import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Divider, Icon, Segment } from "semantic-ui-react";
import styled from "styled-components";
import { useStore } from "../LogIn/StoreContext";

import { getTestResults } from "../../api/test-results";
import Loader from "../Loader";
import TestResultTable from "./TestResultTable";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1rem;
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 6rem 1rem 6rem;
`;

const StyledHeader = styled.h1`
  margin: 0;
`;

const TestResults = () => {
  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await getTestResults();
        setRows(response);
      } catch (e) {
        setError("Unable to fetch patients");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [setRows]);

  return (
    <div>
      <StyledTopContainer>
        <StyledHeader>Test Results</StyledHeader>
        {user && user.Role === "LAB_TECHNICIAN" ? (
          <Button size="small" onClick={() => navigate("/test-results/create")}>
            <Icon name="plus square outline" />
            Add Test Result
          </Button>
        ) : (
          <></>
        )}
      </StyledTopContainer>
      <StyledContainer>
        <Divider />
        <Segment basic>
          <Loader isActive={loading} inverted />
          <TestResultTable rows={rows} error={error} setRows={setRows} />
        </Segment>
      </StyledContainer>
    </div>
  );
};

export default TestResults;
