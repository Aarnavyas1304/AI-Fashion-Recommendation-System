import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('af_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('af_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    const color = selectedColor || product.colors?.[0] || 'Default';
    const size = selectedSize || product.sizes?.[0] || 'M';
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          cartItemId,
          product,
          color,
          size,
          quantity
        }];
      }
    });

    showToast(`Added ${product.name} to Bag`);
  };

  const addOutfitToCart = (products) => {
    products.forEach(p => {
      if (p) addToCart(p, p.colors?.[0], p.sizes?.[0], 1);
    });
    showToast(`Added Complete Look (${products.length} items) to Bag ✨`);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity, 0);
  const totalDiscount = cart.reduce((acc, item) => acc + ((item.product.originalPrice || item.product.price) - item.product.price) * item.quantity, 0);
  const deliveryFee = subtotal > 3000 || cart.length === 0 ? 0 : 199;
  const grandTotal = subtotal - totalDiscount + deliveryFee;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      addOutfitToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalDiscount,
      deliveryFee,
      grandTotal,
      totalItemsCount,
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
