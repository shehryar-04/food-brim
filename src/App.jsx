import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import OrderSuccess from "./components/OrderSuccess";
import BurstHero from "./components/BurstHero";
import FoodMarquee from "./components/FoodMarquee";
import useCartStore from "./store/cartStore";
import { useMenu } from "./hooks/useMenu";
import {
  Search, MapPin, Phone, Clock, MessageSquare,
  Star, Heart, Flame, ShieldCheck, Sparkles, MessageCircle, ChevronRight,
  Award, CheckCircle2
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
    setShowNavbar(progress >= 0.90);
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

  // Calculate emerging styles during the last phase of the animation (0.70 -> 0.95)
  const emergeOpacity = scrollProgress < 0.70
    ? 0
    : Math.min(1, (scrollProgress - 0.70) / 0.25);

  const emergeScale = scrollProgress < 0.70
    ? 0.97
    : 0.97 + 0.03 * Math.min(1, (scrollProgress - 0.70) / 0.25);

  const emergeY = scrollProgress < 0.70
    ? 50
    : 50 * (1 - Math.min(1, (scrollProgress - 0.70) / 0.25));

  const philosophies = [
    {
      icon: Flame,
      title: "Cooked to Order",
      desc: "Zero pre-cooked compromises. Your biryanis are layered and steamed only after you click order.",
      tag: "Fresh Dum"
    },
    {
      icon: ShieldCheck,
      title: "Clean Kitchens",
      desc: "Our kitchens adhere strictly to the highest food hygiene and safety standards without shortcuts.",
      tag: "Hygienic 100%"
    },
    {
      icon: Heart,
      title: "Desi Heritage",
      desc: "Authentic spices ground in-house, long-grain basmati, and traditional slow-cooking recipes.",
      tag: "Pure Masala"
    },
    {
      icon: Sparkles,
      title: "Generous Portions",
      desc: "Filled to the brim. Packed in custom heat-lock insulated packaging for peak fresh delivery.",
      tag: "Brim Feasts"
    },
  ];

  const galleryItems = [
    foodPortrait,
    foodSquare,
    foodPortrait,
    deliveryBoxPhoto,
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E6] text-stone-900 selection:bg-[#1E5B3C] selection:text-white pb-16 md:pb-0 font-sans">
      <AnimatePresence>
        {showNavbar && <Navbar />}
      </AnimatePresence>

      {/* ── Cinematic 3D Frame-by-Frame Scroll Sequence Hero ── */}
      <BurstHero
        onOrderNow={scrollToMenu}
        onProgressChange={handleProgressChange}
      />

      {/* ── Page Content Emerging from Animation ── */}
      <div
        style={{
          opacity: emergeOpacity,
          transform: `translateY(${emergeY}px) scale(${emergeScale})`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "top center",
          pointerEvents: scrollProgress < 0.75 ? "none" : "auto",
        }}
        className="relative z-30"
      >
        {/* ── Dynamic Brand Marquee Banner ── */}
        <FoodMarquee prefersReducedMotion={prefersReducedMotion} />

        {/* ── Search Bar Section ────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="relative max-w-lg mx-auto md:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search for delicious dishes, biryanis, sides…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/90 rounded-2xl pl-11 pr-4 py-4 text-stone-900 placeholder-stone-400 text-sm outline-none shadow-[0_4px_20px_rgb(0,0,0,0.03)] focus:shadow-[0_8px_30px_rgb(0,0,0,0.07)] transition-all font-semibold"
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
        <section id="about" className="relative max-w-7xl mx-auto px-4 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Typography Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#1E5B3C]/10 text-[#1E5B3C] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Award className="w-3.5 h-3.5 text-[#1E5B3C]" /> Authentic Desi Craft
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#1E5B3C] leading-tight">
                Made to Crave.<br />
                <span className="font-script text-[#A46A3A] text-5xl md:text-6xl lg:text-7xl block mt-1">
                  Made to Share.
                </span>
              </h2>

              <p className="text-stone-700 text-base md:text-lg leading-relaxed font-medium">
                At Food Brim, we craft culinary journeys filled to the brim with flavor, freshness, and love.
                Our dishes are inspired by authentic, generations-old recipes, prepared by passionate chefs,
                and packed in high-quality insulated packaging so they arrive tasting just like they were served straight from the flame.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-white/70 p-4 rounded-2xl shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#1E5B3C] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-stone-900 font-bold text-sm">Layered Dum Cooking</h4>
                    <p className="text-stone-600 text-xs mt-0.5 font-medium">Sealed in clay pot warmth</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/70 p-4 rounded-2xl shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#1E5B3C] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-stone-900 font-bold text-sm">25-Min Delivery</h4>
                    <p className="text-stone-600 text-xs mt-0.5 font-medium">Straight to your doorstep hot</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  onClick={scrollToMenu}
                  whileHover={{ scale: 1.04, x: 3 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] font-bold text-sm px-7 py-3.5 rounded-2xl shadow-md shadow-[#1E5B3C]/20 transition-all cursor-pointer"
                >
                  Explore Our Creations <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Visual Portrait Crops */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="absolute w-80 h-80 bg-[#1E5B3C]/10 rounded-full blur-3xl -z-10" />
              <div className="relative group max-w-sm w-full">
                <motion.img
                  src={foodPortrait}
                  alt="Aromatic Desi Biryani"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl shadow-2xl object-cover h-[460px] w-full"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                  <span className="text-xs font-bold text-[#A46A3A] block uppercase tracking-wider mb-1">Weekly Special</span>
                  <span className="text-sm font-serif font-bold text-[#1E5B3C] block">Hyderabadi Chicken Biryani</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Quality Section (Philosophy) ─────────────────────────── */}
        <section className="relative py-28 bg-gradient-to-b from-transparent via-white/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-xl text-center md:text-left mb-16">
              <span className="text-[#A46A3A] text-xs font-bold uppercase tracking-widest block mb-2">Philosophy</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#1E5B3C]">
                The Food Brim Standard
              </h2>
              <p className="text-stone-600 text-sm md:text-base mt-3 leading-relaxed font-medium">
                We believe excellent food is built on simple, uncompromised standards of selection, cooking, and delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {philosophies.map((ph, idx) => {
                const Icon = ph.icon;
                return (
                  <motion.div
                    key={ph.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-white/80 hover:bg-white rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.07)] transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-[#1E5B3C]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-[#1E5B3C]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A46A3A] bg-[#A46A3A]/10 px-2.5 py-1 rounded-full">
                        {ph.tag}
                      </span>
                    </div>
                    <h3 className="text-[#1E5B3C] font-serif font-bold text-lg mb-2.5">{ph.title}</h3>
                    <p className="text-stone-600 text-xs leading-relaxed font-medium">{ph.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Social Proof Section (Reviews) ─────────────────────────── */}
        <section id="reviews" className="relative max-w-7xl mx-auto px-4 py-28">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#A46A3A] text-xs font-bold uppercase tracking-widest block mb-2">Testimonials</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-[#1E5B3C]">
              Approved by Food Lovers
            </h2>
            <p className="text-stone-600 text-sm mt-3 font-medium">
              See what our customers have to say about their hot home-delivered meals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white/80 hover:bg-white rounded-3xl p-8 flex flex-col justify-between shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_14px_36px_rgb(0,0,0,0.06)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < test.rating ? "fill-yellow-500 text-yellow-500" : "text-stone-300"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm italic leading-relaxed font-medium">
                    "{test.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-[#1E5B3C]/10 flex items-center justify-center text-[#1E5B3C] font-bold text-sm">
                    {test.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-900 text-sm font-bold">{test.name}</span>
                      {test.verified && (
                        <span className="bg-[#1E5B3C]/10 text-[#1E5B3C] text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-stone-400 text-[10px] font-semibold">{test.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Instagram Section ───────────────────────────────────────── */}
        <section className="py-24 bg-gradient-to-b from-transparent via-white/40 to-transparent">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4 text-center sm:text-left">
              <div>
                <span className="text-[#A46A3A] text-xs font-bold uppercase tracking-widest block">Social Media</span>
                <h2 className="text-2xl md:text-3xl font-serif font-black text-[#1E5B3C] mt-1">
                  On the Gram @foodbrim
                </h2>
              </div>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-2xl transition-all shadow-md cursor-pointer"
              >
                Follow Food Brim
              </motion.a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {galleryItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className="relative group h-64 bg-stone-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={item}
                    alt={`Food Brim Instagram Showcase ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-[#1E5B3C]/80 opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                    <span className="text-[#F5F1E6] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
                      View Post
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location / Contact Section ──────────────────────────────── */}
        <section id="contact" className="max-w-7xl mx-auto px-4 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Info Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <span className="text-[#A46A3A] text-xs font-bold uppercase tracking-widest block mb-2">Find Us</span>
                <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1E5B3C] mb-6">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 text-[#1E5B3C] shadow-xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-stone-900 text-xs font-bold uppercase tracking-wider mb-0.5">Our Location</h4>
                      <p className="text-stone-600 text-sm font-semibold leading-relaxed">
                        {siteConfig.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 text-[#1E5B3C] shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-stone-900 text-xs font-bold uppercase tracking-wider mb-0.5">Call / WhatsApp</h4>
                      <p className="text-stone-600 text-sm font-semibold leading-relaxed">
                        Phone: {siteConfig.phone}<br />
                        WhatsApp: {siteConfig.whatsappNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 text-[#1E5B3C] shadow-xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-stone-900 text-xs font-bold uppercase tracking-wider mb-0.5">Service Hours</h4>
                      <p className="text-stone-600 text-sm font-semibold leading-relaxed">
                        {siteConfig.openingHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat on WhatsApp Prompt Box */}
              <div className="bg-white/80 backdrop-blur-sm p-7 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <h4 className="text-[#1E5B3C] font-serif font-bold text-base mb-1">Have questions or custom catering orders?</h4>
                <p className="text-stone-500 text-xs font-medium mb-4">Chat with our customer service representative directly.</p>
                <motion.button
                  onClick={handleWhatsAppChat}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] px-6 py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </motion.button>
              </div>
            </div>

            {/* Map Iframe */}
            <div className="lg:col-span-7 h-[380px] lg:h-auto min-h-[350px] relative rounded-3xl overflow-hidden shadow-md">
              <iframe
                title="Food Brim Location Map"
                src={siteConfig.googleMapsPlaceholderUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="contrast-105"
              />
            </div>
          </div>
        </section>

        {/* ── Double-Tier Premium Footer with Soft Curved Flow ── */}
        <footer className="bg-[#1E5B3C] rounded-t-[3rem] py-16 text-[#F5F1E6] mt-20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            {/* Info Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={logoSquare}
                  alt="Food Brim Logo"
                  className="w-10 h-10 rounded-full object-cover shadow-sm"
                />
                <span className="text-[#F5F1E6] font-serif font-black text-2xl tracking-tight">
                  Food<span className="text-[#A46A3A]">Brim</span>
                </span>
              </div>
              <p className="text-[#F5F1E6]/80 text-xs leading-relaxed max-w-sm font-semibold">
                {siteConfig.description}
              </p>
              <div className="flex gap-4 pt-2">
                <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="text-[#F5F1E6]/80 hover:text-white text-xs font-bold uppercase transition-colors">Instagram</a>
                <span className="text-white/30">/</span>
                <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="text-[#F5F1E6]/80 hover:text-white text-xs font-bold uppercase transition-colors">Facebook</a>
              </div>
            </div>

            {/* Sitemap Navigation links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[#F5F1E6] text-xs font-bold uppercase tracking-widest">Sitemap</h4>
              <ul className="space-y-2 text-xs font-semibold">
                <li>
                  <a href="#" className="text-[#F5F1E6]/75 hover:text-white transition-colors">Home</a>
                </li>
                <li>
                  <a href="#menu" className="text-[#F5F1E6]/75 hover:text-white transition-colors">Menu Selection</a>
                </li>
                <li>
                  <a href="#about" className="text-[#F5F1E6]/75 hover:text-white transition-colors">Our philosophy</a>
                </li>
                <li>
                  <a href="#reviews" className="text-[#F5F1E6]/75 hover:text-white transition-colors">Customer reviews</a>
                </li>
              </ul>
            </div>

            {/* Menu Quicklinks */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[#F5F1E6] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                WhatsApp Orders
              </h4>
              <p className="text-[#F5F1E6]/80 text-xs leading-relaxed font-semibold">
                Select your dishes, build your order summary, and send it straight to our delivery kitchen via WhatsApp.
              </p>
              <div className="pt-2">
                <motion.button
                  onClick={scrollToMenu}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 bg-[#A46A3A] hover:bg-[#8d5b32] text-[#F5F1E6] px-6 py-3.5 rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  <MessageSquare className="w-4 h-4" /> Start Placing Order
                </motion.button>
              </div>
            </div>
          </div>

          {/* Legal Bar */}
          <div className="max-w-7xl mx-auto px-6 md:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#F5F1E6]/60 text-[10px] font-bold uppercase tracking-wider">
            <p>© 2026 FoodBrim. Filled to the Brim. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
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
          className="bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] rounded-full px-5 py-4 shadow-2xl flex items-center gap-2 font-bold cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-[#F5F1E6] fill-current" />
          <span className="text-sm font-semibold tracking-wide">Order on WhatsApp</span>
        </motion.div>
      </div>

      {/* Mobile Sticky Order Bar (Bottom-anchored) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F5F1E6]/90 backdrop-blur-2xl p-4 flex items-center justify-between shadow-[0_-8px_30px_rgb(0,0,0,0.06)]">
        {items.length > 0 ? (
          <>
            <div>
              <span className="text-[10px] font-black text-stone-500 block uppercase tracking-wider">Your Order</span>
              <span className="text-sm font-black text-stone-900">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items · {siteConfig.currency}{getTotalPrice() + siteConfig.deliveryFee}
              </span>
            </div>
            <button
              onClick={openCart}
              className="bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              Checkout Order <ChevronRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E5B3C] animate-pulse" />
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">Kitchen Open</span>
            </div>
            <button
              onClick={handleWhatsAppChat}
              className="bg-[#1E5B3C] hover:bg-[#16442c] text-[#F5F1E6] px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
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
