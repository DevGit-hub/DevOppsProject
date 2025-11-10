// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import applicationRoutes from "./routes/applications.js";
import internshipRoutes from "./routes/internships.js";

dotenv.config();
const app = express();

// ======================
// CORS Configuration
// ======================
app.use(cors({
  origin: "http://localhost:5173", // Your React app's URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// ======================
// Body Parsers
// ======================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ======================
// Request Logging Middleware
// ======================
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ======================
// Routes
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/internships", internshipRoutes);

// Health Check
app.get("/api/health", (req, res) => res.json({ message: "API is running!", status: "healthy" }));

// Test Route
app.get("/api/test", (req, res) => res.json({ message: "Test route works!" }));

// ======================
// Error Handling Middleware
// ======================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// 404 Handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ======================
// MongoDB Connection

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); 
  }
};

startServer();
