import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Sparkles, Flame, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import AIMatchScore from '../components/AIMatchScore';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-fashion-darkGray border border-fashion-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-fashion-gold" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wider text-fashion-ivory mb-2">
          YOUR EDIT IS EMPTY
        </h1>
        <p className="text-xs text-fashion-muted max-w-md mx-auto mb-8">
          Save runway pieces you love and they'll appear here with live price-drop alerts and AI styling notes.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.2em] border border-fashion-gold shadow-gold-glow transition-all"
        >
          EXPLORE FASHION <ArrowRight className="w-4 h-4 text-fashion-gold" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-fashion-gold/20 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-fashion-gold font-bold mb-1">
            <Heart className="w-4 h-4 fill-fashion-gold" /> SAVED SELECTIONS
          </div>
          <h1 className="font-serif text-4xl font-extrabold uppercase tracking-wider text-fashion-ivory">
            YOUR SAVED EDIT
          </h1>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-fashion-gold bg-fashion-darkGray px-4 py-2 rounded-lg border border-fashion-gold/30">
          {wishlist.length} SAVED GARMENTS
        </span>
      </div>

      {/* Sale Price Drop Alert Banner */}
      <div className="bg-fashion-burgundy/30 border border-fashion-gold/40 rounded-xl p-4 mb-8 flex items-center justify-between text-xs text-fashion-ivory">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-fashion-gold fill-fashion-gold" />
          <span className="font-bold uppercase tracking-wider">PRICE DROP ALERT: 20% OFF APPLIED TO YOUR SAVED ITEMS</span>
        </div>
        <span className="text-fashion-gold font-mono uppercase text-[11px] hidden sm:inline">LIMITED RUNWAY STOCK</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-fashion-darkGray/60 border border-fashion-gold/30 rounded-xl overflow-hidden shadow-editorial flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] bg-fashion-darkGray">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <AIMatchScore score={item.aiMatch || 92} />
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-fashion-black/70 text-fashion-muted hover:text-fashion-burgundy border border-fashion-lightGray/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                <span className="text-[11px] uppercase tracking-wider text-fashion-gold font-bold block mb-1">
                  {item.brand}
                </span>
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-serif text-lg font-bold text-fashion-ivory hover:text-fashion-gold transition-colors line-clamp-1 mb-2">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-bold text-fashion-ivory">{formatPrice(item.price)}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-fashion-muted line-through">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex gap-3">
              <button
                onClick={() => addToCart(item, item.colors?.[0], item.sizes?.[0], 1)}
                className="flex-1 bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-fashion-gold"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-fashion-gold" /> Move to Bag
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="px-3 bg-fashion-black text-fashion-muted hover:text-fashion-ivory rounded-lg border border-fashion-lightGray/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
