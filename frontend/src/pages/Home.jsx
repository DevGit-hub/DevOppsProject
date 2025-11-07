import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.png";
import HomeIM from "../assets/home2.png";
import Person from "../assets/person1.png";

import {
  BriefcaseIcon,
  BuildingIcon,
  UsersIcon,
  SearchIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
     
      {/* Hero Section */}
      <section className="relative w-full py-8 md:py-16 lg:py-20 bg-gradient-to-r from-teal-000 to-teal-900 overflow-hidden">
           <div className="absolute inset-y-0 left-0 w-1/2 grid grid-cols-[repeat(auto-fit,minmax(20px,1fr))] opacity-50">
  {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`h-full ${i % 2 === 0 ? "bg-red-000" : "bg-sky-300"}`}
              />
            ))}
          </div>

        <div className="absolute left-1/2 top-0 h-full w-px border-l border-dashed border-blue-400" />

        <div className="container  px-4 md:px-6 grid lg:grid-cols-2 gap-8 items-start relative z-10">
          <div className="space-y-6">
            <h1 className="text-4xl space-y-6 mt-20 md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-normal">
              Launch Your Career <br />
              with the Perfect{" "}
              <span className="text-teal-700">Internship</span>
            </h1>
            <p className="max-w-[600px] text-lg text-black md:text-xl">
              Connect with top companies, gain valuable experience, and kickstart your professional journey with our
              internship platform.
            </p>
           <div className="flex justify-center">
              <a href="#" className="inline-block">
               <div className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors">
  Find Top Talent in Minutes
</div>

              </a>
            </div>
          </div>
          <div className="hidden lg:flex">
            <img
              src={HeroImage}
              width="700"
              height="500"
              alt="Hero Image"
              className="rounded-lg object-cover shadow-xl -mt-20 ml-40"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="flex justify-center w-full mx-auto py-12 md:py-20 bg-sky-900 text-white">
        <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-3">
            <BriefcaseIcon className="h-10 w-10 text-blue-300" />
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="text-blue-200">Active Internships</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <BuildingIcon className="h-10 w-10 text-blue-300" />
            <h3 className="text-4xl font-bold">200+</h3>
            <p className="text-blue-200">Partner Companies</p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <UsersIcon className="h-10 w-10 text-blue-300" />
            <h3 className="text-4xl font-bold">10,000+</h3>
            <p className="text-blue-200">Student Placements</p>
          </div>
        </div>
      </section>

       

      {/* Featured Opportunities Section */}
      <section className="flex justify-center w-full mx-auto py-12 md:py-14 lg:py-16 bg-green-100">
        <div className="container px-4 md:px-6 text-center">
          <div className="mb-12 space-y-4">
            <img
              src={HomeIM}
              alt="People blocks"
              className="mx-auto mb-4 w-94 h-64 object-contain"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Featured Opportunities
            </h2>
            <p className="max-w-[700px] mx-auto text-gray-700 md:text-lg">
              Discover top internships from leading companies that are looking for talented students like you.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-10 max-w-fit mx-auto items-stretch justify-items-center ">
            {/* Internship Card 1 */}
            <div className="p-6 text-center bg-teal-500 text-black rounded-xl shadow-lg flex flex-col w-50 h-100">
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-full">
                  <CodeIcon className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-medium">TechCorp</p>
                  <h3 className="text-lg font-bold">Frontend Developer Intern</h3>
                </div>
              </div>
              <p className="text-sm mb-6 flex-grow leading-relaxed">
                Join our team to develop responsive web applications using React and TypeScript.
              </p>
              <div className="flex items-center justify-center text-sm mb-4">
                <MapPinIcon className="h-4 w-4 mr-2" />
                Remote
              </div>
              <div className="flex justify-center items-center">
                <span className="text-sm font-medium mr-2">View Details</span>
                <ArrowRightIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Internship Card 2 */}
            <div className="p-6 text-center bg-teal-500 text-black rounded-xl shadow-lg flex flex-col w-50 h-100">
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-full">
                  <BarChartIcon className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-medium">DataSoft</p>
                  <h3 className="text-lg font-bold">Data Analyst Intern</h3>
                </div>
              </div>
              <p className="text-sm mb-6 flex-grow leading-relaxed">
                Work with our data team to analyze and visualize complex datasets.
              </p>
              <div className="flex items-center justify-center text-sm mb-4">
                <MapPinIcon className="h-4 w-4 mr-2" />
                New York, NY
              </div>
              <div className="flex justify-center items-center">
                <span className="text-sm font-medium mr-2">View Details</span>
                <ArrowRightIcon className="h-4 w-4" />
              </div>
            </div>

             {/* Internship Card 4 */}
            <div className="p-6 text-center bg-teal-500 text-black rounded-xl shadow-lg flex flex-col w-50 h-100">
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-full">
                  <CodeIcon className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-medium">TechCorp</p>
                  <h3 className="text-lg font-bold">Frontend Developer Intern</h3>
                </div>
              </div>
              <p className="text-sm mb-6 flex-grow leading-relaxed">
                Join our team to develop responsive web applications using React and TypeScript.
              </p>
              <div className="flex items-center justify-center text-sm mb-4">
                <MapPinIcon className="h-4 w-4 mr-2" />
                Remote
              </div>
              <div className="flex justify-center items-center">
                <span className="text-sm font-medium mr-2">View Details</span>
                <ArrowRightIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Internship Card 3 */}
            <div className="p-6 text-center bg-teal-500 text-black rounded-xl shadow-lg flex flex-col w-50  h-100">
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="bg-white p-2 rounded-full">
                  <PaletteIcon className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-medium">WebDev Inc</p>
                  <h3 className="text-lg font-bold">UX/UI Design Intern</h3>
                </div>
              </div>
              <p className="text-sm mb-6 flex-grow leading-relaxed">
                Design beautiful and intuitive user interfaces for our web and mobile applications.
              </p>
              <div className="flex items-center justify-center text-sm mb-4">
                <MapPinIcon className="h-4 w-4 mr-2" />
                San Francisco, CA
              </div>
              <div className="flex justify-center items-center">
                <span className="text-sm font-medium mr-2">View Details</span>
                <ArrowRightIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <a href="#" className="inline-block">
              <div
  className="bg-sky-900 hover:bg-sky-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
>
  View All Internships
</div>
            </a>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="flex justify-center w-full mx-auto py-12 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-900 to-emerald-000 relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1/2 grid grid-cols-[repeat(auto-fit,minmax(20px,1fr))] opacity-50">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                            key={i}
                            className={`h-full ${i % 2 === 0 ? "bg-blue-300" : "bg-blue-000"}`}
                            />
                        ))}
            </div>
            <div className="container px-4 md:px-1 grid lg:grid-cols-2 gap-12  relative z-10">
                <div className="space-y-6  text-black mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
                        <p className="max-w-[600px] text-lg md:text-xl">
                        Our platform makes it easy to find and apply for internships that match your skills and career goals.
                        </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
           <div className="p-6 bg-orange-300 text-white rounded-lg shadow-lg w-40 h-80 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="bg-white p-3 rounded-full mb-4">
                <SearchIcon className="h-6 w-6 text-blue-600" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-4">1. Search</h3>

            {/* Text */}
            <p className="text-sm text-black">
                Browse through hundreds of internship opportunities from top companies across various industries.
            </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-orange-300 text-white rounded-lg shadow-lg w-40 h-80 flex flex-col items-center text-center">
  {/* Icon */}
  <div className="bg-white p-3 rounded-full mb-4">
    <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
  </div>

  {/* Title */}
  <h3 className="text-xl font-semibold mb-4">2. Apply</h3>

  {/* Text */}
  <p className="text-sm text-black">
    Submit your application with your resume and cover letter directly through our platform.
  </p>
</div>


            {/* Step 3 */}
            <div className="p-6 bg-orange-300 text-white rounded-lg shadow-lg w-40 h-80 flex flex-col items-center text-center">
  {/* Icon */}
  <div className="bg-white p-3 rounded-full mb-4">
    <CheckCircleIcon className="h-6 w-6 text-blue-600" />
  </div>

  {/* Title */}
  <h3 className="text-xl font-semibold mb-4">3. Connect</h3>

  {/* Text */}
  <p className="text-sm text-black">
    Get interviewed, receive offers, and begin your professional journey with top companies.
  </p>
</div>

            </div>

          </div>
          <div className="hidden lg:flex justify-center">
            <img
              src={Person}
              width="700"
              height="700"
              alt="How It Works"
              className="rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex justify-center w-full mx-auto py-12 md:py-24 lg:py-32 bg-sky-900 text-white text-center">
        <div className="container px-4 md:px-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Journey?</h2>
          <p className="max-w-[800px] mx-auto text-lg md:text-xl text-blue-200">
            Join thousands of students who found their dream internships through our platform. Your next career
            opportunity is just a click away.
          </p>
         <div className="inline-block">
  <Link
    to="/signup"
    className="bg-teal-700 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
  >
    Sign Up For Free
  </Link>
</div>

        </div>
      </section>

      {/* Replace with your actual Footer component or import */}
      {/* <footer>Footer Placeholder</footer> */}
    </div>
  );
}

// Icon functions remain unchanged
function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function PaletteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.368 2.307-.874-.17-.216-.335-.451-.465-.776C13.64 19.137 13.01 19 12 19c-3.35 0-6-2.68-6-6 0-3.33 2.5-4 2.5-4s.5-1.25 2-2c1.5-1.75 5-1.75 5-1.75V17l3.5 3.5c1.33-1 2.45-2.37 3.12-4H22c0-5.5-4.5-10-10-10z" />
    </svg>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
