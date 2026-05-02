import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Singleton Lenis instance shared across the app
let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisInstance = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (replaces manual RAF loop)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ({ progress: p }: { progress: number }) => {
      setProgress(p);
    });

    return () => {
      gsap.ticker.remove(
        (lenis as unknown as { raf: (t: number) => void }).raf,
      );
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return progress;
}
