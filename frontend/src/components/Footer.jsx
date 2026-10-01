import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Instagram, Twitter, Facebook, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-fashion-black border-t border-fashion-gold/20 text-fashion-ivory pt-16 pb-12">
      {/* Brand Value Propositions Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b border-fashion-lightGray/10 pb-12">
        <div className="flex flex-col items-center">
          <Sparkles className="w-6 h-6 text-fashion-gold mb-3" />
          <h4 className="text-xs uppercase tracking-widest font-semibold text-fashion-ivory">AI Powered Match</h4>
          <p className="text-[11px] text-fashion-muted mt-1">Algorithmic precision styling based on your DNA</p>
        </div>
        <div className="flex flex-col items-center">
          <Truck className="w-6 h-6 text-fashion-gold mb-3" />
          <h4 className="text-xs uppercase tracking-widest font-semibold text-fashion-ivory">Express Delivery</h4>
          <p className="text-[11px] text-fashion-muted mt-1">Free shipping on orders over ₹3,000</p>
        </div>
        <div className="flex flex-col items-center">
          <RefreshCw className="w-6 h-6 text-fashion-gold mb-3" />
          <h4 className="text-xs uppercase tracking-widest font-semibold text-fashion-ivory">7-Day Easy Returns</h4>
          <p className="text-[11px] text-fashion-muted mt-1">Hassle-free size exchanges & instant credit</p>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-6 h-6 text-fashion-gold mb-3" />
          <h4 className="text-xs uppercase tracking-widest font-semibold text-fashion-ivory">Guaranteed Authentic</h4>
          <p className="text-[11px] text-fashion-muted mt-1">100% verified luxury & designer garments</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-fashion-gold" />
              <span className="font-serif text-3xl font-bold tracking-wider text-fashion-ivory">
                AI FASHION
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-fashion-gold mb-4">
              YOUR STYLE. OUR INTELLIGENCE.
            </p>
            <p className="text-xs text-fashion-muted leading-relaxed max-w-sm mb-6">
              A luxury editorial recommendation platform combining cutting-edge artificial intelligence, personal style DNA analysis, and high-fashion aesthetics.
            </p>
          </div>

          <div className="flex items-center gap-4 text-fashion-muted">
            <a href="#instagram" aria-label="Instagram" className="hover:text-fashion-gold transition-colors p-2 bg-fashion-darkGray rounded-full border border-fashion-lightGray/10">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#twitter" aria-label="Twitter" className="hover:text-fashion-gold transition-colors p-2 bg-fashion-darkGray rounded-full border border-fashion-lightGray/10">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#facebook" aria-label="Facebook" className="hover:text-fashion-gold transition-colors p-2 bg-fashion-darkGray rounded-full border border-fashion-lightGray/10">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-fashion-gold mb-6">Explore</h4>
          <ul className="space-y-3 text-xs text-fashion-muted uppercase tracking-wider">
            <li><Link to="/shop" className="hover:text-fashion-ivory transition-colors">Shop All</Link></li>
            <li><Link to="/ai-stylist" className="hover:text-fashion-gold transition-colors text-fashion-gold">AI Stylist</Link></li>
            <li><Link to="/lookbook" className="hover:text-fashion-ivory transition-colors">The Lookbook</Link></li>
            <li><Link to="/sale" className="hover:text-fashion-burgundyHover transition-colors">Sale Edit</Link></li>
            <li><Link to="/recommendations" className="hover:text-fashion-ivory transition-colors">My Recommendations</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-fashion-gold mb-6">Categories</h4>
          <ul className="space-y-3 text-xs text-fashion-muted uppercase tracking-wider">
            <li><Link to="/category/women" className="hover:text-fashion-ivory transition-colors">Women's Edit</Link></li>
            <li><Link to="/category/men" className="hover:text-fashion-ivory transition-colors">Men's Edit</Link></li>
            <li><Link to="/category/dresses" className="hover:text-fashion-ivory transition-colors">Dresses</Link></li>
            <li><Link to="/category/shoes" className="hover:text-fashion-ivory transition-colors">Footwear</Link></li>
            <li><Link to="/category/accessories" className="hover:text-fashion-ivory transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="md:col-span-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-fashion-gold mb-3">
            JOIN THE STYLE EDIT
          </h4>
          <p className="text-xs text-fashion-muted mb-4">
            Receive exclusive AI drop alerts, runway previews, and weekly personalized trend reports directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="relative">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-fashion-darkGray border border-fashion-gold/30 rounded-lg px-4 py-3 text-xs text-fashion-ivory placeholder-fashion-muted focus:outline-none focus:border-fashion-gold transition-colors pr-12"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory px-3 rounded-md transition-colors flex items-center justify-center cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-fashion-gold" />
            </button>
          </form>

          {subscribed && (
            <p className="text-xs text-fashion-gold mt-2 animate-fade-in flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Welcome to the AI Fashion Inner Circle.
            </p>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-fashion-lightGray/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-fashion-muted gap-4">
        <p>© 2026 AI FASHION RECOMMENDATION SYSTEM. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-6 uppercase tracking-wider">
          <a href="#privacy" className="hover:text-fashion-ivory transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-fashion-ivory transition-colors">Terms of Service</a>
          <a href="#cookies" className="hover:text-fashion-ivory transition-colors">Cookie Preferences</a>
        </div>
      </div>
    </footer>
  );
}
