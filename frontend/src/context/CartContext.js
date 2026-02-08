'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items and update count
  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      if (response.ok) {
        const items = await response.json();
        setCartItems(items);
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        await fetchCart(); // Refresh cart data
        return true;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    return false;
  };

  // Update quantity
  const updateQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      
      if (response.ok) {
        await fetchCart();
        return true;
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
    return false;
  };

  // Remove item
  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchCart();
        return true;
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
    return false;
  };

  // Initialize cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{
      cartCount,
      cartItems,
      addToCart,
      updateQuantity,
      removeItem,
      refreshCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}