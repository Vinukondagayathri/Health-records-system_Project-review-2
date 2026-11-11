
import React from "react";
import { Search, Bell, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div>
        <h2>Health Records System</h2>
        <p>Welcome back! Manage your healthcare records.</p>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search records..." />
        </div>

        <Bell size={22} className="bell-icon" />

        <div className="profile">
          <UserCircle size={35} />
          <div>
            <h4>Admin</h4>
            <span>Administrator</span>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
