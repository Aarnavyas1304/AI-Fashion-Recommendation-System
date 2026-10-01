import React, { useState } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { LOOKBOOK_CATEGORIES, MOCK_PRODUCTS } from '../data/products';
import ProductGrid from '../components/ProductGrid';

export default function Lookbook() {
  const [selectedLook, setSelectedLook] = useState(null);

  const handleOpenLook = (look) => {
    const items = MOCK_PRODUCTS.filter(p => look.itemIds.includes(p.id));
    setSelectedLook({ ...look, items });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-12 border-b border-fashion-gold/20 pb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fashion-darkGray border border-fashion-gold/40 text-fashion-gold text-xs uppercase tracking-[0.3em] font-medium mb-3">
          <Sparkles className="w-4 h-4 text-fashion-gold" />
          <span>RUNWAY ARCHIVE 2026</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold uppercase tracking-wider text-fashion-ivory mb-3">
          THE LOOKBOOK
        </h1>
        <p className="text-xs sm:text-sm text-fashion-muted max-w-xl mx-auto font-light">
          High fashion magazine style curation. Explore algorithmic theme edits, street style photography & curated runway fits.
        </p>
      </div>

      {/* Grid of Magazine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {LOOKBOOK_CATEGORIES.map((look) => (
          <div
            key={look.id}
            onClick={() => handleOpenLook(look)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-fashion-lightGray/10 hover:border-fashion-gold/50 cursor-pointer shadow-editorial transition-all duration-500"
          >
            <img
              src={look.image}
              alt={look.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fashion-black via-fashion-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase font-bold text-fashion-gold tracking-[0.25em] bg-fashion-black/80 px-3 py-1 rounded border border-fashion-gold/30">
                EDITORIAL EDIT
              </span>
              <h3 className="font-serif text-2xl font-bold text-fashion-ivory mt-3 group-hover:text-fashion-gold transition-colors">
                {look.title}
              </h3>
              <p className="text-xs text-fashion-lightGray/80 mt-1 line-clamp-2 font-light">
                {look.subtitle}
              </p>
              
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-fashion-gold group-hover:translate-x-2 transition-transform">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Look Modal */}
      {selectedLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedLook(null)} />
          <div className="relative z-10 w-full max-w-5xl bg-fashion-darkGray border border-fashion-gold/40 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedLook(null)}
              className="absolute top-6 right-6 p-2 text-fashion-muted hover:text-fashion-ivory"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-fashion-gold font-bold">
                LOOKBOOK EDIT COLLECTION
              </span>
              <h2 className="font-serif text-3xl font-bold uppercase text-fashion-ivory mt-1">
                {selectedLook.title}
              </h2>
              <p className="text-xs text-fashion-muted mt-1">{selectedLook.subtitle}</p>
            </div>

            <ProductGrid products={selectedLook.items} />
          </div>
        </div>
      )}
    </div>
  );
}
