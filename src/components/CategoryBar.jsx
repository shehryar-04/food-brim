import { motion } from "framer-motion";
import { categories as staticCategories } from "../data/menu";

export default function CategoryBar({ activeCategory, onSelect, categories }) {
  const source = categories ?? staticCategories;

  return (
    <div className="sticky top-[72px] z-40 bg-[#0C0A09]/95 backdrop-blur-xl border-b border-stone-900/80 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {source.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.Icon;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-stone-400 hover:text-stone-100 bg-[#1C1917]/70 border border-stone-850"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="category-pill"
                    className="absolute inset-0 bg-orange-600 rounded-xl shadow-lg shadow-orange-950/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {Icon && <Icon className="relative z-10 w-4 h-4 text-orange-500" />}
                <span className="relative z-10">{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
