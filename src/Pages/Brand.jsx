import React from 'react'
import { motion } from 'framer-motion'
import { Star, Zap } from 'lucide-react'

export default function Brand() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-brand-dark flex items-center pt-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium">
              <Star size={14} className="text-green-400 fill-green-400" />
              <span>Top Brands</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Curated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-brand-accent">
                Excellence
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
              Shop from the world's most renowned streetwear and premium lifestyle brands.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block relative h-[400px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1fac08c04b?w=800&q=80" 
              alt="Brands Collection" 
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl -rotate-2"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Exclusive Drops</p>
                <p className="font-bold text-slate-800">Top Tier</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Placeholder for products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-400">Brands Coming Soon...</h2>
      </section>
    </div>
  )
}
