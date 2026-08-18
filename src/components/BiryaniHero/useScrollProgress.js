import { useEffect, useRef } from "react";

/**
 * Tracks scroll progress (0→1) within a sticky section.
 * Uses a ref (not state) so scroll events never trigger React re-renders.
 */
export function useScrollProgress() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) {
        progressRef.current = 0;
        return;
      }
      progressRef.current = Math.max(0, Math.min(1, -rect.top / totalScrollable));
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { sectionRef, progressRef };
}
