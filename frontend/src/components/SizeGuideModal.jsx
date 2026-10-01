import React from 'react';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-fashion-darkGray border border-fashion-gold/40 rounded-xl p-6 shadow-2xl text-fashion-ivory">
        <div className="flex items-center justify-between pb-4 border-b border-fashion-lightGray/10 mb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-fashion-gold" />
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider">EDITORIAL SIZE GUIDE</h3>
          </div>
          <button onClick={onClose} className="p-1 text-fashion-muted hover:text-fashion-ivory">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-fashion-muted mb-4">
          Measurements are provided in inches. For an oversized fit (as styled in runway looks), we recommend selecting your true size.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-fashion-gold/20 text-fashion-gold uppercase tracking-wider">
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Chest (in)</th>
                <th className="py-2.5 px-3">Waist (in)</th>
                <th className="py-2.5 px-3">Shoulder (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fashion-lightGray/10 text-fashion-lightGray">
              <tr><td className="py-2 px-3 font-bold text-fashion-ivory">XS</td><td className="py-2 px-3">34 - 36</td><td className="py-2 px-3">28 - 30</td><td className="py-2 px-3">16.5</td></tr>
              <tr><td className="py-2 px-3 font-bold text-fashion-ivory">S</td><td className="py-2 px-3">36 - 38</td><td className="py-2 px-3">30 - 32</td><td className="py-2 px-3">17.0</td></tr>
              <tr><td className="py-2 px-3 font-bold text-fashion-ivory">M</td><td className="py-2 px-3">38 - 40</td><td className="py-2 px-3">32 - 34</td><td className="py-2 px-3">17.5</td></tr>
              <tr><td className="py-2 px-3 font-bold text-fashion-ivory">L</td><td className="py-2 px-3">40 - 42</td><td className="py-2 px-3">34 - 36</td><td className="py-2 px-3">18.0</td></tr>
              <tr><td className="py-2 px-3 font-bold text-fashion-ivory">XL</td><td className="py-2 px-3">42 - 44</td><td className="py-2 px-3">36 - 38</td><td className="py-2 px-3">18.5</td></tr>
              <tr><td className="py-2 px-3 font-bold text-fashion-ivory">XXL</td><td className="py-2 px-3">44 - 46</td><td className="py-2 px-3">38 - 40</td><td className="py-2 px-3">19.0</td></tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory py-2.5 rounded text-xs font-bold uppercase tracking-widest border border-fashion-gold/30"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
