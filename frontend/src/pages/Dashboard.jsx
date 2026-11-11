
import React from "react";
import {
  Users,
  FileText,
  Pill,
  CalendarDays,
  Activity,
  ArrowUpRight
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "1,248",
      icon: <Users size={24} />,
      color: "blue"
    },
    {
      title: "Medical Records",
      value: "856",
      icon: <FileText size={24} />,
      color: "purple"
    },
    {
      title: "Prescriptions",
      value: "324",
      icon: <Pill size={24} />,
      color: "green"
    },
    {
      title: "Appointments",
      value: "48",
      icon: <CalendarDays size={24} />,
      color: "orange"
    }
  ];

  const patients = [
    {
      id: "P001",
      name: "Rahul Sharma",
      age: 28,
      gender: "Male",
      condition: "Diabetes",
      date: "05 Nov 2026",
      status: "Active"
    },
    {
      id: "P002",
      name: "Priya Reddy",
      age: 34,
      gender: "Female",
      condition: "Hypertension",
      date: "04 Nov 2026",
      status: "Active"
    },
    {
      id: "P003",
      name: "Arjun Kumar",
      age: 45,
      gender: "Male",
      condition: "Asthma",
      date: "03 Nov 2026",
      status: "Review"
    },
    {
      id: "P004",
      name: "Sneha Patel",
      age: 25,
      gender: "Female",
      condition: "Anemia",
      date: "02 Nov 2026",
      status: "Active"
    }
  ];

  return (
    <div className="dashboard">

      <div className="welcome-section">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Here's what's happening in your healthcare system today.</p>
        </div>

        <button className="add-button">
          + Add New Patient
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className={`stat-icon ${item.color}`}>
              {item.icon}
            </div>

            <div>
              <p>{item.title}</p>
              <h2>{item.value}</h2>
              <span className="stat-growth">
                <ArrowUpRight size={15} />
                Overview
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">

        <div className="records-section">
          <div className="section-heading">
            <div>
              <h2>Recent Patient Records</h2>
              <p>Latest registered patient information</p>
            </div>

            <button className="view-button">View All</button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Condition</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.condition}</td>
                    <td>{patient.date}</td>
                    <td>
                      <span className={`status ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="activity-card">
          <div className="section-heading">
            <div>
              <h2>Health Activity</h2>
              <p>System overview</p>
            </div>
            <Activity size={23} />
          </div>

          <div className="activity-item">
            <span className="activity-dot blue-dot"></span>
            <div>
              <h4>New patient registered</h4>
              <p>Rahul Sharma</p>
              <small>Today</small>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot green-dot"></span>
            <div>
              <h4>Prescription updated</h4>
              <p>Priya Reddy</p>
              <small>Yesterday</small>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot orange-dot"></span>
            <div>
              <h4>Lab report uploaded</h4>
              <p>Arjun Kumar</p>
              <small>2 days ago</small>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
