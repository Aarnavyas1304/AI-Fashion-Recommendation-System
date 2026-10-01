import React from 'react';
import { Sparkles } from 'lucide-react';
import { getMatchBadgeColor } from '../utils/formatters';

export default function AIMatchScore({ score = 92, size = "normal", showLabel = true }) {
  const badgeClasses = getMatchBadgeColor(score);

  if (size === "large") {
    return (
      <div className="flex items-center gap-3 bg-fashion-darkGray/90 border border-fashion-gold/40 px-4 py-2.5 rounded-full shadow-gold-glow">
        <div className="w-8 h-8 rounded-full bg-fashion-burgundy flex items-center justify-center border border-fashion-gold">
          <Sparkles className="w-4 h-4 text-fashion-gold" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-fashion-gold font-bold">AI Match Index</div>
          <div className="text-lg font-bold text-fashion-ivory font-serif tracking-wider">
            {score}% OVERALL MATCH
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border backdrop-blur-md shadow-sm ${badgeClasses}`}>
      <Sparkles className="w-3 h-3 text-fashion-gold" />
      <span>{score}% {showLabel ? 'AI MATCH' : ''}</span>
    </div>
  );
}
