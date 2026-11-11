
import React, { useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Kumar",
      specialization: "Cardiologist",
      phone: "9876543210",
      email: "kumar@gmail.com",
      experience: "10 Years"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    name: "",
    specialization: "",
    phone: "",
    email: "",
    experience: ""
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
      setDoctors(
        doctors.map((item) =>
          item.id === editId
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      setDoctors([
        ...doctors,
        { id: Date.now(), ...formData }
      ]);
    }

    setFormData(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (doctor) => {
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      email: doctor.email,
      experience: doctor.experience
    });

    setEditId(doctor.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(
        doctors.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="page-content">

      <div className="welcome-section">
        <div>
          <h1>Doctors</h1>
          <p>Manage doctor information and details.</p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            setFormData(emptyForm);
            setEditId(null);
            setShowForm(true);
          }}
        >
          + Add Doctor
        </button>
      </div>

      {showForm && (
        <div className="page-card">
          <h3>{editId !== null ? "Edit Doctor" : "Add New Doctor"}</h3>

          <form className="patient-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              title="Enter a 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="experience"
              placeholder="Experience (e.g. 5 Years)"
              value={formData.experience}
              onChange={handleChange}
              required
            />

            <button type="submit" className="add-button">
              {editId !== null ? "Update Doctor" : "Save Doctor"}
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
        <h3>Doctors List</h3>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.experience}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(doctor)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(doctor.id)}
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

export default Doctors;
