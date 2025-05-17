// src/components/CheckoutButton.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axiosClient from "@/api/axiosClient";
import { toast } from "sonner";

export default function CheckoutButton({ userId, onCheckoutSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post("/orders/checkout", {
        user_id: userId,
      });
      onCheckoutSuccess();
      toast.success("Commande passée avec succès !");
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Erreur lors de la validation de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout}
      disabled={loading}
      className="w-full h-14 bg-primary hover:bg-primary/90 text-lg"
    >
      {loading ? "Traitement en cours..." : "Passer à la commande"}
    </Button>
  );
}
