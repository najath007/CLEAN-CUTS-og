import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  
  if (!product) return null;

  const { image, tittle, desc, price, rating, id } = product;
  const isFavorite = isInWishlist(id);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col w-full h-full"
    >
      {/* Image container — clickable */}
      <Link to={`/product/${id}`} className="relative aspect-[3/4] sm:aspect-auto sm:h-[320px] overflow-hidden bg-slate-50 shrink-0 block cursor-pointer">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
          src={image} 
          alt={tittle} 
          loading="lazy"
        />
        
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 sm:top-3 sm:bottom-auto sm:left-3 bg-white/90 backdrop-blur px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-sm sm:rounded-full flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm font-bold sm:font-medium shadow-sm">
          <span className="text-slate-800">{rating}</span>
          <Star size={10} className="fill-green-700 text-green-700 sm:fill-yellow-400 sm:text-yellow-400 sm:w-[14px] sm:h-[14px]" />
        </div>
      </Link>

      {/* Top actions — outside Link to avoid nested interactives */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-10">
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className="bg-white p-2.5 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-brand-accent text-brand-accent" : "text-slate-400"} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-5 flex flex-col flex-grow">
        <Link to={`/product/${id}`}>
          <h2 className="font-heading font-semibold text-[11px] sm:text-lg text-slate-800 line-clamp-1 mb-0.5 sm:mb-1 group-hover:text-brand-accent transition-colors">
            {tittle}
          </h2>
        </Link>
        <p className="hidden sm:block text-sm text-slate-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {desc}
        </p>

        {/* Mobile Pricing Style */}
        <div className="flex sm:hidden flex-col gap-0.5 mt-0.5 mb-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] text-slate-400 line-through">₹{Math.round(price * 1.6)}</span>
            <span className="text-[13px] font-bold text-slate-900">₹{price}</span>
          </div>
          <p className="text-[9px] text-brand-accent font-medium leading-tight">
            ₹{Math.round(price * 0.85)} with UPI offer + more
          </p>
        </div>

        {/* Desktop Price and Cart */}
        <div className="hidden sm:flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Price</span>
            <span className="font-semibold text-lg text-slate-900">₹{price}</span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="bg-brand-dark hover:bg-brand-accent text-white p-2.5 rounded-xl transition-colors flex items-center justify-center"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
