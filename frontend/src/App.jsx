import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from "./pages/Login";
import Internship from "./pages/Internship";
import Apply from "./pages/Apply";
import Viewdetail from "./pages/Viewdetail";
import Dashboard from "./pages/Dashboard";
import Companydashboard from "./pages/Companydashboard";
//import Companyhome from "./pages/Companyhome";





function App() {
  return (
     <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewdetail" element={<Viewdetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/company/dashboard" element={<Companydashboard />} />

          <Route path="/apply" element={<Apply />} />
         
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App