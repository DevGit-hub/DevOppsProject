import React from "react";
import LOGO from "../assets/LOGO2.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-200 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-white">
        
        {/* Logo & Tagline */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
<img src={LOGO} alt="InternCloud Logo" className="h-16 w-16" />
            <span className="font-bold text-xl">Intern<span className="text-teal-600">Cloud</span></span>
          </div>
          <p className="text-sm leading-relaxed">
            Bridging talented students with leading companies for internships that launch careers and foster innovation.
          </p>
          <p className="text-xs text-white">© 2025 InternCloud. All rights reserved.</p>
        </div>

        {/* Platform Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg mb-2">Platform</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/home" className="hover:text-teal-600 transition-colors">Home</a></li>
            <li><a href="/internship" className="hover:text-teal-600 transition-colors">Browse Internships</a></li>
            <li><a href="/companies" className="hover:text-teal-600 transition-colors">Companies</a></li>
            <li><a href="/resources" className="hover:text-teal-600 transition-colors">Resources</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/help" className="hover:text-teal-600 transition-colors">Help Center</a></li>
            <li><a href="/contact" className="hover:text-teal-600 transition-colors">Contact Us</a></li>
            <li><a href="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-teal-600 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter / Socials */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-2">Stay Connected</h3>
          <p className="text-sm">Subscribe to our newsletter for the latest internship updates.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Subscribe
            </button>
          </form>

          <div className="flex gap-3 mt-3">
            <a href="#" className="hover:text-teal-600 transition-colors">🌐</a>
            <a href="#" className="hover:text-teal-600 transition-colors">🐦</a>
            <a href="#" className="hover:text-teal-600 transition-colors">📘</a>
            <a href="#" className="hover:text-teal-600 transition-colors">📸</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
