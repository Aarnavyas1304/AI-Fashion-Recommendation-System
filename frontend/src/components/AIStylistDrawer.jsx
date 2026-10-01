import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function AIStylistDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { addToCart } = useCart();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Bonjour! I am your personal AI Stylist. Tell me what occasion or mood you are dressing for today.",
      suggestedItems: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[2]]
    }
  ]);

  const quickPrompts = [
    "What should I wear to a college party?",
    "Suggest a minimal office outfit for monsoon",
    "Show me traditional wedding wear for men",
    "Casual streetwear look under ₹3,000"
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Simulate AI response logic
    setTimeout(() => {
      let aiText = "Based on your prompt, here is a curated high-fashion ensemble tailored to your style DNA:";
      let suggested = [MOCK_PRODUCTS[0], MOCK_PRODUCTS[3], MOCK_PRODUCTS[6]];

      const lower = text.toLowerCase();
      if (lower.includes("party")) {
        aiText = "For a party, pair our Velvet Evening Blazer or Silk Slip Dress with metallic heels or handcrafted Chelsea boots for effortless luxury.";
        suggested = [MOCK_PRODUCTS[1], MOCK_PRODUCTS[2], MOCK_PRODUCTS[17]];
      } else if (lower.includes("wedding") || lower.includes("traditional") || lower.includes("ethnic")) {
        aiText = "For a festive or wedding occasion, royal silk Anarkalis or Jacquard Brocade Kurtas paired with 18k signet accessories create an opulent statement.";
        suggested = [MOCK_PRODUCTS[9], MOCK_PRODUCTS[20], MOCK_PRODUCTS[8]];
      } else if (lower.includes("college") || lower.includes("streetwear")) {
        aiText = "For college, go with an Oversized Heavyweight Noir Tee, Vintage Wide-Leg Denim, and Retro Monochrome Chunky Sneakers.";
        suggested = [MOCK_PRODUCTS[0], MOCK_PRODUCTS[3], MOCK_PRODUCTS[6]];
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiText,
          suggestedItems: suggested
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory px-4 py-3 rounded-full border border-fashion-gold shadow-gold-glow flex items-center gap-2 font-semibold text-xs tracking-widest uppercase transition-all duration-300 transform hover:scale-105 cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-fashion-gold animate-spin" style={{ animationDuration: '6s' }} />
        <span>✨ AI STYLIST</span>
      </button>

      {/* Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-md bg-fashion-black border-l border-fashion-gold/30 h-full flex flex-col justify-between z-10 shadow-2xl animate-fade-in">
            
            {/* Header */}
            <div className="p-4 border-b border-fashion-gold/20 flex items-center justify-between bg-fashion-darkGray">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-fashion-burgundy border border-fashion-gold flex items-center justify-center">
                  <Bot className="w-4 h-4 text-fashion-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-fashion-ivory tracking-wider uppercase">
                    AI STYLIST ASSISTANT
                  </h3>
                  <p className="text-[10px] text-fashion-gold uppercase tracking-widest">Always Online • Personal Advisor</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-fashion-muted hover:text-fashion-ivory transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-fashion-muted uppercase tracking-wider mb-1">
                    {msg.sender === 'user' ? (
                      <><span>You</span><User className="w-3 h-3 text-fashion-gold" /></>
                    ) : (
                      <><Bot className="w-3 h-3 text-fashion-gold" /><span>AI Stylist</span></>
                    )}
                  </div>

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-fashion-burgundy text-fashion-ivory rounded-tr-none border border-fashion-gold/30'
                        : 'bg-fashion-darkGray text-fashion-ivory rounded-tl-none border border-fashion-lightGray/10'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>

                    {/* Outfit Recommendation Cards */}
                    {msg.suggestedItems && msg.suggestedItems.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-fashion-lightGray/10 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-fashion-gold tracking-widest block">
                          SUGGESTED OUTFIT PIECES:
                        </span>
                        {msg.suggestedItems.map(item => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-2 rounded bg-fashion-black/60 border border-fashion-gold/20"
                          >
                            <div className="flex items-center gap-2">
                              <img src={item.image} alt={item.name} className="w-9 h-11 object-cover rounded" />
                              <div>
                                <p className="font-semibold text-[11px] text-fashion-ivory line-clamp-1">{item.name}</p>
                                <p className="text-[10px] text-fashion-gold">₹{item.price}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(item, item.colors?.[0], item.sizes?.[0], 1)}
                              className="p-1.5 bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory rounded text-[10px] flex items-center gap-1 cursor-pointer"
                            >
                              <ShoppingBag className="w-3 h-3 text-fashion-gold" />
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 border-t border-fashion-lightGray/10 bg-fashion-darkGray/40">
              <span className="text-[10px] uppercase text-fashion-gold font-bold tracking-wider block mb-1.5">
                QUICK STYLE PROMPTS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qp)}
                    className="text-[10px] bg-fashion-black border border-fashion-lightGray/20 hover:border-fashion-gold text-fashion-lightGray hover:text-fashion-gold px-2.5 py-1 rounded-full transition-colors truncate max-w-xs cursor-pointer"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-fashion-gold/20 bg-fashion-darkGray flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask AI what to wear today..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-fashion-black border border-fashion-lightGray/20 rounded-full px-4 py-2 text-xs text-fashion-ivory placeholder-fashion-muted focus:outline-none focus:border-fashion-gold"
              />
              <button
                type="submit"
                className="p-2.5 bg-fashion-burgundy hover:bg-fashion-burgundyHover text-fashion-ivory rounded-full border border-fashion-gold transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-fashion-gold" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
