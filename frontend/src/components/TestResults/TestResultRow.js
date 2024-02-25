import React, { useState, useEffect } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import { useStore } from "../LogIn/StoreContext";
import { jwtDecode } from "jwt-decode";
import TestResultModalEdit from "./TestResultModalEdit";
import { updateTestResults } from "../../api/test-results";
import { toast } from "react-toastify";
import { getTestResults } from "../../api/test-results";

const TestResultRow = ({ testResult, setRows }) => {
  const { user, setUser } = useStore();
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTestResult, setSelectedTestResult] = useState([]);

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

  const handleClickEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleEdit = async (values) => {
    try {
      await updateTestResults(values);
      const response = await getTestResults();
      setRows(response);
      toast.success("Vital updated!");
    } catch (err) {
      toast.error(err);
    } finally {
      handleClickEdit(!showEdit);
    }
  };

  return (
    <Table.Row>
      <TestResultModalEdit
        show={showEdit}
        code={selectedTestResult.code}
        selectedTestResult={selectedTestResult.diseaseCategory}
        handleClick={handleClickEdit}
        handleEdit={handleEdit}
      />
      <Table.Cell>{testResult.code}</Table.Cell>
      <Table.Cell>{testResult.sex ? "Žensko" : "Muško"}</Table.Cell>
      <Table.Cell>{testResult.glucose}</Table.Cell>
      <Table.Cell>{testResult.creatinine}</Table.Cell>
      <Table.Cell>{testResult.potassium}</Table.Cell>
      <Table.Cell>{testResult.urea}</Table.Cell>
      <Table.Cell>{testResult.sodium}</Table.Cell>
      <Table.Cell>{testResult.crp}</Table.Cell>
      <Table.Cell>{testResult.ph}</Table.Cell>
      {user && user.Role === "DOCTOR" ? (
        <Table.Cell>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {testResult.diseaseCategory === 1
              ? "Laka"
              : testResult.diseaseCategory === 2
              ? "Srednja"
              : testResult.diseaseCategory === 3
              ? "Teška"
              : "Nepoznata"}
            {/* Add a button inside the cell */}
            <Button
              size="small"
              icon
              labelPosition="left"
              onClick={() => {
                setSelectedTestResult(testResult);
                handleClickEdit();
              }}
            >
              <Icon name="edit outline" />
              Edit
            </Button>
          </div>
        </Table.Cell>
      ) : (
        <></>
      )}
    </Table.Row>
  );
};

export default TestResultRow;
