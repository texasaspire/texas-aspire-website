export const TEAM = [
  {
    name: "Sanjay Sathish",
    position: "President",
    year: "Junior, Neuroscience",
    bio: "Passionate about making premed guidance accessible to every student at UT Austin.",
    photo: "https://i.imgur.com/sZW9Szb.jpeg",
  },
  {
    name: "Impa Bagur",
    position: "Director of Marketing",
    year: "Junior, Neuroscience",
    bio: "Dedicated to building a community where students feel supported on their medical school journey.",
    photo: "https://i.imgur.com/iiC1x24.jpeg",
  },
  {
    name: "Pearl Patel",
    position: "Director of Logistics",
    year: "Junior, Neuroscience",
    bio: "Organizing workshops and speaker series that bring real clinical perspective to premed students.",
    photo: "https://i.imgur.com/nT7AnJ0.jpeg",
  },
  {
    name: "Vishruth Batchu",
    position: "Director of Outreach",
    year: "Junior, Neuroscience",
    bio: "Connecting students with opportunities and helping grow the ASPIRE community across campus.",
    photo: "https://i.imgur.com/2ghftER.jpeg",
  },
  {
    name: "Vincent Phan, M.D.",
    position: "Clinical Outreach Director",
    year: "Resident Physician",
    bio: "ASPIRE includes a resident on its board to offer consistent mentorship and connect members with experienced speakers.",
    photo: "https://i.imgur.com/mtTcV42.jpeg",
  },
] as const;

export type Event = {
  title: string;
  date: string;
  location: string;
  description: string;
  tag: string;
  hook?: string;
  speaker?: string;
  agenda?: readonly string[];
};

export const EVENTS: readonly Event[] = [
  {
    title: "Workshop №1 — Clinical Experience",
    date: "October 8, 2026 · 5:30 PM",
    location: "Jester West Upstairs Classroom",
    hook: "The next installment of ASPIRE's Pre-Med Application Series. A current medical assistant walks the room through exactly how he found his job — where he looked, what he sent, how he got hired — and then takes every student through the same process personally.",
    agenda: [
      "How one of our own found and landed a medical assistant job as an undergrad",
      "Where clinical openings actually get posted, and what hiring managers are looking for",
      "Personal walkthrough: every student leaves with a plan for landing their own clinical role",
    ],
    description:
      "The next installment of ASPIRE's Pre-Med Application Series, built around clinical experience. A current medical assistant will go through exactly how he found and landed his job — where he looked, what he sent, and how he got hired — and then personally walk everyone in the room through doing the same for themselves.",
    tag: "Upcoming",
  },
  {
    title: "Workshop №2 — The MCAT",
    date: "October 22, 2026 · 5:30 PM",
    location: "Jester West Upstairs Classroom",
    description:
      "Part two of the Pre-Med Application Series. Study timelines, resources, and strategy from students who've taken the exam, plus how to know when you're actually ready to sit for it.",
    tag: "Upcoming",
  },
  {
    title: "Workshop №3 — Volunteering",
    date: "November 5, 2026 · 5:30 PM",
    location: "Jester West Upstairs Classroom",
    description:
      "Part three of the Pre-Med Application Series. Finding volunteer work that's sustainable and genuine, and how to talk about it authentically when it's time to apply.",
    tag: "Upcoming",
  },
];

export const OFFERINGS = [
  {
    title: "Coursework Guidance",
    desc: "Navigate science prerequisites, GPA strategy, and course sequencing with advice from those who've done it.",
  },
  {
    title: "Clinical Experience",
    desc: "Learn how to find, apply for, and make the most of shadowing, volunteering, and clinical roles.",
  },
  {
    title: "Extracurriculars",
    desc: "Understand which activities matter, how to balance involvement, and how to present your experiences.",
  },
  {
    title: "Application Insight",
    desc: "Honest guidance on AMCAS, personal statements, secondaries, and what medical schools actually look for.",
  },
  {
    title: "Exam Preparation",
    desc: "MCAT strategy, study resources, timing, and lessons learned from students who've been through it.",
  },
  {
    title: "Time Management",
    desc: "Practical frameworks for managing coursework, extracurriculars, and personal wellbeing as a premed.",
  },
  {
    title: "Real Conversations",
    desc: "Direct access to medical students, residents, and professionals who share honest, unfiltered experience.",
  },
  {
    title: "Community & Support",
    desc: "Join a network of premed students navigating the same journey. Share experiences, ask questions, grow together.",
  },
] as const;

export const QUESTIONS = [
  "How do I build a strong application?",
  "Do recommendation letters really matter?",
  "How do I keep my GPA up without burning out?",
  "How can I get ahead early?",
  "What extracurriculars actually matter?",
  "How do I find clinical experience?",
  "How should I manage my time as a premed?",
] as const;

export const PILLARS = [
  { label: "No applications", sub: "Walk in. No barriers." },
  { label: "No dues", sub: "Completely free, always." },
  { label: "No interviews", sub: "Open to every student." },
  { label: "Real advice", sub: "Honest, experience-based." },
  { label: "Open access", sub: "Any premed can join." },
  { label: "Student-led", sub: "Built by premeds, for premeds." },
] as const;

// Group offerings into 3 editorial categories. Numerals continue 01–08
// across groups via offset.
export const OFFER_GROUPS = [
  {
    kicker: "Academic foundation",
    titles: ["Coursework Guidance", "Exam Preparation", "Time Management"],
  },
  {
    kicker: "Hands-on experience",
    titles: ["Clinical Experience", "Extracurriculars"],
  },
  {
    kicker: "Application & community",
    titles: [
      "Application Insight",
      "Real Conversations",
      "Community & Support",
    ],
  },
] as const;

// Group pillars into 2 editorial categories.
export const WHY_GROUPS = [
  {
    kicker: "Removed barriers",
    labels: ["No applications", "No dues", "No interviews"],
  },
  {
    kicker: "Our promises",
    labels: ["Real advice", "Open access", "Student-led"],
  },
] as const;

export const ROUTES = [
  { href: "/", label: "About" },
  { href: "/why", label: "Why" },
  { href: "/offer", label: "Offer" },
  { href: "/questions", label: "Questions" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
] as const;
