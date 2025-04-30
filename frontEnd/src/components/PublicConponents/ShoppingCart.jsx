import React, { useState, useEffect } from "react";

export default function ShoppingCart({ initialCartItems }) {
  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const [total, setTotal] = useState(0);

  // Recalculate total whenever cartItems change
  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price); // Ensure price is a number
      const quantity = parseInt(item.quantity); // Ensure quantity is a number
      return acc + price * quantity;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border rounded-md shadow-sm"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>
                  Quantity: {item.quantity} x ${parseFloat(item.price).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
