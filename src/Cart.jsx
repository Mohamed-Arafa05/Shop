import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Typography, Button } from "@material-tailwind/react";
import CartData from "./CartData";
import axios from "axios";

const Cart = ({ isOpen, onClose, loggedUser, setLoggedUser }) => {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(loggedUser?.cart || []);

  // ✅ Ensure hooks run before returning null
  useEffect(() => {
    setCart(loggedUser?.cart || []);
  }, [loggedUser]);

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount.toFixed(2));
  }, [cart]);

  if (!isOpen) return null; // ✅ Now placed AFTER hooks

  // ✅ Update only one item's quantity in JSON Server
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantity

    try {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item
      );
      setCart(updatedCart);

      // Update only the modified item in JSON Server
      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, {
        cart: updatedCart,
      });

      setLoggedUser((prev) => ({ ...prev, cart: updatedCart }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ✅ Remove only the selected item from cart
  const removeItem = async (id) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);

      // Update JSON Server
      await axios.patch(`http://localhost:3000/users/${loggedUser.id}`, {
        cart: updatedCart,
      });

      setLoggedUser((prev) => ({ ...prev, cart: updatedCart }));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center">
        <Typography variant="h3" className="text-black font-semibold">Your Cart</Typography>
        <button onClick={onClose}>
          <XMarkIcon className="w-6 h-6 text-black" />
        </button>
      </div>

      <hr className="border-t border-gray-300 my-4" />

      <div className="flex justify-between items-center text-gray-500 text-sm uppercase font-medium">
        <Typography variant="small">Product</Typography>
        <Typography variant="small">Total</Typography>
      </div>

      <hr className="border-t border-gray-300 my-2" />

      <div className="flex flex-col gap-3 overflow-scroll max-h-[calc(100vh-260px)]">
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartData
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))
        ) : (
          <Typography variant="small" className="text-gray-500 text-center mt-4">
            Your cart is empty
          </Typography>
        )}
      </div>

      <hr className="border-t border-gray-300 my-4" />
<div className="flex justify-between items-center text-gray-500 text-sm uppercase font-medium">
      <Typography variant="h6" className="text-black font-semibold">Total</Typography>
      <Typography variant="h6" className="text-black font-semibold">LE {total}</Typography>
</div>
      
      
      <Typography variant="small" className="text-gray-500 mt-1">
        Taxes, discounts and shipping calculated at checkout
      </Typography>

      <Button className="mt-4 w-full bg-gray-200 text-black text-lg py-3 rounded-lg" disabled>
        Check out
      </Button>
    </div>
  );
};

export default Cart;
