import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Plus, Check, Flame } from "lucide-react";
import useCartStore from "../store/cartStore";
import { siteConfig } from "../data/siteConfig";

export default function ProductCard({ item, index }) {
  const { addItem, items } = useCartStore();
  const [added, setAdded] = useState(false);

  const cartItem = items.find((i) => i.id === item.id);

  const handleAdd = (e) => {
    e?.stopPropagation?.();
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-white/90 rounded-3xl overflow-hidden flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300"
    >
      {/* Food Photography Hero Card */}
      <div className="relative h-48 bg-stone-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-60" />
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
          {item.is_popular && (
            <span className="inline-flex items-center gap-1 bg-[#1E5B3C] text-[#F5F1E6] text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
              <Flame className="w-3 h-3 animate-pulse" /> Popular
            </span>
          )}
          {item.tags?.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center bg-black/60 text-[#F5F1E6] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cart Quantity Badge Overlay */}
        {cartItem && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 z-20 w-7 h-7 bg-[#1E5B3C] text-[#F5F1E6] text-xs font-black rounded-full flex items-center justify-center shadow-lg"
          >
            {cartItem.quantity}
          </motion.div>
        )}
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-6 z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black tracking-wider text-[#A46A3A] uppercase bg-[#A46A3A]/10 px-2.5 py-0.5 rounded-full">
            {item.category_name || item.category.replace("brim_", "Brim ").replace("_", " ")}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-bold text-stone-800">{item.rating.toFixed(1)}</span>
            <span className="text-stone-400 text-[10px] font-medium">({item.reviews})</span>
          </div>
        </div>

        <h3 className="text-stone-900 font-serif font-bold text-lg leading-snug mb-1.5 group-hover:text-[#1E5B3C] transition-colors duration-200">
          {item.name}
        </h3>

        {/* Serving Sizes Guide Indicator */}
        {(item.pack_size || item.serves) && (
          <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] font-semibold text-stone-600">
            {item.pack_size && (
              <span className="bg-stone-100/90 text-stone-700 px-2.5 py-1 rounded-lg">
                📦 {item.pack_size}
              </span>
            )}
            {item.serves && (
              <span className="bg-[#1E5B3C]/10 text-[#1E5B3C] px-2.5 py-1 rounded-lg font-bold">
                👥 {item.serves}
              </span>
            )}
          </div>
        )}

        <p className="text-stone-600 text-xs leading-relaxed flex-1 mb-5 line-clamp-2 font-medium">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
          <span className="text-stone-900 font-serif font-black text-xl">
            {siteConfig.currency}
            {item.price}
          </span>

          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs transition-all duration-200 cursor-pointer ${
              added
                ? "bg-[#1E5B3C] text-white shadow-md"
                : "bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] shadow-md shadow-[#1E5B3C]/20"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added!
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
