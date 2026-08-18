import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import OrderSuccess from "./components/OrderSuccess";
import BurstHero from "./components/BurstHero";
import useCartStore from "./store/cartStore";
import { useMenu } from "./hooks/useMenu";
import {
  Search, MapPin, Phone, Clock, MessageSquare,
  Star, Heart, Flame, ShieldCheck, Sparkles, MessageCircle, Mail
} from "lucide-react";
import { siteConfig } from "./data/siteConfig";
import { testimonials } from "./data/testimonials";
import { createGenericWhatsAppMessage } from "./utils/whatsapp";

// Brand Asset imports
import logoSquare from "./assets/brand/logo-square.jpg";
import foodPortrait from "./assets/food/food-2.jpg";
import foodSquare from "./assets/food/food-1.jpg";
import deliveryBoxPhoto from "./assets/food/food-3.jpg";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const { orderPlaced, items, getTotalPrice, openCart } = useCartStore();

  // Detect reduced-motion preference once on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Fetch local menu data
  const { menuItems, categories, loading, error } = useMenu();

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleProgressChange = (progress) => {
    setScrollProgress(progress);
    setShowNavbar(progress >= 0.95);
  };

  const scrollToMenu = () => {
    const target = document.getElementById("menu");
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleWhatsAppChat = () => {
    const url = createGenericWhatsAppMessage(siteConfig);
    window.open(url, "_blank");
  };

  // Calculate emerging styles during the last phase of the animation (0.72 -> 0.95)
  const emergeOpacity = scrollProgress < 0.72
    ? 0
    : Math.min(1, (scrollProgress - 0.72) / 0.23);

  const emergeScale = scrollProgress < 0.72
    ? 0.95
    : 0.95 + 0.05 * Math.min(1, (scrollProgress - 0.72) / 0.23);

  const emergeY = scrollProgress < 0.72
    ? 40
    : 40 * (1 - Math.min(1, (scrollProgress - 0.72) / 0.23));

  // Philosophy points
  const philosophies = [
    {
      title: "Fresh Ingredients",
      desc: "We hand-select only premium cuts of meat, freshly plucked herbs, and high-grade basmati rice.",
      icon: Heart,
    },
    {
      title: "Big Bold Flavor",
      desc: "Generations-old spice recipes, ground in-house, to give you that authentic, unforgettable bite.",
      icon: Flame,
    },
    {
      title: "Made Fresh to Order",
      desc: "Zero pre-cooked compromises. Your biryanis are layered and steamed only after you click order.",
      icon: Sparkles,
    },
    {
      title: "Packed with Care",
      desc: "Dispatched in insulated heat-locking containers so it arrives looking perfect and piping hot.",
      icon: ShieldCheck,
    },
  ];

  // Gallery items using local assets & high quality Unsplash placeholders
  const galleryItems = [
    foodSquare,
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    foodPortrait,
    deliveryBoxPhoto,
  ];

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-100 selection:bg-orange-600 selection:text-white pb-16 md:pb-0">
      <AnimatePresence>
        {showNavbar && <Navbar />}
      </AnimatePresence>

      {/* ── Cinematic 3D Frame-by-Frame Scroll Sequence Hero ── */}
      <BurstHero onOrderNow={scrollToMenu} onProgressChange={handleProgressChange} />

      {/* ── Page Content Emerging from Animation ── */}
      <div
        style={{
          opacity: emergeOpacity,
          transform: `translateY(${emergeY}px) scale(${emergeScale})`,
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "top center",
          pointerEvents: scrollProgress < 0.85 ? "none" : "auto",
        }}
        className="relative z-30"
      >
        {/* ── Search Bar Section ────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="relative max-w-lg mx-auto md:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search for delicious dishes…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1C1917]/70 border border-stone-800 rounded-2xl pl-11 pr-4 py-4 text-stone-100 placeholder-stone-600 text-sm outline-none focus:border-orange-500/50 transition-all shadow-md font-semibold"
            />
          </div>
        </div>

        {/* ── Category Bar Sticky component ────────────────────────────── */}
        <CategoryBar
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
          categories={categories.length > 0 ? categories : undefined}
        />

        {/* ── Product Grid component ───────────────────────────────────── */}
        <ProductGrid
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          menuItems={menuItems.length > 0 ? menuItems : undefined}
          loading={loading}
          error={error}
        />

        {/* ── Brand Story Section (About) ─────────────────────────────── */}
        <section id="about" className="max-w-7xl mx-auto px-4 py-20 border-t border-stone-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Typography Description */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-stone-100 leading-tight">
                Made to Crave.<br />Made to Share.
              </h2>
              <p className="text-stone-300 text-base leading-relaxed font-medium">
                At Food Brim, we craft culinary journeys filled to the brim with flavor, freshness, and love.
                Our dishes are inspired by authentic, generations-old recipes, prepared by passionate chefs,
                and packed in high-quality insulated packaging so they arrive tasting just like they were served straight from the flame.
              </p>
              <p className="text-stone-400 text-sm leading-relaxed font-medium">
                We believe in generous portions, authentic seasonings, and food that makes you smile.
                Food Brim was born from a desire to bring proper home-style feast meals directly to your table—convenience without compromise.
              </p>
              <div className="pt-2">
                <button
                  onClick={scrollToMenu}
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-bold text-sm transition-colors group"
                >
                  Explore Our Creations

                </button>
              </div>
            </div>

            {/* Visual Portrait Crops */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-orange-600/10 rounded-full blur-3xl -z-10" />
              <div className="relative group max-w-sm w-full">
                {/* Decorative border */}
                <div className="absolute -inset-2 rounded-3xl border border-orange-500/20 group-hover:border-orange-500/30 transition-colors duration-300" />
                <img
                  src={foodPortrait}
                  alt="Aromatic Desi Biryani"
                  className="rounded-2xl shadow-2xl object-cover h-[450px] w-full border border-stone-800"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-[#1C1917]/90 backdrop-blur-md border border-stone-800 p-4 rounded-xl shadow-lg">
                  <span className="text-xs font-bold text-orange-500 block uppercase tracking-wider mb-1">Weekly Special</span>
                  <span className="text-sm font-serif font-bold text-stone-100 block">Hyderabadi Chicken Biryani</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quality Section ─────────────────────────────────────────── */}
        <section className="bg-[#1C1917]/30 border-y border-stone-900/60 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-xl text-center md:text-left mb-16">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Philosophy</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-100">
                The Food Brim Standard
              </h2>
              <p className="text-stone-400 text-sm mt-3 leading-relaxed font-medium">
                We believe excellent food is built on simple, uncompromised standards of selection, cooking, and delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {philosophies.map((ph, idx) => {
                const Icon = ph.icon;
                return (
                  <div
                    key={ph.title}
                    className="bg-[#1C1917]/60 border border-stone-800/80 hover:border-orange-500/20 rounded-3xl p-6 shadow-md transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-orange-950/40 border border-orange-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="text-stone-100 font-serif font-bold text-lg mb-2.5">{ph.title}</h3>
                    <p className="text-stone-400 text-xs leading-relaxed font-medium">{ph.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Social Proof Section (Reviews) ─────────────────────────── */}
        <section id="reviews" className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-100">
              Approved by Food Lovers
            </h2>
            <p className="text-stone-400 text-sm mt-3 font-medium">
              See what our customers have to say about their hot home-delivered meals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-[#1C1917]/60 border border-stone-800/80 rounded-3xl p-8 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < test.rating ? "fill-yellow-500 text-yellow-500" : "text-stone-700"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-stone-300 text-sm italic leading-relaxed font-medium">
                    "{test.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-stone-850">
                  <div className="w-10 h-10 rounded-full bg-orange-950/40 border border-orange-900/30 flex items-center justify-center text-orange-500 font-bold text-sm">
                    {test.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-200 text-sm font-bold">{test.name}</span>
                      {test.verified && (
                        <span className="bg-orange-500/10 border border-orange-500/25 text-orange-500 text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-stone-500 text-[10px] font-semibold">{test.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Instagram Section ───────────────────────────────────────── */}
        <section className="border-t border-stone-900/60 py-20 bg-stone-900/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4 text-center sm:text-left">
              <div>
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block">Social Media</span>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-stone-100 mt-1">
                  On the Gram @foodbrim
                </h2>
              </div>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-200 text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all"
              >
                Follow Food Brim
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {galleryItems.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group h-64 bg-stone-900 border border-stone-850 rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Photo crop */}
                  <img
                    src={item}
                    alt={`Food Brim Instagram Showcase ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-orange-950/70 opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      View Post
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location / Contact Section ──────────────────────────────── */}
        <section id="contact" className="max-w-7xl mx-auto px-4 py-20 border-t border-stone-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Info Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2">Find Us</span>
                <h2 className="text-3xl md:text-4xl font-serif font-black text-stone-100 mb-6">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-orange-950/40 border border-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-stone-300 text-xs font-bold uppercase tracking-wider mb-1">Our Location</h4>
                      <p className="text-stone-400 text-sm font-semibold leading-relaxed">
                        {siteConfig.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-orange-950/40 border border-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-stone-300 text-xs font-bold uppercase tracking-wider mb-1">Call / WhatsApp</h4>
                      <p className="text-stone-400 text-sm font-semibold leading-relaxed">
                        Phone: {siteConfig.phone}<br />
                        WhatsApp: {siteConfig.whatsappNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-orange-950/40 border border-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-stone-300 text-xs font-bold uppercase tracking-wider mb-1">Service Hours</h4>
                      <p className="text-stone-400 text-sm font-semibold leading-relaxed">
                        {siteConfig.openingHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat on WhatsApp Prompt Box */}
              <div className="bg-[#1C1917]/50 border border-stone-850 p-6 rounded-3xl">
                <h4 className="text-stone-200 font-serif font-bold text-base mb-1">Have questions or custom catering orders?</h4>
                <p className="text-stone-500 text-xs font-medium mb-4">Chat with our customer service representative directly.</p>
                <button
                  onClick={handleWhatsAppChat}
                  className="flex items-center gap-2 bg-orange-650 hover:bg-orange-700 text-stone-100 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </button>
              </div>
            </div>

            {/* Map Iframe */}
            <div className="lg:col-span-7 h-[380px] lg:h-auto min-h-[350px] relative rounded-3xl overflow-hidden border border-stone-850 shadow-md">
              <iframe
                title="Food Brim Location Map"
                src={siteConfig.googleMapsPlaceholderUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale contrast-125"
              />
            </div>
          </div>
        </section>

        {/* ── Double-Tier Premium Footer ──────────────────────────────── */}
        <footer className="bg-stone-950 border-t border-stone-900/80 py-16 text-stone-300 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-stone-900/60">
            {/* Info Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={logoSquare}
                  alt="Food Brim Logo"
                  className="w-10 h-10 rounded-full border border-orange-500 object-cover"
                />
                <span className="text-[#FAF8F2] font-serif font-black text-2xl tracking-tight">
                  Food<span className="text-orange-500">Brim</span>
                </span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-semibold">
                {siteConfig.description}
              </p>
              <div className="flex gap-4 pt-2">
                <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="text-stone-500 hover:text-orange-500 text-xs font-bold uppercase transition-colors">Instagram</a>
                <span className="text-stone-800">/</span>
                <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="text-stone-500 hover:text-orange-500 text-xs font-bold uppercase transition-colors">Facebook</a>
              </div>
            </div>

            {/* Sitemap Navigation links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[#FAF8F2] text-xs font-bold uppercase tracking-widest">Sitemap</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li>
                  <a href="#" className="text-stone-450 hover:text-orange-500 transition-colors">Home</a>
                </li>
                <li>
                  <a href="#menu" className="text-stone-450 hover:text-orange-500 transition-colors">Menu Selection</a>
                </li>
                <li>
                  <a href="#about" className="text-stone-450 hover:text-orange-500 transition-colors">Our philosophy</a>
                </li>
                <li>
                  <a href="#reviews" className="text-stone-450 hover:text-orange-500 transition-colors">Customer reviews</a>
                </li>
              </ul>
            </div>

            {/* Menu Quicklinks */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[#FAF8F2] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                WhatsApp Orders
              </h4>
              <p className="text-stone-400 text-xs leading-relaxed font-semibold">
                Select your dishes, build your order summary, and send it straight to our delivery kitchen via WhatsApp.
              </p>
              <div className="pt-2">
                <button
                  onClick={scrollToMenu}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-stone-100 px-5 py-3 rounded-xl text-xs font-bold shadow-md shadow-orange-950/20"
                >
                  <MessageSquare className="w-4 h-4" /> Start Placing Order
                </button>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="max-w-7xl mx-auto px-4 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[10px] font-bold uppercase tracking-wider">
            <p>© 2026 FoodBrim. Filled to the Brim. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Floating Action Buttons (Sticky/Accessibles) ── */}
      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppChat}
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-5 py-4 shadow-lg shadow-orange-950/30 flex items-center gap-2 font-bold cursor-pointer border border-orange-500/20"
        >
          <MessageCircle className="w-5 h-5 text-white fill-current" />
          <span className="text-sm font-semibold tracking-wide">Order on WhatsApp</span>
        </motion.div>
      </div>

      {/* Mobile Sticky Order Bar (Bottom-anchored) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0A09]/95 backdrop-blur-md border-t border-stone-850 p-4 flex items-center justify-between shadow-lg">
        {items.length > 0 ? (
          <>
            <div>
              <span className="text-[10px] font-black text-stone-500 block uppercase tracking-wider">Your Order</span>
              <span className="text-sm font-black text-stone-100">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items · {siteConfig.currency}{getTotalPrice() + siteConfig.deliveryFee}
              </span>
            </div>
            <button
              onClick={openCart}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-950/20"
            >
              Checkout Order <ChevronRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider">Kitchen Open</span>
            </div>
            <button
              onClick={handleWhatsAppChat}
              className="bg-orange-650 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </button>
          </>
        )}
      </div>

      {/* ── Drawers & Checkout Modals ── */}
      <CartDrawer />
      <CheckoutModal />

      {/* Success checkout panel */}
      <AnimatePresence>
        {orderPlaced && <OrderSuccess />}
      </AnimatePresence>
    </div>
  );
}
