import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import axiosClient from "@/api/axiosClient";

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
        const { data } = await axiosClient.get(`products/${id}`);
        console.log(data); // Confirm this contains `category: { name: "..." }`
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
      await axiosClient.post("/api/cart/add", { user_id: user.id, product_id: id });
      setNotification({ type: "success", message: "Added to cart!" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to add to cart" });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
  {notification && (
    <div className={`p-4 mb-6 rounded-lg border ${
      notification.type === "error" 
        ? "bg-red-50 border-red-200 text-red-800" 
        : "bg-green-50 border-green-200 text-green-800"
    }`}>
      {notification.message}
    </div>
  )}

  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="grid md:grid-cols-2 gap-8 p-8">
      {/* Product Image Gallery */}
      <div className="space-y-4">
        <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
          {product?.imageUrl ? (
            <img
              className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
              src={product?.imageUrl}
              alt={product?.name}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 font-medium">No Image Available</span>
            </div>
          )}
          {product?.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {/* Thumbnail images would go here */}
          {[1,2,3,4].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-md cursor-pointer hover:ring-2 hover:ring-indigo-500"></div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              product?.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {product?.stock > 0 ? 'In Stock' : 'Sold Out'}
            </span>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            {/* Star rating component would go here */}
            {/* <div className="flex text-yellow-400">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 text-sm">(24 reviews)</span> */}
          </div>

          <div className="mt-6">
            <h2 className="sr-only">Product information</h2>
            <p className="text-4xl font-bold text-gray-900">
              ${product?.price.toFixed(2)}
            </p>
            {product?.originalPrice && (
              <p className="text-lg text-gray-500 line-through">
                ${product?.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-4 space-y-4 text-gray-700">
              <p>{product?.description}</p>
              {/* Additional description content would go here */}
              {/* <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p> */}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900">Details</h3>
            <div className="mt-4 space-y-2">
              <div className="flex">
                <span className="text-gray-500 w-32">Availability</span>
                <span className="text-gray-900">
                  {product?.stock > 0 ? ` available` : 'Out of stock'}
                </span>
              </div>
              {/* <div className="flex">
                <span className="text-gray-500 w-32">SKU</span>
                <span className="text-gray-900">PRD-{product?.id || '0000'}</span>
              </div> */}
              <div className="flex">
                <span className="text-gray-500 w-32">Category</span>
                <span className="text-gray-900">{product?.category?.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button className="px-3 py-2 text-gray-600 hover:bg-gray-100">-</button>
              <span className="px-3 py-2">1</span>
              <button className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
            </div>
            <button 
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
                product?.stock > 0 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
              disabled={product?.stock <= 0}
            >
              {product?.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          <button className="mt-4 w-full px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>

    {/* Product tabs section */}
    
  </div>
</div>
  );
}