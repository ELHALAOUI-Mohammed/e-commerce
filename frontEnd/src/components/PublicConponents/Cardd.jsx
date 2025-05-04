import React from "react";
import { Link } from "react-router-dom";

export default function Cardd({ product }) {
  // Add null check for product
  if (!product) {
    return (
      <div className="border rounded-lg p-4 h-64 bg-gray-100 animate-pulse"></div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image ? `${product.image}` : '/placeholder-product.jpg'} 
          alt={product.name || 'Product image'}
          className="w-full h-48 object-contain mb-4"
        />
        <h3 className="font-medium text-lg">{product.name || 'Unnamed Product'}</h3>
        <p className="text-gray-600">${product.price?.toFixed(2) || '0.00'}</p>
      </Link>
    </div>
  );
}