// Formatting utilities for currency and scores

export function formatPrice(amount) {
  if (typeof amount !== 'number') return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercent(value) {
  return `${Math.round(value)}%`;
}

export function getMatchBadgeColor(score) {
  if (score >= 90) return 'bg-fashion-burgundy text-fashion-ivory border-fashion-gold';
  if (score >= 80) return 'bg-fashion-gold/20 text-fashion-gold border-fashion-gold/40';
  return 'bg-fashion-darkGray text-fashion-ivory border-fashion-lightGray/20';
}
