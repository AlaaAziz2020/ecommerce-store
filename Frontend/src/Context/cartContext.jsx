import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);

  const updateCartState = (updatedCart) => {
    setCart(updatedCart);
    const totalCount = updatedCart.reduce((acc, item) => acc + item.count, 0);
    setCartNumber(totalCount);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Add product to cart
  const addProductToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, count: item.count + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, count: 1 }];
    }

    updateCartState(updatedCart);
  };

  // Get cart from localStorage
  const getProductToCart = () => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartFromLocalStorage);
    const totalCount = cartFromLocalStorage.reduce((acc, item) => acc + item.count, 0);
    setCartNumber(totalCount);
    return cartFromLocalStorage;
  };

  // Delete a product from cart
  const deleteProductToCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    updateCartState(updatedCart);
  };

  // Update product count
  const updateProductToCart = (productId, newCount) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, count: newCount } : item
    );
    updateCartState(updatedCart);
  };

  return (
    <cartContext.Provider value={{ cart, cartNumber, addProductToCart, getProductToCart, deleteProductToCart, updateProductToCart }}>
      {children}
    </cartContext.Provider>
  );
};
