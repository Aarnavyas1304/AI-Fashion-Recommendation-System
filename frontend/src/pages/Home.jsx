import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp, ShieldCheck, Flame, RefreshCw, Layers, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import OutfitBuilder from '../components/OutfitBuilder';
import CompilerQueryBar from '../components/CompilerQueryBar';

export default function Home() {
  const [aiPicks, setAiPicks] = useState([]);

  useEffect(() => {
    setAiPicks(MOCK_PRODUCTS.slice(0, 8));
  }, []);

  const valueProps = [
    { title: "AI Powered Recommendations", icon: Sparkles },
    { title: "Personalized Just For You", icon: Layers },
    { title: "Latest Trends", icon: Flame },
    { title: "Best Prices Guaranteed", icon: TrendingUp },
    { title: "Easy Returns & Refunds", icon: RefreshCw }
  ];

  const trendingCategories = [
    { title: "Summer Collection", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800", link: "/shop?season=Summer" },
    { title: "College Looks", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800", link: "/shop?occasion=College" },
    { title: "Party Wear", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800", link: "/shop?occasion=Party" },
    { title: "Ethnic Collection", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800", link: "/shop?style=Ethnic" },
    { title: "Street Style", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800", link: "/shop?style=Streetwear" }
  ];

  const categoriesGrid = [
    { name: "Women", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600", path: "/category/women" },
    { name: "Men", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600", path: "/category/men" },
    { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600", path: "/category/dresses" },
    { name: "Tops", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600", path: "/shop?category=Tops" },
    { name: "Bottoms", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600", path: "/shop?category=Jeans" },
    { name: "Shoes", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600", path: "/category/shoes" },
    { name: "Bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600", path: "/category/accessories" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600", path: "/category/accessories" }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section matching exact split layout in uploaded reference image */}
      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[75vh] items-center">
          
          {/* Left Column Text Box */}
          <div className="lg:col-span-6 px-6 sm:px-12 py-16 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.35em] text-[#C5A880] font-bold">
                Next-Gen Editorial Styling
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl font-light tracking-tight leading-tight text-[#FAF8F5]">
              Your Style.<br />
              <span className="font-normal font-serif text-[#C5A880]">Our Intelligence.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#CCCCCC] font-light max-w-md">
              AI-powered fashion recommendations tailored just for you.
            </p>

            {/* Exact buttons from reference image */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                to="/ai-stylist"
                className="bg-[#C5A880] hover:bg-[#B89768] text-white px-7 py-3.5 rounded-md text-xs uppercase font-bold tracking-widest text-center shadow-sm transition-all"
              >
                GET AI RECOMMENDATIONS
              </Link>

              <Link
                to="/shop"
                className="border border-[#C5A880]/50 hover:border-[#C5A880] text-[#FAF8F5] hover:text-[#C5A880] px-7 py-3.5 rounded-md text-xs uppercase font-semibold tracking-widest text-center transition-colors"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>

          {/* Right Column Model Photo matching reference image */}
          <div className="lg:col-span-6 h-full min-h-[450px] lg:min-h-[75vh] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
              alt="StyleAI Model Editorial"
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent opacity-60 lg:opacity-100 hidden sm:block" style={{ width: '15%' }} />
          </div>
        </div>
      </section>

      {/* Value Proposition Bar matching reference image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F0EB] border border-[#E5E0DA] rounded-lg p-5 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs font-semibold text-[#111111]">
            {valueProps.map((vp, idx) => {
              const Icon = vp.icon;
              return (
                <div key={idx} className="flex flex-col md:flex-row items-center justify-center gap-2 text-center md:text-left">
                  <div className="w-8 h-8 rounded-full bg-[#C5A880]/15 flex items-center justify-center shrink-0 border border-[#C5A880]/30">
                    <Icon className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <span className="text-[11px] leading-tight font-semibold text-[#222222]">{vp.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compiler / NLP Demo Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompilerQueryBar onQueryResult={(data) => setAiPicks(data)} />
      </section>

      {/* Trending Now 🔥 Section matching reference image layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E5E0DA]">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#111111] flex items-center gap-2">
            Trending Now <span className="text-xl">🔥</span>
          </h2>
          <Link to="/lookbook" className="text-xs uppercase font-bold tracking-widest text-[#C5A880] hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Tall Cards matching reference image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {trendingCategories.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="group flex flex-col items-center"
            >
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#E5E0DA] shadow-xs mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-bold text-[#111111] group-hover:text-[#C5A880] transition-colors text-center">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* AI PICKS FOR YOU Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E5E0DA]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold block mb-1">
              CURATED ALGORITHMIC SELECTION
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#111111]">
              AI PICKS FOR YOU
            </h2>
          </div>
          <Link
            to="/recommendations"
            className="bg-[#C5A880] text-white px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs hover:bg-[#B89768] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" /> Full AI Matches
          </Link>
        </div>

        <ProductGrid products={aiPicks} />
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 pb-2 border-b border-[#E5E0DA]">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#111111]">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categoriesGrid.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className="group relative aspect-square rounded-lg overflow-hidden border border-[#E5E0DA] shadow-xs"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-white tracking-wider uppercase group-hover:text-[#FAF8F5] text-center px-2">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMPLETE THE LOOK Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OutfitBuilder
          top={MOCK_PRODUCTS[0]}
          bottom={MOCK_PRODUCTS[3]}
          shoes={MOCK_PRODUCTS[6]}
          accessory={MOCK_PRODUCTS[14]}
        />
      </section>
    </div>
  );
}

