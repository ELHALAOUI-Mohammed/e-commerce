import React, { useState, useEffect } from "react";
import axios from "axios";
// import Cardd from "@/publicComponents/Cardd";
import { useAuth } from "@/context/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";

export default function FavoritePage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:8000/api/favorites/${user.id}`);
        setFavorites(data);
      } catch (error) {
        setNotification({ type: "error", message: "Failed to load favorites" });
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user]);

  const removeFavorite = async (productId) => {
    try {
      await axios.delete("/api/favorites", { 
        data: { user_id: user.id, product_id: productId } 
      });
      setFavorites(favorites.filter(fav => fav.product.id !== productId));
      setNotification({ type: "success", message: "Removed from favorites" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to remove favorite" });
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