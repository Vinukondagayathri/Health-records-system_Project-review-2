
import React, { useState } from "react";

function MedicalRecords() {
  const [records, setRecords] = useState([
    {
      id: 1,
      patient: "Rahul Sharma",
      diagnosis: "Diabetes",
      symptoms: "Fatigue, thirst",
      doctor: "Dr. Kumar",
      date: "2026-11-05"
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    patient: "",
    diagnosis: "",
    symptoms: "",
    doctor: "",
    date: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      id: Date.now(),
      ...formData
    };

    setRecords([...records, newRecord]);

    setFormData({
      patient: "",
      diagnosis: "",
      symptoms: "",
      doctor: "",
      date: ""
    });

    setShowForm(false);
  };

  return (
    <div className="page-content">

      <div className="welcome-section">
        <div>
          <h1>Medical Records</h1>
          <p>Manage patient medical history and diagnosis.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          + Add Medical Record
        </button>
      </div>

      {showForm && (
        <div className="page-card">
          <h3>Add Medical Record</h3>

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
              name="diagnosis"
              placeholder="Diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="symptoms"
              placeholder="Symptoms"
              value={formData.symptoms}
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
              Save Record
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      <div className="page-card">
        <h3>Patient Medical History</h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Diagnosis</th>
                <th>Symptoms</th>
                <th>Doctor</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.patient}</td>
                  <td>{record.diagnosis}</td>
                  <td>{record.symptoms}</td>
                  <td>{record.doctor}</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default MedicalRecords;
