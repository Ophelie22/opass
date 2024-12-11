import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Package } from "../types/Package";
import { CartItem } from "../types/ShoppingCart";


interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Package) => void; 
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  createOrder: (userId: string) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Package) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const url = import.meta.env.VITE_API_URL;

  const createOrder = async (userId: string) => {
    try {
      const response = await fetch(`${url}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          amount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
          items: cart.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        }),
        credentials: 'include' 
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, createOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};