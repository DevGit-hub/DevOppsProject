import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api";

export default function ViewDetails() {
  const [searchParams] = useSearchParams();
  const internshipId = searchParams.get('internshipId');
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [userType, setUserType] = useState(null); // NEW

  useEffect(() => {
    const type = localStorage.getItem("userType"); // "student" or "company"
    setUserType(type);
  }, []);

  useEffect(() => {
    const fetchInternshipDetails = async () => {
      if (!internshipId) {
        setError("No internship ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await API.get(`/internships/${internshipId}`);
        setInternship(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching internship details:", err);
        setError("Failed to load internship details");
        // Fallback to mock data for demonstration
        setInternship({
          _id: internshipId,
          title: "Frontend Developer Intern",
          companyName: "TechNova",
          description: "Build cutting-edge web applications using React, Next.js, and modern design systems. Work with a team of passionate developers.",
          location: "San Francisco, CA",
          type: "Remote",
          duration: "3-6 months",
          salary: "$2,000/month",
          category: "Technology & IT",
          startDate: "Will be notified after the Interview",
          applicationDeadline: "15.04.2025",
          interviewDetails: "Online | HR-round | Portfolio Skills + Portfolio",
          otherDetails: "This is a paid Frontend development internship offering a stipend of Rs. 10,000 per month. This internship must be for a duration of 3 months, and will be conducted in Hybrid mode.",
          skills: ["React", "JavaScript", "CSS", "HTML"],
          applicants: 45,
          rating: 4.8
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInternshipDetails();
  }, [internshipId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading internship details...</p>
        </div>
      </div>
    );
  }

  if (error && !internship) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">Error: {error}</div>
          <Link to="/internship" className="text-teal-600 hover:text-teal-800 font-medium">
            ← Back to Internships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-blue-50 to-purple-100">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-teal-400 to-blue-500">
          <svg className="absolute bottom-0 w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,0 L0,0 Z" fill="#f0fdfa" />
          </svg>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-teal-600 to-green-600">
          <svg className="absolute top-0 w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,0 900,120 1200,60 L1200,120 L0,120 Z" fill="#10b981" />
          </svg>
        </div>

        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-teal-400 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-green-400 rounded-full opacity-60"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-8">
        <Link to="/internship" className="inline-flex items-center text-teal-700 hover:text-teal-900 mb-4">
          ← Back to Internships
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">"Grab Your Opportunity!"</h1>
        {internship && (
          <p className="text-lg text-gray-600">
            {internship.title} at {internship.companyName}
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="relative z-10 container mx-auto px-4 mb-6">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center pb-20 px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-xl">
          {/* Company Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-teal-100 rounded-full p-3">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {internship.companyName ? internship.companyName.charAt(0) : 'T'}
              </div>
            </div>
            <div>
              <span className="font-bold text-lg text-gray-800">{internship.companyName}</span>
              <p className="text-gray-600">{internship.location}</p>
            </div>
          </div>

          {/* Internship Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{internship.title}</h2>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600">{internship.description}</p>
          </div>

          {/* Skills */}
          {internship.skills && internship.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill, index) => (
                  <span key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Category</label>
              <input
                type="text"
                value={internship.category || "Not specified"}
                className="w-full px-4 py-3 border-2 border-teal-400 rounded-md bg-gray-50 focus:outline-none focus:border-teal-600"
                readOnly
              />
            </div>

            {/* Duration Type */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Duration</label>
              <input
                type="text"
                value={internship.duration || "Not specified"}
                className="w-full px-4 py-3 border-2 border-teal-400 rounded-md bg-gray-50 focus:outline-none focus:border-teal-600"
                readOnly
              />
            </div>

            {/* Work Type */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Work Type</label>
              <input
                type="text"
                value={internship.type || "Not specified"}
                className="w-full px-4 py-3 border-2 border-teal-400 rounded-md bg-gray-50 focus:outline-none focus:border-teal-600"
                readOnly
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Salary/Stipend</label>
              <input
                type="text"
                value={internship.salary || "Not specified"}
                className="w-full px-4 py-3 border-2 border-teal-400 rounded-md bg-gray-50 focus:outline-none focus:border-teal-600"
                readOnly
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Start Date</label>
              <input
                type="text"
                value={internship.startDate || "Will be notified after the Interview"}
                className="w-full px-4 py-3 border-2 border-teal-400 rounded-md bg-gray-50 focus:outline-none focus:border-teal-600 text-sm"
                readOnly
              />
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Application Deadline</label>
              <input
                type="text"
                value={internship.applicationDeadline || "Not specified"}
                className="w-full px-4 py-3 border-2 border-teal-400 rounded-md bg-gray-50 focus:outline-none focus:border-teal-600"
                readOnly
              />
            </div>

            {/* Interview Details */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Interview Details</label>
              <input
                type="text"
                value={internship.interviewDetails || "Will be notified after application review"}
                className="w-full px-4 py-3 border-2 border-teal-400 rounded-md bg-gray-50 focus:outline-none focus:border-teal-600 text-sm"
                readOnly
              />
            </div>

            {/* Other Details */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Additional Details</label>
              <textarea
                value={internship.otherDetails || "No additional details provided."}
                className="w-full px-4 py-3 border-2 border-teal-400 rounded-md bg-gray-50 focus:outline-none focus:border-teal-600 text-sm resize-none"
                rows="4"
                readOnly
              />
            </div>

            {/* Apply Button */}
             {userType === "student" && (
            <Link to={`/apply?internshipId=${internship._id}`}>
              <button className="w-full bg-gradient-to-r from-teal-600 to-teal-900 hover:from-teal-800 hover:to-teal-950 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors mt-8">
                Apply Now
              </button>
            </Link>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}