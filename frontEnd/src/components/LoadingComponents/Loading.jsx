import React from "react";
import { FaShoppingCart } from "react-icons/fa"; // More e-commerce appropriate

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 to-white">
      <div className="flex flex-col items-center space-y-6 p-10 rounded-xl shadow-xl bg-white border border-gray-300">
        <FaShoppingCart className="text-blue-600 text-5xl animate-bounce" />
        <div className="w-14 h-14 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-800 text-lg font-medium text-center">Chargement des produits...</p>
      </div>
    </div>
  );
}
