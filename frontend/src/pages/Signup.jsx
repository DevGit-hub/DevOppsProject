import React, { useState } from "react";
import API from "../api"; 
import BACK2 from "../assets/back0.jpg";

export default function Signup() {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (userType === "student") {
        res = await API.post("/auth/signup/student", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
      } else {
        res = await API.post("/auth/signup/company", {
          companyName: formData.companyName,
          companyEmail: formData.companyEmail,
          password: formData.password,
          contactNumber: formData.contactNumber,
        });
      }

      console.log(`${userType} signup response:`, res.data);
      alert(`${userType === "student" ? "Student" : "Company"} registered successfully!`);

      //  form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        companyName: "",
        companyEmail: "",
        contactNumber: "",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
     style={{ backgroundImage: `url(${BACK2})` }}
     >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md bg-opacity-90">
        <h2 className="text-2xl font-bold text-center mb-6">
          {userType === "student" ? "Student Signup" : "Company Signup"}
        </h2>

       
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setUserType("student")}
            className={`px-4 py-2 rounded-lg font-medium ${
              userType === "student"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setUserType("company")}
            className={`px-4 py-2 rounded-lg font-medium ${
              userType === "company"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Company
          </button>
        </div>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {userType === "student" ? (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-400"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-400"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-400"
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-400"
                required
              />
              <input
                type="email"
                name="companyEmail"
                placeholder="Company Email"
                value={formData.companyEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-400"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-400"
                required
              />
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-teal-400"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
