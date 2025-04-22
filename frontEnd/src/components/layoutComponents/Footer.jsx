import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'; 
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4">
            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-4">
                <a href="mailto:example@example.com?subject=Subject&body=Body" className="hover:text-blue-400">
                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </a>
                <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="hover:text-green-500">
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" />
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
