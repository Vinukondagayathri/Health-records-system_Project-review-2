
import React, { useState } from "react";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patient: "Rahul Sharma",
      medicine: "Metformin",
      dosage: "500 mg",
      frequency: "Twice a day",
      doctor: "Dr. Kumar",
      date: "2026-11-05"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    patient: "",
    medicine: "",
    dosage: "",
    frequency: "",
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
      setPrescriptions(
        prescriptions.map((item) =>
          item.id === editId
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      setPrescriptions([
        ...prescriptions,
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
      medicine: item.medicine,
      dosage: item.dosage,
      frequency: item.frequency,
      doctor: item.doctor,
      date: item.date
    });

    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this prescription?")) {
      setPrescriptions(
        prescriptions.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="page-content">

      <div className="welcome-section">
        <div>
          <h1>Prescriptions</h1>
          <p>Manage patient medicine prescriptions.</p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            setFormData(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
        >
          + Add Prescription
        </button>
      </div>

      {showForm && (
        <div className="page-card">
          <h3>{editId !== null ? "Edit Prescription" : "Add New Prescription"}</h3>

          <form className="patient-form" onSubmit={handleSubmit}>
            <input type="text" name="patient" placeholder="Patient Name"
              value={formData.patient} onChange={handleChange} required />

            <input type="text" name="medicine" placeholder="Medicine Name"
              value={formData.medicine} onChange={handleChange} required />

            <input type="text" name="dosage" placeholder="Dosage"
              value={formData.dosage} onChange={handleChange} required />

            <input type="text" name="frequency" placeholder="Frequency"
              value={formData.frequency} onChange={handleChange} required />

            <input type="text" name="doctor" placeholder="Doctor Name"
              value={formData.doctor} onChange={handleChange} required />

            <input type="date" name="date"
              value={formData.date} onChange={handleChange} required />

            <button type="submit" className="add-button">
              {editId !== null ? "Update Prescription" : "Save Prescription"}
            </button>

            <button type="button" className="cancel-button"
              onClick={() => {
                setShowForm(false);
                setFormData(emptyForm);
                setEditId(null);
              }}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="page-card">
        <h3>Prescription List</h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {prescriptions.map((item) => (
                <tr key={item.id}>
                  <td>{item.patient}</td>
                  <td>{item.medicine}</td>
                  <td>{item.dosage}</td>
                  <td>{item.frequency}</td>
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

export default Prescriptions;
