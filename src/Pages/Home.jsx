import React from 'react'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Tag, Truck, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'

function Home() {
  const { products, loadingProducts } = useShop();

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

  const banners = [
    {
      id: 1,
      label: "Flash Sale",
      title: "Up to 50% Off",
      subtitle: "Men's Collection",
      desc: "Limited time — grab your favourite styles before they're gone.",
      link: "/men",
      icon: <Zap size={20} className="text-yellow-300" />,
      bg: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
      accent: "text-yellow-300",
      badge: "bg-yellow-400 text-black",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80"
    },
    {
      id: 2,
      label: "New Season",
      title: "Women's Spring",
      subtitle: "Fresh Arrivals 2026",
      desc: "Effortlessly chic pieces to elevate your wardrobe this season.",
      link: "/women",
      icon: <Tag size={20} className="text-pink-300" />,
      bg: "from-[#2d1b4e] via-[#3d1f6e] to-[#1a0a2e]",
      accent: "text-pink-300",
      badge: "bg-pink-400 text-white",
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80"
    },
    {
      id: 3,
      label: "Free Shipping",
      title: "Orders Over ₹999",
      subtitle: "All Categories",
      desc: "Shop from Men, Women, Kids & Brands — free delivery on your doorstep.",
      link: "/brands",
      icon: <Truck size={20} className="text-green-300" />,
      bg: "from-[#0d2e1a] via-[#0a3d20] to-[#052912]",
      accent: "text-green-300",
      badge: "bg-green-400 text-black",
      image: "https://images.unsplash.com/photo-1558769132-cb1fac08c04b?w=600&q=80"
    },
    {
      id: 4,
      label: "24 hrs Only",
      title: "Kids Blowout",
      subtitle: "Prices Drop Tonight",
      desc: "Colourful, comfy and cool — stock up before midnight!",
      link: "/kids",
      icon: <Clock size={20} className="text-orange-300" />,
      bg: "from-[#2e1a00] via-[#3d2500] to-[#1a0f00]",
      accent: "text-orange-300",
      badge: "bg-orange-400 text-black",
      image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=600&q=80"
    }
  ]

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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-8 justify-items-center"
        >
          {loadingProducts ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
            </div>
          ) : products.slice(0, 4).map((item, index) => (
            <motion.div key={item.id || index} variants={itemVariants} className="w-full flex justify-center">
              <ProductCard product={item} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── LIVE PROMOTIONAL BANNERS ── */}
      <section className="bg-brand-dark py-16 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium">
              <Zap size={14} className="text-yellow-400 fill-yellow-400" />
              Live Deals
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Top wide banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link to={banners[0].link}>
              <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${banners[0].bg} p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 group hover:shadow-2xl hover:shadow-yellow-900/20 transition-all duration-300`}>
                {/* Glow blob */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full filter blur-3xl pointer-events-none" />
                {/* Text */}
                <div className="relative z-10 flex-1 text-white space-y-4">
                  <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${banners[0].badge}`}>
                    {banners[0].icon} {banners[0].label}
                  </span>
                  <h3 className={`text-4xl md:text-5xl font-heading font-bold ${banners[0].accent}`}>{banners[0].title}</h3>
                  <p className="text-lg text-slate-300 font-medium">{banners[0].subtitle}</p>
                  <p className="text-slate-400 max-w-md">{banners[0].desc}</p>
                  <span className="inline-flex items-center gap-2 bg-white text-brand-dark font-semibold px-6 py-2.5 rounded-full group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight size={16} />
                  </span>
                </div>
                {/* Image */}
                <div className="relative z-10 w-full md:w-72 h-52 md:h-64 flex-shrink-0">
                  <img
                    src={banners[0].image}
                    alt={banners[0].subtitle}
                    className="w-full h-full object-cover rounded-2xl rotate-1 group-hover:rotate-0 transition-transform duration-300 shadow-xl"
                  />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 3 smaller banners grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {banners.slice(1).map((banner, i) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={banner.link}>
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.bg} p-6 flex flex-col gap-4 group h-full min-h-[260px] hover:shadow-xl transition-all duration-300`}>
                    {/* Glow */}
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full filter blur-2xl pointer-events-none" />
                    {/* Image thumbnail */}
                    <div className="relative h-32 w-full rounded-xl overflow-hidden">
                      <img
                        src={banner.image}
                        alt={banner.subtitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className={`absolute top-2 left-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${banner.badge}`}>
                        {banner.icon} {banner.label}
                      </span>
                    </div>
                    {/* Text */}
                    <div className="relative z-10 text-white">
                      <h4 className={`text-xl font-heading font-bold ${banner.accent}`}>{banner.title}</h4>
                      <p className="text-slate-300 text-sm mb-1">{banner.subtitle}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{banner.desc}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-white/70 text-sm font-medium group-hover:text-white group-hover:gap-2 transition-all mt-auto">
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bottom spacer */}
      <div className="h-8 bg-brand-dark" />
    </div>
  )
}

export default Home
