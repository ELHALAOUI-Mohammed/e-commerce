import React, { useEffect, useState } from "react";
import axios from "axios";
import Cardd from "@/components/PublicConponents/Cardd";

export default function FavoritesPage() {
  const userId = 1; // Replace with the actual logged-in user ID
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/favorites/${userId}`);
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const removeFavorite = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/favorites`, {
        data: { user_id: userId, product_id: productId }
      });
      // Refresh list
      setFavorites(favorites.filter(fav => fav.product.id !== productId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
      {favorites.length === 0 ? (
        <p>You have no favorite products.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map(fav => (
            <div key={fav.id} className="relative">
              <Cardd product={fav.product} />
              <button
                onClick={() => removeFavorite(fav.product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
