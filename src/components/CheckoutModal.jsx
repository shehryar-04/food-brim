import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, User, MessageSquare, AlertCircle } from "lucide-react";
import { useState } from "react";
import useCartStore from "../store/cartStore";
import { siteConfig } from "../data/siteConfig";

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, placeOrder, getTotalPrice, items } = useCartStore();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const subtotal = getTotalPrice();
  const delivery = siteConfig.deliveryFee;
  const total = subtotal + delivery;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full Name is required";
    if (!form.phone.trim() || !/^\+?\d{9,}$/.test(form.phone.replace(/[\s-()]/g, ""))) {
      e.phone = "A valid phone number (at least 9 digits) is required";
    }
    if (!form.address.trim()) e.address = "Delivery address is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError(null);
    try {
      if (!siteConfig.whatsappNumber) {
        throw new Error("WhatsApp contact number is not configured in site configuration.");
      }
      await placeOrder(form);
    } catch (err) {
      setApiError(err.message || "Failed to compile WhatsApp order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setApiError(null);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCheckout}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#F5F1E6] border border-stone-300 w-full max-w-lg rounded-3xl shadow-2xl pointer-events-auto overflow-hidden max-h-[90vh] flex flex-col text-stone-900">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-stone-300 bg-white">
                <div>
                  <h2 className="text-[#1E5B3C] font-serif font-black text-2xl">Delivery Details</h2>
                  <p className="text-stone-500 text-xs mt-0.5 font-medium">
                    {items.length} dishes · {siteConfig.currency}{total.toFixed(0)} total
                  </p>
                </div>
                <button
                  onClick={closeCheckout}
                  className="text-stone-500 hover:text-stone-900 w-8 h-8 flex items-center justify-center hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                
                {/* Error Banner */}
                <AnimatePresence>
                  {apiError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm font-semibold">{apiError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name */}
                <div>
                  <label className="text-stone-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#1E5B3C]" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm outline-none focus:border-[#1E5B3C] transition-colors shadow-xs ${
                      errors.name ? "border-red-500" : "border-stone-300"
                    }`}
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1.5 font-semibold">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-stone-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1E5B3C]" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +92 300 1234567"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm outline-none focus:border-[#1E5B3C] transition-colors shadow-xs ${
                      errors.phone ? "border-red-500" : "border-stone-300"
                    }`}
                  />
                  {errors.phone && <p className="text-red-600 text-xs mt-1.5 font-semibold">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="text-stone-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#1E5B3C]" /> Delivery Address
                  </label>
                  <textarea
                    placeholder="Complete address (apartment, block, street, area)"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    rows={2}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm outline-none focus:border-[#1E5B3C] transition-colors resize-none shadow-xs ${
                      errors.address ? "border-red-500" : "border-stone-300"
                    }`}
                  />
                  {errors.address && <p className="text-red-600 text-xs mt-1.5 font-semibold">{errors.address}</p>}
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="text-stone-700 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#1E5B3C]" /> Delivery Notes (Optional)
                  </label>
                  <textarea
                    placeholder="e.g. Leave at gate, bring change for Rs. 2000, call before arrival"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={2}
                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 text-sm outline-none focus:border-[#1E5B3C] transition-colors resize-none shadow-xs"
                  />
                </div>

                {/* Order Summary Recap */}
                <div className="bg-white border border-stone-300 rounded-2xl p-5 space-y-2.5 shadow-sm">
                  <span className="text-[10px] font-black tracking-widest text-[#A46A3A] uppercase block mb-1">Your Order</span>
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs font-semibold">
                      <span className="text-stone-700">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-stone-900 font-bold">
                        {siteConfig.currency}
                        {(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}
                  <div className="h-px bg-stone-200 my-2" />
                  <div className="flex justify-between font-bold items-center text-sm">
                    <span className="text-stone-700 font-serif font-black">Estimated Total</span>
                    <span className="text-[#1E5B3C] font-black text-base">
                      {siteConfig.currency}
                      {total.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="w-full py-4 bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] rounded-2xl font-bold text-base shadow-lg shadow-[#1E5B3C]/25 disabled:opacity-75 cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Opening WhatsApp…
                    </div>
                  ) : (
                    `Place Order via WhatsApp · ${siteConfig.currency}${total.toFixed(0)}`
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
