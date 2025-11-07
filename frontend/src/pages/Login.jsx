import React, { useState } from "react";
import API from "../api";
import BACK2 from "../assets/back0.jpg";

export default function Login() {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (userType === "student") {
        res = await API.post("/auth/login/student", {
          email: formData.email,
          password: formData.password,
        });

        const studentData = res.data.student || res.data.user;

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", "student");
        localStorage.setItem("user", JSON.stringify(studentData));

        alert("Student logged in successfully!");
        window.location.href = "/home"; 
      } else {
        // Company login
        res = await API.post("/auth/login/company", {
          email: formData.email,
          password: formData.password,
        });

        const companyData = res.data.company || res.data.user;

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userType", "company");
        localStorage.setItem("user", JSON.stringify(companyData));

        alert("Company logged in successfully!");
        window.location.href = "/home"; // Redirect to company dashboard
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BACK2})` }}
      >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md bg-opacity-90">
        <h2 className="text-2xl font-bold text-center mb-6">
          {userType === "student" ? "Student Login" : "Company Login"}
        </h2>

        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setUserType("student")}
            className={`px-4 py-2 rounded-lg font-medium ${
              userType === "student" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType("company")}
            className={`px-4 py-2 rounded-lg font-medium ${
              userType === "company" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Company
          </button>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder={userType === "student" ? "Student Email" : "Company Email"}
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-teal-700 hover:text-teal-600 font-medium"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
