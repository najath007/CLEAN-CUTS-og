import React from 'react'
import { motion } from 'framer-motion'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import { Heart, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Favorite() {
  const { wishlist } = useShop()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-28 min-h-screen"
    >
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-3">
          <Heart className="text-brand-accent fill-brand-accent" size={32} /> 
          Your Wishlist
        </h1>
        <p className="text-slate-500 text-lg">Save your favorite items here and grab them later.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 text-center">
          <div className="bg-slate-50 p-6 rounded-full mb-6 text-slate-300">
            <Heart size={64} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">It's empty here!</h2>
          <p className="text-slate-500 mb-8 max-w-md">You haven't saved any items yet. Explore our collections and find something you love.</p>
          <Link to="/men" className="bg-brand-dark text-white px-8 py-3.5 rounded-full font-medium hover:bg-brand-accent transition-colors flex items-center gap-2">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-8 justify-items-center">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
