import React, { useEffect } from "react";   
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/Signup';
import Home from './pages/Home';
import Companyhome from './pages/Companyhome';
import Login from "./pages/Login";



function App() {

  const fetchData = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/health`);
  const data = await res.json();
  console.log(data);
};



  useEffect(() => {
    fetchData();
  }, []);

  return (
     <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/companyhome" element={<Companyhome />} />
         
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App