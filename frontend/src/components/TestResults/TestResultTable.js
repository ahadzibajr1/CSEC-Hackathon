import React, { useState, useEffect } from "react";
import { Icon, Table, Container, Segment } from "semantic-ui-react";
import styled from "styled-components";
import { useStore } from "../LogIn/StoreContext";
import { jwtDecode } from "jwt-decode";

import TestResultRow from "./TestResultRow";

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem;
  min-width: 0;
`;

const TestResultTable = ({ rows, error, setRows }) => {
  const { user, setUser } = useStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.Bearer;
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, [setUser]);

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
            <Table.HeaderCell>Urea</Table.HeaderCell>
            <Table.HeaderCell>Sodium</Table.HeaderCell>
            <Table.HeaderCell>Crp</Table.HeaderCell>
            <Table.HeaderCell>Ph</Table.HeaderCell>
            {user && user.Role === "DOCTOR" ? (
              <Table.HeaderCell>Disease Category</Table.HeaderCell>
            ) : (
              <></>
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows?.map((p) => (
            <TestResultRow key={p.code} testResult={p} setRows={setRows} />
          ))}
        </Table.Body>
      </Table>
    </StyledContainer>
  );
};

export default TestResultTable;
