import { motion, AnimatePresence } from "framer-motion";
import { menuItems as staticItems } from "../data/menu";
import ProductCard from "./ProductCard";
import { SearchX, Sparkles } from "lucide-react";

// Skeleton card for loading state matching cream theme
function SkeletonCard() {
  return (
    <div className="bg-white/80 border border-stone-200 rounded-3xl overflow-hidden animate-pulse shadow-sm">
      <div className="h-48 bg-stone-200" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <div className="h-3 bg-stone-200 rounded w-1/4" />
          <div className="h-3 bg-stone-200 rounded w-1/5" />
        </div>
        <div className="h-5 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-200 rounded w-full" />
        <div className="h-3 bg-stone-200 rounded w-2/3" />
        <div className="flex justify-between items-center pt-3 border-t border-stone-200">
          <div className="h-6 bg-stone-200 rounded w-16" />
          <div className="h-9 bg-stone-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

const categoryTitles = {
  all: "All Dishes",
  biryani: "Fragrant Biryani",
  rice: "Aromatic Rice Selection",
  chicken: "Tantalising Chicken Meals",
  sides: "Savouries & Gourmet Sides",
  drinks: "Cool & Refreshing Beverages",
  combos: "Brim Feasting Boxes",
};

export default function ProductGrid({ activeCategory, searchQuery, menuItems, loading, error }) {
  const source = menuItems ?? staticItems;

  const filtered = source.filter((item) => {
    const matchCat =
      activeCategory === "all" ||
      item.category_id === activeCategory ||
      item.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const displayTitle = categoryTitles[activeCategory] ?? activeCategory;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12" id="menu">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <motion.h2
            key={activeCategory}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-serif font-black text-[#1E5B3C]"
          >
            {displayTitle}
          </motion.h2>
          <p className="text-stone-600 text-xs md:text-sm mt-1.5 font-semibold">
            {loading ? "Loading gourmet menu…" : `Displaying ${filtered.length} culinary creations`}
          </p>
        </div>

        {/* Live Order Open Badge */}
        {!loading && (
          <div className="hidden sm:flex items-center gap-2 bg-[#1E5B3C]/10 border border-[#1E5B3C]/25 rounded-xl px-4 py-2">
            <Sparkles className="w-4 h-4 text-[#1E5B3C]" />
            <span className="text-[#1E5B3C] text-xs font-bold uppercase tracking-wider">Accepting Orders</span>
          </div>
        )}
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Grid Content */}
      {!loading && (
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((item, idx) => (
                <ProductCard key={item.id} item={item} index={idx} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <SearchX className="w-16 h-16 text-stone-400 mb-4" />
              <h3 className="text-stone-700 text-xl font-serif font-bold mb-2">No culinary items found</h3>
              <p className="text-stone-500 text-sm max-w-xs font-medium">
                We couldn't find matches for "{searchQuery}". Try browsing another category or refining your search.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
