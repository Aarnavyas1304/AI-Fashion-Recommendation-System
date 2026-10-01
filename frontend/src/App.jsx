import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SoundControl from './components/SoundControl';
import CinematicIntro from './components/CinematicIntro';
import AIStylistDrawer from './components/AIStylistDrawer';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AIStylistPage from './pages/AIStylistPage';
import Recommendations from './pages/Recommendations';
import Shop from './pages/Shop';
import SearchResults from './pages/SearchResults';
import Category from './pages/Category';
import Sale from './pages/Sale';
import ProductDetails from './pages/ProductDetails';
import CompleteTheLook from './pages/CompleteTheLook';
import Lookbook from './pages/Lookbook';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

import { SoundProvider } from './context/SoundContext';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeen = sessionStorage.getItem('af_seen_intro');
    return !hasSeen;
  });

  const [searchOpen, setSearchOpen] = useState(false);

  const handleIntroComplete = () => {
    sessionStorage.setItem('af_seen_intro', 'true');
    setShowIntro(false);
  };

  return (
    <SoundProvider>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-fashion-ivory text-fashion-black selection:bg-fashion-champagne selection:text-white font-sans">
                
                {/* Cinematic Startup Screen */}
                {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

                {/* Global Toast Notifications */}
                <Toast />

                {/* Global Sticky Navbar */}
                <Navbar onOpenSearch={() => setSearchOpen(true)} />

                {/* Search Bar Overlay Modal */}
                <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

                {/* Floating Sound Control */}
                <SoundControl />

                {/* Persistent Floating AI Stylist Assistant */}
                <AIStylistDrawer />

                {/* Main Page Routes */}
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/ai-stylist" element={<AIStylistPage />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/category/:categoryName" element={<Category />} />
                    <Route path="/sale" element={<Sale />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/complete-the-look/:id" element={<CompleteTheLook />} />
                    <Route path="/lookbook" element={<Lookbook />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<Orders />} />
                  </Routes>
                </main>

                {/* Luxury Footer */}
                <Footer />
              </div>
            </Router>
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </SoundProvider>
  );
}
