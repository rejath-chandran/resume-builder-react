import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-extrabold text-indigo-800">
            Resume<span className="text-indigo-600">Builder</span>
          </a>
        </div>

        {/* Navigation and CTA */}
        <div className="flex items-center space-x-6">
          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li><a href="#features" className="text-gray-600 hover:text-indigo-600 transition duration-300">Features</a></li>
              <li><a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition duration-300">Testimonials</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition duration-300">Pricing</a></li>
            </ul>
          </nav>

          {/* CTA Button */}
          <Link to={'/login'} className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
