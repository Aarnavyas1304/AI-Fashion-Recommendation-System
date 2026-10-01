import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../services/api';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function executeSearch() {
      setLoading(true);
      const res = await getProducts({ search: query });
      setProducts(res.data);
      
      // If no exact results, get fallback AI suggestions
      if (res.data.length === 0) {
        const fallback = await getProducts({});
        setSuggestions(fallback.data.slice(0, 4));
      }
      setLoading(false);
    }
    executeSearch();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Search Header */}
      <div className="border-b border-fashion-gold/20 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-fashion-gold mb-2">
          <Search className="w-4 h-4" /> AI SEARCH MATRIX
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold uppercase tracking-wider text-fashion-ivory mb-2">
          SEARCH RESULTS FOR “{query.toUpperCase()}”
        </h1>
        <p className="text-xs text-fashion-muted uppercase tracking-widest font-semibold">
          {products.length} PRODUCTS FOUND
        </p>
      </div>

      {/* Main Results Grid */}
      {products.length > 0 ? (
        <ProductGrid products={products} loading={loading} />
      ) : (
        <div className="space-y-12">
          <div className="text-center py-12 px-4 bg-fashion-darkGray/40 border border-fashion-lightGray/10 rounded-2xl">
            <Sparkles className="w-12 h-12 text-fashion-gold mx-auto mb-4 opacity-60" />
            <h3 className="font-serif text-2xl font-bold uppercase tracking-wider text-fashion-ivory mb-2">
              NO PERFECT MATCH FOUND FOR “{query}”
            </h3>
            <p className="text-xs text-fashion-muted max-w-md mx-auto mb-6">
              Our algorithm could not find exact items matching your string. Try using broader terms like "Black", "Shirt", or "Streetwear".
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-fashion-burgundy text-fashion-ivory px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest border border-fashion-gold"
            >
              Explore Full Collection
            </Link>
          </div>

          {/* AI Fallback Suggestions */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fashion-gold mb-4">
              <Sparkles className="w-4 h-4" /> TRY THESE ALTERNATIVE AI SUGGESTIONS
            </div>
            <ProductGrid products={suggestions} />
          </div>
        </div>
      )}
    </div>
  );
}
