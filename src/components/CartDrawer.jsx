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
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#1C1917] border-l border-stone-800/80 z-50 flex flex-col shadow-2xl text-stone-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-950/40 border border-orange-900/30 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-stone-100 font-serif font-bold text-lg">Your Order</h2>
                  <p className="text-stone-400 text-xs font-semibold">{getTotalItems()} items</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="text-stone-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center hover:bg-stone-800 rounded-lg"
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
                    <div className="w-20 h-20 bg-stone-900 border border-stone-800 rounded-3xl flex items-center justify-center mb-4">
                      <Package className="w-9 h-9 text-stone-600" />
                    </div>
                    <h3 className="text-stone-300 font-serif font-bold text-lg mb-2">Order list is empty</h3>
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
                      className="flex items-center gap-4 bg-[#26211E]/40 border border-stone-800/60 rounded-2xl p-4 shadow-sm"
                    >
                      {/* Product Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0 shadow-sm border border-stone-800"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-stone-200 font-serif font-bold text-sm truncate">{item.name}</h4>
                        <p className="text-orange-500 font-bold text-sm">
                          {siteConfig.currency}
                          {item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="w-7 h-7 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 hover:bg-stone-700 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-stone-200 font-black w-5 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="w-7 h-7 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-stone-500 hover:text-red-500 transition-colors ml-1"
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
              <div className="p-6 border-t border-stone-800/60 bg-stone-900/10 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400 font-medium">Subtotal</span>
                    <span className="text-stone-200 font-bold">
                      {siteConfig.currency}
                      {subtotal.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-400 font-medium">Delivery Fee</span>
                    <span className="text-stone-200 font-bold">
                      {siteConfig.currency}
                      {delivery.toFixed(0)}
                    </span>
                  </div>
                  <div className="h-px bg-stone-800/60 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-stone-100 font-serif font-black text-lg">Total</span>
                    <span className="text-orange-500 font-black text-xl">
                      {siteConfig.currency}
                      {grandTotal.toFixed(0)}
                    </span>
                  </div>
                </div>

                <motion.button
                  onClick={openCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-orange-950/20"
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
