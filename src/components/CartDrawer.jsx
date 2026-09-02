import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Package } from "lucide-react";
import useCartStore from "../store/cartStore";
import { siteConfig } from "../data/siteConfig";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    openCheckout,
  } = useCartStore();

  const subtotal = getTotalPrice();
  const delivery = subtotal > 0 ? siteConfig.deliveryFee : 0;
  const grandTotal = subtotal + delivery;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#F5F1E6] border-l border-stone-300 z-50 flex flex-col shadow-2xl text-stone-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-300 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1E5B3C]/10 border border-[#1E5B3C]/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#1E5B3C]" />
                </div>
                <div>
                  <h2 className="text-[#1E5B3C] font-serif font-bold text-lg">Your Order</h2>
                  <p className="text-stone-500 text-xs font-semibold">{getTotalItems()} items</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="text-stone-500 hover:text-stone-900 transition-colors w-8 h-8 flex items-center justify-center hover:bg-stone-100 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 text-center"
                  >
                    <div className="w-20 h-20 bg-white border border-stone-300 rounded-3xl flex items-center justify-center mb-4 shadow-sm">
                      <Package className="w-9 h-9 text-stone-400" />
                    </div>
                    <h3 className="text-stone-700 font-serif font-bold text-lg mb-2">Order list is empty</h3>
                    <p className="text-stone-500 text-sm font-medium">Add some delicious food to start!</p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-4 bg-white border border-stone-200 rounded-2xl p-4 shadow-sm"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                            e.currentTarget.src = item.fallbackImage;
                          }
                        }}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-sm border border-stone-200"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-stone-900 font-serif font-bold text-sm truncate">{item.name}</h4>
                        <p className="text-[#1E5B3C] font-bold text-sm">
                          {siteConfig.currency}
                          {item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-stone-900 font-black w-5 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="w-7 h-7 rounded-lg bg-[#1E5B3C] text-white hover:bg-[#16442c] flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors ml-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-stone-300 bg-white space-y-4 shadow-sm">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500 font-medium">Subtotal</span>
                    <span className="text-stone-900 font-bold">
                      {siteConfig.currency}
                      {subtotal.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500 font-medium">Delivery Fee</span>
                    <span className="text-stone-900 font-bold">
                      {siteConfig.currency}
                      {delivery.toFixed(0)}
                    </span>
                  </div>
                  <div className="h-px bg-stone-200 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#1E5B3C] font-serif font-black text-lg">Total</span>
                    <span className="text-[#1E5B3C] font-black text-xl">
                      {siteConfig.currency}
                      {grandTotal.toFixed(0)}
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={openCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] py-4 rounded-2xl font-bold text-base shadow-lg shadow-[#1E5B3C]/25 cursor-pointer"
                >
                  Proceed to WhatsApp Order <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
