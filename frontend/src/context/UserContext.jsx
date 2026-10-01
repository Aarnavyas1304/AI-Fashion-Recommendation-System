import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('af_user');
    return saved ? JSON.parse(saved) : {
      isLoggedIn: true,
      name: "Aria Sharma",
      email: "aria.sharma@fashion.ai",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    };
  });

  const [aiPreferences, setAiPreferences] = useState(() => {
    const saved = localStorage.getItem('af_ai_preferences');
    return saved ? JSON.parse(saved) : {
      style: "Streetwear",
      occasion: "College",
      colors: ["Black", "Gold", "Burgundy"],
      season: "Summer",
      budget: 5000,
      size: "M"
    };
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('af_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: "#AF2026",
        date: "28 August 2026",
        total: 4798,
        itemsCount: 2,
        status: "Shipped", // Ordered -> Packed -> Shipped -> Delivered
        step: 3,
        items: [
          { name: "Oversized Heavyweight Noir Tee", brand: "ACNE STUDIOS", price: 1999, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300", quantity: 1, size: "M", color: "Black" },
          { name: "Wide-Leg Vintage Wash Denim Pants", brand: "LEVI'S VINTAGE", price: 2799, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=300", quantity: 1, size: "32", color: "Blue" }
        ],
        shippingAddress: {
          name: "Aria Sharma",
          street: "402 Vogue Heights, Marine Drive",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400020"
        }
      }
    ];
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('af_recently_viewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('af_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('af_ai_preferences', JSON.stringify(aiPreferences));
  }, [aiPreferences]);

  useEffect(() => {
    localStorage.setItem('af_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('af_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const updatePreferences = (newPrefs) => {
    setAiPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  const addRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: `#AF${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: "Ordered",
      step: 1,
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const login = (email, password) => {
    setUser({
      isLoggedIn: true,
      name: email.split('@')[0] || "Style Insider",
      email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    });
  };

  const logout = () => {
    setUser({ isLoggedIn: false, name: "", email: "", avatar: "" });
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      aiPreferences,
      updatePreferences,
      orders,
      createOrder,
      recentlyViewed,
      addRecentlyViewed
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
