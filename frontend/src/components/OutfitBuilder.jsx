import React from 'react';
import { ShoppingBag, Sparkles, Plus, Equal } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';

export default function OutfitBuilder({ top, bottom, shoes, accessory }) {
  const { addOutfitToCart } = useCart();

  const outfitItems = [top, bottom, shoes, accessory].filter(Boolean);
  const totalPrice = outfitItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddLook = () => {
    addOutfitToCart(outfitItems);
  };

  return (
    <div className="bg-fashion-darkGray/60 border border-fashion-gold/40 rounded-xl p-6 shadow-editorial my-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-fashion-lightGray/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-fashion-gold" />
          <h3 className="font-serif text-2xl font-bold tracking-wider text-fashion-ivory uppercase">
            COMPLETE THE LOOK
          </h3>
        </div>
        <span className="text-xs uppercase tracking-widest text-fashion-gold font-semibold">
          AI Curated Outfit Bundle
        </span>
      </div>

      {/* Grid of Outfit Components */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {outfitItems.map((item, idx) => (
          <div key={item.id || idx} className="relative bg-fashion-black border border-fashion-lightGray/10 rounded-lg p-3 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-fashion-gold tracking-widest mb-2 block">
              PIECE 0{idx + 1} • {item.category}
            </span>
            <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded mb-3" />
            <div>
              <p className="text-xs font-semibold text-fashion-ivory line-clamp-1">{item.name}</p>
              <p className="text-xs font-bold text-fashion-gold mt-1">{formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-fashion-gold/20 bg-fashion-black/40 p-4 rounded-lg">
        <div>
          <div className="text-xs uppercase tracking-wider text-fashion-muted">Bundle Outfit Price</div>
          <div className="text-2xl font-serif font-bold text-fashion-ivory flex items-baseline gap-2">
            <span>{formatPrice(totalPrice)}</span>
            <span className="text-xs text-fashion-gold font-sans font-normal uppercase">({outfitItems.length} curated pieces)</span>
          </div>
        </div>

        <button
          onClick={handleAddLook}
          className="w-full sm:w-auto bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-fashion-gold shadow-gold-glow transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-fashion-gold" />
          Add Complete Look to Bag
        </button>
      </div>
    </div>
  );
}
