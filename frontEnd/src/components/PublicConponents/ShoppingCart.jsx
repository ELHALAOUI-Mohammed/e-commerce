import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function ShoppingCart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:8000/api/cart/${user.id}`);
        setCartItems(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load cart" });
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(`/api/cart/${user.id}`, { 
        product_id: productId, 
        quantity: newQuantity 
      });
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      setNotification({ type: "error", message: "Failed to update quantity" });
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
      {/* ... */}
    </div>
  );
}