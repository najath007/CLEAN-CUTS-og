import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, Users, Package, BarChart2,
  Settings, Bell, Search, ChevronDown, TrendingUp, TrendingDown,
  ArrowUpRight, Menu, X, Star, Eye, Edit2, Trash2, Plus,
  ShoppingCart, Heart, DollarSign, LogOut, ChevronRight
} from "lucide-react";

// ── Mock Data ────────────────────────────────────────────────
const STATS = [
  { label: "Total Revenue", value: "₹4,28,560", change: +18.2, icon: DollarSign, color: "from-violet-500 to-purple-600" },
  { label: "Total Orders", value: "1,284", change: +12.5, icon: ShoppingCart, color: "from-blue-500 to-cyan-500" },
  { label: "Total Products", value: "32", change: +4.1, icon: Package, color: "from-emerald-500 to-teal-500" },
  { label: "Total Users", value: "8,741", change: -2.3, icon: Users, color: "from-orange-500 to-amber-500" },
];

const ORDERS = [
  { id: "#CC-1091", customer: "Arjun Mehta", product: "CleanCuts x NASA", category: "Men", amount: 499, status: "Delivered", date: "May 4, 2026" },
  { id: "#CC-1090", customer: "Sneha Rao", product: "CleanCuts Women x Pink", category: "Women", amount: 499, status: "Processing", date: "May 4, 2026" },
  { id: "#CC-1089", customer: "Rahul Verma", product: "Supreme Drop", category: "Brands", amount: 1999, status: "Shipped", date: "May 3, 2026" },
  { id: "#CC-1088", customer: "Priya Singh", product: "CleanCuts x Rick & Morty", category: "Men", amount: 599, status: "Delivered", date: "May 3, 2026" },
  { id: "#CC-1087", customer: "Karan Malhotra", product: "BAPE Classic", category: "Brands", amount: 2999, status: "Cancelled", date: "May 2, 2026" },
  { id: "#CC-1086", customer: "Divya Nair", product: "CleanCuts Kids x Style", category: "Kids", amount: 399, status: "Delivered", date: "May 2, 2026" },
  { id: "#CC-1085", customer: "Amit Sharma", product: "CleanCuts x Venom", category: "Men", amount: 749, status: "Processing", date: "May 1, 2026" },
];

const TOP_PRODUCTS = [
  { name: "CleanCuts x Rick & Morty", sales: 312, revenue: "₹1,86,888", rating: 4.9, category: "Men" },
  { name: "Supreme Drop", sales: 89, revenue: "₹1,77,911", rating: 4.9, category: "Brands" },
  { name: "CleanCuts x NASA", sales: 278, revenue: "₹1,38,722", rating: 4.8, category: "Men" },
  { name: "BAPE Classic", sales: 44, revenue: "₹1,31,956", rating: 4.9, category: "Brands" },
  { name: "CleanCuts Women x Pink", sales: 195, revenue: "₹97,305", rating: 4.8, category: "Women" },
];

const REVENUE_BARS = [
  { month: "Jan", value: 65 }, { month: "Feb", value: 80 }, { month: "Mar", value: 72 },
  { month: "Apr", value: 91 }, { month: "May", value: 100 }, { month: "Jun", value: 78 },
  { month: "Jul", value: 85 }, { month: "Aug", value: 93 }, { month: "Sep", value: 70 },
  { month: "Oct", value: 88 }, { month: "Nov", value: 95 }, { month: "Dec", value: 82 },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Package, label: "Products", id: "products" },
  { icon: ShoppingBag, label: "Orders", id: "orders" },
  { icon: Users, label: "Customers", id: "customers" },
  { icon: BarChart2, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const STATUS_STYLE = {
  Delivered: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Processing: "bg-blue-50 text-blue-700 border border-blue-200",
  Shipped: "bg-violet-50 text-violet-700 border border-violet-200",
  Cancelled: "bg-red-50 text-red-700 border border-red-200",
};

// ── Sub Components ────────────────────────────────────────────
function StatCard({ stat, index }) {
  const Icon = stat.icon;
  const isUp = stat.change > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</p>
          <p className="font-heading font-bold text-2xl text-brand-dark mt-1">{stat.value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isUp ? "text-emerald-600" : "text-red-500"}`}>
        {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span>{isUp ? "+" : ""}{stat.change}% vs last month</span>
      </div>
    </motion.div>
  );
}

function RevenueChart() {
  const max = Math.max(...REVENUE_BARS.map(b => b.value));
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-bold text-lg text-brand-dark">Revenue Overview</h3>
          <p className="text-sm text-slate-400 mt-0.5">Monthly performance — 2026</p>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
          <TrendingUp size={13} /> +18.2%
        </span>
      </div>
      <div className="flex items-end gap-2 h-44">
        {REVENUE_BARS.map((bar, i) => (
          <motion.div
            key={bar.month}
            initial={{ height: 0 }}
            animate={{ height: `${(bar.value / max) * 100}%` }}
            transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
            className="flex-1 flex flex-col items-center justify-end gap-1.5 group"
          >
            <div
              className={`w-full rounded-lg transition-all group-hover:opacity-80 cursor-pointer ${
                bar.month === "May"
                  ? "bg-gradient-to-t from-brand-accent to-blue-400"
                  : "bg-slate-100 group-hover:bg-slate-200"
              }`}
              style={{ height: "100%" }}
              title={`${bar.month}: ₹${bar.value * 4285}`}
            />
            <span className="text-[10px] text-slate-400 font-medium">{bar.month}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function OrdersTable({ orders }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 className="font-heading font-bold text-lg text-brand-dark">Recent Orders</h3>
        <button className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <th className="text-left px-6 py-3 font-medium">Order ID</th>
              <th className="text-left px-6 py-3 font-medium">Customer</th>
              <th className="text-left px-6 py-3 font-medium hidden md:table-cell">Product</th>
              <th className="text-left px-6 py-3 font-medium hidden lg:table-cell">Date</th>
              <th className="text-right px-6 py-3 font-medium">Amount</th>
              <th className="text-center px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order, i) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="px-6 py-3.5 font-mono text-xs text-slate-500">{order.id}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-accent to-violet-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      {order.customer.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-800 whitespace-nowrap">{order.customer}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 hidden md:table-cell text-slate-600 max-w-[160px] truncate">{order.product}</td>
                <td className="px-6 py-3.5 hidden lg:table-cell text-slate-400 text-xs whitespace-nowrap">{order.date}</td>
                <td className="px-6 py-3.5 text-right font-semibold text-slate-800">₹{order.amount}</td>
                <td className="px-6 py-3.5 text-center">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLE[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TopProducts({ products }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h3 className="font-heading font-bold text-lg text-brand-dark">Top Products</h3>
        <button className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <div className="divide-y divide-slate-50">
        {products.map((p, i) => (
          <div key={p.name} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50/60 transition-colors">
            <span className="font-heading font-bold text-slate-300 text-lg w-5 text-center">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-800 truncate">{p.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{p.category} · {p.sales} sold</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-sm text-slate-800">{p.revenue}</p>
              <div className="flex items-center gap-0.5 justify-end mt-0.5">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span className="text-[11px] text-slate-400">{p.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryDonut() {
  const cats = [
    { name: "Men", pct: 55, color: "#3b82f6" },
    { name: "Women", pct: 20, color: "#8b5cf6" },
    { name: "Kids", pct: 12, color: "#10b981" },
    { name: "Brands", pct: 13, color: "#f59e0b" },
  ];
  let offset = 0;
  const r = 60, circ = 2 * Math.PI * r;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="font-heading font-bold text-lg text-brand-dark mb-5">Sales by Category</h3>
      <div className="flex items-center justify-center gap-8">
        <div className="relative w-36 h-36 flex-shrink-0">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            <circle cx="80" cy="80" r={r} fill="none" stroke="#f1f5f9" strokeWidth="18" />
            {cats.map((cat) => {
              const dash = (cat.pct / 100) * circ;
              const gap = circ - dash;
              const el = (
                <circle
                  key={cat.name}
                  cx="80" cy="80" r={r}
                  fill="none"
                  stroke={cat.color}
                  strokeWidth="18"
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                />
              );
              offset += dash;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading font-bold text-xl text-brand-dark">32</span>
            <span className="text-[10px] text-slate-400 font-medium">Products</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {cats.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-sm text-slate-600 font-medium">{cat.name}</span>
              <span className="text-sm font-bold text-slate-800 ml-auto pl-4">{cat.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────
export default function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const Sidebar = ({ mobile = false }) => (
    <aside className={`
      ${mobile ? "fixed inset-y-0 left-0 z-50 w-64 shadow-2xl" : "relative"}
      bg-brand-dark flex flex-col h-full transition-all duration-300
      ${!mobile && !sidebarOpen ? "w-20" : "w-64"}
    `}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
          <svg viewBox="0 0 100 100" className="w-6 h-6">
            <path d="M 60 30 A 24 24 0 1 0 60 70" stroke="white" strokeWidth="16" fill="none" strokeLinecap="butt" />
            <path d="M 80 30 A 24 24 0 1 0 80 70" stroke="#3b82f6" strokeWidth="16" fill="none" strokeLinecap="butt" />
          </svg>
        </div>
        <AnimatePresence>
          {(sidebarOpen || mobile) && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-heading font-bold text-xl text-white tracking-tighter overflow-hidden whitespace-nowrap"
            >
              Clean<span className="text-brand-accent">Cuts.</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {!mobile && (
          <p className={`text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2 px-2 transition-all ${!sidebarOpen ? "opacity-0" : ""}`}>
            Main Menu
          </p>
        )}
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); if (mobile) setMobileSidebarOpen(false); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left
                ${active ? "bg-brand-accent text-white shadow-sm" : "text-white/60 hover:bg-white/10 hover:text-white"}
                ${!sidebarOpen && !mobile ? "justify-center" : ""}
              `}
              title={!sidebarOpen && !mobile ? item.label : ""}
            >
              <Icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {(sidebarOpen || mobile) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && (sidebarOpen || mobile) && (
                <motion.div layoutId="nav-dot" className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className={`px-3 py-4 border-t border-white/10 flex items-center gap-3 ${!sidebarOpen && !mobile ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-accent to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          A
        </div>
        <AnimatePresence>
          {(sidebarOpen || mobile) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-semibold text-white truncate">Admin User</p>
              <p className="text-xs text-white/40 truncate">admin@cleancuts.com</p>
            </motion.div>
          )}
        </AnimatePresence>
        {(sidebarOpen || mobile) && (
          <Link to="/" className="text-white/40 hover:text-white transition-colors" title="Back to Store">
            <LogOut size={16} />
          </Link>
        )}
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
            />
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-100 px-4 md:px-6 py-3.5 flex items-center gap-4 sticky top-0 z-30">
          <button
            className="text-slate-500 hover:text-brand-dark transition-colors"
            onClick={() => {
              if (window.innerWidth < 768) setMobileSidebarOpen(true);
              else setSidebarOpen((s) => !s);
            }}
          >
            <Menu size={22} />
          </button>

          <div className="flex-1 flex items-center gap-3 bg-slate-100 rounded-xl px-3.5 py-2 max-w-xs">
            <Search size={15} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search orders, products..."
              className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none flex-1"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative text-slate-500 hover:text-brand-dark transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full text-[9px] text-white flex items-center justify-center font-bold">3</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-accent to-violet-600 flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            {activeSection === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-heading font-bold text-2xl text-brand-dark">Dashboard</h1>
                    <p className="text-sm text-slate-400 mt-0.5">Monday, May 5, 2026</p>
                  </div>
                  <button className="flex items-center gap-2 bg-brand-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors">
                    <Plus size={16} /> Add Product
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {STATS.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2"><RevenueChart /></div>
                  <CategoryDonut />
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2"><OrdersTable orders={ORDERS.slice(0, 5)} /></div>
                  <TopProducts products={TOP_PRODUCTS} />
                </div>
              </motion.div>
            )}

            {activeSection !== "dashboard" && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-dark/5 flex items-center justify-center">
                  {(() => {
                    const item = NAV_ITEMS.find(n => n.id === activeSection);
                    const Icon = item?.icon || LayoutDashboard;
                    return <Icon size={28} className="text-brand-dark/30" />;
                  })()}
                </div>
                <div className="text-center">
                  <h2 className="font-heading font-bold text-xl text-brand-dark capitalize">{activeSection}</h2>
                  <p className="text-slate-400 text-sm mt-1">This section is coming soon.</p>
                </div>
                <button
                  onClick={() => setActiveSection("dashboard")}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-accent hover:underline"
                >
                  ← Back to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
