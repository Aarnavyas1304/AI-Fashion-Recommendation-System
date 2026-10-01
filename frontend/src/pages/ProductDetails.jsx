import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Sparkles, ShieldCheck, Truck, RefreshCw, Ruler, Check, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { getProductById, getProducts } from '../services/api';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUser } from '../context/UserContext';
import SizeGuideModal from '../components/SizeGuideModal';
import OutfitBuilder from '../components/OutfitBuilder';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useUser();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [completeLookProducts, setCompleteLookProducts] = useState({});

  // Expandable section states matching reference image
  const [openAccordions, setOpenAccordions] = useState({
    material: false,
    delivery: false,
    reviews: false
  });

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const res = await getProductById(id || 'af-101');
      if (res.success && res.data) {
        setProduct(res.data);
        setSelectedImage(res.data.image);
        setSelectedColor(res.data.colors?.[0] || 'Black');
        setSelectedSize(res.data.sizes?.[0] || 'M');
        addRecentlyViewed(res.data);

        const allRes = await getProducts({});
        const all = allRes.data || [];
        setCompleteLookProducts({
          top: res.data,
          bottom: all.find(p => p.category === 'Jeans' || p.category === 'Bottoms') || all[3],
          shoes: all.find(p => p.category === 'Shoes') || all[6],
          accessory: all.find(p => p.category === 'Accessories' || p.category === 'Watches') || all[8]
        });
      }
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="w-16 h-16 bg-zinc-200 rounded-full mx-auto mb-4" />
        <div className="h-6 bg-zinc-200 w-1/3 mx-auto rounded" />
      </div>
    );
  }

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, 1);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumb Navigation matching reference image */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest mb-6">
        <Link to="/" className="hover:text-zinc-900">Home</Link>
        <ChevronRight className="w-3 h-3 text-[#966F33]" />
        <Link to="/shop" className="hover:text-zinc-900">Men</Link>
        <ChevronRight className="w-3 h-3 text-[#966F33]" />
        <Link to="/shop?category=Tops" className="hover:text-zinc-900">Tops</Link>
        <ChevronRight className="w-3 h-3 text-[#966F33]" />
        <span className="text-zinc-900 font-bold truncate">{product.name}</span>
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        
        {/* Left Column: Image Gallery Thumbnails + Main Photo */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[550px] shrink-0">
            {gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-20 h-24 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                  selectedImage === imgUrl ? 'border-[#966F33] ring-1 ring-[#966F33]' : 'border-[#E5E0D8] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="relative flex-1 aspect-[3/4] bg-zinc-100 border border-[#E5E0D8] rounded-2xl overflow-hidden group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute top-4 left-4 z-10 bg-[#0B0B0B] text-white border border-[#966F33] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#966F33]" />
              <span>{product.aiMatch || 95}% Match</span>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/90 text-zinc-700 hover:text-[#7A1020] border border-zinc-200 shadow-md transition-colors"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#7A1020] text-[#7A1020]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Title, Prices, Color/Size, Action Buttons */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-zinc-900 mb-1">
              {product.name}
            </h1>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">{product.brand}</p>

            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-zinc-700">
              <span className="font-bold text-zinc-900">{product.rating}</span>
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="text-zinc-400">({product.reviews} Reviews)</span>
            </div>

            {/* Prices matching reference image */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-extrabold text-zinc-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-400 line-through font-medium">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount && (
                <span className="text-xs font-bold text-[#7A1020] uppercase">
                  {product.discount}
                </span>
              )}
            </div>
            <span className="text-[11px] text-zinc-400 font-medium block mb-6">Inclusive of all taxes</span>

            {/* Color Swatches */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-zinc-800 mb-2">
                Color: <span className="text-zinc-600 font-semibold">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                      selectedColor === c
                        ? 'border-[#0B0B0B] bg-[#0B0B0B] text-white font-bold'
                        : 'border-[#E5E0D8] bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide + Recommended Size Pill matching reference image */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-zinc-800">
                  Size: <span className="text-zinc-600 font-semibold">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-[#966F33] hover:underline font-bold uppercase tracking-wider cursor-pointer"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-10 rounded-lg border font-bold text-xs uppercase flex items-center justify-center transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#966F33] text-white border-[#966F33] shadow-sm font-extrabold'
                        : 'bg-white text-zinc-700 border-[#E5E0D8] hover:border-zinc-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Recommended Size Badge matching reference image */}
              <div className="inline-flex items-center gap-1.5 text-xs text-[#966F33] font-semibold bg-[#966F33]/10 px-3 py-1 rounded-full border border-[#966F33]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#966F33]" />
                <span>Size recommended: M</span>
              </div>
            </div>

            {/* Buttons matching reference image */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <button
                onClick={() => addToCart(product, selectedColor, selectedSize, 1)}
                className="bg-[#0B0B0B] hover:bg-[#966F33] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#966F33]" /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-white border border-zinc-300 hover:border-[#966F33] text-zinc-900 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery & Security Badges matching reference image */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-zinc-50 border border-[#E5E0D8] rounded-xl flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#966F33] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-zinc-800">Free Delivery</p>
                  <p className="text-zinc-500">On orders above ₹799</p>
                </div>
              </div>

              <div className="p-3 bg-zinc-50 border border-[#E5E0D8] rounded-xl flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-[#966F33] shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-zinc-800">Easy Returns</p>
                  <p className="text-zinc-500">7 days return policy</p>
                </div>
              </div>
            </div>

            {/* Expandable Accordions matching reference image */}
            <div className="border-t border-[#E5E0D8] divide-y divide-[#E5E0D8] text-xs">
              <div>
                <button
                  onClick={() => toggleAccordion('material')}
                  className="w-full py-3 flex items-center justify-between font-bold text-zinc-800 uppercase tracking-wider cursor-pointer"
                >
                  <span>Material & Care</span>
                  {openAccordions.material ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </button>
                {openAccordions.material && (
                  <p className="pb-3 text-zinc-600">100% Organic Heavyweight Combed Cotton. Machine wash cold with like colors.</p>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full py-3 flex items-center justify-between font-bold text-zinc-800 uppercase tracking-wider cursor-pointer"
                >
                  <span>Delivery & Returns</span>
                  {openAccordions.delivery ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </button>
                {openAccordions.delivery && (
                  <p className="pb-3 text-zinc-600">Free standard shipping. Returns accepted within 7 days in original condition.</p>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion('reviews')}
                  className="w-full py-3 flex items-center justify-between font-bold text-zinc-800 uppercase tracking-wider cursor-pointer"
                >
                  <span>Ratings & Reviews (3.2K)</span>
                  {openAccordions.reviews ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </button>
                {openAccordions.reviews && (
                  <p className="pb-3 text-zinc-600">Rated 4.6/5 by 3,210 verified buyers.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete The Look Section */}
      <OutfitBuilder
        top={completeLookProducts.top}
        bottom={completeLookProducts.bottom}
        shoes={completeLookProducts.shoes}
        accessory={completeLookProducts.accessory}
      />

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
