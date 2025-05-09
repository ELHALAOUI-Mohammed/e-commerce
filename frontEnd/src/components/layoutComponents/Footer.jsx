import React from 'react';

import { FaFacebook } from "react-icons/fa";
import { IoIosMail  } from "react-icons/io";
import { Link } from 'react-router-dom';
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 border-t border-gray-800">
  <div className="container mx-auto max-w-6xl">
    {/* Social Icons */}
    <div className="flex items-center justify-center space-x-8 mb-8">
      <a 
        href="mailto:example@example.com" 
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
        aria-label="Email us"
      >
        <IoIosMail className="text-2xl text-white hover:text-red-400 transition-colors duration-300" />
      </a>
      <a 
        href="https://www.facebook.com/yourpage" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
        aria-label="Visit our Facebook"
      >
        <FaFacebook className="text-2xl text-white hover:text-blue-500 transition-colors duration-300" />
      </a>
      <a 
        href="https://www.instagram.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
        aria-label="Visit our Instagram"
      >
        <RiInstagramFill className="text-2xl text-white hover:text-pink-500 transition-colors duration-300" />
      </a>
      <a 
        href="https://wa.me/yourphonenumber" 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
        aria-label="Chat on WhatsApp"
      >
        <IoLogoWhatsapp className="text-2xl text-white hover:text-green-500 transition-colors duration-300" />
      </a>
    </div>

    {/* Navigation Links */}
    <nav className="flex flex-wrap justify-center gap-6 mb-8">
      <Link 
        to="/" 
        className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
      >
        Home
      </Link>
      <Link 
        to="/products" 
        className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
      >
        Products
      </Link>
      <Link 
        to="/categories" 
        className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
      >
        Categories
      </Link>
      <Link 
        to="/test" 
        className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
      >
        Test
      </Link>
      <Link 
        to="/privacy" 
        className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
      >
        Privacy Policy
      </Link>
      <Link 
        to="/terms" 
        className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
      >
        Terms of Service
      </Link>
    </nav>

    {/* Footer Text */}
    <div className="text-center text-gray-500 text-sm">
      <p className="mb-2">© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      <p>Designed with ❤ for our customers</p>
    </div>
  </div>
</footer>
    );
};

export  default  Footer;
