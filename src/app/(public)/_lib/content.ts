/**
 * Home page list content. Headlines with inline accents live in their section
 * components; repeated items live here so they can feed both UI and JSON-LD.
 *
 * Values not yet confirmed for launch are `null`, and the UI omits them rather
 * than showing bracketed placeholders.
 */

export const watchedSources = [
  "Google Ads",
  "Meta",
  "GA4",
  "Shopify",
  "UX audits",
  "Mobile site audits",
  "Account audits",
  "Your creatives",
  "Competitor creatives",
] as const;

/** Chips that orbit the hero eye. */
export const heroOrbitLabels = [
  "Google Ads",
  "Meta",
  "GA4",
  "Shopify",
  "UX audits",
  "Competitor creatives",
] as const;

export const hierarchyLevels = [
  "Brand",
  "Channel",
  "Account",
  "Campaign",
  "Ad set",
] as const;

export type ProblemCard = {
  source: string;
  title: string;
  tone: "white" | "ink" | "gold";
  /** Where the card starts before it converges into the grid. */
  scatter: { x: number; y: number; rotate: number };
};

export const problemCards: readonly ProblemCard[] = [
  {
    source: "Meta",
    title: "Spend",
    tone: "white",
    scatter: { x: -340, y: -150, rotate: -14 },
  },
  {
    source: "Shopify",
    title: "Outcomes",
    tone: "ink",
    scatter: { x: 300, y: -230, rotate: 12 },
  },
  {
    source: "GA4",
    title: "Intent",
    tone: "gold",
    scatter: { x: -260, y: 250, rotate: 9 },
  },
  {
    source: "Last month's deck",
    title: "Creative performance",
    tone: "white",
    scatter: { x: 360, y: 180, rotate: -10 },
  },
];

export type ProductModuleId =
  "ask" | "audits" | "creative" | "analytics" | "decisions";

export type ProductModule = {
  id: ProductModuleId;
  title: string;
  description: string;
};

export const productModules: readonly ProductModule[] = [
  {
    id: "ask",
    title: "Ask Yamin",
    description: "Ask any question about your accounts in plain language.",
  },
  {
    id: "audits",
    title: "Audits",
    description:
      "UX, mobile site and account audits, running continuously, with full detail.",
  },
  {
    id: "creative",
    title: "Creative Intelligence",
    description: "What's working in your creatives and your competitors'.",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "KPIs across Google Ads, Meta, GA4 and Shopify, in one place.",
  },
  {
    id: "decisions",
    title: "Decisions",
    description:
      "Every recommendation Yamin surfaces, ready to approve or dig into.",
  },
];

export const howSteps = [
  {
    title: "Connect",
    description: "Google Ads, Meta, GA4 and Shopify, in one place.",
  },
  {
    title: "Yamin reads",
    description: "It catches what changed and explains why.",
  },
  {
    title: "You decide",
    description:
      "The decision lands in front of you, ready to approve or dig into.",
  },
] as const;

/** Set `src` once the product walkthrough video exists. */
export const walkthroughVideo: { src: string | null } = { src: null };

export const yaminDoes = [
  "Audits",
  "Attributes",
  "Flags",
  "Recommends",
] as const;
export const teamDoes = ["Approves", "Shifts budget", "Launches"] as const;

/** Each letter drifts at its own speed (px across the scene). */
export const nameLetters = [
  { char: "a", drift: -320 },
  { char: "n", drift: 180 },
  { char: "t", drift: -120 },
  { char: "a", drift: 260 },
  { char: "r", drift: -220 },
  { char: "y", drift: 140 },
  { char: "ā", drift: 0, isAccent: true },
  { char: "m", drift: -160 },
  { char: "i", drift: 240 },
  { char: "n", drift: -280 },
] as const;

export type ProofStat = {
  label: string;
  value: string;
  detail: string;
  tone: "white" | "ink";
};

/** Counted client results. The section stays hidden until at least one exists. */
export const proofStats: readonly ProofStat[] = [];

export type Price = { amount: string; period: string };

export type Plan = {
  id: "audit" | "growth" | "scale";
  name: string;
  /** Fixed headline price, or per-period prices that drive the billing toggle. */
  price:
    | { kind: "fixed"; label: string }
    | { kind: "billed"; monthly: Price | null; yearly: Price | null };
  description: string;
  features: readonly string[];
  cta: { label: string; href: string };
  isRecommended?: boolean;
};

export const plans: readonly Plan[] = [
  {
    id: "audit",
    name: "Audit",
    price: { kind: "fixed", label: "Free" },
    description:
      "See what your marketing already knows, before you commit to anything.",
    features: ["UX audit", "Mobile site audit", "Account audit"],
    cta: { label: "Run a free audit", href: "#audit" },
  },
  {
    id: "growth",
    name: "Growth",
    // Prices are not confirmed yet; the card shows "On request" until they are.
    price: { kind: "billed", monthly: null, yearly: null },
    description:
      "Every channel, audit and creative in one place, read continuously.",
    features: [
      "Ask Yamin, in plain language",
      "Continuous UX, mobile site and account audits",
      "Analytics across Google Ads, Meta, GA4 and Shopify",
      "Decisions, ready to approve or dig into",
    ],
    cta: { label: "Book a walkthrough", href: "#walkthrough" },
    isRecommended: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: { kind: "fixed", label: "Custom" },
    description: "For teams running several brands, accounts or markets.",
    features: [
      "Everything in Growth",
      "Creative Intelligence: yours and competitors'",
      "Multiple brands and accounts",
    ],
    cta: { label: "Talk to us", href: "#walkthrough" },
  },
];

export const faqs = [
  {
    question: "Does Yamin change my campaigns?",
    answer:
      "No. Yamin audits, attributes, flags and recommends. Budget shifts and launches stay with your team.",
  },
  {
    question: "Which platforms does it read?",
    answer:
      "Google Ads, Meta, GA4 and Shopify, alongside your UX, mobile site and account audits and your creatives.",
  },
  {
    question: "What does the free audit include?",
    answer: "UX, mobile site and account checks.",
  },
] as const;
