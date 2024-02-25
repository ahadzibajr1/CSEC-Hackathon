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
import Nav from "./Nav";
import { jwtDecode } from "jwt-decode";

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
        {user && <Nav />}

        <Routes>
          {/* Not protected Routes, no token required */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/test-results/all" element={<TestResults />} />

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
