import React, { useState, useEffect } from "react";
import {
  Plus, Edit3, Trash2, Eye, Users, Briefcase,
  CheckCircle, XCircle, Search
} from "lucide-react";
import API from "../api";

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState("internships");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [newInternship, setNewInternship] = useState({
    title: "",
    description: "",
    skills: [],
    location: "",
    type: "Remote",
    duration: "",
    salary: "",
    category: "",
    applicationDeadline: "",
    interviewDetails: "",
    otherDetails: "",
    featured: false,
  });

  // Fetch company info + internships + applications
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);

        const companyRes = await API.get("/auth/me/company");
        setCompanyInfo(companyRes.data);

        const internshipsRes = await API.get("/internships");
        const companyInternships = internshipsRes.data.internships.filter(
          (int) => int.companyId === companyRes.data._id
        );
        setInternships(companyInternships);

        const applicationsRes = await API.get("/applications/company");
        setApplications(applicationsRes.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, []);

  // Add Internship
  const handleAddInternship = async () => {
    if (!companyInfo?._id) {
      alert("Company info not loaded yet. Try again.");
      return;
    }

    if (!newInternship.title || !newInternship.description || !newInternship.category) {
      alert("Title, Description, and Category are required.");
      return;
    }

    try {
      const payload = {
        ...newInternship,
        companyId: companyInfo._id,
        skills: newInternship.skills.filter(s => s),
      };

      const res = await API.post("/internships", payload);
      const createdInternship = res.data.internship || res.data;
      setInternships([...internships, createdInternship]);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error("Error adding internship:", err.response?.data || err.message);
      alert(err.response?.data?.message || err.message || "Failed to create internship");
    }
  };

  // Edit Internship
  const handleEditInternship = (internship) => {
    setEditingInternship(internship);
    setNewInternship({ ...internship });
    setShowAddModal(true);
  };

  const handleUpdateInternship = async () => {
    if (!newInternship.title || !newInternship.description || !newInternship.category) {
      alert("Title, Description, and Category are required.");
      return;
    }

    try {
      const payload = {
        ...newInternship,
        skills: newInternship.skills.filter(s => s),
      };
      const res = await API.put(`/internships/${editingInternship._id}`, payload);

      const updatedInternship = res.data.internship || res.data;
      setInternships(
        internships.map((i) => (i._id === editingInternship._id ? updatedInternship : i))
      );
      setEditingInternship(null);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error("Error updating internship:", err.response?.data || err.message);
      alert(err.response?.data?.message || err.message || "Failed to update internship");
    }
  };

  // Delete Internship
  const handleDeleteInternship = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) return;
    try {
      await API.delete(`/internships/${id}`);
      setInternships(internships.filter((i) => i._id !== id));
      setApplications(applications.filter((app) => app.internshipId?._id !== id));
    } catch (err) {
      console.error("Error deleting internship:", err.response?.data || err.message);
      alert(err.response?.data?.message || err.message || "Failed to delete internship");
    }
  };

  // Update Application Status
  const handleUpdateApplicationStatus = async (applicationId, status) => {
    try {
      const res = await API.patch(`/applications/${applicationId}/status`, { status });
      const updatedApp = res.data.application || res.data;
      setApplications(
        applications.map((app) => (app._id === applicationId ? updatedApp : app))
      );
      if (selectedApplication && selectedApplication._id === applicationId) {
        setSelectedApplication({ ...selectedApplication, status });
      }
    } catch (err) {
      console.error("Error updating application:", err.response?.data || err.message);
      alert(err.response?.data?.message || err.message || "Failed to update status");
    }
  };

  const resetForm = () => {
    setNewInternship({
      title: "",
      description: "",
      skills: [],
      location: "",
      type: "Remote",
      duration: "",
      salary: "",
      category: "",
      applicationDeadline: "",
      interviewDetails: "",
      otherDetails: "",
      featured: false,
    });
  };

  const stats = {
    totalInternships: internships.length,
    totalApplications: applications.length,
    pendingApplications: applications.filter((a) => a.status === "pending").length,
    acceptedApplications: applications.filter((a) => a.status === "accepted").length,
  };

 
  const filteredApplications = applications.filter((app) => {
    const student = app.studentId || {};
    const internship = app.internshipId || {};

    const matchesSearch =
      (student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (internship.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (student.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesFilter = filterStatus === "all" || app.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-teal-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-teal-100 rounded-xl shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Company Dashboard</h1>
            <p className="text-gray-600">
              {companyInfo ? `${companyInfo.companyName} • ${companyInfo.companyEmail}` : "Loading company info..."}
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{stats.totalInternships}</div>
              <p className="text-sm">Internships</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{stats.totalApplications}</div>
              <p className="text-sm">Applications</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{stats.pendingApplications}</div>
              <p className="text-sm">Pending</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 ${activeTab === "internships" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
              onClick={() => setActiveTab("internships")}
            >
              <Briefcase className="inline mr-2" size={18} /> Internships
            </button>
            <button
              className={`px-6 py-3 ${activeTab === "applications" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
              onClick={() => setActiveTab("applications")}
            >
              <Users className="inline mr-2" size={18} /> Applications
              {stats.pendingApplications > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {stats.pendingApplications}
                </span>
              )}
            </button>
          </div>

          {/* Internships Tab */}
          {activeTab === "internships" && (
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Your Internships</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-teal-700 text-white px-4 py-2 rounded flex items-center hover:bg-teal-800"
                >
                  <Plus size={18} className="mr-1" /> Add Internship
                </button>
              </div>

              {internships.length === 0 ? (
                <p>No internships created yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internships.map((int) => (
                    <div key={int._id} className="p-4 bg-gradient-to-r from-teal-300 to-teal-900 border-l-4 border-sky-600 rounded shadow hover:shadow-md transition rounded shadow">
                      <h3 className="font-bold">{int.title}</h3>
                      <p className="text-sm text-white">{int.description}</p>
                      <div className="flex justify-between mt-3">
                        <button onClick={() => handleEditInternship(int)} className="text-blue-600">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDeleteInternship(int._id)} className="text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Student Applications</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-2 top-2 text-gray-400" />
                    <input
                      type="text"
                      className="pl-8 border px-2 py-1 rounded"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="border px-2 py-1 rounded"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {filteredApplications.length === 0 ? (
                <p>No applications found.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-200 to-teal-700 text-left">
                      <th className="p-2">Student</th>
                      <th className="p-2">Internship</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app._id} className="border-t">
                        <td className="p-2">{app.studentId?.fullName || "N/A"} <br />
                          <span className="text-gray-500">{app.studentId?.email || "N/A"}</span>
                        </td>
                        <td className="p-2">{app.internshipId?.title || "N/A"}</td>
                        <td className="p-2">{app.status}</td>
                        <td className="p-2 flex gap-2">
                          <button onClick={() => setSelectedApplication(app)}><Eye size={16} /></button>
                          {app.status === "pending" && (
                            <>
                              <button onClick={() => handleUpdateApplicationStatus(app._id, "accepted")} className="text-green-600"><CheckCircle size={16} /></button>
                              <button onClick={() => handleUpdateApplicationStatus(app._id, "rejected")} className="text-red-600"><XCircle size={16} /></button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Internship Modal */}
      {showAddModal && (
        <div className="fixed inset-0 overflow-auto bg-gradient-to-r from-sky-100 to-teal-900 flex justify-center items-start z-50 pt-20">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingInternship ? "Edit Internship" : "Add Internship"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                className="w-full border p-2 rounded"
                value={newInternship.title}
                onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
              />

              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={newInternship.description}
                onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
              />

              <input
                type="text"
                placeholder="Location"
                className="w-full border p-2 rounded"
                value={newInternship.location}
                onChange={(e) => setNewInternship({ ...newInternship, location: e.target.value })}
              />

              <select
                className="w-full border p-2 rounded"
                value={newInternship.type}
                onChange={(e) => setNewInternship({ ...newInternship, type: e.target.value })}
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>

              <input
                type="text"
                placeholder="Duration"
                className="w-full border p-2 rounded"
                value={newInternship.duration}
                onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
              />

              <input
                type="text"
                placeholder="Salary"
                className="w-full border p-2 rounded"
                value={newInternship.salary}
                onChange={(e) => setNewInternship({ ...newInternship, salary: e.target.value })}
              />

              <select
                className="w-full border p-2 rounded"
                value={newInternship.category}
                onChange={(e) => setNewInternship({ ...newInternship, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Technology & IT">Technology & IT</option>
                <option value="Management">Management</option>
                <option value="Media">Media</option>
                <option value="Engineering">Engineering</option>
                <option value="Healthcare">Healthcare</option>
              </select>

              <input
                type="text"
                placeholder="Skills (comma separated)"
                className="w-full border p-2 rounded"
                value={newInternship.skills.join(", ")}
                onChange={(e) =>
                  setNewInternship({ ...newInternship, skills: e.target.value.split(",").map(s => s.trim()) })
                }
              />

              <input
                type="date"
                placeholder="Application Deadline"
                className="w-full border p-2 rounded"
                value={newInternship.applicationDeadline}
                onChange={(e) => setNewInternship({ ...newInternship, applicationDeadline: e.target.value })}
              />

              <textarea
                placeholder="Interview Details"
                className="w-full border p-2 rounded"
                value={newInternship.interviewDetails}
                onChange={(e) => setNewInternship({ ...newInternship, interviewDetails: e.target.value })}
              />

              <textarea
                placeholder="Other Details"
                className="w-full border p-2 rounded"
                value={newInternship.otherDetails}
                onChange={(e) => setNewInternship({ ...newInternship, otherDetails: e.target.value })}
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingInternship(null);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={editingInternship ? handleUpdateInternship : handleAddInternship}
                className="px-4 py-2 bg-gradient-to-r from-teal-900 to-teal-300 text-white rounded"
              >
                {editingInternship ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
