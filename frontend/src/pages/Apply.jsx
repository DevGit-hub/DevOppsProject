import React, { useState, useEffect } from 'react';
import { X, Upload, User, Mail, Phone, MapPin, GraduationCap, Calendar, Clock, FileText } from 'lucide-react';
import { Link, useSearchParams } from "react-router-dom";
import API from "../api";

export default function Apply() {
  const [searchParams] = useSearchParams();
  const internshipId = searchParams.get('internshipId');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    location: '',
    university: '',
    degreeProgram: '',
    yearOfStudy: '',
    gpa: '',
    availability: '',
    cv: null,
    other: ''
  });

  const [showModal, setShowModal] = useState(true);
  const [internshipInfo, setInternshipInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (internshipId) fetchInternshipDetails();
  }, [internshipId]);

  const fetchInternshipDetails = async () => {
    try {
      const response = await API.get(`/internships/${internshipId}`);
      setInternshipInfo(response.data);
    } catch (error) {
      console.error('Error fetching internship details:', error);
      alert('Failed to load internship details.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, cv: e.target.files[0] }));
  };

  const clearAll = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      location: '',
      university: '',
      degreeProgram: '',
      yearOfStudy: '',
      gpa: '',
      availability: '',
      cv: null,
      other: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first to apply for this internship!');
        window.location.href = '/login';
        return;
      }

      if (!internshipId) {
        alert('Internship ID is missing.');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('university', formData.university);
      formDataToSend.append('degreeProgram', formData.degreeProgram);
      formDataToSend.append('yearOfStudy', formData.yearOfStudy);
      formDataToSend.append('gpa', formData.gpa);
      formDataToSend.append('availability', formData.availability);
      formDataToSend.append('other', formData.other);
      if (formData.cv) formDataToSend.append('cv', formData.cv);
      formDataToSend.append('internshipId', internshipId);

      await API.post("/applications/apply", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Application submitted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(error.response?.data?.message || 'Error submitting application. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-900 via-teal-800 to-emerald-600 flex items-center justify-center p-6
">
        <Link
          to="/internship"
          className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Apply for Internship
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-blue-50 to-purple-100">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-teal-400 to-blue-500">
          <svg className="absolute bottom-0 w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,0 L0,0 Z" fill="#f0fdfa" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-teal-600 to-green-600">
          <svg className="absolute top-0 w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,0 900,120 1200,60 L1200,120 L0,120 Z" fill="#10b981" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Grab Your Opportunity!</h1>
        {internshipInfo && (
          <p className="text-lg text-gray-600">
            Applying for: <span className="font-semibold">{internshipInfo.title}</span> at {internshipInfo.companyName}
          </p>
        )}
      </div>

      {/* Form */}
      <div className="relative z-20 flex items-center justify-center px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-4 rounded-t-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-white font-semibold">
              Please complete the form to apply for this internship.
            </h2>
          </div>

          <div className="p-6 bg-gradient-to-b from-blue-100 to-blue-200">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Student Personal Details */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-3 bg-blue-200 px-3 py-2 rounded">Personal Details</h3>
                <div className="space-y-3">
                  {["fullName","email","phoneNumber","location"].map(field => (
                    <div className="relative" key={field}>
                      {field === "fullName" && <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />}
                      {field === "email" && <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />}
                      {field === "phoneNumber" && <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />}
                      {field === "location" && <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />}
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Details */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-3 bg-blue-200 px-3 py-2 rounded">Academic Details</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      name="university"
                      placeholder="University / Institute Name"
                      value={formData.university}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="degreeProgram"
                    placeholder="Degree Program"
                    value={formData.degreeProgram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    required
                  />
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      name="yearOfStudy"
                      placeholder="Year of Study / Graduation Year"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="gpa"
                    placeholder="GPA (optional)"
                    value={formData.gpa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      name="availability"
                      placeholder="Availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Upload className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      type="file"
                      name="cv"
                      onChange={handleFileChange}
                      className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <textarea
                      name="other"
                      placeholder="Other (Additional info)"
                      value={formData.other}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Last buttons */}
              <div className="flex justify-between items-center pt-4">
                <button type="button" onClick={clearAll} className="text-red-600 text-sm hover:text-red-800 transition-colors">
                  Clear all
                </button>
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-teal-600 to-teal-900 hover:from-teal-800 hover:to-teal-950 text-white px-8 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
