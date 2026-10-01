import React from 'react';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

export default function ProductGrid({ products = [], loading = false, emptyMessage = "No items match your criteria." }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="animate-pulse bg-fashion-darkGray/60 border border-fashion-lightGray/10 rounded-lg overflow-hidden h-[380px]">
            <div className="bg-fashion-darkGray h-3/4 w-full" />
            <div className="p-4 space-y-2">
              <div className="h-3 bg-fashion-lightGray/10 rounded w-1/3" />
              <div className="h-4 bg-fashion-lightGray/20 rounded w-3/4" />
              <div className="h-4 bg-fashion-lightGray/10 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-fashion-darkGray/30 border border-fashion-lightGray/10 rounded-xl my-6">
        <Sparkles className="w-10 h-10 text-fashion-gold mx-auto mb-3 opacity-60" />
        <h3 className="text-lg font-serif text-fashion-ivory font-bold mb-1 uppercase tracking-wider">
          No Perfect Match Found
        </h3>
        <p className="text-xs text-fashion-muted max-w-md mx-auto mb-6">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
