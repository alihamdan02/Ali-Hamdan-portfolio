export type Client = {
  name: string;
  short: string;
  work: string;
  logo: string;
  /** Intrinsic size of the logo file, so the browser reserves its space. */
  w: number;
  h: number;
  dark?: boolean;
  /** Id of the related Experience entry the tile scrolls to. */
  exp: string;
  /** Shown on hover. */
  more: string;
  /** Element id the 3D logo ring jumps to: an Experience entry or a project card. */
  target: string;
};

export const profile = {
  name: "Ali Hamdan",
  role: "AI & Data Engineer",
  current: "Senior Data Engineer at Petra Ride",
  location: "Amman, Jordan",
  email: "aliihamdan02@gmail.com",
  /** Split so the number is not sitting in the page source for scrapers; joined in the browser. */
  whatsapp: ["962", "7996", "61576"],
  siteUrl: "https://ali-hamdan-portfolio-seven.vercel.app",
  headline: "Governed data first. Private AI on top.",
  intro:
    "I build the pipelines, warehouses and governance underneath AI, then put private LLM agents on top. Three years shipping for government teams in Saudi Arabia, now building the AWS lakehouse behind pricing and dispatch at Petra Ride.",
  /** AWS services in daily use at Petra Ride. Shown first wherever the stack appears. */
  aws: ["S3", "Glue", "Redshift", "Athena"],
  cv: {
    ai: "/cv/ali-hamdan-ai-engineer-cv.pdf",
    data: "/cv/ali-hamdan-data-engineer-cv.pdf",
  },
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ali-hamdan-a6678a25a/" },
    { label: "GitHub", href: "https://github.com/alihamdan02" },
    { label: "Hugging Face", href: "https://huggingface.co/alihamdan02" },
  ],
  /**
   * Logos: drop a file in public/logos/ and set `logo` to its path, e.g. "/logos/elm.svg".
   * Without one, a typographic tile is shown.
   */
  employers: [
    { name: "Petra Ride", short: "Petra", work: "Senior Data Engineer", logo: "/logos/petra-ride.webp", w: 360, h: 160, exp: "exp-petra-ride", more: "Nov 2026 – now", target: "exp-petra-ride" },
    { name: "Elm", short: "Elm", work: "Data Engineer, Kidana", logo: "/logos/elm.webp", w: 404, h: 160, exp: "exp-elm", more: "Jul – Nov 2026", target: "exp-elm" },
    { name: "Tools & Solutions", short: "T&S", work: "AI & Data Engineer", logo: "/logos/tools-solutions.webp", w: 313, h: 160, exp: "exp-tools-solutions", more: "Jan 2025 – Jun 2026", target: "exp-tools-solutions" },
    { name: "Unlimited Innovation", short: "Unlimited Innovation", work: "Freelance AI Engineer", logo: "/logos/unlimited-innovation.webp", w: 302, h: 146, exp: "exp-unlimited-innovation", more: "Freelance, 2026", target: "exp-unlimited-innovation" },
    { name: "Optimiza", short: "Optimiza", work: "RLHF & Data Engineer", logo: "/logos/optimiza.webp", w: 719, h: 160, exp: "exp-optimiza", more: "Jun 2023 – Jan 2025", target: "exp-optimiza" },
  ] as Client[],
  clients: [
    { name: "Ministry of Foreign Affairs", short: "MOFA", work: "On-premise AI classification", logo: "/logos/mofa.webp", w: 159, h: 160, exp: "exp-tools-solutions", more: "Built at T&S", target: "p-mofa-data-classification" },
    { name: "National Center for Wildlife", short: "NCW", work: "Governance and warehouse", logo: "/logos/ncw.webp", w: 160, h: 160, exp: "exp-tools-solutions", more: "Built at T&S", target: "p-ncw-data-governance" },
    { name: "King Abdulaziz Foundation for Research and Archives", short: "Darah", work: "Data quality & NDMO / NDI consulting", logo: "/logos/darah.webp", w: 283, h: 379, exp: "exp-tools-solutions", more: "Built at T&S", target: "p-darah-data-quality-compliance" },
    { name: "Kidana", short: "Kidana", work: "Hajj & Umrah data warehouse", logo: "/logos/kidana.webp", w: 579, h: 160, exp: "exp-elm", more: "Built at Elm", target: "p-kidana-hajj-umrah-warehouse" },
    { name: "Awqaf", short: "Awqaf", work: "SAP HR assistant", logo: "/logos/awqaf.webp", w: 342, h: 160, exp: "exp-tools-solutions", more: "Built at T&S", target: "p-awqaf-hr-assistant" },
  ] as Client[],
};

/** The four NDMO / NDI classification levels, least to most sensitive. */
export const levels = ["Public", "Restricted", "Secret", "Top Secret"] as const;
export type Level = (typeof levels)[number];

/**
 * Engagements without a full case study yet. Shown as cards in Selected work.
 * Add a case study in content/projects.ts when the details are ready to publish.
 */
export const engagements: {
  id: string;
  title: string;
  summary: string;
  client: string;
  logo: string;
  meta: string;
  label: string;
}[] = [];

/** What people can hire me for outside my day job. `topic` pre-selects the contact form. */
export const services = [
  {
    topic: "consulting",
    kicker: "Consulting",
    title: "Data governance & AI readiness",
    pitch: "For teams that need to meet NDMO and NDI, or want to know if their data is ready for AI.",
    points: ["NDMO / NDI gap assessment and roadmap", "Data classification and catalog setup", "Data quality profiling and rules (Informatica IDQ)", "AI readiness review before you build"],
    tags: ["NDMO", "NDI", "IDQ"],
    cta: "Ask for a consultation",
  },
  {
    topic: "freelance",
    kicker: "Freelance",
    title: "Pipelines, warehouses & private AI agents",
    pitch: "Scoped builds with a clear handover: you own the code, the docs and the runbook.",
    points: ["AWS pipelines on S3, Glue, Redshift and Athena", "Informatica IDMC and IDQ", "Warehouse and lakehouse modelling",
      "Power BI dashboards on governed data", "RAG and agents on your own servers"],
    tags: ["AWS", "Power BI", "LangGraph"],
    cta: "Start a project",
  },
  {
    topic: "research",
    kicker: "Research",
    title: "Research & collaboration",
    pitch: "Open to joint work with universities, labs and teams on applied problems.",
    points: ["LLM evaluation and hallucination testing", "Arabic NLP and Arabic text-to-SQL", "Automated data classification", "Talks and workshops on governed AI"],
    tags: ["LLM eval", "Arabic NLP"],
    cta: "Propose a collaboration",
  },
] as const;

export type Topic = "consulting" | "freelance" | "research" | "role" | "hi";
export const topics: { value: Topic; label: string; prompt: string; example: string }[] = [
  { value: "consulting", label: "Consulting", prompt: "What do you need advice on?", example: "e.g. We need to meet NDMO before Q2 and don’t know where our gaps are" },
  { value: "freelance", label: "Freelance project", prompt: "Tell me about the project", example: "e.g. Move our SAP data into an AWS lakehouse and put a RAG assistant on top" },
  { value: "research", label: "Research", prompt: "What would we research together?", example: "e.g. Evaluating Arabic text-to-SQL models on government schemas" },
  { value: "role", label: "Full-time role", prompt: "Tell me about the role", example: "e.g. Senior data engineer, data platform team" },
  { value: "hi", label: "Just saying hi", prompt: "Say hello", example: "Anything on your mind" },
];
