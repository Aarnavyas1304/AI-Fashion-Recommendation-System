import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, Sparkles, ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { MOCK_PRODUCTS } from '../data/products';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalDiscount,
    deliveryFee,
    grandTotal,
    addToCart
  } = useCart();
  
  const navigate = useNavigate();

  const suggestedItems = [MOCK_PRODUCTS[6], MOCK_PRODUCTS[8], MOCK_PRODUCTS[14]].filter(
    p => !cart.some(c => c.product.id === p.id)
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-white border border-[#E5E0D8] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShoppingBag className="w-8 h-8 text-[#966F33]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900 mb-2">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-xs text-zinc-500 max-w-md mx-auto mb-8">
          Explore our AI recommendations and save fashion pieces to your bag.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#966F33] hover:bg-[#825E2B] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-bronze-glow"
        >
          Explore Collection <ArrowRight className="w-4 h-4 text-white" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="border-b border-[#E5E0D8] pb-4 mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-zinc-900">
          My Cart ({cart.length} Items)
        </h1>
        <Link to="/shop" className="text-xs text-[#966F33] hover:underline font-bold uppercase tracking-wider">
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Cart Items + Complete The Look */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="bg-white border border-[#E5E0D8] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-card"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded-lg border border-zinc-200 shrink-0"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-zinc-900 line-clamp-1">
                    {item.product.name}
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-bold uppercase">{item.product.brand}</span>
                  
                  <div className="flex items-center gap-3 text-xs text-zinc-600 mt-1">
                    <span>Size: <strong className="text-zinc-900">{item.size}</strong></span>
                    <span>•</span>
                    <span>Color: <strong className="text-zinc-900">{item.color}</strong></span>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-sm font-extrabold text-zinc-900">{formatPrice(item.product.price)}</span>
                    {item.product.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through">{formatPrice(item.product.originalPrice)}</span>
                    )}
                    {item.product.discount && (
                      <span className="text-[10px] text-[#7A1020] font-bold">{item.product.discount}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-lg px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-zinc-600 hover:text-black cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-2 text-zinc-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-zinc-600 hover:text-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="p-2 text-zinc-400 hover:text-[#7A1020] cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Complete The Look Cross-sells matching reference image */}
          {suggestedItems.length > 0 && (
            <div className="bg-white border border-[#E5E0D8] rounded-xl p-6 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3 flex items-center gap-1.5">
                Complete The Look ✨
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestedItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="bg-zinc-50 border border-[#E5E0D8] rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded" />
                      <div>
                        <p className="font-bold text-xs text-zinc-900 line-clamp-1">{item.name}</p>
                        <p className="text-xs font-extrabold text-[#966F33]">₹{item.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(item, item.colors?.[0], item.sizes?.[0], 1)}
                      className="bg-[#966F33] hover:bg-[#825E2B] text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Price Details matching reference image */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E5E0D8] rounded-xl p-6 sticky top-28 shadow-card text-xs text-zinc-800 space-y-4">
            <h3 className="font-serif text-lg font-bold text-zinc-900 border-b border-[#E5E0D8] pb-3">
              Price Details
            </h3>

            <div className="space-y-2.5 text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#7A1020]">
                <span>Discount</span>
                <span className="font-semibold">-{formatPrice(totalDiscount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-bold text-emerald-600">
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E0D8] flex justify-between items-baseline">
              <span className="font-serif text-lg font-bold text-zinc-900">Total Amount</span>
              <span className="font-serif text-2xl font-bold text-zinc-900">{formatPrice(grandTotal)}</span>
            </div>

            {/* Bronze Proceed Button matching reference image */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#966F33] hover:bg-[#825E2B] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-bronze-glow transition-all cursor-pointer mt-4"
            >
              Proceed to Checkout
            </button>

            {/* Trust Badges matching reference image bottom right */}
            <div className="pt-4 border-t border-zinc-100 space-y-2 text-[11px] text-zinc-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#966F33]" />
                <span>100% Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#966F33]" />
                <span>7 days return policy</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#966F33]" />
                <span>Free Delivery on orders above ₹799</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
