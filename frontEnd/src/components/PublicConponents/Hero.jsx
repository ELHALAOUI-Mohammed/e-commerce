import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero  ()  {
    return (
        <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-24 px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                    Discover the Latest Trends<br />In Fashion & Lifestyle
                </h1>
                <p className="text-lg sm:text-xl mb-8 text-gray-300">
                    Shop exclusive deals on clothing, electronics, and more — all in one place.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/products"
                        className="bg-black hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                        Shop Now
                    </Link>
                    <Link
                        to="/about"
                        className="bg-transparent border border-white hover:bg-white hover:text-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

 
