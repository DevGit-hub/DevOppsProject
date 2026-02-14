
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../assets/LOGO2.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // student | company
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("userType");
    setIsLoggedIn(!!token); // true if token exists
    setUserType(type);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setUserType(null);
    navigate("/login");
  };

  // Decide dashboard link
  const getDashboardLink = () => {
    if (!isLoggedIn) return "/login";
    if (userType === "student") return "/dashboard"; // student dashboard route
    if (userType === "company") return "/company/dashboard"; // company dashboard route
    return "/login";
  };

  // Decide dashboard label
  const getDashboardLabel = () => {
    if (!isLoggedIn) return "Dashboard";
    if (userType === "student") return "Student Dashboard";
    if (userType === "company") return "Company Dashboard";
    return "Dashboard";
  };

  return (
    <nav className="bg-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src={LOGO}
              alt="InternCloud Logo"
              className="h-15 w-15 mr-2"
            />
            <span className="text-xl font-bold">
              Intern<span className="text-teal-600">Cloud</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/home" className="text-black font-semibold hover:text-teal-900">
              Home
            </Link>
            <Link to="/internship" className="text-black font-medium hover:text-teal-600">
              Internship
            </Link>

            
            <Link to={getDashboardLink()} className="text-black font-medium hover:text-teal-600">
              {getDashboardLabel()}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-teal-700 text-white px-4 py-1 rounded-md hover:bg-teal-800"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-700 text-white px-4 py-1 rounded-md hover:bg-teal-800"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-teal-700 border border-teal-700 px-4 py-1 rounded-md hover:bg-teal-100"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
