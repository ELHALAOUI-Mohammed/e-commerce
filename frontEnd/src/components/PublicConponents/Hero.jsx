import React from 'react';
import { FaShoppingBag, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Hero  ()  {
    return (
     <section className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-28 px-6 text-center border-b border-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
          Discover the Latest Trends<br className="hidden sm:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">
            In Fashion & Lifestyle
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl mb-10 text-gray-300 max-w-3xl mx-auto">
          Shop exclusive deals on clothing, electronics, and more — all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            <FaShoppingBag className="text-lg" />
            Shop Now
            <FaArrowRight className="ml-1" />
          </Link>
          
          <Link
            to="/about"
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <FaInfoCircle className="text-lg" />
            Learn More
          </Link>
        </div>
      </div>
    </section>
);
};
