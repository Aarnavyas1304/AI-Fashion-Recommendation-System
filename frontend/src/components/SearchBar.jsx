import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const popularSearches = [
    "Black Oversized Tee",
    "Burgundy Velvet Blazer",
    "Silk Slip Dress",
    "Retro Chunky Sneakers",
    "Ethnic Anarkali",
    "Gold Chronograph Watch"
  ];

  const filteredSuggestions = query.trim()
    ? MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handlePopularClick = (term) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-fashion-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative z-10 w-full max-w-2xl bg-fashion-darkGray border border-fashion-gold/40 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-fashion-lightGray/10 px-5 py-4">
          <Search className="w-5 h-5 text-fashion-gold mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by product, brand, style, occasion..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-fashion-ivory placeholder-fashion-muted focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-fashion-muted hover:text-fashion-ivory mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory text-xs px-3 py-1.5 rounded uppercase font-semibold tracking-wider transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-6 text-xs text-fashion-ivory">
          {/* Autocomplete Suggestions */}
          {query.trim() && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-fashion-gold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Direct Matches ({filteredSuggestions.length})
              </h4>
              {filteredSuggestions.length > 0 ? (
                <div className="space-y-2">
                  {filteredSuggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        onClose();
                      }}
                      className="flex items-center justify-between p-2 rounded-lg bg-fashion-black/50 hover:bg-fashion-burgundy/20 border border-transparent hover:border-fashion-gold/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-12 object-cover rounded" />
                        <div>
                          <p className="font-semibold text-fashion-ivory">{item.name}</p>
                          <p className="text-[10px] text-fashion-gold uppercase tracking-wider">{item.brand} • {item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-fashion-ivory">₹{item.price}</span>
                        <ArrowRight className="w-4 h-4 text-fashion-gold" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-fashion-muted">No direct matches for "{query}". Press Enter to perform deep AI search.</p>
              )}
            </div>
          )}

          {/* Popular Searches */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-fashion-gold mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Popular AI Searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => handlePopularClick(term)}
                  className="bg-fashion-black/60 hover:bg-fashion-burgundy/40 text-fashion-lightGray hover:text-fashion-gold px-3 py-1.5 rounded-full border border-fashion-lightGray/10 hover:border-fashion-gold/30 transition-all cursor-pointer text-xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
