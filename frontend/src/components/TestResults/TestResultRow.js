import React from "react";
import { Table } from "semantic-ui-react";

const TestResultRow = ({ testResult }) => {
  return (
    <Table.Row>
      <Table.Cell>{testResult.code}</Table.Cell>
      <Table.Cell>{testResult.sex ? "Žensko" : "Muško"}</Table.Cell>
      <Table.Cell>{testResult.glucose}</Table.Cell>
      <Table.Cell>{testResult.creatinine}</Table.Cell>
      <Table.Cell>{testResult.potassium}</Table.Cell>
      <Table.Cell>{testResult.sodium}</Table.Cell>
      <Table.Cell>{testResult.crp}</Table.Cell>
      <Table.Cell>{testResult.ph}</Table.Cell>
      <Table.Cell>
        {testResult.diseaseCategory === 1
          ? "Laka"
          : testResult.diseaseCategory === 2
          ? "Srednja"
          : testResult.diseaseCategory === 3
          ? "Teška"
          : "Nepoznata"}
      </Table.Cell>
    </Table.Row>
  );
};

export default TestResultRow;
