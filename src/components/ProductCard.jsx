import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ image, tittle, desc, price, rating }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col w-[280px] h-full"
    >
      {/* Image container */}
      <div className="relative h-[320px] overflow-hidden bg-slate-50 shrink-0">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
          src={image} 
          alt={tittle} 
          loading="lazy"
        />
        
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button className="bg-white p-2.5 rounded-full shadow-md text-slate-400 hover:text-brand-accent hover:bg-slate-50 transition-colors">
            <Heart size={18} />
          </button>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 text-sm font-medium shadow-sm">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-slate-700">{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="font-heading font-semibold text-lg text-slate-800 line-clamp-1 mb-1 group-hover:text-brand-accent transition-colors">
          {tittle}
        </h2>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {desc}
        </p>

        {/* Price and Cart */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">Price</span>
            <span className="font-semibold text-lg text-slate-900">₹{price}</span>
          </div>
          
          <button className="bg-brand-dark hover:bg-brand-accent text-white p-2.5 rounded-xl transition-colors flex items-center justify-center">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
