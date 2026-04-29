"use client";

import { useEffect, useState } from "react";
import { Arrow } from "./Arrow";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "why", label: "Why" },
  { id: "offer", label: "Offer" },
  { id: "questions", label: "Questions" },
  { id: "team", label: "Team" },
  { id: "events", label: "Events" },
];

export function Nav() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const els = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose top is closest to viewport top among intersecting ones
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav__inner">
        <a href="#top" className="nav__logo">
          <img
            src="/logo.png"
            alt="Texas Aspire"
            className="nav__logo-mark"
            width={28}
            height={28}
          />
          texas aspire
        </a>

        <div className="nav__pill">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`nav__link${active === s.id ? " is-active" : ""}`}
            >
              <span>{s.label}</span>
              <span className="dup">{s.label}</span>
            </a>
          ))}
        </div>

        <a href="#events" className="nav__cta">
          Join us
          <Arrow size={11} />
        </a>
      </div>
    </nav>
  );
}
