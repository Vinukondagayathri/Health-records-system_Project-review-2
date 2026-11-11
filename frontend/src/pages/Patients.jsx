
import React, { useState } from "react";

function Patients() {
  const [patients, setPatients] = useState([
    {
      id: "P001",
      name: "Rahul Sharma",
      age: "28",
      gender: "Male",
      phone: "9876543210",
      condition: "Diabetes"
    },
    {
      id: "P002",
      name: "Priya Reddy",
      age: "34",
      gender: "Female",
      phone: "9876543211",
      condition: "Hypertension"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    condition: ""
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

    if (editId) {
      setPatients(patients.map((patient) =>
        patient.id === editId
          ? { ...patient, ...formData }
          : patient
      ));
    } else {
      const newPatient = {
        id: "P" + String(
          Math.max(0, ...patients.map(p =>
            Number(p.id.slice(1))
          )) + 1
        ).padStart(3, "0"),
        ...formData
      };

      setPatients([...patients, newPatient]);
    }

    setFormData(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (patient) => {
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      condition: patient.condition
    });

    setEditId(patient.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (confirmDelete) {
      setPatients(patients.filter(
        (patient) => patient.id !== id
      ));
    }
  };

  return (
    <div className="page-content">

      <div className="welcome-section">
        <div>
          <h1>Patient Management</h1>
          <p>Register and manage patient information.</p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            setFormData(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
        >
          + Add New Patient
        </button>
      </div>

      {showForm && (
        <div className="page-card">
          <h3>
            {editId ? "Edit Patient Details" : "Patient Registration Form"}
          </h3>

          <form onSubmit={handleSubmit} className="patient-form">

            <input
              type="text"
              name="name"
              placeholder="Patient Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="condition"
              placeholder="Medical Condition"
              value={formData.condition}
              onChange={handleChange}
              required
            />

            <button type="submit" className="add-button">
              {editId ? "Update Patient" : "Register Patient"}
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
                setFormData(emptyForm);
              }}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      <div className="page-card">
        <h3>Registered Patients ({patients.length})</h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Condition</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.condition}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(patient)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(patient.id)}
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

export default Patients;
