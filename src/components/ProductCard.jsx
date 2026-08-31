import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Minus, X, Check, Flame, Sparkles } from "lucide-react";
import useCartStore from "../store/cartStore";
import { siteConfig } from "../data/siteConfig";

export default function ProductCard({ item, index }) {
  const { addItem, items } = useCartStore();
  const [added, setAdded] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cartItem = items.find((i) => i.id === item.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleAddWithQuantity = () => {
    addItem(item, quantity);
    setDetailOpen(false);
    setQuantity(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        onClick={() => setDetailOpen(true)}
        className="group relative bg-white/90 rounded-3xl overflow-hidden flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 cursor-pointer"
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

      {/* ── Detail Modal/Bottom Sheet ── */}
      <AnimatePresence>
        {detailOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[999] cursor-pointer"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="bg-[#F5F1E6] rounded-3xl w-full max-w-lg shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh] text-stone-900"
              >
                {/* Image Section */}
                <div className="relative h-64 md:h-72 bg-stone-200 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-70" />

                  {/* Close button */}
                  <button
                    onClick={() => setDetailOpen(false)}
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black flex items-center justify-center text-white transition-colors cursor-pointer shadow-md"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-6 z-20">
                    <span className="text-[10px] font-bold tracking-widest text-[#F5F1E6] uppercase bg-[#1E5B3C] px-3 py-1 rounded-full shadow-md">
                      {item.category_name || item.category.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {/* Info & Description */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1E5B3C] mb-2 leading-tight">
                      {item.name}
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-stone-800">{item.rating}</span>
                        <span className="text-stone-500">({item.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Serving Guide Box */}
                  <div className="bg-white/90 p-4 rounded-2xl border border-stone-200/80 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#A46A3A]">
                      Serving Sizes Guide
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {item.pack_size && (
                        <div className="bg-stone-50 p-2.5 rounded-xl">
                          <span className="text-stone-500 block text-[10px] uppercase font-bold">Pack / Serving Size</span>
                          <span className="text-stone-900 font-bold">{item.pack_size}</span>
                        </div>
                      )}
                      {item.serves && (
                        <div className="bg-stone-50 p-2.5 rounded-xl">
                          <span className="text-stone-500 block text-[10px] uppercase font-bold">Serves</span>
                          <span className="text-[#1E5B3C] font-bold">{item.serves}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && (
                    <div className="space-y-2.5">
                      <h4 className="text-[#A46A3A] text-xs font-bold tracking-widest uppercase">Highlights</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {item.highlights.map((hl) => (
                          <div
                            key={hl}
                            className="flex items-center gap-2 text-xs text-stone-800 bg-white/80 px-3.5 py-2.5 rounded-2xl shadow-xs"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#1E5B3C] flex-shrink-0" />
                            <span className="font-semibold">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Food details tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/80 text-stone-700 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {item.calories && (
                      <span className="bg-white/80 text-stone-700 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-xs">
                        {item.calories} Kcal
                      </span>
                    )}
                  </div>
                </div>


                {/* Footer Drawer controls */}
                <div className="p-6 md:p-8 bg-white/80 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase text-stone-600 tracking-wider">Quantity:</span>
                    <div className="flex items-center bg-stone-100/90 rounded-2xl p-1.5">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-xl bg-white hover:bg-stone-200 flex items-center justify-center transition-colors text-stone-800 cursor-pointer shadow-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-stone-900">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-8 h-8 rounded-xl bg-[#1E5B3C] hover:bg-[#16442c] flex items-center justify-center transition-colors text-white cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddWithQuantity}
                    className="w-full sm:flex-1 py-4 bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] font-bold rounded-2xl text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#1E5B3C]/20 transition-colors cursor-pointer"
                  >
                    Add {quantity} to Order · {siteConfig.currency}
                    {(item.price * quantity).toFixed(0)}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
