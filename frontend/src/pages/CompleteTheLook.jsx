import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getProductById, getProducts } from '../services/api';
import OutfitBuilder from '../components/OutfitBuilder';

export default function CompleteTheLook() {
  const { id } = useParams();
  const [outfit, setOutfit] = useState({ top: null, bottom: null, shoes: null, accessory: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOutfit() {
      setLoading(true);
      const res = await getProductById(id || 'af-101');
      const allRes = await getProducts({});
      const all = allRes.data || [];
      const topProduct = res.data || all[0];

      setOutfit({
        top: topProduct,
        bottom: all.find(p => p.category === 'Jeans' || p.category === 'Bottoms') || all[3],
        shoes: all.find(p => p.category === 'Shoes') || all[6],
        accessory: all.find(p => p.category === 'Accessories' || p.category === 'Watches') || all[8]
      });
      setLoading(false);
    }
    loadOutfit();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-fashion-gold hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fashion-darkGray border border-fashion-gold/40 text-fashion-gold text-xs uppercase tracking-[0.3em] font-medium mb-3">
          <Sparkles className="w-4 h-4 text-fashion-gold" />
          <span>EDITORIAL OUTFIT MATRIX</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold uppercase tracking-wider text-fashion-ivory mb-2">
          THE COMPLETE LOOK
        </h1>
        <p className="text-xs sm:text-sm text-fashion-muted max-w-lg mx-auto">
          AI algorithmically matched silhouette bundle. Harmonized color balance & style alignment guaranteed.
        </p>
      </div>

      {!loading && (
        <OutfitBuilder
          top={outfit.top}
          bottom={outfit.bottom}
          shoes={outfit.shoes}
          accessory={outfit.accessory}
        />
      )}
    </div>
  );
}
