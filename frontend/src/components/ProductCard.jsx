import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors?.[0], product.sizes?.[0], 1);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-[#E5E0DA] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF8F5]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* AI Match Badge matching reference image top-left */}
        <div className="absolute top-2.5 left-2.5 z-10 bg-[#111111]/90 text-[#C5A880] border border-[#C5A880]/60 px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 backdrop-blur-xs">
          <Sparkles className="w-2.5 h-2.5 text-[#C5A880]" />
          <span>{product.aiMatch || 92}% Match</span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Toggle Wishlist"
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 text-[#111111] hover:text-[#C5A880] border border-[#E5E0DA] shadow-xs transition-colors cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isSaved ? 'fill-[#C5A880] text-[#C5A880]' : ''
            }`}
          />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden md:block">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#111111] hover:bg-[#C5A880] text-white py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" /> Add to Bag
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-3.5 flex flex-col justify-between flex-grow">
        <div>
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-xs font-bold text-[#111111] group-hover:text-[#C5A880] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <span className="text-[11px] text-[#666666] font-medium block mt-0.5">{product.brand}</span>
        </div>

        {/* Price & Rating Row */}
        <div className="mt-2.5 pt-2 border-t border-[#F5F0EB] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-extrabold text-[#111111]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-[#888888] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="text-[10px] font-bold text-[#C5A880]">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Rating Stars matching reference image */}
            <div className="flex items-center gap-1 text-[10px] text-[#555555] mt-1 font-medium">
              <Star className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-[#888888]">({product.reviews})</span>
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className="md:hidden p-2 rounded-md bg-[#111111] text-white cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>
      </div>
    </div>
  );
}

