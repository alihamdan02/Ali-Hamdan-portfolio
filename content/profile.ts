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
    "I’m Ali Hamdan, an AI & Data Engineer in Amman. For three years I’ve built Informatica pipelines, enterprise warehouses and on-premise LLM agents for government teams in Saudi Arabia, including the Ministry of Foreign Affairs, the National Center for Wildlife and Kidana. Now I’m at Petra Ride, building the data behind pricing and dispatch for a ride-hailing marketplace.",
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
    { name: "Petra Ride", short: "Petra", work: "Senior Data Engineer", logo: "/logos/petra-ride.webp", w: 360, h: 160, exp: "exp-petra-ride", more: "Nov 2026 – now" },
    { name: "Elm", short: "Elm", work: "Data Engineer, Kidana", logo: "/logos/elm.webp", w: 404, h: 160, exp: "exp-elm", more: "Jul – Nov 2026" },
    { name: "Tools & Solutions", short: "T&S", work: "AI & Data Engineer", logo: "/logos/tools-solutions.webp", w: 313, h: 160, exp: "exp-tools-solutions", more: "Jan 2025 – Jun 2026" },
    { name: "Optimiza", short: "Optimiza", work: "RLHF & Data Engineer", logo: "/logos/optimiza.webp", w: 719, h: 160, exp: "exp-optimiza", more: "Jun 2023 – Jan 2025" },
  ] as Client[],
  clients: [
    { name: "Ministry of Foreign Affairs", short: "MOFA", work: "On-premise AI classification", logo: "/logos/mofa.webp", w: 159, h: 160, exp: "exp-tools-solutions", more: "Built at T&S" },
    { name: "National Center for Wildlife", short: "NCW", work: "Governance and warehouse", logo: "/logos/ncw.webp", w: 160, h: 160, exp: "exp-tools-solutions", more: "Built at T&S" },
    { name: "Kidana", short: "Kidana", work: "Hajj & Umrah data warehouse", logo: "/logos/kidana.webp", w: 579, h: 160, exp: "exp-elm", more: "Built at Elm" },
    { name: "Awqaf", short: "Awqaf", work: "SAP HR assistant", logo: "/logos/awqaf.webp", w: 342, h: 160, exp: "exp-tools-solutions", more: "Built at T&S" },
  ] as Client[],
};

/** The four NDMO / NDI classification levels, least to most sensitive. */
export const levels = ["Public", "Restricted", "Secret", "Top Secret"] as const;
export type Level = (typeof levels)[number];
