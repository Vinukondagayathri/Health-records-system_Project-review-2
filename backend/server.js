
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Test API
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend API is working!"
  });
});

// Protected API - JWT Authentication Required
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected API successfully!",
    user: req.user
  });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Health Records Backend is Running!");
});

// Unknown Route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed:", error.message);
  });
