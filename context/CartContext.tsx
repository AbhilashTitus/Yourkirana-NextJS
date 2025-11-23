"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (name: string, price: number) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, change: number) => void;
  cartTotal: number;
  totalItems: number;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('yk_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('yk_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (name: string, price: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { name, price, quantity: 1 }];
      }
    });
    // Optional: Show toast notification here
  };

  const removeFromCart = (name: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  const updateQuantity = (name: string, change: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.name === name) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }); // Note: If quantity goes to 0, we usually remove it, but let's keep it simple or handle removal separately
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        totalItems,
        openCart,
        closeCart,
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
