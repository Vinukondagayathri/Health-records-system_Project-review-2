


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", {
        message: data.message,
        hasToken: Boolean(data.token),
        user: data.user
      });

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      if (!data.token) {
        setMessage("Login succeeded, but the server did not return a JWT token.");
        return;
      }

      // Save JWT token and user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Verify token storage
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setMessage("Unable to save authentication token.");
        return;
      }

      alert("Login successful!");
      navigate("/");

    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Server connection failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Welcome Back!</h2>
        <p>Health Records Management System</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {message && (
          <p className="error-message">{message}</p>
        )}

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
