import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, Home, Phone, ChevronRight,
  Star, Sparkles, Flame, UtensilsCrossed, ChefHat, Snowflake, MessageCircle, AlertCircle
} from "lucide-react";
import { useRef } from "react";
import useCartStore from "../store/cartStore";
import { siteConfig } from "../data/siteConfig";
import { getWhatsAppURL } from "../utils/whatsapp";

const confettiIcons = [Star, Sparkles, Flame, UtensilsCrossed, ChefHat, Snowflake];
const confettiColors = [
  "text-[#1E5B3C]", "text-[#A46A3A]", "text-amber-500",
  "text-emerald-500", "text-[#C59B27]", "text-stone-300",
];

function ConfettiPiece({ IconComponent, color, style }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 1, rotate: 0, scale: 1 }}
      animate={{
        y: typeof window !== "undefined" ? window.innerHeight + 60 : 900,
        opacity: [1, 1, 0],
        rotate: Math.random() * 720 - 360,
        x: (Math.random() - 0.5) * 250,
        scale: [1, 1.3, 0.8],
      }}
      transition={{ duration: 3 + Math.random() * 2, ease: "easeIn" }}
      className={`fixed pointer-events-none select-none z-50 ${color}`}
      style={style}
    >
      <IconComponent className="w-6 h-6" />
    </motion.div>
  );
}

export default function OrderSuccess() {
  const { orderDetails, orderId, resetOrder } = useCartStore();

  const confetti = useRef(
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      IconComponent: confettiIcons[i % confettiIcons.length],
      color: confettiColors[i % confettiColors.length],
      style: { left: `${Math.random() * 100}vw`, top: `-30px` },
    }))
  ).current;

  const directWhatsAppUrl = getWhatsAppURL(
    `Hello ${siteConfig.name}, I am following up on my order #${orderId || "FB-Order"}.`,
    siteConfig.whatsappNumber
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Confetti */}
      {confetti.map((c) => (
        <ConfettiPiece key={c.id} IconComponent={c.IconComponent} color={c.color} style={c.style} />
      ))}

      {/* Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1E5B3C]/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ scale: 0.85, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.15 }}
        className="relative z-10 bg-[#F5F1E6] border border-stone-300 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl text-stone-900 my-auto"
      >
        {/* Success icon badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.3 }}
          className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1E5B3C] to-[#143e29] rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[#1E5B3C]/25 text-white"
        >
          <CheckCircle2 className="w-10 h-10 text-[#F5F1E6]" />
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-[#1E5B3C] font-serif font-black text-2xl sm:text-3xl mb-1.5 flex items-center justify-center gap-2">
            Order Sent via WhatsApp! <Sparkles className="w-6 h-6 text-[#A46A3A]" />
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mb-5 font-medium leading-relaxed">
            Your order details have been forwarded to our kitchen. We will review and confirm your order on WhatsApp shortly.
          </p>
        </motion.div>

        {/* Order details summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-stone-300 rounded-2xl p-4 sm:p-5 mb-5 space-y-3 text-left shadow-xs"
        >
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-stone-500 font-semibold">Order Reference</span>
            <span className="text-[#1E5B3C] font-black font-mono">#{orderId || "FB-102938"}</span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-stone-500 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#1E5B3C]" /> Estimated Delivery
            </span>
            <span className="text-[#1E5B3C] font-black">
              {orderDetails?.hasFrozen && !orderDetails?.hasFresh
                ? "1 Day (Frozen Food)"
                : orderDetails?.hasFresh && !orderDetails?.hasFrozen
                ? "4 Hours (Cooked Fresh)"
                : "4 Hours (Fresh) · 1 Day (Frozen)"}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-stone-500 font-semibold flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#1E5B3C]" /> Delivering To
            </span>
            <span className="text-stone-800 font-bold max-w-[200px] truncate text-right">
              {orderDetails?.address || "Provided on WhatsApp"}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-stone-500 font-semibold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#1E5B3C]" /> Contact
            </span>
            <span className="text-stone-800 font-bold">{orderDetails?.phone || "Provided on WhatsApp"}</span>
          </div>

          <div className="h-px bg-stone-200" />

          <div className="flex items-center justify-between">
            <span className="text-stone-700 font-serif font-black text-sm">Estimated Total</span>
            <span className="text-[#1E5B3C] font-black text-lg">
              {siteConfig.currency}
              {orderDetails?.total ? orderDetails.total.toFixed(0) : "0"}
            </span>
          </div>
        </motion.div>

        {/* Estimated Delivery & Fresh Cooking Notice */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1E5B3C]/5 border border-[#1E5B3C]/20 rounded-2xl p-4 sm:p-5 mb-6 text-left space-y-3.5 shadow-xs"
        >
          <div className="flex items-center gap-2 text-[#1E5B3C]">
            <ChefHat className="w-5 h-5 flex-shrink-0" />
            <h4 className="font-serif font-black text-sm text-[#1E5B3C]">
              Freshly Cooked to Order Guarantee
            </h4>
          </div>

          <p className="text-stone-700 text-xs leading-relaxed font-medium">
            Because we <strong>do not pre-prepare dishes</strong> and cook everything 100% fresh to order, please note our delivery schedules:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {/* Fresh Food Card */}
            <div className="bg-white border border-[#1E5B3C]/25 rounded-xl p-3 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-stone-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-600" /> Fresh Food
                </span>
                <span className="bg-[#1E5B3C]/10 text-[#1E5B3C] text-[10px] font-black px-2 py-0.5 rounded-full">
                  ~4 Hours
                </span>
              </div>
              <p className="text-stone-600 text-[11px] font-medium leading-tight">
                Cooked fresh from scratch. Please order <strong>3–4 hours before</strong> you expect the food.
              </p>
            </div>

            {/* Frozen Food Card */}
            <div className="bg-white border border-[#A46A3A]/25 rounded-xl p-3 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-stone-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Snowflake className="w-3.5 h-3.5 text-sky-600" /> Frozen Food
                </span>
                <span className="bg-[#A46A3A]/10 text-[#A46A3A] text-[10px] font-black px-2 py-0.5 rounded-full">
                  ~1 Day
                </span>
              </div>
              <p className="text-stone-600 text-[11px] font-medium leading-tight">
                Freshly rolled, seasoned & blast-chilled. Delivered within <strong>1 day</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-600/20 rounded-xl p-2.5 text-[11px] text-amber-900">
            <Clock className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="font-semibold leading-snug">
              Kindly order <strong>3–4 hours in advance</strong> so our kitchen can prepare your meal with the care and perfection you deserve.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-2.5"
        >
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" /> Message Kitchen on WhatsApp
          </a>

          <button
            onClick={resetOrder}
            className="w-full flex items-center justify-center gap-2 bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#1E5B3C]/20 transition-all cursor-pointer"
          >
            Explore More Dishes <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
