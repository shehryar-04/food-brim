import { motion } from "framer-motion";
import {
  Flame,
  Sparkles,
  CookingPot,
  Leaf,
  Truck,
  ChefHat,
  UtensilsCrossed,
} from "lucide-react";

const marqueeItems = [
  { label: "STEAMED DUM BIRYANI", Icon: Flame, color: "text-[#F77737]" },
  { label: "HAND-GROUND MASALAS", Icon: UtensilsCrossed, color: "text-[#E5B25D]" },
  { label: "2-YEAR AGED BASMATI", Icon: ChefHat, color: "text-[#F5F1E6]" },
  { label: "100% HOMEMADE RECIPES", Icon: Leaf, color: "text-[#86efac]" },
  { label: "25-MIN HOT DELIVERY", Icon: Truck, color: "text-[#E5B25D]" },
  { label: "FILLED TO THE BRIM", Icon: CookingPot, color: "text-[#F5F1E6]" },
  { label: "ZERO COMPROMISES", Icon: Sparkles, color: "text-[#E5B25D]" },
];

export default function FoodMarquee({ prefersReducedMotion = false }) {
  if (prefersReducedMotion) return null;

  return (
    <div className="relative w-full overflow-hidden py-4 bg-[#1E5B3C] text-[#F5F1E6] select-none shadow-sm">
      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-8 whitespace-nowrap text-xs md:text-sm font-bold tracking-widest uppercase"
        >
          {/* Double array for seamless loop */}
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => {
            const Icon = item.Icon;
            return (
              <span key={i} className="flex items-center gap-8">
                <span className="inline-flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                  <span>{item.label}</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A46A3A]" />
              </span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
