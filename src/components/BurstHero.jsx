import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Heart, Leaf, Soup, Sparkles } from "lucide-react";
import logoSquare from "../assets/brand/logo-square.jpg";

// ─── Brand palette ────────────────────────────────────────────────────────────
// Deep Green  #1E5B3C   — primary accent, buttons, live dot, badge accents
// Cream       #F5F1E6   — hero overlay text, website background, clean surfaces
// Warm Brown  #A46A3A   — secondary accent, border & warm highlights
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_FRAMES = 158;

// Frames loaded eagerly before the animation becomes interactive.
const INITIAL_BATCH = 15;

// Frames loaded per requestIdleCallback slice during background loading.
const BACKGROUND_BATCH_SIZE = 8;

const pad = (n) => String(n).padStart(3, "0");

const values = [
  { icon: Heart,    label: "Homemade with Love" },
  { icon: Leaf,     label: "Fresh Ingredients" },
  { icon: Soup,     label: "Authentic Flavor" },
  { icon: Sparkles, label: "Made with Care" },
];

// ─── Idle-time scheduler ─────────────────────────────────────────────────────
function scheduleIdle(cb) {
  if (typeof requestIdleCallback === "function") {
    return requestIdleCallback(cb, { timeout: 2000 });
  }
  return setTimeout(cb, 0);
}

function cancelIdle(id) {
  if (typeof cancelIdleCallback === "function") {
    cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

// ─── Image loader ─────────────────────────────────────────────────────────────
function createFrameImage(index) {
  const img = new Image();
  img.src = `/Biryanianimation/ezgif-frame-${pad(index)}.jpg`;
  return img;
}

export default function BurstHero({ onOrderNow, onProgressChange }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Sparse array — slot i holds the Image for frame i+1, or null if not started.
  const imagesRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const initialLoadedRef = useRef(0);
  const idleHandleRef = useRef(null);
  const nextBackgroundIndexRef = useRef(INITIAL_BATCH);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ─── Phase 1: Load first INITIAL_BATCH frames eagerly ────────────────────
  useEffect(() => {
    const images = imagesRef.current;

    for (let i = 0; i < INITIAL_BATCH; i++) {
      const img = createFrameImage(i + 1);

      img.onload = () => {
        initialLoadedRef.current += 1;
        const pct = Math.floor((initialLoadedRef.current / INITIAL_BATCH) * 100);
        setLoadingProgress(pct);
        if (initialLoadedRef.current === INITIAL_BATCH) setIsLoaded(true);
      };

      img.onerror = () => {
        initialLoadedRef.current += 1;
        if (initialLoadedRef.current === INITIAL_BATCH) setIsLoaded(true);
      };

      images[i] = img;
    }

    return () => {
      if (idleHandleRef.current !== null) cancelIdle(idleHandleRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Phase 2: Background-load frames 16–158 during idle time ─────────────
  useEffect(() => {
    if (!isLoaded) return;

    const images = imagesRef.current;

    function loadNextBatch() {
      const start = nextBackgroundIndexRef.current;
      if (start >= TOTAL_FRAMES) return;

      const end = Math.min(start + BACKGROUND_BATCH_SIZE, TOTAL_FRAMES);
      for (let i = start; i < end; i++) {
        if (!images[i]) images[i] = createFrameImage(i + 1);
      }

      nextBackgroundIndexRef.current = end;
      if (end < TOTAL_FRAMES) idleHandleRef.current = scheduleIdle(loadNextBatch);
    }

    idleHandleRef.current = scheduleIdle(loadNextBatch);

    return () => {
      if (idleHandleRef.current !== null) cancelIdle(idleHandleRef.current);
    };
  }, [isLoaded]);

  // ─── Scroll-driven canvas rendering ──────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    const drawFrame = (canvas, frameIndex) => {
      const ctx = canvas.getContext("2d");
      const images = imagesRef.current;

      let img = null;
      for (let i = frameIndex; i >= 0; i--) {
        const c = images[i];
        if (c && c.complete && c.naturalWidth > 0) { img = c; break; }
      }
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cr = canvas.width / canvas.height;
      const ir = img.width / img.height;
      let dw, dh, dx, dy;

      if (cr > ir) {
        dw = canvas.width; dh = canvas.width / ir; dx = 0; dy = (canvas.height - dh) / 2;
      } else {
        dh = canvas.height; dw = canvas.height * ir; dx = (canvas.width - dw) / 2; dy = 0;
      }

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollProgress(progress);
      if (onProgressChange) onProgressChange(progress);

      const frameIndex = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      const canvas = canvasRef.current;
      if (canvas) drawFrame(canvas, frameIndex);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, onProgressChange]);

  const textOpacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <div className="relative">

      {/* ── Preloader ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4"
            style={{ backgroundColor: "#F5F1E6" }}
          >
            <div className="flex flex-col items-center gap-6 max-w-sm text-center">

              {/* Logo */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ backgroundColor: "#1E5B3C", opacity: 0.15 }}
                />
                <img
                  src={logoSquare}
                  alt="Food Brim Logo"
                  className="relative w-20 h-20 rounded-full shadow-xl ring-4 ring-[#1E5B3C]/20"
                />
              </div>

              {/* Progress bar */}
              <div className="space-y-2 w-full">
                <div
                  className="flex justify-between text-xs font-mono font-bold tracking-widest uppercase"
                  style={{ color: "#A46A3A" }}
                >
                  <span>Loading Experience</span>
                  <span>{loadingProgress}%</span>
                </div>
                <div
                  className="h-1.5 w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(30,91,60,0.12)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ width: `${loadingProgress}%`, backgroundColor: "#1E5B3C" }}
                  />
                </div>
              </div>

              <p
                className="text-xs font-semibold tracking-wider uppercase animate-pulse"
                style={{ color: "#A46A3A" }}
              >
                Simmering the molecular flavor matrix...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main sticky scroll section ───────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative bg-[#0C0A09]"
        style={{ height: "450vh" }}
      >
        <div
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#0C0A09]"
        >
          {/* Canvas — full fidelity biryani animation */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{
              opacity: 1,
              filter: "brightness(0.95) contrast(1.05) saturate(1.1)",
            }}
          />

          {/* Cinematic Vignette / Scrim */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 85% 80% at 50% 45%, rgba(12,10,9,0.25) 0%, rgba(12,10,9,0.72) 100%)",
            }}
          />

          {/* Hero overlay content */}
          <div
            style={{ opacity: textOpacity }}
            className="absolute inset-0 z-10 flex flex-col justify-between items-center text-center p-6 md:p-12 pointer-events-none transition-opacity duration-150"
          >
            <div />

            <div className="max-w-4xl px-4 flex flex-col items-center pointer-events-auto">

              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full mb-6 shadow-xl backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(30, 91, 60, 0.92)",
                  color: "#F5F1E6",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: "#F5F1E6" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: "#F5F1E6" }}
                  />
                </span>
                From Freezer Favorites to Proper Desi Meals
              </motion.div>

              {/* Serif & Script Headline — pure Cream (#F5F1E6) */}
              <div className="mb-6">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-serif font-black uppercase tracking-wider block leading-none"
                  style={{
                    color: "#F5F1E6",
                    textShadow: "0 4px 24px rgba(0, 0, 0, 0.75)",
                  }}
                >
                  Filled to the Brim
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-9xl font-script block mt-2 leading-none"
                  style={{
                    color: "#F5F1E6",
                    textShadow: "0 4px 28px rgba(0, 0, 0, 0.85)",
                  }}
                >
                  with Homemade Goodness
                </motion.span>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm md:text-base mb-8 max-w-xl font-semibold leading-relaxed"
                style={{
                  color: "rgba(245, 241, 230, 0.92)",
                  textShadow: "0 2px 14px rgba(0, 0, 0, 0.85)",
                }}
              >
                Discover convenience without compromise. Our premium snacks, momos,
                and authentic desi meals are prepared fresh and packed with absolute care.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                {/* Primary — deep green with cream text */}
                <motion.button
                  onClick={onOrderNow}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold shadow-2xl cursor-pointer transition-shadow"
                  style={{
                    backgroundColor: "#1E5B3C",
                    color: "#F5F1E6",
                    boxShadow: "0 10px 30px rgba(30,91,60,0.5)",
                  }}
                >
                  Order on WhatsApp
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>

                {/* Secondary — cream-frosted glass button */}
                <motion.button
                  onClick={onOrderNow}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all cursor-pointer backdrop-blur-md shadow-lg hover:bg-white/30"
                  style={{
                    backgroundColor: "rgba(245, 241, 230, 0.20)",
                    color: "#F5F1E6",
                    textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  Explore Menu
                </motion.button>
              </motion.div>

              {/* Value badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
                {values.map(({ icon: Icon, label }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 + idx * 0.08 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex flex-col items-center gap-2 rounded-2xl p-3.5 shadow-lg transition-all backdrop-blur-md cursor-default"
                    style={{
                      backgroundColor: "rgba(12, 10, 9, 0.60)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(30, 91, 60, 0.7)",
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#F5F1E6" }} />
                    </div>
                    <span
                      className="font-bold text-[9px] tracking-wider uppercase text-center"
                      style={{ color: "#F5F1E6" }}
                    >
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Scroll prompt */}
            <div
              className="flex flex-col items-center gap-1.5 z-20 pointer-events-none select-none"
              style={{
                color: "#F5F1E6",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                {scrollProgress > 0.95 ? "Explore Menu" : "Scroll to Disassemble"}
              </span>
              <ChevronDown
                className={`w-4 h-4 ${scrollProgress > 0.95 ? "rotate-180" : "animate-bounce"}`}
                style={{ color: "#F5F1E6" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
