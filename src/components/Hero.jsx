import { motion } from "framer-motion";
import { ArrowRight, Heart, Leaf, Soup, Sparkles, Snowflake, Flame, Cookie } from "lucide-react";

// Floating icon badges matching new categories
const floatingBadges = [
  { Icon: Snowflake, label: "Brim Frozen", x: "8%",  y: "20%", delay: 0,   color: "from-[#A46A3A] to-[#8C5528]" },
  { Icon: Flame,     label: "Brim Bites",  x: "82%", y: "15%", delay: 0.3, color: "from-[#1E5B3C] to-[#143F29]" },
  { Icon: Soup,      label: "Brim Desi",   x: "5%",  y: "65%", delay: 0.6, color: "from-[#1E5B3C] to-[#143F29]" },
  { Icon: Cookie,    label: "Brim Meetha", x: "80%", y: "70%", delay: 0.2, color: "from-[#A46A3A] to-[#8C5528]" },
];

const values = [
  { icon: Heart,    label: "Homemade with Love" },
  { icon: Leaf,     label: "Fresh Ingredients" },
  { icon: Soup,     label: "Authentic Flavor" },
  { icon: Sparkles, label: "Made with Care" },
];

export default function Hero({ onOrderNow }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5F1E6] pt-24 pb-16">
      {/* Soft Background Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1E5B3C]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A46A3A]/5 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Icon Badges */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: badge.delay + 0.8, duration: 0.5 },
            scale:   { delay: badge.delay + 0.8, duration: 0.5 },
            y:       { duration: 4, repeat: Infinity, ease: "easeInOut", delay: badge.delay },
          }}
          className="absolute hidden lg:flex items-center gap-3 bg-[#FAF8F2] border border-[#1E5B3C]/10 rounded-2xl px-4 py-3 shadow-md"
          style={{ left: badge.x, top: badge.y }}
        >
          <div className={`w-8 h-8 bg-gradient-to-br ${badge.color} rounded-lg flex items-center justify-center shadow-sm`}>
            <badge.Icon className="w-4 h-4 text-[#F5F1E6]" />
          </div>
          <span className="text-sm font-semibold text-[#1E5B3C]">{badge.label}</span>
        </motion.div>
      ))}

      {/* Center Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Quality indicator badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#1E5B3C]/10 border border-[#1E5B3C]/20 text-[#1E5B3C] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E5B3C] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E5B3C]" />
          </span>
          From Freezer Favourites to Proper Desi Meals
        </motion.div>

        {/* Serif + Script Headline */}
        <div className="mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#A46A3A] uppercase tracking-wider block"
          >
            Filled to the Brim
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-script text-[#1E5B3C] block mt-2"
          >
            with Homemade Goodness
          </motion.span>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-[#1E5B3C]/80 text-base md:text-lg mb-10 max-w-xl mx-auto font-medium"
        >
          Discover convenience without compromise. Our premium snacks, momos,
          and authentic desi meals are prepared fresh and packed with absolute care.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onOrderNow}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-[#1E5B3C] hover:bg-[#143F29] text-[#F5F1E6] px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-[#1E5B3C]/10"
          >
            Order Now <ArrowRight className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={onOrderNow}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-[#FAF8F2] border border-[#1E5B3C]/20 text-[#1E5B3C] hover:bg-[#1E5B3C]/5 px-8 py-4 rounded-2xl text-lg font-bold"
          >
            View Menu
          </motion.button>
        </motion.div>

        {/* Value badges panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {values.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2.5 bg-[#FAF8F2]/60 border border-[#1E5B3C]/5 rounded-2xl p-4 shadow-sm hover:border-[#1E5B3C]/15 transition-colors">
              <div className="w-10 h-10 bg-[#1E5B3C]/5 border border-[#1E5B3C]/10 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#1E5B3C]" />
              </div>
              <span className="text-[#1E5B3C] font-semibold text-xs tracking-wider uppercase text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#1E5B3C]/40"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll Menu</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#1E5B3C]/40 to-transparent" />
      </motion.div>
    </section>
  );
}
