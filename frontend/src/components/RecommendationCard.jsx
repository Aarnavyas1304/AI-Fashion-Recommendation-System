import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronDown, ChevronUp, Check, Heart, ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function RecommendationCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const match = product.aiMatch || 92;

  // Sub-scores
  const styleScore = Math.min(99, match + 3);
  const colorScore = Math.min(98, match - 2);
  const occasionScore = Math.min(99, match + 6);
  const budgetScore = Math.min(96, match);
  const seasonScore = Math.min(95, match - 5);

  return (
    <div className="bg-white border border-[#E5E0DA] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          
          {/* Gold AI Match Badge */}
          <div className="absolute top-3 left-3 bg-[#111111]/90 text-[#C5A880] border border-[#C5A880]/60 px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{match}% AI MATCH</span>
          </div>

          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#111111] hover:text-[#C5A880] border border-[#E5E0DA] shadow-xs transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-[#C5A880] mb-1">
            <span>{product.brand}</span>
            <div className="flex items-center gap-1 text-[#444444]">
              <Star className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-lg font-bold text-[#111111] hover:text-[#C5A880] transition-colors mb-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-extrabold text-[#111111]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#888888] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount && (
              <span className="text-[10px] bg-[#F5F0EB] text-[#C5A880] border border-[#C5A880]/40 px-2 py-0.5 rounded font-bold uppercase">
                {product.discount}
              </span>
            )}
          </div>

          {/* Expandable WHY AI RECOMMENDED THIS? */}
          <div className="bg-[#FAF8F5] border border-[#E5E0DA] rounded-md overflow-hidden">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-[#111111] hover:bg-[#F5F0EB] transition-colors uppercase tracking-wider cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-[#C5A880]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHY AI RECOMMENDED THIS?</span>
              </div>
              {expanded ? <ChevronUp className="w-4 h-4 text-[#666666]" /> : <ChevronDown className="w-4 h-4 text-[#666666]" />}
            </button>

            {expanded && (
              <div className="p-4 border-t border-[#E5E0DA] space-y-3 text-xs animate-fade-in bg-white">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#444444]">
                    <span>Style — Fit ({product.style || 'Casual'})</span>
                    <span className="font-extrabold text-[#C5A880]">{styleScore}%</span>
                  </div>
                  <div className="w-full bg-[#FAF8F5] h-1.5 rounded-full overflow-hidden border border-[#E5E0DA]">
                    <div className="bg-[#C5A880] h-full rounded-full" style={{ width: `${styleScore}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#444444]">
                    <span>Color — Palette Fit</span>
                    <span className="font-extrabold text-[#C5A880]">{colorScore}%</span>
                  </div>
                  <div className="w-full bg-[#FAF8F5] h-1.5 rounded-full overflow-hidden border border-[#E5E0DA]">
                    <div className="bg-[#C5A880] h-full rounded-full" style={{ width: `${colorScore}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#444444]">
                    <span>Occasion — Match ({product.occasion || 'College'})</span>
                    <span className="font-extrabold text-[#C5A880]">{occasionScore}%</span>
                  </div>
                  <div className="w-full bg-[#FAF8F5] h-1.5 rounded-full overflow-hidden border border-[#E5E0DA]">
                    <div className="bg-[#C5A880] h-full rounded-full" style={{ width: `${occasionScore}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#444444]">
                    <span>Budget — Match</span>
                    <span className="font-extrabold text-[#C5A880]">{budgetScore}%</span>
                  </div>
                  <div className="w-full bg-[#FAF8F5] h-1.5 rounded-full overflow-hidden border border-[#E5E0DA]">
                    <div className="bg-[#C5A880] h-full rounded-full" style={{ width: `${budgetScore}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#444444]">
                    <span>Season — Match</span>
                    <span className="font-extrabold text-[#C5A880]">{seasonScore}%</span>
                  </div>
                  <div className="w-full bg-[#FAF8F5] h-1.5 rounded-full overflow-hidden border border-[#E5E0DA]">
                    <div className="bg-[#C5A880] h-full rounded-full" style={{ width: `${seasonScore}%` }} />
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[#F5F0EB] space-y-1.5">
                  {(product.matchReasons || [
                    `✓ Matches your preferred style`,
                    `✓ Matches your preferred color`,
                    `✓ Suitable for your occasion`,
                    `✓ Within your target budget`,
                    `✓ Similar to products you liked`
                  ]).map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-[#333333]">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center gap-3">
        <button
          onClick={() => addToCart(product, product.colors?.[0], product.sizes?.[0], 1)}
          className="flex-1 bg-[#111111] hover:bg-[#C5A880] text-white py-3 rounded-md text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" /> Add to Bag
        </button>
      </div>
    </div>
  );
}

