import { motion } from "framer-motion";
import { categories as staticCategories } from "../data/menu";

export default function CategoryBar({ activeCategory, onSelect, categories }) {
  const source = categories ?? staticCategories;

  return (
    <div className="sticky top-[72px] z-40 bg-[#F5F1E6]/85 backdrop-blur-2xl py-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300">
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
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer shadow-xs ${
                  isActive
                    ? "text-[#F5F1E6]"
                    : "text-stone-700 hover:text-[#1E5B3C] bg-white/70 hover:bg-white hover:shadow-sm"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="category-pill"
                    className="absolute inset-0 bg-[#1E5B3C] rounded-2xl shadow-md shadow-[#1E5B3C]/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {Icon && (
                  <Icon
                    className={`relative z-10 w-4 h-4 ${
                      isActive ? "text-[#F5F1E6]" : "text-[#1E5B3C]"
                    }`}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
