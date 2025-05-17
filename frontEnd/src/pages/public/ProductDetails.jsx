import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import axiosClient from "@/api/axiosClient";
import { ShoppingCart } from "lucide-react";
import { FavoriteButton } from "@/components/PublicConponents/FavoriteButton";

export default function ProductsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  
  const [quantity, setQuantity] = useState(1);
const min = 1;
const max = product?.stock || 10; // fallback if product is null

const handleDecrease = () => {
  if (quantity > min) setQuantity(quantity - 1);
};

const handleIncrease = () => {
  if (quantity < max) setQuantity(quantity + 1);
};



  
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Vous devez être connecté.");
      return;
    }

    try {
      await axiosClient.post("/cart/add", {
        user_id: user.id,
        product_id: product.id,
        quantity,
      });
      toast.success("Produit ajouté au panier !");
    } catch (error) {
      toast.error("Échec de l'ajout au panier.");
    }
  };

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
             src={product?.imageUrl  
  ? `http://localhost:8000${product?.imageUrl}` 
  : "/image.png"}
              alt={product?.name}
              loading="lazy"
            />
    
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 font-medium">Aucune image disponible</span>
            </div>
          )}
          {product?.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-sm">
                Rupture de stock
              </span>
            </div>
          )}
        </div>
        {/* <div className="grid grid-cols-4 gap-2">
        
          {[1,2,3,4].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-md cursor-pointer hover:ring-2 hover:ring-indigo-500"></div>
          ))}
        </div> */}
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
              {product?.stock > 0 ? 'En stock' : 'Épuisé'}
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
            <span className="text-gray-500 text-sm">(24 avis)</span> */}
          </div>

          <div className="mt-6">
            <h2 className="sr-only">Informations sur le produit</h2>
            <p className="text-4xl font-bold text-gray-900">
              {product ? product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : ''}
            </p>
            
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
            <h3 className="text-sm font-medium text-gray-900">Détails</h3>
            <div className="mt-4 space-y-2">
              <div className="flex">
                <span className="text-gray-500 w-32">Disponibilité</span>
                <span className="text-gray-900">
                  {product?.stock > 0 ? ` disponible` : 'Rupture de stock'}
                </span>
              </div>
              {/* <div className="flex">
                <span className="text-gray-500 w-32">SKU</span>
                <span className="text-gray-900">PRD-{product?.id || '0000'}</span>
              </div> */}
              <div className="flex">
                <span className="text-gray-500 w-32">Catégorie</span>
                <span className="text-gray-900">{product?.category?.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-fit">
  <button
    onClick={handleDecrease}
    className="px-4 py-2 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
    disabled={quantity <= min}
  >
    -
  </button>
  <span className="px-4 py-2 text-gray-800 font-medium bg-white">{quantity}</span>
  <button
    onClick={handleIncrease}
    className="px-4 py-2 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
    disabled={quantity >= max}
  >
    +
  </button>
</div>

            {/* <button 
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
                product?.stock > 0 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
              disabled={product?.stock <= 0}
            >
              {product?.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
            </button> */}
            <Button
          size="sm"
          className="rounded-xl h-12 gap-2 font-bold"
          disabled={product?.stock <= 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
                {product?.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
          </Button>
          </div>
          <FavoriteButton productId={product?.id}  />
        </div>
      </div>
    </div>
    

    {/* Product tabs section */}
    
  </div>
</div>
  );
}