export type Client = { name: string; short: string; work: string; logo: string };

export const profile = {
  name: "Ali Hamdan",
  role: "AI & Data Engineer",
  location: "Amman, Jordan",
  email: "aliihamdan02@gmail.com",
  siteUrl: "https://ali-hamdan-portfolio-seven.vercel.app",
  headline: "Governed data first. Private AI on top.",
  intro:
    "I’m Ali Hamdan, an AI & Data Engineer in Amman. For three years I’ve built Informatica pipelines, enterprise warehouses and on-premise LLM agents for government teams in Saudi Arabia, including the Ministry of Foreign Affairs, the National Center for Wildlife and Kidana.",
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
   * Organisations I have built for. Put a logo file in public/logos/ and set `logo`
   * to show it; without one, a typographic tile is shown instead.
   */
  clients: [
    { name: "Ministry of Foreign Affairs", short: "MOFA", work: "On-premise AI classification", logo: "" },
    { name: "National Center for Wildlife", short: "NCW", work: "Governance and warehouse", logo: "" },
    { name: "Kidana", short: "Kidana", work: "Hajj & Umrah data warehouse", logo: "" },
    { name: "Elm", short: "Elm", work: "Current employer", logo: "" },
    { name: "Awqaf", short: "Awqaf", work: "SAP HR assistant", logo: "" },
  ] as Client[],
};

/** The four NDMO / NDI classification levels, least to most sensitive. */
export const levels = ["Public", "Restricted", "Secret", "Top Secret"] as const;
export type Level = (typeof levels)[number];
