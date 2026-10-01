import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../services/api';

export default function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryHeaders = {
    women: {
      title: "THE WOMEN'S EDIT",
      subtitle: "High fashion editorial gowns, silk slip dresses, oversized cashmere & leather totes.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1600"
    },
    men: {
      title: "THE MEN'S EDIT",
      subtitle: "Tailored velvet blazers, heavyweight oversized tees, raw denim & Italian leather boots.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600"
    },
    shoes: {
      title: "FOOTWEAR ARCHIVE",
      subtitle: "Chunky retro sneakers, strappy metallic stilettos & handcrafted Goodyear Chelsea boots.",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1600"
    },
    dresses: {
      title: "EVENING DRESSES & GOWNS",
      subtitle: "Bias-cut silk satin slip dresses, zardozi Anarkalis & cocktail silhouettes.",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1600"
    },
    accessories: {
      title: "LUXURY ACCESSORIES & BAGS",
      subtitle: "18k gold signet rings, calfskin tote bags & tinted acetate eyewear.",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1600"
    }
  };

  const key = (categoryName || 'women').toLowerCase();
  const headerInfo = categoryHeaders[key] || {
    title: `${key.toUpperCase()} EDIT`,
    subtitle: `Curated AI recommendations in ${key}`,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600"
  };

  useEffect(() => {
    async function loadCategoryProducts() {
      setLoading(true);
      let filterObj = {};
      if (key === 'women') filterObj.gender = 'Women';
      else if (key === 'men') filterObj.gender = 'Men';
      else if (key === 'shoes') filterObj.category = 'Shoes';
      else if (key === 'dresses') filterObj.category = 'Dresses';
      else if (key === 'accessories') filterObj.category = 'Accessories';
      else filterObj.category = key;

      const res = await getProducts(filterObj);
      setProducts(res.data);
      setLoading(false);
    }
    loadCategoryProducts();
  }, [key]);

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Category Header Banner */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-fashion-gold/20">
        <img
          src={headerInfo.image}
          alt={headerInfo.title}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.4em] text-fashion-gold font-bold block mb-2">
            EDITORIAL COLLECTION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold uppercase tracking-wider text-fashion-ivory mb-3">
            {headerInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-fashion-lightGray font-light">
            {headerInfo.subtitle}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid products={products} loading={loading} />
      </section>
    </div>
  );
}
