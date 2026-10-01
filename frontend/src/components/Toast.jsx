import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-bounce">
      <div className="bg-fashion-darkGray/95 border border-fashion-gold text-fashion-ivory px-4 py-3 rounded-lg shadow-gold-glow flex items-center gap-3 backdrop-blur-md">
        <div className="w-6 h-6 rounded-full bg-fashion-burgundy flex items-center justify-center border border-fashion-gold">
          <Sparkles className="w-3.5 h-3.5 text-fashion-gold" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider">{toastMessage}</span>
      </div>
    </div>
  );
}
