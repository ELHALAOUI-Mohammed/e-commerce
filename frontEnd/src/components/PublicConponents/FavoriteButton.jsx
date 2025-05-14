import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axiosClient from "@/api/axiosClient";

export const FavoriteButton = ({ productId }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddFavorite = async () => {
    if (!user) {
      alert("Please login to add to favorites");
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post("http://localhost:8000/api/favorites", {
        user_id: user.id,
        product_id: productId,
      });
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert("Failed to add favorite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddFavorite}
      disabled={isFavorite || loading}
      variant={isFavorite ? "secondary" : "ghost"}
      size="sm"
      className="flex items-center gap-2"
    >
      {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      {isFavorite ? "Added" : "Add to Favorite"}
    </Button>
  );
};
