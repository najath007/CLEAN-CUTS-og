import React from 'react'
import { motion } from 'framer-motion'
import { useShop } from '../context/ShopContext'
import { ShoppingCart, ArrowLeft, Trash2, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useShop()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-28 min-h-screen"
    >
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-3">
          <ShoppingCart className="text-brand-dark" size={32} /> 
          Shopping Cart
        </h1>
        <p className="text-slate-500 text-lg">Review your items before checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 text-center">
          <div className="bg-slate-50 p-6 rounded-full mb-6 text-slate-300">
            <ShoppingCart size={64} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8 max-w-md">Looks like you haven't added anything yet. Discover our premium collections.</p>
          <Link to="/men" className="bg-brand-dark text-white px-8 py-3.5 rounded-full font-medium hover:bg-brand-accent transition-colors flex items-center gap-2">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                  <img src={item.image} alt={item.tittle} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-slate-800">{item.tittle}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center font-medium text-slate-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white hover:shadow-sm rounded transition-all text-slate-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="font-bold text-lg text-slate-900">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 sticky top-32">
              <h2 className="text-xl font-heading font-bold text-slate-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-slate-900">Total</span>
                  <span className="font-bold text-2xl text-brand-dark">₹{cartTotal}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Inclusive of all taxes</p>
              </div>
              <button className="w-full bg-brand-accent hover:bg-brand-dark text-white py-4 rounded-xl font-medium transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
