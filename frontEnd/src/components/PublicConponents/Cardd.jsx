import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isFavorite, toggleFavorite }) => (
  <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full relative">
    {/* Favorite Button */}
    <button
      onClick={() => toggleFavorite(product.id)}
      className="absolute top-3 right-3 text-red-500 text-xl z-10"
      aria-label="Toggle Favorite"
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>

    <CardHeader className="p-4">
      <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
      <CardDescription className="text-gray-500">ID: {product.id}</CardDescription>
    </CardHeader>

    <CardContent className="flex flex-col items-center p-6">
      <img
        src={`/image.png`}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <p className="text-lg font-medium text-gray-700 mb-1">Price: ${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">Date Added: {product.date}</p>
    </CardContent>
  </Card>
);

const Cardd = ({ products, userId = 1 }) => {
  const [favorites, setFavorites] = useState([]);

  // Fetch all favorites once
  useEffect(() => {
    axios.get(`http://localhost:8000/api/favorites/${userId}`)
      .then(res => {
        const favIds = res.data.map(fav => fav.product_id);
        setFavorites(favIds);
      })
      .catch(err => console.error("Error loading favorites:", err));
  }, [userId]);

  // Toggle favorite
  const toggleFavorite = async (productId) => {
    try {
      if (favorites.includes(productId)) {
        await axios.delete("http://localhost:8000/api/favorites", {
          data: { user_id: userId, product_id: productId }
        });
        setFavorites(prev => prev.filter(id => id !== productId));
      } else {
        await axios.post("http://localhost:8000/api/favorites", {
          user_id: userId,
          product_id: productId
        });
        setFavorites(prev => [...prev, productId]);
      }
    } catch (err) {
      console.error("Toggle favorite failed:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card">
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              toggleFavorite={toggleFavorite}
            />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">No products found.</p>
      )}
    </div>
  );
};

export default Cardd;
