import React, { useEffect, useState } from "react";
import { Button, Container, Icon, Divider, Segment } from "semantic-ui-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Loader from "../Loader";
import { getTestResults } from "../../api/test-results";
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
  }, []);

  return (
    <div>
      <StyledTopContainer>
        <StyledHeader>Test Results</StyledHeader>
        <Button size="small" onClick={() => navigate("/patients/create")}>
          <Icon name="plus square outline" />
          Add Test Result
        </Button>
      </StyledTopContainer>
      <StyledContainer>
        <Divider />
        <Segment basic>
          <Loader isActive={loading} inverted />
          <TestResultTable rows={rows} error={error} />
        </Segment>
      </StyledContainer>
    </div>
  );
};

export default TestResults;
