import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, wishlist } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
    { name: "KIDS", path: "/kids" },
    { name: "BRANDS", path: "/brands" },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2" 
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to={`/`} className="flex-shrink-0 flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M 60 30 A 24 24 0 1 0 60 70" stroke="black" strokeWidth="16" fill="none" strokeLinecap="butt" />
              <path d="M 80 30 A 24 24 0 1 0 80 70" stroke="#3b82f6" strokeWidth="16" fill="none" strokeLinecap="butt" />
            </svg>
          </div>
          <span className="font-heading font-bold text-2xl tracking-tighter text-brand-dark hidden sm:block">
            Clean<span className="text-brand-accent">Cuts.</span>
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`relative py-1 hover:text-brand-dark transition-colors ${
                location.pathname === link.path ? "text-brand-dark" : ""
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-slate-100 border-none rounded-full w-64 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
          />
          <Search className="absolute left-3 text-slate-400" size={16} />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 text-slate-600">
          <Link to={`/favorite`} className="hover:text-brand-accent transition-colors relative group">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to={`/cart`} className="hover:text-brand-accent transition-colors relative">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
          <Link to={`/login`} className="hover:text-brand-accent transition-colors hidden sm:block">
            <User size={20} />
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden hover:text-brand-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-800 hover:text-brand-accent"
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-slate-100 border-none rounded-full w-full px-4 py-3 pl-10 text-sm focus:outline-none"
                />
                <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
