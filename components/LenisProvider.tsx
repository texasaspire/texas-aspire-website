"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

export function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1.15 });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
