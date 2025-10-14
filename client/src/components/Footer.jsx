import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-600 to-slate-700 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* === Top Section === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-slate-500 pb-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-3">
              WorkWise<span className="text-green-400">.</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Empowering HR and teams with smarter tools to manage employees,
              track performance, and enhance workplace efficiency.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="/" className="hover:text-green-300 transition">Dashboard</a></li>
              <li><a href="/add-employee" className="hover:text-green-300 transition">Add Employee</a></li>
              <li><a href="/all-employee" className="hover:text-green-300 transition">All Employees</a></li>
           </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Resources</h3>
            <ul className="space-y-2 text-slate-300">
              <li><a href="/resources" className="hover:text-green-300 transition">Resources Center</a></li>
              <li><a href="/resources" className="hover:text-green-300 transition">Company Policies</a></li>
              <li><a href="/resources" className="hover:text-green-300 transition">FAQs</a></li>
              <li><a href="/resources" className="hover:text-green-300 transition">Support</a></li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Get in Touch</h3>
            <p className="text-slate-300 text-sm mb-3">
              support@workwise.com <br />
              +91 98765 43210
            </p>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="p-2 bg-slate-500 rounded-full hover:bg-green-400 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 bg-slate-500 rounded-full hover:bg-green-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 bg-slate-500 rounded-full hover:bg-green-400 transition">
                <FaInstagram />
              </a>
              <a href="#" className="p-2 bg-slate-500 rounded-full hover:bg-green-400 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* === Bottom Section === */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-slate-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} WorkWise Technologies Inc. All Rights Reserved.
          </p>
          <p className="mt-2 sm:mt-0 flex ">
            Built with <GoHeartFill /> for smart workforce management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

