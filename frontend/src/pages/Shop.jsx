import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown, Sparkles } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../services/api';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    gender: searchParams.get('gender') || '',
    style: searchParams.get('style') || '',
    occasion: searchParams.get('occasion') || '',
    color: searchParams.get('color') || '',
    size: searchParams.get('size') || '',
    season: searchParams.get('season') || '',
    maxPrice: Number(searchParams.get('maxPrice')) || 10000,
    sortBy: 'match'
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await getProducts(filters);
      setProducts(res.data);
      setLoading(false);
    }
    loadData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      gender: '',
      style: '',
      occasion: '',
      color: '',
      size: '',
      season: '',
      maxPrice: 10000,
      sortBy: 'match'
    });
    setSearchParams({});
  };

  const removeChip = (key) => {
    handleFilterChange(key, key === 'maxPrice' ? 10000 : '');
  };

  // Collect active chips
  const activeChips = [];
  if (filters.category) activeChips.push({ key: 'category', label: `Category: ${filters.category}` });
  if (filters.gender) activeChips.push({ key: 'gender', label: `Gender: ${filters.gender}` });
  if (filters.style) activeChips.push({ key: 'style', label: `Style: ${filters.style}` });
  if (filters.occasion) activeChips.push({ key: 'occasion', label: `Occasion: ${filters.occasion}` });
  if (filters.color) activeChips.push({ key: 'color', label: `Color: ${filters.color}` });
  if (filters.size) activeChips.push({ key: 'size', label: `Size: ${filters.size}` });
  if (filters.season) activeChips.push({ key: 'season', label: `Season: ${filters.season}` });
  if (filters.maxPrice < 10000) activeChips.push({ key: 'maxPrice', label: `Under ₹${filters.maxPrice}` });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-fashion-gold/20 mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-fashion-gold font-bold block mb-1">
            EDITORIAL CATALOGUE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold uppercase tracking-wider text-fashion-ivory">
            SHOP ALL
          </h1>
        </div>

        {/* Sort & Mobile Filter Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-fashion-darkGray border border-fashion-gold/40 text-fashion-ivory px-4 py-2 rounded text-xs uppercase font-semibold tracking-wider"
          >
            <Filter className="w-4 h-4 text-fashion-gold" /> Filters
          </button>

          <div className="flex items-center gap-2 text-xs text-fashion-lightGray">
            <span className="uppercase tracking-wider text-fashion-muted hidden sm:inline">Sort By:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="bg-fashion-darkGray border border-fashion-lightGray/20 rounded px-3 py-2 text-xs text-fashion-ivory focus:border-fashion-gold focus:outline-none uppercase tracking-wider"
            >
              <option value="match">AI Match % (Highest)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-fashion-darkGray/30 border border-fashion-lightGray/10 rounded-lg text-xs">
          <span className="text-[11px] uppercase tracking-widest text-fashion-gold font-bold mr-2">
            Applied Filters:
          </span>
          {activeChips.map(chip => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 bg-fashion-burgundy text-fashion-ivory px-3 py-1 rounded-full text-xs font-semibold border border-fashion-gold/40"
            >
              {chip.label}
              <button onClick={() => removeChip(chip.key)} className="hover:text-fashion-gold">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          <button
            onClick={handleResetFilters}
            className="text-xs text-fashion-gold hover:underline uppercase tracking-wider ml-auto font-semibold"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="flex gap-8">
        <FilterSidebar
          filters={filters}
          onChangeFilter={handleFilterChange}
          onResetFilters={handleResetFilters}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-fashion-muted mb-4 uppercase tracking-widest">
            <span>Showing {products.length} Products</span>
            <span className="flex items-center gap-1 text-fashion-gold font-bold">
              <Sparkles className="w-3.5 h-3.5" /> AI Match Active
            </span>
          </div>

          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
