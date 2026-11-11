
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Prescriptions from "./pages/Prescriptions";
import LabReports from "./pages/LabReports";
import Doctors from "./pages/Doctors";
import MedicalRecords from "./pages/MedicalRecords";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";

// Protect private pages
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <Sidebar />

                <div className="main-content">
                  <Navbar />

                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/prescriptions" element={<Prescriptions />} />
                    <Route path="/reports" element={<LabReports />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/records" element={<MedicalRecords />} />
                  </Routes>

                </div>
              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
