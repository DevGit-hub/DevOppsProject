// backend/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Company from "../models/Company.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only middleware
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Admin only" });
  next();
};

// ======================
// Student Signup
// ======================
router.post("/signup/student", async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

    const student = new Student({ fullName, email, password, phone });
    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Student Signup Error:", error);
    res.status(500).json({ message: "Error registering student", error });
  }
});

// ======================
// Company Signup
// ======================
router.post("/signup/company", async (req, res) => {
  try {
    const { companyName, companyEmail, password, contactNumber } = req.body;

    const existing = await Company.findOne({ companyEmail });
    if (existing) return res.status(400).json({ message: "Company already exists" });

    const company = new Company({ companyName, companyEmail, password, contactNumber });
    await company.save();

    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Company Signup Error:", error);
    res.status(500).json({ message: "Error registering company", error });
  }
});

// ======================
// Student Login
// ======================
router.post("/login/student", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await student.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        phone: student.phone,
      },
    });
  } catch (error) {
    console.error("Student Login Error:", error);
    res.status(500).json({ message: "Error logging in student", error });
  }
});

// ======================
// Company Login
// ======================
router.post("/login/company", async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ companyEmail: email });
    if (!company) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await company.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: company._id, role: "company" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      company: {
        id: company._id,
        companyName: company.companyName,
        companyEmail: company.companyEmail,
        contactNumber: company.contactNumber,
      },
    });
  } catch (error) {
    console.error("Company Login Error:", error);
    res.status(500).json({ message: "Error logging in company", error });
  }
});

// ======================
// Get current student info
// ======================
router.get("/me/student", auth, async (req, res) => {
  try {
    if (req.user.role !== "student") return res.status(403).json({ message: "Not a student" });

    const student = await Student.findById(req.user.id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    console.error("Fetch Student Error:", error);
    res.status(500).json({ message: "Error fetching student data", error });
  }
});

// ======================
// Get current company info
// ======================
router.get("/me/company", auth, async (req, res) => {
  try {
    if (req.user.role !== "company") return res.status(403).json({ message: "Not a company" });

    const company = await Company.findById(req.user.id).select("-password");
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.json(company);
  } catch (error) {
    console.error("Fetch Company Error:", error);
    res.status(500).json({ message: "Error fetching company data", error });
  }
});

export default router;
