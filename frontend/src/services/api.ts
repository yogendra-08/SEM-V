import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vastraverse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('vastraverse_token');
      localStorage.removeItem('vastraverse_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => api.post('/auth/register', userData),
  
  logout: () => api.post('/auth/logout'),
  
  getProfile: () => api.get('/auth/profile'),
};

// Products API
export const productsAPI = {
  getProducts: (params?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) => api.get('/products', { params }),
  
  getProduct: (id: number) => api.get(`/products/${id}`),
  
  getProductsByCategory: (category: string, params?: {
    limit?: number;
    offset?: number;
  }) => api.get(`/products/category/${category}`, { params }),
  
  getCategories: () => api.get('/products/meta/categories'),
  
  createProduct: (productData: {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
  }) => api.post('/products', productData),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  
  addToCart: (item: { product_id: number; quantity: number }) =>
    api.post('/cart', item),
  
  updateQuantity: (cartItemId: number, data: { quantity: number }) =>
    api.put(`/cart/${cartItemId}`, data),
  
  removeFromCart: (cartItemId: number) => api.delete(`/cart/${cartItemId}`),
  
  clearCart: () => api.delete('/cart'),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  
  addToWishlist: (productId: number) =>
    api.post('/wishlist', { product_id: productId }),
  
  removeFromWishlist: (wishlistItemId: number) =>
    api.delete(`/wishlist/${wishlistItemId}`),
  
  removeFromWishlistByProduct: (productId: number) =>
    api.delete(`/wishlist/product/${productId}`),
};

// Orders API
export const ordersAPI = {
  getOrders: () => api.get('/orders'),
  
  getOrder: (id: number) => api.get(`/orders/${id}`),
  
  createOrder: (orderData: {
    shipping_address: string;
    items: {
      product_id: number;
      quantity: number;
      price: number;
    }[];
  }) => api.post('/orders', orderData),
};

export default api;
