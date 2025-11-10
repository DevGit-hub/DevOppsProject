import React, { useState, useEffect } from "react";
import { SearchIcon, MapPinIcon, ArrowRightIcon, Star, Clock, Users, Briefcase, Filter, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Internship() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: "all",
    duration: "all",
    salary: "all"
  });

  const categories = [
    { name: "all", icon: "🌟", label: "All Categories" },
    { name: "Technology & IT", icon: "💻", label: "Technology & IT" },
    { name: "Business & Management", icon: "💼", label: "Business & Management" },
    { name: "Creative & Media", icon: "🎨", label: "Creative & Media" },
    { name: "Science & Engineering", icon: "🔬", label: "Science & Engineering" },
    { name: "Healthcare", icon: "🏥", label: "Healthcare" }
  ];

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (activeCategory !== "all") {
          params.append("category", activeCategory);
        }
        
        if (searchTerm) {
          params.append("search", searchTerm);
        }
        
        if (filters.type !== "all") {
          params.append("type", filters.type);
        }
        
        const response = await API.get(`/internships?${params.toString()}`);
        setInternships(response.data.internships);
        setError(null);
      } catch (err) {
        console.error("Error fetching internships:", err);
        setError("Failed to load internships. Please try again later.");
        // Fallback to mock data for demonstration
        //setInternships(getMockInternships());
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [activeCategory, searchTerm, filters]);

  // const getMockInternships = () => {
  //   return [
  //     {
  //       _
  //     },
  //     {
  //       _id: 2,
  //       companyName: "DataFlow",
  //       title: "Data Science Intern",
  //       description: "Analyze complex datasets and build machine learning models to drive business insights and decision-making.",
  //       location: "New York, NY",
  //       type: "Hybrid",
  //       duration: "4-6 months",
  //       salary: "$2,500/month",
  //       category: "Technology & IT",
  //       rating: 4.9,
  //       applicants: 67,
  //       color: "from-green-500 to-teal-600",
  //       skills: ["Python", "ML", "Analytics"]
  //     }
  //   ];
  // };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredInternships = internships.filter(internship => {
    if (filters.type !== "all" && internship.type !== filters.type) {
      return false;
    }
    return true;
  });

  const sortedInternships = [...filteredInternships].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "salary":
        return parseFloat(b.salary.replace(/[^0-9.]/g, '')) - parseFloat(a.salary.replace(/[^0-9.]/g, ''));
      case "applicants":
        return b.applicants - a.applicants;
      case "latest":
      default:
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading internships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-15 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Hero Header Section */}
      <div className="relative z-10 bg-gradient-to-r from-cyan-900 via-sky-800 to-pink-600 py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            <span>{internships.length}+ Internships Available</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your Dream
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Internship
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Launch your career with exciting opportunities from top companies around the world
          </p>
          
          {/* search bar
          <div className="max-w-2xl mx-auto relative">
            <div className="bg-white rounded-2xl p-2 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center">
                <SearchIcon className="h-6 w-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-4 text-lg outline-none bg-transparent text-gray-800 placeholder-gray-500"
                />
                <button 
                  onClick={() => {}} // Search is handled by the useEffect
                  className="bg-gradient-to-r from-teal-600 to-teal-900 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-800 hover:to-teal-950 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Search
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced Category Pills */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`group relative overflow-hidden px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.name
                    ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg`
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-sm font-semibold">{category.label}</span>
                </div>
                {activeCategory === category.name && (
                  <div className="absolute inset-0 bg-white/10 rounded-2xl animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Work Type</label>
              <select 
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <option value="all">All Types</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
              <select 
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <option value="all">Any Duration</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Salary Range</label>
              <select 
                value={filters.salary}
                onChange={(e) => handleFilterChange('salary', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <option value="all">All Ranges</option>
                <option value="$1000-2000">$1000-2000</option>
                <option value="$2000-3000">$2000-3000</option>
                <option value="$3000+">$3000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <option value="latest">Latest</option>
                <option value="rating">Highest Rated</option>
                <option value="salary">Salary</option>
                <option value="applicants">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {sortedInternships.length} Internships Found
            </h3>
            <p className="text-gray-600">in {activeCategory === "all" ? "All Categories" : activeCategory}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Enhanced Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {sortedInternships.map((internship, index) => (
            <div 
              key={internship._id} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              style={{animationDelay: `${index * 100}ms`}}
            >
              {/* Featured Badge */}
              {internship.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                </div>
              )}

              {/* Heart/Favorite Button */}
              <button
                onClick={() => toggleFavorite(internship._id)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
              >
                <Heart 
                  className={`w-4 h-4 transition-colors duration-300 ${
                    favorites.includes(internship._id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-400 hover:text-red-400'
                  }`} 
                />
              </button>

              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-br ${internship.color || 'from-blue-500 to-purple-600'} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm">{internship.companyName}</span>
                  </div>
                </div>
                {/* Animated particles */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                <div className="absolute top-6 right-8 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
              </div>

              <div className="p-6">
                {/* Job Title */}
                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {internship.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {internship.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {(internship.skills || []).slice(0, 3).map((tag, idx) => (
                    <span 
                      key={idx}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium hover:bg-indigo-100 hover:text-indigo-600 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                  {internship.type && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {internship.type}
                    </span>
                  )}
                </div>

                {/* Details Row */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4 mr-2 text-indigo-500" />
                    <span>{internship.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="font-bold text-indigo-600">
                      {internship.salary}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-gray-600">{internship.rating || 'New'}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{internship.applicants || 0} applied</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
               {/* Action Button */}
{localStorage.getItem("token") ? (
  <Link
    to={`/viewdetail?internshipId=${internship._id}`}
    className="group/btn w-full bg-gradient-to-r from-teal-600 to-teal-900 hover:from-teal-800 hover:to-teal-950 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
  >
    <span>View Details</span>
    <ArrowRightIcon className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
  </Link>
) : (
  <button
    onClick={() => window.location.href = "/login"}
    className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
  >
    <span>Login to View</span>
    <ArrowRightIcon className="h-4 w-4" />
  </button>
)}

              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {sortedInternships.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Briefcase className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No internships found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Enhanced Load More Section */}
        
      </div>
    </div>
  );
}