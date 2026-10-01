import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Sparkles, Menu, X, ChevronDown, Flame, Home, Grid } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUser } from '../context/UserContext';

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useUser();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const categories = [
    { name: "Women's Edit", path: "/category/women" },
    { name: "Men's Edit", path: "/category/men" },
    { name: "Dresses & Gowns", path: "/category/dresses" },
    { name: "Footwear Edit", path: "/category/shoes" },
    { name: "Accessories & Bags", path: "/category/accessories" },
  ];

  return (
    <>
      {/* Top Announcement Bar - Light Editorial Champagne Tone */}
      <div className="bg-[#F5F0EB] text-[#111111] text-[11px] font-medium tracking-[0.18em] py-1.5 px-4 text-center flex items-center justify-center gap-3 uppercase border-b border-[#E5E0DA] select-none">
        <span className="flex items-center gap-1 text-[#C5A880] font-bold">
          <Sparkles className="w-3.5 h-3.5" /> StyleAI EXCLUSIVE
        </span>
        <span className="hidden sm:inline text-[#C5A880]">|</span>
        <span className="truncate text-[#444444]">UP TO 33% OFF AI CURATED LOOKS • FREE EXPRESS SHIPPING OVER ₹3,000</span>
        <Link to="/sale" className="text-[#C5A880] underline hover:text-[#111111] transition-colors font-bold ml-1">
          SHOP SALE
        </Link>
      </div>

      {/* Main Desktop Navbar Header - White / Light Ivory */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-[#E5E0DA]'
            : 'bg-[#FAF8F5] py-4 border-b border-[#E5E0DA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Mobile Drawer Trigger & StyleAI Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-[#111111] hover:text-[#C5A880] transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo matching reference image: StyleAI (Serif) + AI FASHION (gold subtitle) */}
            <Link to="/" className="flex flex-col group leading-none">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111] group-hover:text-[#C5A880] transition-colors">
                  StyleAI
                </span>
              </div>
              <span className="text-[9px] tracking-[0.35em] text-[#C5A880] uppercase font-bold mt-0.5">
                AI FASHION
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-widest font-semibold uppercase text-[#111111]">
            <Link
              to="/"
              className={`hover:text-[#C5A880] transition-colors py-1 ${
                location.pathname === '/' ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-bold' : ''
              }`}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className={`hover:text-[#C5A880] transition-colors py-1 ${
                location.pathname === '/shop' ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-bold' : ''
              }`}
            >
              Shop
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-[#C5A880] transition-colors py-1 cursor-pointer"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180 text-[#C5A880]' : ''}`} />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 w-52 pt-2 z-50">
                  <div className="bg-white border border-[#E5E0DA] rounded-md shadow-lg p-2 flex flex-col gap-1">
                    {categories.map((cat, idx) => (
                      <Link
                        key={idx}
                        to={cat.path}
                        className="px-3 py-2 text-xs text-[#111111] hover:bg-[#F5F0EB] hover:text-[#C5A880] rounded transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Stylist with NEW Badge matching uploaded image */}
            <Link
              to="/ai-stylist"
              className={`relative flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C5A880] text-[#111111] hover:bg-[#C5A880] hover:text-white transition-all ${
                location.pathname === '/ai-stylist' ? 'bg-[#C5A880] text-white font-bold' : ''
              }`}
            >
              AI Stylist
              <span className="bg-[#C5A880] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">
                NEW
              </span>
            </Link>

            <Link
              to="/lookbook"
              className={`hover:text-[#C5A880] transition-colors py-1 ${
                location.pathname === '/lookbook' ? 'text-[#C5A880] border-b-2 border-[#C5A880] font-bold' : ''
              }`}
            >
              Lookbook
            </Link>

            <Link
              to="/sale"
              className={`flex items-center gap-1 text-[#111111] hover:text-[#C5A880] transition-colors py-1 ${
                location.pathname === '/sale' ? 'text-[#C5A880]' : ''
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
              Trending
            </Link>
          </nav>

          {/* Search & Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Input Trigger Box */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-xs text-[#666666] bg-[#F5F0EB] px-3.5 py-2 rounded-full border border-[#E5E0DA] hover:border-[#C5A880] hover:text-[#111111] transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#C5A880]" />
              <span className="hidden md:inline text-[#666666]">Search for products, brands and more...</span>
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#111111] hover:text-[#C5A880] transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#C5A880] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-[#111111] hover:text-[#C5A880] transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#111111] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              to={user.isLoggedIn ? "/profile" : "/login"}
              className="p-1 rounded-full text-[#111111] hover:text-[#C5A880] transition-colors"
              title={user.isLoggedIn ? user.name : "Sign In"}
            >
              {user.isLoggedIn && user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#C5A880]"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white border-r border-[#E5E0DA] h-full p-6 flex flex-col justify-between z-10 text-[#111111]">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E0DA]">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
                    StyleAI
                  </span>
                  <span className="text-[9px] tracking-[0.35em] text-[#C5A880] uppercase font-bold">
                    AI FASHION
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#666666] hover:text-[#111111]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-5 text-sm uppercase tracking-widest font-semibold">
                <Link to="/" className="hover:text-[#C5A880]">Home</Link>
                <Link to="/shop" className="hover:text-[#C5A880]">Shop All</Link>
                <Link to="/ai-stylist" className="flex items-center gap-2 text-[#C5A880]">
                  <Sparkles className="w-4 h-4" /> AI Stylist <span className="bg-[#C5A880] text-white text-[9px] font-bold px-1.5 rounded">NEW</span>
                </Link>
                <Link to="/recommendations" className="hover:text-[#C5A880]">AI Recommendations</Link>
                <Link to="/lookbook" className="hover:text-[#C5A880]">Lookbook</Link>
                <Link to="/sale" className="text-[#111111] flex items-center gap-2 hover:text-[#C5A880]">
                  <Flame className="w-4 h-4 text-[#C5A880]" /> Sale Edit
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E0DA] flex items-center justify-between text-xs text-[#666666]">
              <Link to="/profile" className="flex items-center gap-2 text-[#111111]">
                <User className="w-4 h-4 text-[#C5A880]" />
                <span>{user.isLoggedIn ? user.name : "Sign In"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar (as shown in reference image bottom right) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E5E0DA] py-2 px-4 flex items-center justify-around text-[10px] font-semibold text-[#666666]">
        <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-[#C5A880]' : ''}`}>
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link to="/shop" className={`flex flex-col items-center gap-1 ${location.pathname === '/shop' ? 'text-[#A37B40]' : ''}`}>
          <Grid className="w-5 h-5" />
          <span>Shop</span>
        </Link>
        <Link to="/ai-stylist" className={`flex flex-col items-center gap-1 ${location.pathname === '/ai-stylist' ? 'text-[#C5A880]' : ''}`}>
          <Sparkles className="w-5 h-5 text-[#C5A880]" />
          <span>AI Stylist</span>
        </Link>
        <Link to="/wishlist" className={`flex flex-col items-center gap-1 ${location.pathname === '/wishlist' ? 'text-[#C5A880]' : ''}`}>
          <Heart className="w-5 h-5" />
          <span>Wishlist</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-[#C5A880]' : ''}`}>
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
      </div>
    </>
  );
}

