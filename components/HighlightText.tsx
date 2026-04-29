"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  className?: string;
  children: ReactNode;
  start?: string;
  end?: string;
  fade?: number;
  stagger?: number;
};

export function HighlightText({
  className,
  children,
  start = "top 85%",
  end = "center 50%",
  fade = 0.18,
  stagger = 0.08,
}: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(SplitText, ScrollTrigger);

    const split = SplitText.create(el, { type: "words, chars" });

    const tween = gsap.from(split.chars, {
      autoAlpha: fade,
      stagger,
      ease: "linear",
      immediateRender: true,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [start, end, fade, stagger]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
