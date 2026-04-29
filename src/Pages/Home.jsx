import React from 'react'
import { menProduct } from '../data/menProduct'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'
import { ArrowRight, Star, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-brand-dark flex items-center pt-20">
        {/* Animated Background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span>Premium Streetwear Collection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-400">
                Everyday Style
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
              Discover our latest collection of premium oversized t-shirts. Designed for comfort, styled for the streets.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link to="/men" className="bg-white text-brand-dark hover:bg-slate-100 px-8 py-3.5 rounded-full font-semibold transition-colors flex items-center gap-2">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/brands" className="text-white hover:text-brand-accent px-6 py-3.5 font-medium transition-colors">
                Explore Brands
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block relative h-[500px]"
          >
            <img 
              src="https://images.bewakoof.com/t1080/men-s-white-vengeance-typography-oversized-t-shirt-519142-1745907892-1.jpg" 
              alt="Hero Model" 
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl rotate-2"
            />
            {/* Decorative card */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">New Arrivals</p>
                <p className="font-bold text-slate-800">50+ Products</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Trending Now</h2>
            <p className="text-slate-500">Our most popular selections this week</p>
          </div>
          <Link to="/men" className="hidden sm:flex items-center gap-1 text-brand-accent font-medium hover:gap-2 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
        >
          {menProduct.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="w-full flex justify-center">
              <ProductCard product={item} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default Home
