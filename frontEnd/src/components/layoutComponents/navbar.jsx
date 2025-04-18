import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar  ()  {
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <h1 className="text-xl">Store</h1>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/products" className="hover:text-gray-300">Products</Link></li>
        <li><Link to="/categories" className="hover:text-gray-300">Categories</Link></li>
        <li><Link to="/cart" className="hover:text-gray-300">Cart</Link></li>
        <li><Link to="/favorites" className="hover:text-gray-300">Favorites</Link></li>
        <li><Link to="/login" className="hover:text-gray-300">login</Link></li>
        <li><Link to="/signup" className="hover:text-gray-300">signup</Link></li>
      </ul>
    </nav>
  );
};
