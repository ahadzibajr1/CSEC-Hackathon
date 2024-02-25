import React from "react";
import { Icon, Table, Container, Segment } from "semantic-ui-react";
import styled from "styled-components";

import TestResultRow from "./TestResultRow";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
  min-width: 0;
`;

const TestResultTable = ({ rows, error }) => {
  if (error) {
    return (
      <StyledContainer>
        <Segment inverted color="red" secondary>
          <Icon name="times circle outline" />
          {error}
        </Segment>
      </StyledContainer>
    );
  }

  if (rows === null || rows?.length === 0) {
    return (
      <StyledContainer>
        <Segment inverted color="blue" tertiary>
          <Icon name="users" />
          Test Results not found!
        </Segment>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Sex</Table.HeaderCell>
            <Table.HeaderCell>Glucose</Table.HeaderCell>
            <Table.HeaderCell>Creatinine</Table.HeaderCell>
            <Table.HeaderCell>Potassium</Table.HeaderCell>
            <Table.HeaderCell>Sodium</Table.HeaderCell>
            <Table.HeaderCell>Crp</Table.HeaderCell>
            <Table.HeaderCell>Ph</Table.HeaderCell>
            <Table.HeaderCell>Disease Category</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((p) => (
            <TestResultRow key={p.code} testResult={p} />
          ))}
        </Table.Body>
      </Table>
    </StyledContainer>
  );
};

export default TestResultTable;
