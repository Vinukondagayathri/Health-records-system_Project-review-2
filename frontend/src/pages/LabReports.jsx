
import React, { useState } from "react";

function LabReports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      patient: "Rahul Sharma",
      testName: "Blood Sugar",
      result: "140 mg/dL",
      normalRange: "70-100 mg/dL",
      doctor: "Dr. Kumar",
      date: "2026-11-05"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    patient: "",
    testName: "",
    result: "",
    normalRange: "",
    doctor: "",
    date: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId !== null) {
      setReports(
        reports.map((item) =>
          item.id === editId
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      setReports([
        ...reports,
        { id: Date.now(), ...formData }
      ]);
    }

    setFormData(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setFormData({
      patient: item.patient,
      testName: item.testName,
      result: item.result,
      normalRange: item.normalRange,
      doctor: item.doctor,
      date: item.date
    });

    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lab report?")) {
      setReports(
        reports.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="page-content">

      <div className="welcome-section">
        <div>
          <h1>Lab Reports</h1>
          <p>Manage patient laboratory test reports.</p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            setFormData(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
        >
          + Add Lab Report
        </button>
      </div>

      {showForm && (
        <div className="page-card">
          <h3>{editId !== null ? "Edit Lab Report" : "Add New Lab Report"}</h3>

          <form className="patient-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="patient"
              placeholder="Patient Name"
              value={formData.patient}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="testName"
              placeholder="Test Name"
              value={formData.testName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="result"
              placeholder="Test Result"
              value={formData.result}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="normalRange"
              placeholder="Normal Range"
              value={formData.normalRange}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="doctor"
              placeholder="Doctor Name"
              value={formData.doctor}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <button type="submit" className="add-button">
              {editId !== null ? "Update Report" : "Save Report"}
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setShowForm(false);
                setFormData(emptyForm);
                setEditId(null);
              }}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      <div className="page-card">
        <h3>Laboratory Reports List</h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Test Name</th>
                <th>Result</th>
                <th>Normal Range</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((item) => (
                <tr key={item.id}>
                  <td>{item.patient}</td>
                  <td>{item.testName}</td>
                  <td>{item.result}</td>
                  <td>{item.normalRange}</td>
                  <td>{item.doctor}</td>
                  <td>{item.date}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default LabReports;
