import { useState, useEffect, useRef } from "react";

// ============================================================
// COLORS — edit here to change the entire palette
// ============================================================
const COLORS = {
  green: "#1B4D2E",       // deep forest green (primary)
  greenLight: "#2A6741",  // slightly lighter green for hover states
  cream: "#F0EDE6",       // warm off-white background
  creamDark: "#E5E1D8",   // slightly darker cream for section contrast
  dark: "#0F2A1A",        // near-black for text
  mid: "#4A7C5F",         // mid-green for accents
};

// ============================================================
// TEAM MEMBERS — edit here to update the board
// ============================================================
const TEAM = [
  {
    name: "Sanjay Sathish",
    position: "President",
    year: "Sophomore, Neuroscience",
    bio: "Passionate about making premed guidance accessible to every student at UT Austin.",
    photo: "https://i.imgur.com/sZW9Szb.jpeg"
  },
  {
    name: "Impa Bagur",
    position: "Director of Marketing",
    year: "Sophomore, Neuroscience",
    bio: "Dedicated to building a community where students feel supported on their medical school journey.",
    photo: "https://i.imgur.com/iiC1x24.jpeg"
  
  },
  {
    name: "Pearl Patel",
    position: "Director of Logistics",
    year: "Sophomore, Neuroscience",
    bio: "Organizing workshops and speaker series that bring real clinical perspective to premed students.",
    photo:"https://i.imgur.com/nT7AnJ0.jpeg"
  },
  {
    name: "Vishruth Batchu",
    position: "Director of Outreach",
    year: "Sophomore, Neuroscience",
    bio: "Connecting students with opportunities and helping grow the ASPIRE community across campus.",
    photo: "https://i.imgur.com/2ghftER.jpeg"
  },
  {
    name: "Vincent Phan, M.D.",
    position: "Clinical Outreach Director",
    year: "Resident Physician",
    bio: "ASPIRE includes a resident on its board to offer consistent mentorship and connect members with experienced speakers.",
    photo:"https://i.imgur.com/mtTcV42.jpeg"
  },
];

// ============================================================
// EVENTS — edit here to add/remove upcoming events
// ============================================================
const EVENTS = [
  {
    title: "Workshop #1",
    date: "April 9, 2026 @ 6:30 PM",
    location: "Jester West Auditorium",
    description: "Join us for ASPIRE's first ever workshop featuring Vincent Phan, M.D., a practicing resident physician who will share his firsthand experience navigating the pre-med journey at UT Austin — from coursework and clinical hours to the medical school application itself. Come ready to ask anything: what the process actually looks like, what he wishes he'd known earlier, and how to make the most of your time as a pre-med student." ,
    tag: "UPCOMING",
  },
  {
    title: "Clinical Experience Q&A",
    date: "TBD",
    location: "Jester Auditorium",
    description: "A dedicated session on finding and making the most of clinical volunteering and shadowing opportunities.",
    tag: "UPCOMING",
  },
  {
    title: "Application Deep Dive",
    date: "TBD",
    location: "UT Austin Campus",
    description: "Everything you need to know about AMCAS, personal statements, secondaries, and interview prep.",
    tag: "UPCOMING",
  },
];

// ============================================================
// WHAT WE OFFER — edit to change the offerings grid
// ============================================================
const OFFERINGS = [
  { title: "Coursework Guidance", desc: "Navigate science prerequisites, GPA strategy, and course sequencing with advice from those who've done it." },
  { title: "Clinical Experience", desc: "Learn how to find, apply for, and make the most of shadowing, volunteering, and clinical roles." },
  { title: "Extracurriculars", desc: "Understand which activities matter, how to balance involvement, and how to present your experiences." },
  { title: "Application Insight", desc: "Honest guidance on AMCAS, personal statements, secondaries, and what medical schools actually look for." },
  { title: "Exam Preparation", desc: "MCAT strategy, study resources, timing, and lessons learned from students who've been through it." },
  { title: "Time Management", desc: "Practical frameworks for managing coursework, extracurriculars, and personal wellbeing as a premed." },
  { title: "Real Conversations", desc: "Direct access to medical students, residents, and professionals who share honest, unfiltered experience." },
  {
    title: "Community & Support",
    desc: "Join a network of premed students navigating the same journey — share experiences, ask questions, and grow together."
  }
];

// ============================================================
// QUESTIONS — edit to change the "Questions We Help Answer" list
// ============================================================
const QUESTIONS = [
  "How do I build a strong application?",
  "Do recommendation letters really matter?",
  "How do I keep my GPA up without burning out?",
  "How can I get ahead early?",
  "What extracurriculars actually matter?",
  "How do I find clinical experience?",
  "How should I manage my time as a premed?",
];

// ============================================================
// WHY ASPIRE — edit pillars here
// ============================================================
const PILLARS = [
  { label: "No Applications", sub: "Walk in. No barriers." },
  { label: "No Dues", sub: "Completely free, always." },
  { label: "No Interviews", sub: "Open to every student." },
  { label: "Real Advice", sub: "Honest, experience-based." },
  { label: "Open Access", sub: "Any premed can join." },
  { label: "Student-Led", sub: "Built by premeds, for premeds." },
];

// ============================================================
// HOOK — simple scroll-triggered visibility
// ============================================================
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ============================================================
// LINE MOTIF — thin geometric rule with optional label
// ============================================================
function LineRule({ label, light = false }) {
  const color = light ? "rgba(240,237,230,0.4)" : COLORS.green;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "0 0 8px" }}>
      <div style={{ flex: 1, height: 1, background: color }} />
      {label && (
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: light ? "rgba(240,237,230,0.6)" : COLORS.mid,
          whiteSpace: "nowrap",
        }}>{label}</span>
      )}
      <div style={{ flex: 1, height: 1, background: color }} />
    </div>
  );
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Offer", "Why", "Questions", "Team", "Events", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? COLORS.green : "transparent",
      borderBottom: scrolled ? `1px solid rgba(255,255,255,0.12)` : "none",
      transition: "background 0.4s, border-color 0.4s",
      padding: "0 48px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 64, justifyContent: "space-between" }}>
        {/* Logo mark */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: COLORS.green,
            border: `2px solid ${COLORS.cream}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, color: COLORS.cream, letterSpacing: "0.05em" }}>TA</span>
          </div>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: 15, letterSpacing: "0.15em",
            color: COLORS.cream, textTransform: "uppercase",
          }}>Texas ASPIRE</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-links">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
              color: COLORS.cream, textDecoration: "none", opacity: 0.8,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.8}
            >{l}</a>
          ))}
          <a href="#contact" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
            color: COLORS.green, background: COLORS.cream,
            padding: "8px 18px", textDecoration: "none",
            fontWeight: 700, transition: "background 0.2s, color 0.2s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.creamDark; }}
            onMouseLeave={e => { e.target.style.background = COLORS.cream; }}
          >Join</a>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');
        @media (max-width: 768px) { .nav-links { display: none !important; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.cream}; margin: 0; padding: 0; overflow-x: hidden; }
        html, body, #root { width: 100%; margin: 0; padding: 0; }
        .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  return (
    <section id="hero" style={{
      background: COLORS.green,
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "120px 48px 80px",
    }}>
      {/* Geometric line frame — top/bottom/left/right lines */}
      <div style={{ position: "absolute", top: 80, left: 40, width: 1, height: "60%", background: "rgba(240,237,230,0.2)" }} />
      <div style={{ position: "absolute", top: 80, right: 40, width: 1, height: "60%", background: "rgba(240,237,230,0.2)" }} />
      <div style={{ position: "absolute", top: 80, left: 40, right: 40, height: 1, background: "rgba(240,237,230,0.2)" }} />
      <div style={{ position: "absolute", bottom: 80, left: 40, right: 40, height: 1, background: "rgba(240,237,230,0.2)" }} />

      {/* Inner frame box */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%", height: "55%",
        border: "1px solid rgba(240,237,230,0.15)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, textAlign: "center", alignItems: "center"}}>
        {/* Eyebrow */}
        <div style={{ marginBottom: 24 }}>
          <LineRule label="UT Austin · Est. 2025" light />
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: "clamp(72px, 12vw, 160px)",
          color: COLORS.cream, textTransform: "uppercase",
          lineHeight: 0.9, letterSpacing: "-0.01em",
          marginBottom: 32,
        }}>
          TEXAS<br />ASPIRE
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(16px, 2.5vw, 24px)", fontWeight: 600,
          color: "rgba(240,237,230,0.85)", textTransform: "uppercase",
          letterSpacing: "0.12em", marginBottom: 12,
        }}>
          Free, Accessible, Practical Premed Mentorship at UT Austin
        </p>

        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: "clamp(14px, 1.5vw, 17px)",
          color: "rgba(240,237,230,0.65)", maxWidth: 540, lineHeight: 1.6,
          marginBottom: 48,
        }}>
          Guidance from medical students, residents, and professionals —
          no applications, no dues, no interviews required.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center"}}>
          <a href="#contact" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: 14, letterSpacing: "0.2em",
            textTransform: "uppercase", textDecoration: "none",
            background: COLORS.cream, color: COLORS.green,
            padding: "16px 40px", display: "inline-block",
            transition: "background 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.creamDark; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = COLORS.cream; e.target.style.transform = "translateY(0)"; }}
          >Join ASPIRE</a>

          <a href="#about" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: 14, letterSpacing: "0.2em",
            textTransform: "uppercase", textDecoration: "none",
            border: `1px solid rgba(240,237,230,0.5)`, color: COLORS.cream,
            padding: "16px 40px", display: "inline-block",
            transition: "border-color 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = COLORS.cream; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(240,237,230,0.5)"; e.target.style.transform = "translateY(0)"; }}
          >Learn More</a>
        </div>

        {/* Tagline bottom */}
        <div style={{ marginTop: 80 }}>
          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
            color: "rgba(240,237,230,0.4)",
          }}>
            UT's First Fully Accessible Pre-Med Mentorship Org
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About() {
  const [ref, visible] = useVisible();
  return (
    <section id="about" style={{ background: COLORS.cream, padding: "120px 48px" }}>
      <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* Left — label + heading */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <LineRule label="About" />
            </div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: "clamp(48px, 6vw, 88px)",
              color: COLORS.green, textTransform: "uppercase",
              lineHeight: 0.92, letterSpacing: "-0.01em",
            }}>
              WHAT IS<br />TEXAS<br />ASPIRE?
            </h2>
            {/* Decorative block */}
            <div style={{ width: 60, height: 4, background: COLORS.green, marginTop: 32 }} />
          </div>

          {/* Right — body text + bullet list */}
          <div style={{ paddingTop: 8 }}>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 17, lineHeight: 1.75, color: COLORS.dark,
              marginBottom: 32,
            }}>
              Texas ASPIRE is a student-led premed mentorship organization dedicated to making
              guidance for the medical school journey <strong>free, accessible, and practical</strong> for
              all students. We remove traditional barriers — no applications, no dues, no interviews —
              so any student interested in medicine can participate and benefit.
            </p>

            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 17, lineHeight: 1.75, color: COLORS.dark,
              marginBottom: 40,
            }}>
              We connect members with medical students, residents, and healthcare professionals who
              share honest insights into the application process and their personal experiences in
              medicine — the kind of practical advice that isn't available in a classroom.
            </p>

            {/* Checklist */}
            {[
              "Pre-med mentorship providing fully accessible aid to students",
              "No application or dues required",
              "Residents and pre-med professionals come in to speak and answer questions",
              "Ask about coursework, application processes, requirements, and more",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 16, height: 16, background: COLORS.green, flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: COLORS.dark, lineHeight: 1.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { #about .fade-up > div { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}

// ============================================================
// WHAT WE OFFER
// ============================================================
function Offer() {
  const [ref, visible] = useVisible();
  return (
    <section id="offer" style={{ background: COLORS.green, padding: "120px 48px" }}>
      <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}><LineRule label="What We Offer" light /></div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: "clamp(40px, 5vw, 72px)",
          color: COLORS.cream, textTransform: "uppercase",
          lineHeight: 0.92, marginBottom: 64,
        }}>
          GUIDANCE ACROSS<br />EVERY DIMENSION
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 1, background: "rgba(240,237,230,0.15)",
        }}>
          {OFFERINGS.map((o, i) => (
            <div key={i} style={{
              background: COLORS.green, padding: "40px 32px",
              borderTop: `1px solid rgba(240,237,230,0.15)`,
              transition: "background 0.3s",
              cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.greenLight}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.green}
            >
              {/* Number */}
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11, letterSpacing: "0.2em", color: "rgba(240,237,230,0.4)",
                marginBottom: 20, textTransform: "uppercase",
              }}>0{i + 1}</p>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: 22, textTransform: "uppercase",
                letterSpacing: "0.05em", color: COLORS.cream, marginBottom: 14,
              }}>{o.title}</h3>
              <div style={{ height: 1, background: "rgba(240,237,230,0.2)", marginBottom: 16 }} />
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14, color: "rgba(240,237,230,0.7)", lineHeight: 1.65,
              }}>{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHY ASPIRE
// ============================================================
function Why() {
  const [ref, visible] = useVisible();
  return (
    <section id="why" style={{ background: COLORS.cream, padding: "120px 48px" }}>
      <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}><LineRule label="Why ASPIRE" /></div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: "clamp(40px, 5vw, 72px)",
          color: COLORS.green, textTransform: "uppercase",
          lineHeight: 0.92, marginBottom: 72,
        }}>
          BUILT DIFFERENTLY.<br />BY DESIGN.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 0,
          border: `1px solid ${COLORS.green}`,
        }}>
          {PILLARS.map((p, i) => (
            <div key={i} style={{
              padding: "52px 40px",
              borderRight: i % 3 !== 2 ? `1px solid ${COLORS.green}` : "none",
              borderBottom: i < 3 ? `1px solid ${COLORS.green}` : "none",
              transition: "background 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.creamDark}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 20, height: 20, background: COLORS.green, marginBottom: 24 }} />
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 28, textTransform: "uppercase",
                color: COLORS.green, letterSpacing: "0.02em", marginBottom: 8,
              }}>{p.label}</h3>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13, color: COLORS.mid, letterSpacing: "0.05em",
                textTransform: "uppercase", fontWeight: 600,
              }}>{p.sub}</p>
            </div>
          ))}
        </div>

        <style>{`@media (max-width: 768px) { #why .fade-up > div:last-child { grid-template-columns: 1fr !important; } #why .fade-up > div:last-child > div { border-right: none !important; border-bottom: 1px solid ${COLORS.green} !important; } }`}</style>
      </div>
    </section>
  );
}

// ============================================================
// QUESTIONS
// ============================================================
function Questions() {
  const [ref, visible] = useVisible();
  return (
    <section id="questions" style={{ background: COLORS.green, padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      {/* Concentric circle motif (cream, very faint) */}
      {[200, 400, 600, 800, 1000].map(r => (
        <div key={r} style={{
          position: "absolute", top: "50%", left: "50%",
          width: r, height: r, borderRadius: "50%",
          border: "1px solid rgba(240,237,230,0.06)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />
      ))}

      <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ marginBottom: 20 }}><LineRule label="Questions We Help Answer" light /></div>

        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: "clamp(40px, 5vw, 64px)",
          color: COLORS.cream, textTransform: "uppercase",
          lineHeight: 0.95, marginBottom: 64,
        }}>
          DO YOU HAVE<br />QUESTIONS ABOUT
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {QUESTIONS.map((q, i) => (
            <div key={i} style={{
              padding: "24px 0",
              borderBottom: i < QUESTIONS.length - 1 ? "1px solid rgba(240,237,230,0.15)" : "none",
              transition: "padding-left 0.3s",
              cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = "12px"}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = "0"}
            >
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: "clamp(18px, 3vw, 28px)",
                textTransform: "uppercase", letterSpacing: "0.05em",
                color: COLORS.cream,
              }}>{q}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64 }}>
          <a href="#contact" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase",
            textDecoration: "none", background: COLORS.cream, color: COLORS.green,
            padding: "18px 48px", display: "inline-block",
            transition: "background 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.creamDark; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = COLORS.cream; e.target.style.transform = "translateY(0)"; }}
          >Come to the Next Workshop</a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TEAM
// ============================================================
function Team() {
  const [ref, visible] = useVisible();
  return (
    <section id="team" style={{ background: COLORS.creamDark, padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      {/* Subtle concentric circles behind */}
      {[300, 600, 900].map(r => (
        <div key={r} style={{
          position: "absolute", bottom: "-20%", right: "-10%",
          width: r, height: r, borderRadius: "50%",
          border: `1px solid rgba(27,77,46,0.07)`,
          pointerEvents: "none",
        }} />
      ))}

      <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 16 }}><LineRule label="Meet the Team" /></div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: "clamp(48px, 7vw, 96px)",
          color: COLORS.green, textTransform: "uppercase",
          lineHeight: 0.88, marginBottom: 80,
        }}>
          MEET THE<br />ASPIRE TEAM<br />
          <span style={{ fontSize: "0.45em", letterSpacing: "0.15em", color: COLORS.mid }}>2025–2026</span>
        </h2>

        {/* Left vertical line motif */}
        <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          <div style={{ width: 1, background: COLORS.green, alignSelf: "stretch", flexShrink: 0 }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 40, flex: 1,
          }}>
            {TEAM.map((member, i) => (
              <div key={i} style={{ transition: "transform 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <img
  src={member.photo}
  alt={member.name}
  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block", marginBottom: 16 }}
/>


                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800, fontSize: 18, textTransform: "uppercase",
                  letterSpacing: "0.05em", color: COLORS.green, marginBottom: 4,
                }}>{member.name}</h3>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em",
                  color: COLORS.mid, fontWeight: 600, marginBottom: 4,
                }}>{member.position}</p>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "rgba(74,124,95,0.7)", marginBottom: 12,
                }}>{member.year}</p>
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13, color: COLORS.dark, lineHeight: 1.6, opacity: 0.8,
                }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EVENTS
// ============================================================
function Events() {
  const [ref, visible] = useVisible();
  return (
    <section id="events" style={{ background: COLORS.cream, padding: "120px 48px" }}>
      <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}><LineRule label="Events & Workshops" /></div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: "clamp(40px, 5vw, 72px)",
          color: COLORS.green, textTransform: "uppercase",
          lineHeight: 0.92, marginBottom: 64,
        }}>
          UPCOMING<br />WORKSHOPS
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, border: `1px solid ${COLORS.green}` }}>
          {EVENTS.map((ev, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "160px 1fr auto",
              alignItems: "center", gap: 40, padding: "40px 48px",
              borderBottom: i < EVENTS.length - 1 ? `1px solid ${COLORS.green}` : "none",
              transition: "background 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.creamDark}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: COLORS.cream, background: COLORS.green,
                  padding: "4px 10px", display: "inline-block", marginBottom: 12,
                }}>{ev.tag}</span>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.green, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ev.date}</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: COLORS.mid, marginTop: 4 }}>{ev.location}</p>
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800, fontSize: 28, textTransform: "uppercase",
                  letterSpacing: "0.03em", color: COLORS.green, marginBottom: 8,
                }}>{ev.title}</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: COLORS.dark, lineHeight: 1.6, opacity: 0.8 }}>{ev.description}</p>
              </div>
              <div style={{ width: 24, height: 24, border: `1px solid ${COLORS.green}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: COLORS.green, fontSize: 16, lineHeight: 1 }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { #events .fade-up > div:last-child > div { grid-template-columns: 1fr !important; gap: 16px !important; } }`}</style>
    </section>
  );
}

// ============================================================
// CONTACT / GET INVOLVED
// ============================================================
function Contact() {
  const [ref, visible] = useVisible();
  return (
    <section id="contact" style={{ background: COLORS.green, padding: "120px 48px", position: "relative", overflow: "hidden" }}>
      {/* Geometric frame lines */}
      <div style={{ position: "absolute", top: 60, left: 60, width: 1, height: "80%", background: "rgba(240,237,230,0.12)" }} />
      <div style={{ position: "absolute", top: 60, right: 60, width: 1, height: "80%", background: "rgba(240,237,230,0.12)" }} />
      <div style={{ position: "absolute", top: 60, left: 60, right: 60, height: 1, background: "rgba(240,237,230,0.12)" }} />
      <div style={{ position: "absolute", bottom: 60, left: 60, right: 60, height: 1, background: "rgba(240,237,230,0.12)" }} />

      <div ref={ref} className={`fade-up${visible ? " visible" : ""}`} style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: 20 }}><LineRule label="Get Involved" light /></div>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: "clamp(48px, 8vw, 100px)",
          color: COLORS.cream, textTransform: "uppercase",
          lineHeight: 0.9, marginBottom: 32,
        }}>
          YOUR PATH<br />STARTS HERE
        </h2>
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 17, color: "rgba(240,237,230,0.7)", lineHeight: 1.7,
          maxWidth: 560, margin: "0 auto 56px",
        }}>
          Texas ASPIRE is open to every student interested in medicine.
          No applications, no dues, no interviews. Just show up and start learning.
        </p>

        {/* Contact buttons */}
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
          {/* Instagram */}
          <a href="https://instagram.com/texas.aspire" target="_blank" rel="noreferrer" style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase",
            textDecoration: "none", background: COLORS.cream, color: COLORS.green,
            padding: "16px 36px", display: "inline-flex", alignItems: "center", gap: 8,
            transition: "background 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = COLORS.creamDark; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = COLORS.cream; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.green} strokeWidth="2.5" strokeLinecap="square"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill={COLORS.green} stroke="none" /></svg>
            @texas.aspire
          </a>

          
        </div>

        
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{ background: COLORS.dark, padding: "48px", borderTop: `1px solid rgba(240,237,230,0.08)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            border: `1px solid rgba(240,237,230,0.3)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 10, color: COLORS.cream }}>TA</span>
          </div>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", color: "rgba(240,237,230,0.5)", textTransform: "uppercase" }}>Texas ASPIRE · 2025–2026</span>
        </div>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "rgba(240,237,230,0.3)", letterSpacing: "0.05em" }}>
          UT's First Fully Accessible Pre-Med Mentorship Organization
        </p>
      </div>
    </footer>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", background: COLORS.cream, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <About />
      <Offer />
      <Why />
      <Questions />
      <Team />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}
