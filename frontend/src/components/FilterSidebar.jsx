import React from 'react';
import { RotateCcw, Filter, X, Check } from 'lucide-react';

export default function FilterSidebar({
  filters,
  onChangeFilter,
  onResetFilters,
  isOpenMobile,
  onCloseMobile
}) {
  const categories = ["T-Shirts", "Shirts", "Jeans", "Dresses", "Jackets", "Hoodies", "Shoes", "Bags", "Watches", "Accessories"];
  const genders = ["Women", "Men", "Unisex"];
  const styles = ["Casual", "Formal", "Streetwear", "Ethnic", "Party", "Minimal", "Sporty"];
  const occasions = ["College", "Office", "Party", "Wedding", "Date", "Travel", "Daily Wear"];
  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Blue", hex: "#2563EB" },
    { name: "Red", hex: "#DC2626" },
    { name: "Burgundy", hex: "#7A1020" },
    { name: "Gold", hex: "#B58A4A" },
    { name: "Beige", hex: "#D4B996" },
    { name: "Green", hex: "#16A34A" },
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const content = (
    <div className="space-y-6 text-xs text-fashion-ivory">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-fashion-lightGray/10">
        <div className="flex items-center gap-2 font-serif text-lg font-bold tracking-wider text-fashion-ivory uppercase">
          <Filter className="w-4 h-4 text-fashion-gold" />
          <span>Filters</span>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[11px] text-fashion-gold hover:underline uppercase tracking-wider cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset All
        </button>
      </div>

      {/* Gender Filter */}
      <div>
        <h4 className="font-semibold uppercase tracking-widest text-fashion-gold mb-3">Gender</h4>
        <div className="flex flex-wrap gap-2">
          {genders.map(g => (
            <button
              key={g}
              onClick={() => onChangeFilter('gender', filters.gender === g ? '' : g)}
              className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                filters.gender === g
                  ? 'bg-fashion-burgundy text-fashion-ivory border-fashion-gold font-bold'
                  : 'bg-fashion-darkGray border-fashion-lightGray/10 text-fashion-muted hover:border-fashion-gold/40'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-semibold uppercase tracking-widest text-fashion-gold mb-3">Category</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {categories.map(cat => (
            <label
              key={cat}
              className="flex items-center justify-between text-fashion-lightGray hover:text-fashion-gold cursor-pointer py-1"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() => onChangeFilter('category', filters.category === cat ? '' : cat)}
                  className="accent-fashion-gold cursor-pointer"
                />
                <span>{cat}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Style Filter */}
      <div>
        <h4 className="font-semibold uppercase tracking-widest text-fashion-gold mb-3">Style Archetype</h4>
        <div className="flex flex-wrap gap-2">
          {styles.map(s => (
            <button
              key={s}
              onClick={() => onChangeFilter('style', filters.style === s ? '' : s)}
              className={`px-2.5 py-1 rounded border text-[11px] uppercase transition-all cursor-pointer ${
                filters.style === s
                  ? 'bg-fashion-gold text-fashion-black border-fashion-gold font-bold'
                  : 'bg-fashion-darkGray border-fashion-lightGray/10 text-fashion-muted hover:border-fashion-gold/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion Filter */}
      <div>
        <h4 className="font-semibold uppercase tracking-widest text-fashion-gold mb-3">Occasion</h4>
        <div className="flex flex-wrap gap-2">
          {occasions.map(o => (
            <button
              key={o}
              onClick={() => onChangeFilter('occasion', filters.occasion === o ? '' : o)}
              className={`px-2.5 py-1 rounded border text-[11px] uppercase transition-all cursor-pointer ${
                filters.occasion === o
                  ? 'bg-fashion-burgundy text-fashion-ivory border-fashion-gold font-bold'
                  : 'bg-fashion-darkGray border-fashion-lightGray/10 text-fashion-muted hover:border-fashion-gold/40'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="font-semibold uppercase tracking-widest text-fashion-gold mb-3">Color Palette</h4>
        <div className="grid grid-cols-4 gap-2">
          {colors.map(c => (
            <button
              key={c.name}
              onClick={() => onChangeFilter('color', filters.color === c.name ? '' : c.name)}
              className={`flex items-center gap-1.5 p-1.5 rounded border text-[10px] uppercase transition-all cursor-pointer ${
                filters.color === c.name
                  ? 'border-fashion-gold bg-fashion-gold/20 font-bold text-fashion-gold'
                  : 'border-fashion-lightGray/10 text-fashion-muted hover:border-fashion-gold/30'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full border border-fashion-lightGray/40 shrink-0"
                style={{ backgroundColor: c.hex }}
              />
              <span className="truncate">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h4 className="font-semibold uppercase tracking-widest text-fashion-gold mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map(sz => (
            <button
              key={sz}
              onClick={() => onChangeFilter('size', filters.size === sz ? '' : sz)}
              className={`w-9 h-9 rounded border flex items-center justify-center font-bold text-xs uppercase transition-all cursor-pointer ${
                filters.size === sz
                  ? 'bg-fashion-gold text-fashion-black border-fashion-gold'
                  : 'bg-fashion-darkGray border-fashion-lightGray/10 text-fashion-muted hover:border-fashion-gold/40'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold uppercase tracking-widest text-fashion-gold">Max Price</h4>
          <span className="font-bold text-fashion-ivory">₹{filters.maxPrice || 10000}</span>
        </div>
        <input
          type="range"
          min="500"
          max="10000"
          step="500"
          value={filters.maxPrice || 10000}
          onChange={(e) => onChangeFilter('maxPrice', Number(e.target.value))}
          className="w-full accent-fashion-gold cursor-pointer"
        />
        <div className="flex items-center justify-between text-[10px] text-fashion-muted mt-1">
          <span>₹500</span>
          <span>₹10,000+</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Panel */}
      <aside className="hidden lg:block w-64 bg-fashion-darkGray/40 border border-fashion-lightGray/10 rounded-xl p-5 shrink-0 self-start sticky top-28">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-4/5 max-w-xs bg-fashion-black border-r border-fashion-gold/30 h-full p-6 overflow-y-auto z-10">
            <button
              onClick={onCloseMobile}
              className="absolute top-4 right-4 p-1 text-fashion-muted hover:text-fashion-ivory"
            >
              <X className="w-5 h-5" />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
