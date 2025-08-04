// CartContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { GET_ALL_CART } from '../api/get';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  const getCart = async () => {
    const res = await GET_ALL_CART();
    setCartData(res.data || []);
  };

  return (
    <CartContext.Provider value={{ cartData, setCartData, getCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
