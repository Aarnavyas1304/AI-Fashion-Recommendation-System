import React, { useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { getAIRecommendations } from '../services/api';
import RecommendationCard from '../components/RecommendationCard';

export default function Recommendations() {
  const { aiPreferences } = useUser();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('match');

  const categories = ["All", "Tops", "Bottoms", "Dresses", "Shoes", "Accessories"];

  useEffect(() => {
    async function fetchRecs() {
      setLoading(true);
      const res = await getAIRecommendations(aiPreferences);
      setRecommendations(res.data);
      setLoading(false);
    }
    fetchRecs();
  }, [aiPreferences]);

  let filtered = [...recommendations];
  if (activeCategory !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase() || (activeCategory === 'Bottoms' && p.category === 'Jeans'));
  }

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header matching top right in reference image */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0DA] pb-6 mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] mb-1">
            AI Recommendations For You
          </h1>
          <p className="text-xs text-[#666666] font-medium">
            Based on your preferences ({aiPreferences.style || 'Casual'} • {aiPreferences.occasion || 'College'} • {aiPreferences.colors?.join(', ') || 'Black, White'})
          </p>
        </div>

        {/* Overall Match Badge */}
        <div className="flex items-center gap-3 bg-[#111111] text-white px-4 py-2.5 rounded-md border border-[#C5A880] self-start sm:self-auto shadow-xs">
          <Sparkles className="w-5 h-5 text-[#C5A880]" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#C5A880] block">RECOMMENDATION ACCURACY</span>
            <span className="font-serif text-lg font-bold">95% OVERALL MATCH</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills & Sort Dropdown matching reference image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white font-bold shadow-xs'
                  : 'bg-white text-[#555555] border border-[#E5E0DA] hover:border-[#C5A880]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#666666] self-end sm:self-auto">
          <span className="uppercase tracking-wider font-semibold">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#E5E0DA] rounded-md px-3 py-1.5 text-xs text-[#111111] focus:outline-none uppercase font-semibold cursor-pointer"
          >
            <option value="match">Best Match</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white h-96 rounded-lg border border-[#E5E0DA]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <RecommendationCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

