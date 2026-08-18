import { useEffect, useState } from "react";
import { useScrollProgress } from "./useScrollProgress";
import { BiryaniScene } from "./BiryaniScene";

const PHASES = [
  { from: 0.00, to: 0.13, label: "Freshly prepared biryani" },
  { from: 0.14, to: 0.30, label: "Getting ready to pour..." },
  { from: 0.31, to: 0.73, label: "Pouring hot biryani" },
  { from: 0.74, to: 0.89, label: "Almost there..." },
  { from: 0.90, to: 1.00, label: "Packed & ready to deliver!" },
];

export default function BiryaniHero({ prefersReducedMotion }) {
  const { sectionRef, progressRef } = useScrollProgress();

  const [isMobile, setIsMobile] = useState(false);
  const [phaseLabel, setPhaseLabel] = useState(PHASES[0].label);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
    };

    update();

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const p = progressRef.current;

      const phase =
        PHASES.find((item) => p >= item.from && p <= item.to) ||
        PHASES[PHASES.length - 1];

      setPhaseLabel(phase.label);
    }, 100);

    return () => clearInterval(interval);
  }, [progressRef]);

  if (prefersReducedMotion) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="w-28 h-28 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-orange-500/40">
            <svg
              className="w-14 h-14 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          </div>

          <h2 className="text-white text-5xl font-black mb-4">
            Premium Biryani
            <br />
            <span className="text-orange-500">Delivered Hot.</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Crafted by passionate chefs, packed fresh, and at your door in 25
            minutes.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "550vh" }}
      aria-label="3D biryani pouring animation — scroll to watch"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gray-950">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 30%, rgba(124,45,18,0.22) 0%, rgba(30,15,8,0.08) 45%, transparent 75%)",
          }}
        />

        <BiryaniScene
          progressRef={progressRef}
          isMobile={isMobile}
        />

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none">
          <p
            key={phaseLabel}
            className="text-gray-300/70 text-sm font-semibold tracking-widest uppercase animate-fade-in-up"
          >
            {phaseLabel}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 pointer-events-none select-none">
          <span className="text-xs uppercase tracking-widest">
            Scroll to pour
          </span>

          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none select-none">
          <span className="text-white/20 text-xs font-bold uppercase tracking-widest">
            FoodBrim
          </span>
        </div>
      </div>
    </section>
  );
}