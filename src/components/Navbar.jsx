import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();
  const { cart, wishlist } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeUserStr = localStorage.getItem('cc_active_user');
    if (activeUserStr) {
      try {
        const activeUser = JSON.parse(activeUserStr);
        if (activeUser.email === 'nj@gmail.com') {
          setIsAdmin(true);
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        <div className="flex items-center gap-4 sm:gap-5 text-slate-600">
          <button 
            className="lg:hidden hover:text-brand-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Search size={20} />
          </button>
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
          <div className="relative hidden sm:block" ref={profileMenuRef}>
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="hover:text-brand-accent transition-colors flex items-center"
            >
              <User size={20} />
            </button>
            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-5 w-52 bg-white border border-slate-100 rounded-xl shadow-lg py-2 overflow-hidden z-50 origin-top-right"
                >
                  <Link to="/profile" className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-accent transition-colors" onClick={() => setIsProfileMenuOpen(false)}>My Profile</Link>
                  {isAdmin && (
                    <Link to="/admin" className="block px-4 py-2.5 text-sm font-bold text-brand-accent hover:bg-brand-accent/5 transition-colors" onClick={() => setIsProfileMenuOpen(false)}>Admin Dashboard</Link>
                  )}
                  <Link to="/helpcentre" className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-accent transition-colors" onClick={() => setIsProfileMenuOpen(false)}>Help Centre</Link>
                  <Link to="/coupons" className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-accent transition-colors" onClick={() => setIsProfileMenuOpen(false)}>Coupons</Link>
                  <div className="border-t border-slate-100 my-1"></div>
                  <Link to="/login" className="block px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors" onClick={() => setIsProfileMenuOpen(false)}>Logout</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden hover:text-brand-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Category Bar (Horizontal Scroll) */}
      <div className="md:hidden w-full overflow-x-auto border-t border-slate-100/50 mt-2 px-4 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-6 min-w-max pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-colors whitespace-nowrap pb-1 ${
                location.pathname === link.path 
                  ? "text-brand-dark border-b-2 border-brand-accent" 
                  : "text-slate-500 hover:text-brand-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}
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
