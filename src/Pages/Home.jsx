import React from 'react'
import { menProduct } from '../data/menProduct'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'

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
      {/* Auto-playing Hero Carousel */}
      <HeroCarousel />

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
