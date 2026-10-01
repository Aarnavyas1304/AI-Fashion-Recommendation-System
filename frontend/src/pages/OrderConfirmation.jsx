import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, Sparkles, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order || {
    id: "#SA2026",
    date: "28 May 2026",
    total: 1998
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#966F33', '#0B0B0B', '#7A1020']
      });
    } catch (e) {
      // fallback
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      
      {/* Exact Order Placed Card from Reference Image */}
      <div className="bg-white border border-[#E5E0D8] rounded-2xl p-8 sm:p-12 shadow-card space-y-6">
        
        {/* Round Bag Icon with Green Checkmark Badge */}
        <div className="relative w-24 h-24 bg-[#F5F2EC] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10 text-zinc-900" />
          <div className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-1.5 border-2 border-white shadow-sm">
            <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
          </div>
        </div>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 mb-1">
            Order Placed Successfully! ✨
          </h1>
          <p className="text-xs text-zinc-500 font-medium">
            Thank you for shopping with StyleAI.
          </p>
        </div>

        {/* Order Meta Box matching reference image */}
        <div className="bg-zinc-50 border border-[#E5E0D8] rounded-xl p-4 text-xs text-zinc-700 space-y-1 max-w-sm mx-auto">
          <div className="flex justify-between">
            <span className="text-zinc-500 font-medium">Order ID:</span>
            <span className="font-extrabold text-zinc-900">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500 font-medium">Estimated Delivery:</span>
            <span className="font-bold text-[#966F33]">28 May 2026</span>
          </div>
        </div>

        {/* Buttons matching reference image */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/orders"
            className="w-full sm:w-auto bg-[#0B0B0B] hover:bg-[#966F33] text-white px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Track Order
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto border border-zinc-300 hover:border-[#966F33] text-zinc-800 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
