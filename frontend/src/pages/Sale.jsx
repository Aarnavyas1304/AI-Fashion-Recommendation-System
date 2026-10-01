import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { MOCK_PRODUCTS } from '../data/products';

export default function Sale() {
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    setSaleProducts(MOCK_PRODUCTS.filter(p => p.isSale));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Sale Header */}
      <div className="bg-fashion-burgundy/40 border border-fashion-gold/40 rounded-2xl p-8 mb-10 text-center relative overflow-hidden shadow-editorial">
        <div className="absolute inset-0 bg-radial from-fashion-gold/10 via-transparent to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-fashion-burgundy text-fashion-ivory px-4 py-1.5 rounded-full border border-fashion-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
          <Flame className="w-4 h-4 text-fashion-gold fill-fashion-gold" />
          <span>LIMITED TIME OFFER</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold uppercase tracking-wider text-fashion-ivory mb-3">
          THE SALE EDIT
        </h1>

        <p className="text-xs sm:text-sm text-fashion-lightGray max-w-xl mx-auto font-light mb-6">
          Up to 33% off luxury runway looks, silk slip dresses, Italian leather boots & cashmere pieces. Algorithmic AI recommendations applied.
        </p>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-fashion-gold bg-fashion-black/80 px-4 py-2 rounded-lg border border-fashion-gold/30">
          <Clock className="w-4 h-4" /> OFFERS EXPIRE IN: 04 DAYS : 18 HOURS : 22 MINS
        </div>
      </div>

      <ProductGrid products={saleProducts} />
    </div>
  );
}
