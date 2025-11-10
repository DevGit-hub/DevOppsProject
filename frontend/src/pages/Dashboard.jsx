import React, { useState, useEffect } from 'react'; 
import {
  User, Mail, Phone, MapPin, GraduationCap, Calendar, Clock,
  FileText, CheckCircle, XCircle, AlertCircle, Search, Star
} from 'lucide-react';
import API from '../api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [studentInfo, setStudentInfo] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student info & applications
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Try fetching student info from API
        const studentRes = await API.get('/auth/me/student');
        setStudentInfo(studentRes.data);

        const applicationsRes = await API.get('/applications/student');
        setApplications(applicationsRes.data);

      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Failed to load data. Using cached info if available.');

        const cachedUser = localStorage.getItem('user');
        if (cachedUser) {
          try {
            const parsedUser = JSON.parse(cachedUser);
            setStudentInfo(parsedUser);
          } catch {
            localStorage.removeItem('user');
            setStudentInfo(null);
          }
        } else {
          setStudentInfo(null);
        }

      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  const filteredApplications = applications.filter(app => {
    const title = app.internshipId?.title?.toLowerCase() || '';
    const company = app.internshipId?.companyName?.toLowerCase() || '';
    const matchesSearch = title.includes(searchTerm.toLowerCase()) || company.includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === 'pending').length,
    acceptedApplications: applications.filter(a => a.status === 'accepted').length,
    rejectedApplications: applications.filter(a => a.status === 'rejected').length
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected': return <XCircle className="text-red-500" size={20} />;
      case 'pending': return <AlertCircle className="text-yellow-500" size={20} />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );

  if (!studentInfo) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-red-500 mb-4">{error || 'Failed to load student info'}</p>
      <button onClick={() => window.location.href = '/login'} className="px-4 py-2 bg-teal-600 text-white rounded">
        Go to Login
      </button>
    </div>
  );

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-sky-100 to-teal-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-teal-100 p-6 rounded-xl shadow mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{studentInfo.fullName}</h1>
            <p className="text-gray-600">{studentInfo.degreeProgram || 'Student'} </p>
            <p className="text-gray-500 text-sm">{studentInfo.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-bold text-blue-600">{stats.totalApplications}</div>
              <div className="text-sm text-gray-600">Total Applied</div>
            </div>
            <div>
              <div className="font-bold text-yellow-600">{stats.pendingApplications}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div>
              <div className="font-bold text-green-600">{stats.acceptedApplications}</div>
              <div className="text-sm text-gray-600">Accepted</div>
            </div>
            <div>
              <div className="font-bold text-red-600">{stats.rejectedApplications}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-3 ${activeTab === 'applications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              Profile
            </button>
          </div>

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="p-4">
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-8 border p-2 w-full rounded"
                  />
                </div>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border p-2 rounded">
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="grid gap-4">
                {filteredApplications.map(app => (
                  <div key={app._id} className={`p-4 bg-white rounded-xl shadow border-l-4 ${getStatusColor(app.status)}`}>
                    <h3 className="font-semibold">{app.internshipId?.title || 'Internship'}</h3>
                    <p className="text-sm text-gray-600">{app.internshipId?.companyName || 'Company'}</p>
                    <div className="flex gap-2 items-center mt-2">
                      {getStatusIcon(app.status)}
                      <span className="capitalize">{app.status}</span>
                    </div>
                  </div>
                ))}
                {filteredApplications.length === 0 && <p className="text-gray-500">No applications found.</p>}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-4">
              <h2 className="font-semibold text-xl mb-4">Profile</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p><strong>Full Name:</strong> {studentInfo.fullName}</p>
                  <p><strong>Email:</strong> {studentInfo.email}</p>
                  <p><strong>Phone:</strong> {studentInfo.phone || 'Not provided'}</p>
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
