import { motion } from "framer-motion";
import {
  StarAnise,
  CardamomPod,
  ChiliPepper,
  LemonSlice,
  HerbLeaf,
  CinnamonQuill,
} from "./FoodIllustrations";

// Floating decorative accent for the About/Craft section
export function AboutFoodAccent() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Floating Cardamom Pod */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 0.85, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        animate={{
          y: [0, -14, 0],
          rotate: [0, 12, 0],
        }}
        transition={{
          y: { duration: 6.0, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8.0, repeat: Infinity, ease: "easeInOut" },
        }}
        className="hidden md:block absolute top-[10%] left-[2%] drop-shadow-lg"
      >
        <CardamomPod className="w-12 h-12" />
      </motion.div>

      {/* Floating Cinnamon Quill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.9, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        animate={{
          y: [0, 12, 0],
          rotate: [-15, -5, -15],
        }}
        transition={{
          y: { duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          rotate: { duration: 9.0, repeat: Infinity, ease: "easeInOut" },
        }}
        className="hidden lg:block absolute bottom-[8%] right-[3%] drop-shadow-xl"
      >
        <CinnamonQuill className="w-14 h-14" />
      </motion.div>
    </div>
  );
}

// Floating decorative accent for the Quality/Philosophy section
export function PhilosophyFoodAccent() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Floating Star Anise */}
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        whileInView={{ opacity: 0.8, rotate: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        animate={{
          y: [0, -16, 0],
          rotate: [0, -18, 0],
        }}
        transition={{
          y: { duration: 6.8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10.0, repeat: Infinity, ease: "easeInOut" },
        }}
        className="hidden sm:block absolute top-[8%] right-[4%] drop-shadow-xl"
      >
        <StarAnise className="w-12 h-12" />
      </motion.div>

      {/* Fresh Herb Leaf */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        animate={{
          y: [0, 10, 0],
          rotate: [15, 25, 15],
        }}
        transition={{
          y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.0 },
          rotate: { duration: 7.0, repeat: Infinity, ease: "easeInOut" },
        }}
        className="hidden md:block absolute bottom-[12%] left-[3%] drop-shadow-md"
      >
        <HerbLeaf className="w-10 h-10" />
      </motion.div>
    </div>
  );
}

// Floating decorative accent for the Testimonials & Social section
export function TestimonialFoodAccent() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Golden Lemon Slice */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.75, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        animate={{
          y: [0, -12, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          y: { duration: 6.2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="hidden lg:block absolute top-[15%] left-[3%] drop-shadow-md"
      >
        <LemonSlice className="w-12 h-12" />
      </motion.div>

      {/* Red Chili Pepper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.85, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        animate={{
          y: [0, 14, 0],
          rotate: [-10, 5, -10],
        }}
        transition={{
          y: { duration: 7.0, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
          rotate: { duration: 8.0, repeat: Infinity, ease: "easeInOut" },
        }}
        className="hidden md:block absolute bottom-[10%] right-[3%] drop-shadow-xl"
      >
        <ChiliPepper className="w-12 h-12" />
      </motion.div>
    </div>
  );
}
