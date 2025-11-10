import express from "express";
import { auth, adminOnly } from "../middleware/authMiddleware.js";
import Internship from "../models/Internship.js";
import Company from "../models/Company.js";

const router = express.Router();

// Get all internships
router.get("/", async (req, res) => {
  try {
    const { search, category, type, page = 1, limit = 10 } = req.query;
    
    let query = { status: 'active' };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    const internships = await Internship.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Internship.countDocuments(query);
    
    res.json({
      internships,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching internships", error });
  }
});

// Get single internship
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: "Error fetching internship", error });
  }
});

// Create internship (company only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "company") {
      return res.status(403).json({ message: "Only companies can create internships" });
    }
    
    const company = await Company.findById(req.user.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    
    const internship = new Internship({
      ...req.body,
      companyId: req.user.id,
      companyName: company.companyName
    });
    
    await internship.save();
    res.status(201).json({ message: "Internship created successfully", internship });
  } catch (error) {
    res.status(500).json({ message: "Error creating internship", error });
  }
});

// Update internship
router.put("/:id", auth, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    
    if (internship.companyId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    
    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json({ message: "Internship updated successfully", internship: updatedInternship });
  } catch (error) {
    res.status(500).json({ message: "Error updating internship", error });
  }
});

// Delete internship
router.delete("/:id", auth, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    
    if (internship.companyId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: "Internship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting internship", error });
  }
});

export default router;