import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => String(p.id) === String(id));

  // Related products: same category, excluding current
  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-heading font-bold text-slate-700">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-brand-accent font-medium hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const { image, tittle, desc, price, rating, category } = product;
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const categoryPath = category === 'brands' ? '/brands' : `/${category}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50"
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to={categoryPath} className="hover:text-brand-accent transition-colors capitalize">{category}</Link>
          <span>/</span>
          <span className="text-slate-700 font-medium truncate max-w-[200px]">{tittle}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="sticky top-32 aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg group">
              <img
                src={image}
                alt={tittle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Rating badge */}
              <div className="absolute top-5 left-5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold shadow-md">
                <Star size={15} className="fill-yellow-400 text-yellow-400" />
                <span className="text-slate-700">{rating}</span>
              </div>
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-5 right-5 bg-white/90 backdrop-blur p-2.5 rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  size={20}
                  className={isFavorite ? 'fill-brand-accent text-brand-accent' : 'text-slate-400'}
                />
              </button>
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category tag */}
            <span className="inline-block self-start px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold tracking-wider uppercase rounded-full mb-4">
              {category}
            </span>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3 leading-tight">
              {tittle}
            </h1>

            <p className="text-slate-500 text-base leading-relaxed mb-6 max-w-lg">
              {desc}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-slate-900">₹{price}</span>
              <span className="text-lg text-slate-400 line-through">₹{Math.round(price * 1.4)}</span>
              <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                30% OFF
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 mb-8" />

            {/* Size selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Select Size</span>
                <button className="text-xs text-brand-accent font-medium hover:underline">Size Guide</button>
              </div>
              <div className="flex gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-brand-dark bg-brand-dark text-white shadow-lg scale-105'
                        : 'border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3 block">Quantity</span>
              <div className="flex items-center gap-1 bg-slate-100 rounded-xl w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-10">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-brand-dark hover:bg-brand-accent text-white'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    Add to Cart — ₹{price * quantity}
                  </>
                )}
              </motion.button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  isFavorite
                    ? 'border-brand-accent bg-brand-accent/10'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <Heart
                  size={22}
                  className={isFavorite ? 'fill-brand-accent text-brand-accent' : 'text-slate-400'}
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'Orders over ₹499' },
                { icon: Shield, label: 'Quality Guaranteed', sub: '100% Premium' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '15-day returns' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <Icon size={22} className="text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-700">{label}</span>
                  <span className="text-[11px] text-slate-400">{sub}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-bold text-slate-900">You May Also Like</h2>
              <Link to={categoryPath} className="text-sm text-brand-accent font-medium hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}
