import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  StarAnise,
  CardamomPod,
  ChiliPepper,
  LemonSlice,
  HerbLeaf,
  RiceGrains,
} from "./FoodIllustrations";

export default function HeroFoodAtmosphere({ prefersReducedMotion = false }) {
  const [isDesktop, setIsDesktop] = useState(false);

  // Mouse parallax motion values (normalized -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural organic lag
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.8 });

  // Multi-depth parallax offsets for each floating object
  const leaf1X = useTransform(springX, (val) => val * -12);
  const leaf1Y = useTransform(springY, (val) => val * -12);

  const starAniseX = useTransform(springX, (val) => val * 16);
  const starAniseY = useTransform(springY, (val) => val * 14);

  const chiliX = useTransform(springX, (val) => val * -18);
  const chiliY = useTransform(springY, (val) => val * 16);

  const cardamomX = useTransform(springX, (val) => val * 14);
  const cardamomY = useTransform(springY, (val) => val * -14);

  const lemonX = useTransform(springX, (val) => val * -10);
  const lemonY = useTransform(springY, (val) => val * 12);

  const riceX = useTransform(springX, (val) => val * 8);
  const riceY = useTransform(springY, (val) => val * -8);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !prefersReducedMotion);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024 || prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const yNorm = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(xNorm);
      mouseY.set(yNorm);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", checkDesktop);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[12] overflow-hidden">
      {/* ── 1. Top-Left: Fresh Herb Leaf (Mint/Coriander) ── */}
      <motion.div
        style={{
          x: isDesktop ? leaf1X : 0,
          y: isDesktop ? leaf1Y : 0,
        }}
        animate={{
          y: [0, -12, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[12%] left-[4%] md:left-[8%] lg:left-[10%] drop-shadow-xl"
      >
        <HerbLeaf className="w-10 h-10 md:w-14 md:h-14 opacity-90 hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer" />
      </motion.div>

      {/* ── 2. Top-Right: Whole Star Anise (Warm brown spice) ── */}
      <motion.div
        style={{
          x: isDesktop ? starAniseX : 0,
          y: isDesktop ? starAniseY : 0,
        }}
        animate={{
          y: [0, 14, 0],
          rotate: [0, -12, 0],
        }}
        transition={{
          duration: 7.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute top-[14%] right-[5%] md:right-[10%] lg:right-[12%] drop-shadow-2xl"
      >
        <StarAnise className="w-12 h-12 md:w-16 md:h-16 opacity-95 hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer" />
      </motion.div>

      {/* ── 3. Mid-Left: Crimson Chili Pepper (Spice energy) ── */}
      <motion.div
        style={{
          x: isDesktop ? chiliX : 0,
          y: isDesktop ? chiliY : 0,
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 8.0,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="hidden sm:block absolute top-[44%] left-[2%] md:left-[5%] lg:left-[7%] drop-shadow-2xl"
      >
        <ChiliPepper className="w-12 h-12 md:w-16 md:h-16 opacity-90 hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer" />
      </motion.div>

      {/* ── 4. Mid-Right: Green Cardamom Pod ── */}
      <motion.div
        style={{
          x: isDesktop ? cardamomX : 0,
          y: isDesktop ? cardamomY : 0,
        }}
        animate={{
          y: [0, 12, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 6.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.8,
        }}
        className="hidden sm:block absolute top-[46%] right-[3%] md:right-[6%] lg:right-[8%] drop-shadow-xl"
      >
        <CardamomPod className="w-10 h-10 md:w-14 md:h-14 opacity-90 hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer" />
      </motion.div>

      {/* ── 5. Bottom-Right: Citrus Lemon Slice (Zesty fresh accent) ── */}
      <motion.div
        style={{
          x: isDesktop ? lemonX : 0,
          y: isDesktop ? lemonY : 0,
        }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 7.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.2,
        }}
        className="hidden md:block absolute bottom-[18%] right-[8%] lg:right-[11%] drop-shadow-xl"
      >
        <LemonSlice className="w-12 h-12 md:w-15 md:h-15 opacity-85 hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer" />
      </motion.div>

      {/* ── 6. Bottom-Left: Basmati Rice & Saffron filament ── */}
      <motion.div
        style={{
          x: isDesktop ? riceX : 0,
          y: isDesktop ? riceY : 0,
        }}
        animate={{
          y: [0, 8, 0],
          rotate: [0, -6, 0],
        }}
        transition={{
          duration: 6.0,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="hidden md:block absolute bottom-[20%] left-[8%] lg:left-[11%] drop-shadow-md"
      >
        <RiceGrains className="w-10 h-10 opacity-80 hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer" />
      </motion.div>
    </div>
  );
}
