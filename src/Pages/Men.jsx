import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import ProductFilter, { useFilteredProducts } from '../components/ProductFilter'

export default function Men() {
  const { products, loadingProducts } = useShop();
  const menProducts = products.filter(p => p.category === 'men');

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const filtered = useFilteredProducts(menProducts, searchQuery, sortBy);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-10 min-h-screen"
    >
      {/* Hero Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Main Banner */}
        <div className="md:col-span-2 relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl group">
          <img 
            src="/images/vintage2.png" 
            alt="Vintage Streetwear Collection" 
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-brand-accent text-white text-sm font-bold tracking-wider uppercase rounded-full mb-4 shadow-sm">
                New Drop
              </span>
              <h2 className="text-white text-4xl md:text-6xl font-heading font-bold mb-4 drop-shadow-lg">
                Radical Rides '88
              </h2>
              <p className="text-slate-200 text-lg md:text-xl max-w-2xl drop-shadow-md">
                Embrace the gritty, vintage aesthetic. Premium oversized fits built for the streets and skateparks.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Secondary Banner 1 */}
        <div className="relative w-full h-[300px] rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
          <img 
            src="/images/vintage3.png" 
            alt="Neo Tokyo Collection" 
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold tracking-wider uppercase rounded-full mb-3 self-start shadow-sm">
              Limited Edition
            </span>
            <h3 className="text-white text-2xl md:text-3xl font-heading font-bold mb-2 drop-shadow-lg group-hover:text-indigo-300 transition-colors">
              Neo Tokyo Vibes
            </h3>
            <p className="text-slate-300 text-sm md:text-base drop-shadow-md">
              Distressed aesthetic meets anime culture.
            </p>
          </div>
        </div>

        {/* Secondary Banner 2 */}
        <div className="relative w-full h-[300px] rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
          <img 
            src="/images/vintage1.png" 
            alt="Vintage Skull Drop" 
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="inline-block px-3 py-1 bg-slate-800 border border-slate-600 text-white text-xs font-bold tracking-wider uppercase rounded-full mb-3 self-start shadow-sm">
              Restocked
            </span>
            <h3 className="text-white text-2xl md:text-3xl font-heading font-bold mb-2 drop-shadow-lg group-hover:text-slate-300 transition-colors">
              The Alleyway Skull
            </h3>
            <p className="text-slate-300 text-sm md:text-base drop-shadow-md">
              Raw urban styles for the underground.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Men's Collection</h1>
        <p className="text-slate-500 max-w-2xl text-lg">Explore our premium selection of men's apparel. Designed for comfort, styled for the modern lifestyle.</p>
      </div>

      {/* Filter & Sort Bar */}
      <ProductFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resultCount={filtered.length}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-8 justify-items-center">
        {loadingProducts ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-slate-400 font-medium">No products found</p>
            <p className="text-sm text-slate-300 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : filtered.map((item, index) => (
          <ProductCard key={item.id || index} product={item} />
        ))}
      </div>
    </motion.div>
  )
}
