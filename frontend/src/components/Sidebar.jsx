
import React from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Pill,
  FlaskConical,
  Stethoscope,
  Settings
} from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">✚</span>
        <h2>HealthCare</h2>
      </div>

      <p className="menu-title">MAIN MENU</p>

      <nav>
        <a href="/" className="nav-link active">
          <LayoutDashboard size={20} />
          Dashboard
        </a>

        <a href="/patients" className="nav-link">
          <Users size={20} />
          Patients
        </a>

        <a href="/prescriptions" className="nav-link">
          <Pill size={20} />
          Prescriptions
        </a>

        <a href="/reports" className="nav-link">
          <FlaskConical size={20} />
          Lab Reports
        </a>

        <a href="/doctors" className="nav-link">
          <Stethoscope size={20} />
          Doctors
        </a>

        <a href="/records" className="nav-link">
          <FileText size={20} />
          Medical Records
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a href="/settings" className="nav-link">
          <Settings size={20} />
          Settings
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
