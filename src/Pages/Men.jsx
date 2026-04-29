import React from 'react'
import { menProduct } from '../data/menProduct'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

export default function Men() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-10 min-h-screen"
    >
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4">Men's Collection</h1>
        <p className="text-slate-500 max-w-2xl text-lg">Explore our premium selection of men's apparel. Designed for comfort, styled for the modern lifestyle.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {menProduct.map((item, index) => (
          <ProductCard key={item.id || index} product={item} />
        ))}
      </div>
    </motion.div>
  )
}
