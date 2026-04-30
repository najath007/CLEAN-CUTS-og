import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => {
  return useContext(ShopContext);
};

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cleancuts_cart');
    const savedWishlist = localStorage.getItem('cleancuts_wishlist');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cleancuts_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cleancuts_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Actions
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) => prevCart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find(item => item.id === product.id);
      if (exists) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some(item => item.id === id);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    products,
    loadingProducts,
    error,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    cartTotal,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
