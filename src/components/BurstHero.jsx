import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Heart, Leaf, Soup, Sparkles } from "lucide-react";
import logoSquare from "../assets/brand/logo-square.jpg";

const TOTAL_FRAMES = 158;

const pad = (n) => String(n).padStart(3, "0");

const values = [
  { icon: Heart,    label: "Homemade with Love" },
  { icon: Leaf,     label: "Fresh Ingredients" },
  { icon: Soup,     label: "Authentic Flavor" },
  { icon: Sparkles, label: "Made with Care" },
];

export default function BurstHero({ onOrderNow, onProgressChange }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Preload all frames on mount
  useEffect(() => {
    let loadedCount = 0;
    const imagesArray = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/Biryanianimation/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        setLoadingProgress(pct);
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      imagesArray.push(img);
    }
    imagesRef.current = imagesArray;
  }, []);

  // Update canvas on scroll
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollProgress(progress);

      // Pass raw progress continuously to parent
      if (onProgressChange) {
        onProgressChange(progress);
      }

      const frameIndex = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      const img = imagesRef.current[frameIndex];

      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, drawX, drawY;

        // Aspect ratio calculations for full bleed cover fit
        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
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

  // Interpolated opacity to fade out the text as the animation transitions to the menu
  const textOpacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <div className="relative">
      {/* Preloader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0C0A09] z-[9999] flex flex-col items-center justify-center p-4 text-[#FDFBF7]"
          >
            <div className="flex flex-col items-center gap-6 max-w-sm text-center">
              <img 
                src={logoSquare} 
                alt="Food Brim Logo" 
                className="w-20 h-20 rounded-full border-2 border-orange-500 animate-pulse shadow-xl" 
              />
              
              <div className="space-y-2 w-full">
                <div className="flex justify-between text-xs font-mono font-bold tracking-widest uppercase text-stone-400">
                  <span>Loading Showcase Experience</span>
                  <span>{loadingProgress}%</span>
                </div>
                <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden border border-stone-800">
                  <motion.div
                    className="h-full bg-orange-600"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
              <p className="text-xs font-semibold tracking-wider uppercase text-orange-500/80 animate-pulse mt-2">
                Simmering the molecular flavor matrix...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main sticky scrolling container */}
      <section
        ref={sectionRef}
        className="relative bg-[#FAF8F2]"
        style={{ height: "450vh" }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF8F2]">
          {/* Subtle grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(234,88,12,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(234,88,12,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Core Animation Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{ 
              mixBlendMode: "multiply", 
              opacity: 0.88, 
              filter: "brightness(1.22) contrast(0.95)" 
            }}
          />

          {/* Overlaid Hero Content */}
          <div 
            style={{ opacity: textOpacity }}
            className="absolute inset-0 z-10 flex flex-col justify-between items-center text-center p-6 md:p-12 pointer-events-none transition-opacity duration-150"
          >
            {/* Spacer */}
            <div />

            {/* Content Body */}
            <div className="max-w-4xl px-4 flex flex-col items-center pointer-events-auto">
              {/* Quality indicator badge */}
              <div className="inline-flex items-center gap-2 bg-[#0C0A09]/90 border border-stone-800 text-stone-200 text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full mb-6 shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                From Freezer Favorites to Proper Desi Meals
              </div>

              {/* Serif + Script Headline */}
              <div className="mb-6">
                <span className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-stone-900 uppercase tracking-wider block leading-none">
                  Filled to the Brim
                </span>
                <span className="text-5xl md:text-7xl lg:text-9xl font-script text-orange-600 block mt-2 leading-none">
                  with Homemade Goodness
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-stone-800/90 text-sm md:text-base mb-8 max-w-xl font-semibold leading-relaxed">
                Discover convenience without compromise. Our premium snacks, momos,
                and authentic desi meals are prepared fresh and packed with absolute care.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <motion.button
                  onClick={onOrderNow}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-2xl text-base font-bold shadow-lg shadow-orange-600/20"
                >
                  Order on WhatsApp <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={onOrderNow}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-stone-300 text-stone-900 hover:bg-white px-8 py-3.5 rounded-2xl text-base font-bold transition-all shadow-sm"
                >
                  Explore Menu
                </motion.button>
              </div>

              {/* Value badges panel */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
                {values.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 bg-white/80 border border-stone-200 rounded-2xl p-3 shadow-sm hover:border-orange-500/30 transition-colors">
                    <div className="w-8 h-8 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-stone-800 font-bold text-[9px] tracking-wider uppercase text-center">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll prompt indicator */}
            <div className="flex flex-col items-center gap-1.5 text-stone-800/50 z-20 pointer-events-none select-none">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                {scrollProgress > 0.95 ? "Explore Menu" : "Scroll to Disassemble"}
              </span>
              <ChevronDown className={`w-4 h-4 ${scrollProgress > 0.95 ? "rotate-180" : "animate-bounce text-orange-600"}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
