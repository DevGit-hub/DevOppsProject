import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  skills: [{ type: String }],
  location: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Remote', 'Hybrid', 'On-site'], 
    required: true 
  },
  duration: { type: String, required: true },
  salary: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: String },
  applicationDeadline: { type: String },
  interviewDetails: { type: String },
  otherDetails: { type: String },
  color: { type: String, default: 'from-blue-500 to-purple-600' },
  featured: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  },
  applicants: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Internship", internshipSchema);