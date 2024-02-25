import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LogIn from "./LogIn/LogIn";
import Forbidden from "./Forbidden";
import TestResults from "./TestResults/TestResults";
import ProtectedRoute from "./ProtectedRoute";
import { useStore } from "./LogIn/StoreContext";
import { jwtDecode } from "jwt-decode";
import TestResultCreate from "./TestResults/TestResultCreate";
import LabTechnicianNav from "./LabTechnicianNav";
import DoctorNav from "./DoctorNav";
import ChangePassword from "./ChangePassword";

const Root = () => {
  const [initialized, setInitialized] = useState(false);
  const { user, setUser } = useStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.Bearer;
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.log(e);
      } finally {
        setInitialized(true);
      }
    };

    fetch();
  }, [setUser]);

  if (!initialized) {
    return null;
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        {user?.Role === "LAB_TECHNICIAN" && <LabTechnicianNav />}
        {user?.Role === "DOCTOR" && <DoctorNav />}

        <Routes>
          {/* Not protected Routes, no token required */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn />} />

          <Route
            path="/test-results/create"
            element={
              <ProtectedRoute
                element={<TestResultCreate />}
                allowedRoles={["LAB_TECHNICIAN"]}
              />
            }
          />

          <Route
            path="/test-results/all"
            element={
              <ProtectedRoute
                element={<TestResults />}
                allowedRoles={["LAB_TECHNICIAN", "DOCTOR"]}
              />
            }
          />

          <Route
            path="/user/change-password"
            element={
              <ProtectedRoute
                element={<ChangePassword />}
                allowedRoles={["LAB_TECHNICIAN", "DOCTOR"]}
              />
            }
          />

          {/* Route for forbidden access */}
          <Route path="/forbidden" element={<Forbidden />} />

          {/* Redirect unknown routes to the forbidden page */}
          <Route path="*" element={<Navigate to="/forbidden" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Root;
