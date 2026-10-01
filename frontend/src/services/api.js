// API Service abstraction layer for AI Fashion Recommendation System
// Mock functions ready to be swapped with Node.js/Express/PostgreSQL backend

import { MOCK_PRODUCTS, LOOKBOOK_CATEGORIES } from '../data/products';

const DELAY_MS = 300;

export async function getProducts(filters = {}) {
  await new Promise(res => setTimeout(res, DELAY_MS));
  let result = [...MOCK_PRODUCTS];

  if (filters.category) {
    result = result.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
  }

  if (filters.gender) {
    result = result.filter(p => p.gender.toLowerCase() === filters.gender.toLowerCase() || p.gender === 'Unisex');
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) || 
      p.style.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (filters.style) {
    result = result.filter(p => p.style.toLowerCase() === filters.style.toLowerCase());
  }

  if (filters.occasion) {
    result = result.filter(p => p.occasion.toLowerCase() === filters.occasion.toLowerCase());
  }

  if (filters.season) {
    result = result.filter(p => p.season.toLowerCase() === filters.season.toLowerCase());
  }

  if (filters.color) {
    result = result.filter(p => p.colors.some(c => c.toLowerCase() === filters.color.toLowerCase()));
  }

  if (filters.maxPrice) {
    result = result.filter(p => p.price <= filters.maxPrice);
  }

  if (filters.minPrice) {
    result = result.filter(p => p.price >= filters.minPrice);
  }

  if (filters.sortBy) {
    if (filters.sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (filters.sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (filters.sortBy === 'match') result.sort((a, b) => b.aiMatch - a.aiMatch);
    if (filters.sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
  }

  return { success: true, count: result.length, data: result };
}

export async function getProductById(id) {
  await new Promise(res => setTimeout(res, DELAY_MS));
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (!product) {
    return { success: false, error: "Product not found" };
  }
  return { success: true, data: product };
}

export async function getAIRecommendations(preferences) {
  // Simulates AI recommendation calculation engine
  await new Promise(res => setTimeout(res, 1200)); // Simulates processing delay

  const { style, occasion, colors = [], season, budget } = preferences || {};

  let scoredProducts = MOCK_PRODUCTS.map(product => {
    let score = 70; // baseline

    if (style && product.style.toLowerCase() === style.toLowerCase()) score += 12;
    if (occasion && product.occasion.toLowerCase() === occasion.toLowerCase()) score += 10;
    if (season && product.season.toLowerCase() === season.toLowerCase()) score += 5;
    if (colors.some(c => product.colors.includes(c))) score += 3;
    if (budget && product.price <= budget) score += 2;

    // Cap at 99
    score = Math.min(99, Math.max(score, 78));

    return {
      ...product,
      aiMatch: score
    };
  });

  scoredProducts.sort((a, b) => b.aiMatch - a.aiMatch);

  return {
    success: true,
    overallMatchScore: 92,
    preferences,
    data: scoredProducts
  };
}

// Compiler / Natural Language Query parsing simulator (Lexer -> Parser -> Filter)
export async function parseStyleQuery(queryString) {
  await new Promise(res => setTimeout(res, 500));
  const tokens = queryString.toLowerCase().split(/\s+/);

  const recognizedStyles = ["casual", "formal", "streetwear", "ethnic", "party", "minimal", "sporty"];
  const recognizedOccasions = ["college", "office", "party", "wedding", "date", "travel"];
  const recognizedColors = ["black", "white", "blue", "pink", "red", "green", "purple", "beige", "gold", "burgundy"];

  const matchedStyle = tokens.find(t => recognizedStyles.includes(t));
  const matchedOccasion = tokens.find(t => recognizedOccasions.includes(t));
  const matchedColor = tokens.find(t => recognizedColors.includes(t));

  let results = MOCK_PRODUCTS;

  if (matchedStyle) results = results.filter(p => p.style.toLowerCase() === matchedStyle);
  if (matchedOccasion) results = results.filter(p => p.occasion.toLowerCase() === matchedOccasion);
  if (matchedColor) results = results.filter(p => p.colors.some(c => c.toLowerCase() === matchedColor));

  return {
    success: true,
    query: queryString,
    parsedAST: {
      style: matchedStyle || "any",
      occasion: matchedOccasion || "any",
      color: matchedColor || "any",
      isValidDFA: true
    },
    count: results.length,
    data: results
  };
}

export async function getLookbookEdits() {
  await new Promise(res => setTimeout(res, 200));
  return { success: true, data: LOOKBOOK_CATEGORIES };
}
