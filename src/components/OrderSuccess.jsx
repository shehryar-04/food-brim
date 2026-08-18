import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, Home, Phone, ChevronRight,
  Star, Sparkles, Flame, UtensilsCrossed, ChefHat, Bike, Package,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useCartStore from "../store/cartStore";
import { siteConfig } from "../data/siteConfig";

const confettiIcons = [Star, Sparkles, Flame, UtensilsCrossed, ChefHat, Package];
const confettiColors = [
  "text-orange-500", "text-yellow-500", "text-amber-600",
  "text-red-500", "text-orange-600", "text-stone-300",
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

const STATUS_ORDER = ["confirmed", "preparing", "on_the_way", "delivered"];

const orderSteps = [
  { key: "confirmed",  label: "Confirmed",  Icon: CheckCircle2 },
  { key: "preparing",  label: "Preparing",  Icon: ChefHat },
  { key: "on_the_way", label: "On the way", Icon: Bike },
  { key: "delivered",  label: "Delivered",  Icon: Home },
];

export default function OrderSuccess() {
  const { orderDetails, orderId, resetOrder } = useCartStore();

  const [status, setStatus] = useState("confirmed");
  const [eta] = useState(() => `${25 + Math.floor(Math.random() * 15)} mins`);

  // Simulate order status updates client-side for visual realism
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < STATUS_ORDER.length - 1) {
        index++;
        setStatus(STATUS_ORDER[index]);
      } else {
        clearInterval(interval);
      }
    }, 15000); // Progress every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const confetti = useRef(
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      IconComponent: confettiIcons[i % confettiIcons.length],
      color: confettiColors[i % confettiColors.length],
      style: { left: `${Math.random() * 100}vw`, top: `-30px` },
    }))
  ).current;

  const currentStatusIndex = STATUS_ORDER.indexOf(status);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#0C0A09] z-50 flex items-center justify-center p-4"
    >
      {/* Confetti */}
      {confetti.map((c) => (
        <ConfettiPiece key={c.id} IconComponent={c.IconComponent} color={c.color} style={c.style} />
      ))}

      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        className="relative z-10 bg-[#1C1917] border border-stone-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl text-stone-100"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.4 }}
          className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-600/20"
        >
          <CheckCircle2 className="w-10 h-10 text-stone-100" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="text-stone-100 font-serif font-black text-3xl mb-2 flex items-center justify-center gap-2">
            Order Sent! <Sparkles className="w-7 h-7 text-orange-500" />
          </h2>
          <p className="text-stone-400 text-sm mb-6 font-medium">
            Your WhatsApp order was built and sent. We will confirm your delivery shortly.
          </p>
        </motion.div>

        {/* Realtime status pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="flex items-center gap-1.5 bg-orange-950/40 border border-orange-900/30 rounded-full px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">Simulated Tracking Active</span>
          </div>
        </motion.div>

        {/* Order details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-stone-900 border border-stone-800 rounded-2xl p-5 mb-6 space-y-3.5 text-left"
        >
          <div className="flex items-center justify-between">
            <span className="text-stone-500 text-sm font-semibold">Order Reference</span>
            <span className="text-orange-500 font-black text-sm">#{orderId || "FB-12948"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-500 text-sm font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-500" /> Estimated ETA
            </span>
            <span className="text-stone-200 font-bold text-sm">{eta}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-500 text-sm font-semibold flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-orange-500" /> Delivering To
            </span>
            <span className="text-stone-200 text-sm font-bold max-w-[180px] truncate text-right">
              {orderDetails?.address || "your address"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-500 text-sm font-semibold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-orange-500" /> Contact
            </span>
            <span className="text-stone-200 text-sm font-bold">{orderDetails?.phone || "your phone"}</span>
          </div>
          <div className="h-px bg-stone-800" />
          <div className="flex items-center justify-between">
            <span className="text-stone-300 font-serif font-black">Estimated Total</span>
            <span className="text-orange-500 font-black text-lg">
              {siteConfig.currency}
              {orderDetails?.total?.toFixed(0) || "0"}
            </span>
          </div>
        </motion.div>

        {/* Live progress tracker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-between mb-8"
        >
          {orderSteps.map((step, i, arr) => {
            const isDone = STATUS_ORDER.indexOf(step.key) <= currentStatusIndex;
            const isActive = STATUS_ORDER.indexOf(step.key) === currentStatusIndex;
            const Icon = step.Icon;
            return (
              <div key={step.key} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isDone
                        ? "bg-orange-650/10 border border-orange-550/30 shadow-md shadow-orange-950/20"
                        : "bg-stone-900 border border-stone-800"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors duration-500 ${isDone ? "text-orange-500" : "text-stone-700"}`} />
                  </motion.div>
                  <span className={`text-[10px] font-bold uppercase transition-colors duration-500 ${isDone ? "text-orange-500" : "text-stone-700"}`}>
                    {step.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <motion.div
                    className="w-7 h-0.5 mb-4 mx-1 transition-colors duration-700"
                    style={{
                      backgroundColor: STATUS_ORDER.indexOf(arr[i + 1].key) <= currentStatusIndex
                        ? "rgba(234,88,12,0.4)"
                        : "rgba(234,88,12,0.06)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={resetOrder}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-stone-100 py-4 rounded-2xl font-bold shadow-lg shadow-orange-950/20"
        >
          Explore More Food <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
