import { motion } from "framer-motion";

const items = [
  "🔥 STEAMED DUM BIRYANI",
  "🌶️ HAND-GROUND MASALAS",
  "🍚 2-YEAR AGED BASMATI",
  "🌿 100% HOMEMADE RECIPES",
  "🛵 25-MIN HOT DELIVERY",
  "🍲 FILLED TO THE BRIM",
  "✨ ZERO COMPROMISES",
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
          {[...items, ...items, ...items, ...items].map((text, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>{text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A46A3A]" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
