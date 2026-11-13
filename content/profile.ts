export type Client = { name: string; short: string; work: string; logo: string };

export const profile = {
  name: "Ali Hamdan",
  role: "AI & Data Engineer",
  current: "Senior Data Engineer at Petra Ride",
  location: "Amman, Jordan",
  email: "aliihamdan02@gmail.com",
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
    { name: "Petra Ride", short: "Petra", work: "Senior Data Engineer, now", logo: "" },
    { name: "Elm", short: "Elm", work: "Data Engineer, Kidana", logo: "" },
    { name: "Tools & Solutions", short: "T&S", work: "AI & Data Engineer", logo: "" },
    { name: "Optimiza", short: "Optimiza", work: "RLHF & Data Engineer", logo: "" },
  ] as Client[],
  clients: [
    { name: "Ministry of Foreign Affairs", short: "MOFA", work: "On-premise AI classification", logo: "" },
    { name: "National Center for Wildlife", short: "NCW", work: "Governance and warehouse", logo: "" },
    { name: "Kidana", short: "Kidana", work: "Hajj & Umrah data warehouse", logo: "" },
    { name: "Awqaf", short: "Awqaf", work: "SAP HR assistant", logo: "" },
  ] as Client[],
};

/** The four NDMO / NDI classification levels, least to most sensitive. */
export const levels = ["Public", "Restricted", "Secret", "Top Secret"] as const;
export type Level = (typeof levels)[number];
