import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-indigo-200 py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-white transition duration-300">About</a>
          <a href="#" className="hover:text-white transition duration-300">Pricing</a>
          <a href="#" className="hover:text-white transition duration-300">Privacy</a>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" aria-label="LinkedIn" className="hover:text-white transition duration-300">
            <Linkedin size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white transition duration-300">
            <Twitter size={24} />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-white transition duration-300">
            <Github size={24} />
          </a>
        </div>
        <p className="text-sm">© 2025 Your Resume Builder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;