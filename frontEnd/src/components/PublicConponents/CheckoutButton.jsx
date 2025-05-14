import axiosClient from '@/api/axiosClient';
import { useState } from 'react';

function CheckoutButton({ userId, onCheckoutSuccess }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.post('/orders/checkout', {
        user_id: userId,
      });

      setMessage("Commande passée avec succès !");
      onCheckoutSuccess?.(response.data); // optional callback
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la commande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-right mt-4">
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Chargement..." : "Aller au paiement"}
      </button>
      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </div>
  );
}

export default CheckoutButton;
