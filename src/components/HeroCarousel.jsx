import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Smile, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 0,
    title: "Define Your",
    titleHighlight: "Aesthetic",
    subtitle: "Women's Exclusive",
    desc: "Explore our chic, comfortable, and trendy collections crafted exclusively for women who lead the way.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    link: "/women",
    theme: {
      blob1: "bg-pink-500/30",
      blob2: "bg-purple-500/30",
      iconColor: "text-pink-400 fill-pink-400",
      gradient: "from-pink-400 to-purple-400",
      Icon: Star
    }
  },
  {
    id: 1,
    title: "Playful &",
    titleHighlight: "Comfortable",
    subtitle: "Kids Collection",
    desc: "Vibrant, durable, and super comfy styles designed for the little adventurers in your life.",
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=800&q=80",
    link: "/kids",
    theme: {
      blob1: "bg-yellow-400/30",
      blob2: "bg-orange-500/30",
      iconColor: "text-yellow-400 fill-yellow-400",
      gradient: "from-yellow-400 to-orange-400",
      Icon: Smile
    }
  },
  {
    id: 2,
    title: "Curated",
    titleHighlight: "Excellence",
    subtitle: "Top Brands",
    desc: "Shop from the world's most renowned streetwear and premium lifestyle brands.",
    image: "https://images.unsplash.com/photo-1558769132-cb1fac08c04b?w=800&q=80",
    link: "/brands",
    theme: {
      blob1: "bg-brand-accent/30",
      blob2: "bg-green-500/30",
      iconColor: "text-green-400 fill-green-400",
      gradient: "from-green-400 to-brand-accent",
      Icon: Zap
    }
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-brand-dark pt-20">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center"
        >
          {/* Animated Background blobs */}
          <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob ${slides[current].theme.blob1}`} />
          <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 ${slides[current].theme.blob2}`} />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium">
                {React.createElement(slides[current].theme.Icon, { size: 14, className: slides[current].theme.iconColor })}
                <span>{slides[current].subtitle}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
                {slides[current].title} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slides[current].theme.gradient}`}>
                  {slides[current].titleHighlight}
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                {slides[current].desc}
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Link to={slides[current].link} className="bg-white text-brand-dark hover:bg-slate-100 px-8 py-3.5 rounded-full font-semibold transition-colors flex items-center gap-2">
                  Shop Now <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:block relative h-[400px] lg:h-[500px]"
            >
              <img 
                src={slides[current].image} 
                alt={slides[current].subtitle} 
                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl rotate-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-6">
        <button 
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </section>
  );
}
