import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
// import Cardd from "@/publicComponents/Cardd"; // Optional: use if you have a card layout component
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axiosClient from "@/api/axiosClient";

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
      await axiosClient.delete("/favorites", {
        data: { user_id: user.id, product_id: productId },
      });
      setFavorites((prev) => prev.filter((fav) => fav.product.id !== productId));
      setNotification({ type: "success", message: "Removed from favorites" });
    } catch (error) {
      setNotification({ type: "error", message: "Failed to remove favorite" });
    }
  };

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-red-600">
        Veuillez vous connecter pour voir vos favoris.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {notification && (
        <div
          className={`p-3 mb-4 rounded ${
            notification.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Mes produits favoris</h1>

      {loading ? (
        <div className="text-center text-gray-500">Chargement des favoris...</div>
      ) : favorites.length === 0 ? (
        <div className="text-center text-gray-500">Vous n'avez pas encore de favoris.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav.product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* Vous pouvez remplacer ceci par <Cardd product={fav.product} /> si disponible */}
              <img
                src={fav.product.image_url || "/placeholder.jpg"}
                alt={fav.product.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold">{fav.product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{fav.product.description}</p>
              <p className="text-primary font-bold mb-2">{fav.product.price} €</p>

              <div className="flex justify-between items-center">
                <Link to={`/customer/product/${fav.product.id}`} className="text-sm text-blue-500">
                  Voir le produit
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFavorite(fav.product.id)}
                >
                  Retirer
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
