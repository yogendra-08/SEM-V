import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  count: number;
  isLoading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      refreshCart();
    } else {
      // Clear cart when user logs out
      setItems([]);
      setTotal(0);
      setCount(0);
    }
  }, [isAuthenticated, token]);

  const refreshCart = async () => {
    if (!isAuthenticated || !token) return;
    
    try {
      setIsLoading(true);
      const response = await cartAPI.getCart();
      
      if (response.success) {
        setItems(response.data.items);
        setTotal(response.data.total);
        setCount(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      setIsLoading(true);
      const response = await cartAPI.addToCart({ product_id: productId, quantity });
      
      if (response.success) {
        await refreshCart();
        toast.success('Item added to cart!');
      } else {
        toast.error(response.message || 'Failed to add item to cart');
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || 'Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      setIsLoading(true);
      const response = await cartAPI.removeFromCart(cartItemId);
      
      if (response.success) {
        await refreshCart();
        toast.success('Item removed from cart');
      } else {
        toast.error(response.message || 'Failed to remove item');
      }
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      toast.error(error.response?.data?.message || 'Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      setIsLoading(true);
      const response = await cartAPI.updateQuantity(cartItemId, { quantity });
      
      if (response.success) {
        await refreshCart();
        toast.success('Cart updated');
      } else {
        toast.error(response.message || 'Failed to update quantity');
      }
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      const response = await cartAPI.clearCart();
      
      if (response.success) {
        setItems([]);
        setTotal(0);
        setCount(0);
        toast.success('Cart cleared');
      } else {
        toast.error(response.message || 'Failed to clear cart');
      }
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      toast.error(error.response?.data?.message || 'Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  const value: CartContextType = {
    items,
    total,
    count,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
