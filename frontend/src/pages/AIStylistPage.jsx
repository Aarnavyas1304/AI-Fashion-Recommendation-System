import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, Briefcase, GraduationCap, PartyPopper, Heart, Plane, Shirt, Sun, CloudRain, Snowflake, Flower2, Wand2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function AIStylistPage() {
  const { aiPreferences, updatePreferences } = useUser();
  const navigate = useNavigate();

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Form selections state initialized from context
  const [style, setStyle] = useState(aiPreferences.style || 'Casual');
  const [occasion, setOccasion] = useState(aiPreferences.occasion || 'College');
  const [selectedColors, setSelectedColors] = useState(aiPreferences.colors || ['Black', 'White', 'Blue']);
  const [season, setSeason] = useState(aiPreferences.season || 'Summer');
  const [budget, setBudget] = useState(aiPreferences.budget || 3000);
  const [size, setSize] = useState(aiPreferences.size || 'M');

  const styleOptions = ["Casual", "Formal", "Streetwear", "Ethnic", "Party", "Minimal", "Sporty"];

  const occasionOptions = [
    { name: "College", icon: GraduationCap },
    { name: "Office", icon: Briefcase },
    { name: "Party", icon: PartyPopper },
    { name: "Wedding", icon: Sparkles },
    { name: "Date", icon: Heart },
    { name: "Travel", icon: Plane },
    { name: "Daily Wear", icon: Shirt }
  ];

  const colorOptions = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Blue", hex: "#2563EB" },
    { name: "Pink", hex: "#EC4899" },
    { name: "Red", hex: "#DC2626" },
    { name: "Green", hex: "#16A34A" },
    { name: "Purple", hex: "#9333EA" },
    { name: "Beige", hex: "#D4B996" }
  ];

  const seasonOptions = [
    { name: "Summer", icon: Sun },
    { name: "Monsoon", icon: CloudRain },
    { name: "Winter", icon: Snowflake },
    { name: "Spring", icon: Flower2 }
  ];

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const toggleColor = (colorName) => {
    if (selectedColors.includes(colorName)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter(c => c !== colorName));
      }
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const handleGenerate = () => {
    const newPrefs = { style, occasion, colors: selectedColors, season, budget, size };
    updatePreferences(newPrefs);

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/recommendations');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      
      {/* Header Stepper Indicator matching reference image top middle */}
      <div className="flex items-center justify-center gap-8 text-xs font-semibold text-[#888888] uppercase tracking-widest mb-8 border-b border-[#E5E0DA] pb-4">
        <div className="flex items-center gap-2 text-[#C5A880] font-bold border-b-2 border-[#C5A880] pb-1">
          <span className="w-5 h-5 rounded-full bg-[#C5A880] text-white flex items-center justify-center text-[10px]">1</span>
          <span>Preferences</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#F5F0EB] text-[#666666] flex items-center justify-center text-[10px]">2</span>
          <span>Recommendations</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#F5F0EB] text-[#666666] flex items-center justify-center text-[10px]">3</span>
          <span>Results</span>
        </div>
      </div>

      {/* Main Form Title */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] mb-2">
          FIND YOUR PERFECT STYLE
        </h1>
        <p className="text-xs text-[#666666] tracking-wide">
          Tell us about your style and let AI create your perfect recommendations.
        </p>
      </div>

      {/* AI Stylist Form Container matching reference image */}
      <div className="bg-white border border-[#E5E0DA] rounded-lg p-6 sm:p-10 shadow-sm space-y-8">
        
        {isAnalyzing ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-[#C5A880] border-t-transparent animate-spin mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#111111]">ANALYZING YOUR STYLE...</h3>
            <p className="text-xs text-[#C5A880] font-semibold uppercase tracking-widest animate-pulse">
              Computing 95%+ AI Match Matrix
            </p>
          </div>
        ) : (
          <>
            {/* Question 1: What's your style? */}
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-3 uppercase tracking-wider">1. What's your style?</label>
              <div className="flex flex-wrap gap-2">
                {styleOptions.map(st => (
                  <button
                    key={st}
                    onClick={() => setStyle(st)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      style === st
                        ? 'bg-[#111111] text-white shadow-xs font-bold'
                        : 'bg-[#F5F0EB] text-[#444444] hover:bg-[#FAF8F5] border border-[#E5E0DA]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Occasion */}
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-3 uppercase tracking-wider">2. Occasion</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {occasionOptions.map(occ => {
                  const Icon = occ.icon;
                  const isSel = occasion === occ.name;
                  return (
                    <button
                      key={occ.name}
                      onClick={() => setOccasion(occ.name)}
                      className={`p-3 rounded-md border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSel
                          ? 'border-[#C5A880] bg-[#FAF8F5] text-[#C5A880] font-bold shadow-xs'
                          : 'border-[#E5E0DA] bg-[#F5F0EB] text-[#555555] hover:border-[#C5A880]/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSel ? 'text-[#C5A880]' : 'text-[#777777]'}`} />
                      <span className="text-[11px] font-semibold text-center">{occ.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 3: Preferred Colors */}
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-3 uppercase tracking-wider">3. Preferred Colors</label>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map(c => {
                  const isSel = selectedColors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 relative flex items-center justify-center transition-transform cursor-pointer ${
                        isSel ? 'border-[#C5A880] scale-110 shadow-xs' : 'border-[#E5E0DA] hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSel && <Check className={`w-4 h-4 ${c.name === 'White' || c.name === 'Beige' ? 'text-black' : 'text-white'}`} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 4: Season */}
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-3 uppercase tracking-wider">4. Season</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {seasonOptions.map(s => {
                  const Icon = s.icon;
                  const isSel = season === s.name;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setSeason(s.name)}
                      className={`p-3 rounded-md border flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        isSel
                          ? 'border-[#C5A880] bg-[#FAF8F5] text-[#C5A880] font-bold shadow-xs'
                          : 'border-[#E5E0DA] bg-[#F5F0EB] text-[#555555] hover:border-[#C5A880]/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#C5A880]" />
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 5: Budget Range */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">5. Budget Range</label>
                <span className="text-xs font-extrabold text-[#C5A880]">Max: ₹{budget.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#777777] font-semibold mt-1">
                <span>₹500</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* Question 6: Select Size */}
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-3 uppercase tracking-wider">6. Select Size</label>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={`w-11 h-11 rounded-md border font-bold text-xs uppercase flex items-center justify-center transition-all cursor-pointer ${
                      size === sz
                        ? 'bg-[#C5A880] text-white border-[#C5A880] shadow-xs font-extrabold'
                        : 'bg-[#F5F0EB] text-[#444444] border-[#E5E0DA] hover:border-[#C5A880]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button matching reference image */}
            <div className="pt-4 border-t border-[#E5E0DA]">
              <button
                onClick={handleGenerate}
                className="w-full bg-[#C5A880] hover:bg-[#B89768] text-white py-4 rounded-md text-xs font-bold uppercase tracking-[0.2em] shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Wand2 className="w-4 h-4 text-white" />
                GENERATE MY AI RECOMMENDATIONS
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

