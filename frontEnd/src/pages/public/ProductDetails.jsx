import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function ProductsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load product" });
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }
    try {
      await axios.post("/api/cart/add", { user_id: user.id, product_id: id });
      setNotification({ type: "success", message: "Added to cart!" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to add to cart" });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {notification && (
        <div className={`p-3 mb-4 rounded ${
          notification.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
        }`}>
          {notification.message}
        </div>
      )}

      {/* Rest of your component remains the same */}
      <div className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      {product?.imageUrl ? (
        <img className="w-full h-64 object-cover" src={product?.imageUrl} alt={product?.name} />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{product?.name}</h2>
        <p className="text-gray-600 mt-2">{product?.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-gray-900">${product?.price.toFixed(2)}</span>
          <span className="text-sm text-gray-600">Stock: {product?.stock}</span>
        </div>
      </div>
    </div>
    </div>
  );
}