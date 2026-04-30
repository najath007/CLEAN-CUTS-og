import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating-desc', label: 'Top Rated' },
  { value: 'name-asc', label: 'Name: A → Z' },
];

export default function ProductFilter({ searchQuery, setSearchQuery, sortBy, setSortBy, resultCount }) {
  const [showSort, setShowSort] = React.useState(false);
  const sortRef = React.useRef(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSort(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || 'Default';

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent transition-all shadow-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Result count */}
        <span className="text-sm text-slate-400 font-medium whitespace-nowrap">
          {resultCount} product{resultCount !== 1 ? 's' : ''}
        </span>

        {/* Sort dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 hover:border-brand-accent/50 transition-all shadow-sm"
          >
            <SlidersHorizontal size={16} className="text-slate-400" />
            <span className="font-medium">{currentLabel}</span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${showSort ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showSort && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-slate-100 shadow-xl overflow-hidden z-50"
              >
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSort(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-brand-accent/10 text-brand-accent font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to apply search + sort logic to a product array.
 * Returns the filtered & sorted array.
 */
export function useFilteredProducts(products, searchQuery, sortBy) {
  return React.useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.tittle?.toLowerCase().includes(q) ||
          p.desc?.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => (a.tittle || '').localeCompare(b.tittle || ''));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchQuery, sortBy]);
}
