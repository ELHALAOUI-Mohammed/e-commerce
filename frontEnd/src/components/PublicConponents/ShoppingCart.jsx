import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import axiosClient from "@/api/axiosClient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, X, Minus, Plus, Truck, Lock, Trash2, Shield,  } from 'lucide-react'
import CheckoutButton from "./CheckoutButton";
export default function ShoppingCart() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/cart/${user.id}`);
        setCartItems(data.products || []);
      } catch (error) {
        toast.error("Échec du chargement du panier.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axiosClient.put(`/api/cart/${user.id}`, {
        product_id: productId,
        quantity: newQuantity,
      });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, pivot: { quantity: newQuantity } } : item
        )
      );
      toast.success("Quantité mise à jour.");
    } catch (error) {
      toast.error("Impossible de mettre à jour la quantité.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosClient.post("/remove-from-cart", {
        user_id: user.id,
        product_id: productId,
      });
      setCartItems(cartItems.filter((item) => item.id !== productId));
      toast.success("Produit supprimé du panier.");
    } catch (error) {
      toast.error("Échec de la suppression du produit.");
    }
  };

  const clearCart = async () => {
    try {
      await axiosClient.delete(`/cart/clear/${user.id}`);
      setCartItems([]);
      toast.success("Panier vidé.");
    } catch (error) {
      toast.error("Échec du vidage du panier.");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.pivot.quantity,
    0
  );

  return (
 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
  {/* Cart Header */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900 ">Votre panier</h1>
    <div className="flex items-center mt-2 text-sm text-gray-500">
      <span>{cartItems.length} {cartItems.length === 1 ? 'article' : 'articles'}</span>
      {cartItems.length > 0 && (
        <>
          <span className="mx-2">•</span>
          <button 
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 underline"
          >
            Vider le panier
          </button>
        </>
      )}
    </div>
  </div>

  {/* Cart Content */}
  <div className="flex flex-col lg:flex-row gap-8 ">
    {/* Products Table - Left Side */}
    <div className="lg:w-2/3">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : cartItems.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Votre panier est vide</h3>
          <p className="mt-2 text-gray-500">Commencez vos achats pour ajouter des articles à votre panier</p>
          <Button 
            onClick={() => navigate('/')} 
            className="mt-6 bg-primary hover:bg-primary/90"
          >
            Continuer vos achats
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Produit</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Prix</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Quantité</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item?.imageUrl  
  ? `http://localhost:8000${item?.imageUrl}` 
  : "/image.png"}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.color || 'Couleur'} • {item.size || 'Taille unique'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{item.price.toFixed(2)} DH</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center border rounded-md w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.pivot.quantity - 1))}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 text-center w-12">
                        {item.pivot.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.pivot.quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">
                      {(item.price * item.pivot.quantity).toFixed(2)} DH
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

    {/* Order Summary - Right Side */}
    {cartItems.length > 0 && (
      <div className="lg:w-1/3">
        <div className="bg-white rounded-xl shadow-sm p-8 sticky top-4">
          <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              {/* <span className="text-gray-600">Sous-total ({cartItems.reduce((acc, item) => acc + item.pivot.quantity, 0)} articles)</span>
              <span className="font-medium">{subtotal.toFixed(2)} DH</span> */}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Livraison</span>
              <span className="text-green-600">Gratuite</span>
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-primary">
                {totalPrice.toFixed(2)} DH
              </span>
            </div>
          </div>

          {/* <Button 
            onClick={() => navigate('/checkout')} 
            className="w-full h-14 bg-primary hover:bg-primary/90 text-lg"
          >
            Passer la commande
          </Button> */}
        <CheckoutButton
  userId={user.id}
  onCheckoutSuccess={() => {
    setCartItems([]);
    toast.success("Commande validée avec succès !");
  }}
/>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm">Achat sécurisé garanti</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  );
}
