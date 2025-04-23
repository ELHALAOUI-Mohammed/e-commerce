import React from 'react';

import { FaFacebook } from "react-icons/fa";
import { IoIosMail  } from "react-icons/io";
import { Link } from 'react-router-dom';
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            {/* Social Icons */}
            <div className="flex items-center justify-center space-x-6 mb-4">
                <a href="mailto:example@example.com?subject=Subject&body=Body" >
                <IoIosMail className='text-white text-4xl hover:text-red-400'/>
                </a>
                <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" >
                <FaFacebook className='text-white text-3xl hover:text-blue-600'  />
                </a>
                <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                <RiInstagramFill className='text-white text-3xl hover:text-pink-500'  />
                </a>
                <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" >
                <IoLogoWhatsapp className='text-white text-3xl hover:text-green-500'  />
                </a>
            </div>

            {/* Navigation Links */}
            <div className="flex justify-center space-x-6 mb-4 ">
                <Link to="/" className="hover:border-b">Home</Link>
                <Link to="/products" className="hover:border-b">Products</Link>
                <Link to="/categories" className="hover:border-b">Categories</Link>
                <Link to="/test" className="hover:border-b">Test</Link>
            </div>

            {/* Footer Text */}
            <p className="text-center">© 2025 Your Company Name. All Rights Reserved .</p>
        </footer>
    );
};

export default Footer;
