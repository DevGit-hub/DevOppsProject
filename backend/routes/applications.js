import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import Application from "../models/Application.js";
import Internship from "../models/Internship.js";
import Student from "../models/Student.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Setup multer for CV uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads/cvs";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// ------------------------
// Submit application
// ------------------------
router.post("/apply", auth, upload.single("cv"), async (req, res) => {
  try {
    const {
      internshipId,
      fullName,
      email,
      phoneNumber,
      location,
      university,
      degreeProgram,
      yearOfStudy,
      gpa,
      availability,
      other
    } = req.body;

    if (!internshipId || !fullName || !email || !phoneNumber || !location || !university || !degreeProgram || !yearOfStudy || !availability) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    const existingApplication = await Application.findOne({
      internshipId,
      studentId: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this internship" });
    }

    const application = new Application({
      internshipId,
      studentId: req.user.id,
      fullName,
      email,
      phoneNumber,
      location,
      university,
      degreeProgram,
      yearOfStudy,
      gpa: gpa || "",
      availability,
      cv: req.file ? req.file.path : "",
      other: other || ""
    });

    await application.save();
    await Internship.findByIdAndUpdate(internshipId, { $inc: { applicants: 1 } });

    res.status(201).json({
      message: "Application submitted successfully",
      application: {
        _id: application._id,
        internshipId: application.internshipId,
        status: application.status,
        appliedDate: application.appliedDate
      }
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid internship ID" });
    }
    console.error("Application error:", error);
    res.status(500).json({ message: "Error submitting application", error: error.message });
  }
});

// ------------------------
// Get student applications
// ------------------------
router.get("/student", auth, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied. Students only." });
    }

    const applications = await Application.find({ studentId: req.user.id })
      .populate("internshipId", "title companyName location type duration salary category applicants")
      .sort({ appliedDate: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Get student applications error:", error);
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
});

// ------------------------
// Get company applications
// ------------------------
router.get("/company", auth, async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Access denied. Companies only." });
    }

    const companyInternships = await Internship.find({ companyId: req.user.id });
    const internshipIds = companyInternships.map(int => int._id);

    const applications = await Application.find({ internshipId: { $in: internshipIds } })
      .populate("studentId", "fullName email phone university degreeProgram")
      .populate("internshipId", "title")
      .sort({ appliedDate: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Get company applications error:", error);
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
});

// ------------------------
// Get single application
// ------------------------
router.get("/:id", auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("studentId", "fullName email phone university degreeProgram yearOfStudy")
      .populate("internshipId", "title companyName location type duration salary");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (req.user.role === "student" && application.studentId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (req.user.role === "company") {
      const internship = await Internship.findById(application.internshipId);
      if (!internship || internship.companyId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.json(application);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid application ID" });
    }
    console.error("Get application error:", error);
    res.status(500).json({ message: "Error fetching application", error: error.message });
  }
});

// ------------------------
// Update application status
// ------------------------
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.id)
      .populate("internshipId", "companyId title");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (req.user.role !== "company" || application.internshipId.companyId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the company that posted the internship can update the status" });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid application ID" });
    }
    console.error("Update application status error:", error);
    res.status(500).json({ message: "Error updating application status", error: error.message });
  }
});

// ------------------------
// Delete application
// ------------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (
      (req.user.role === "student" && application.studentId.toString() !== req.user.id) ||
      (req.user.role === "company" && !(await Internship.findOne({ _id: application.internshipId, companyId: req.user.id })))
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Application.findByIdAndDelete(req.params.id);
    await Internship.findByIdAndUpdate(application.internshipId, { $inc: { applicants: -1 } });

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid application ID" });
    }
    console.error("Delete application error:", error);
    res.status(500).json({ message: "Error deleting application", error: error.message });
  }
});

export default router;
