import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/api/axiosClient";
import { toast } from "sonner"; // ✅ Using Sonner

export default function Cardd({ product }) {
  const { user } = useAuth();

  if (!product) {
    return (
      <div className="border rounded-lg p-4 h-64 bg-gray-100 animate-pulse"></div>
    );
  }

  const url =
    user?.role === "customer"
      ? `/customer/product/${product.id}`
      : `/product/${product.id}`;

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Vous devez être connecté.");
      return;
    }

    try {
      await axiosClient.post("/cart/add", {
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
      });
      toast.success("Produit ajouté au panier !");
    } catch (error) {
      toast.error("Échec de l'ajout au panier.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-all duration-300 hover:shadow-lg">
      {/* Top Badges */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        {product.stock <= 0 && (
          <Badge variant="destructive" className="px-3 py-1 text-sm font-bold">
            SOLD OUT
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <div className="flex justify-end">
      <FavoriteButton productId={product.id}  />
      </div>

      <Link to={url} className="space-y-5 block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800 mb-4">
          <img
            src={product.image || "/image.png"}
            alt={product.name || "Product image"}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-2 leading-tight">
            {product.name || "Unnamed Product"}
          </h3>

          <div className="flex items-end justify-between mt-3">
            <div>
              {product.discount ? (
                <>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    ${product.price?.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  ${product.price?.toFixed(2) || "0.00"}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <Link to={url}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl h-12 gap-2 font-bold border-2 cursor-pointer hover:border-primary"
          >
            <Eye className="h-5 w-5" />
            Quick View
          </Button>
        </Link>

        <Button
          size="sm"
          className="rounded-xl h-12 gap-2 font-bold"
          disabled={product.stock <= 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
