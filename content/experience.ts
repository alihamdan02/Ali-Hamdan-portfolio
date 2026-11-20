export const experience = [
  {
    id: "exp-petra-ride",
    projects: [] as string[],
    company: "Petra Ride",
    title: "Senior Data Engineer, Pricing & Dispatch Intelligence",
    period: "Nov 2026 – now",
    detail:
      "Building the AWS lakehouse on S3, Glue, Redshift and Athena that brings trip, dispatch, pricing and location data into one place, and the data foundation for pricing and dispatch that adapt to demand instead of being configured by hand.",
  },
  {
    id: "exp-elm",
    projects: ["kidana-hajj-umrah-warehouse"],
    company: "Elm",
    title: "Data Engineer, AI Data Enablement",
    period: "Jul – Nov 2026",
    detail:
      "On Kidana’s Hajj & Umrah transformation. I own Informatica IDMC pipelines from SAP and other sources into the warehouse, and prepare the governed data Kidana’s AI team grounds its agents on.",
  },
  {
    id: "exp-tools-solutions",
    projects: ["mofa-data-classification", "ncw-data-governance", "awqaf-hr-assistant", "darah-data-quality-compliance"],
    company: "Tools & Solutions",
    title: "AI & Data Engineer",
    period: "Jan 2025 – Jun 2026",
    detail:
      "Built on-premise LLM agents and Informatica pipelines for Saudi government clients, including MOFA and NCW, and built Informatica data quality and profiling, NDMO / NDI compliance evidence and governance plans for Darah. Classification, metadata extraction, data quality and medallion warehouses.",
  },
  {
    id: "exp-unlimited-innovation",
    projects: ["document-intelligence", "ai-applicant-tracking", "sitechat"],
    company: "Unlimited Innovation",
    title: "Freelance AI Engineer",
    period: "2026, freelance",
    detail:
      "Freelance AI projects delivered to clients: document classification for a Saudi government entity, an applicant tracking system that reads CVs, and a website chat that keeps itself up to date.",
  },
  {
    id: "exp-optimiza",
    projects: ["text-to-sql-analytics"],
    company: "Optimiza",
    title: "RLHF & Data Engineer",
    period: "Jun 2023 – Jan 2025",
    detail:
      "Curated training and evaluation data for LLMs, ran structured evaluations to find hallucination and alignment failures, and prepared data for AI classification feeding an NDMO governance platform.",
  },
];

export const education = {
  school: "Tafila Technical University",
  degree: "B.Sc. Artificial Intelligence and Data Science",
  period: "2020 – 2024",
  note: "Ranked first in my graduating class. GPA 3.5 / 4.0.",
};

/** Badges are the issuers' own badge images; each links to its public verification page. */
export const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
    badge: "/badges/aws.webp",
    url: "https://www.credly.com/badges/22bc8dbc-ff6b-461c-a01f-893707897200",
  },
  {
    name: "Cloudera AI Technical Professional",
    issuer: "Cloudera",
    year: "2025",
    badge: "/badges/cloudera.webp",
    url: "https://www.credly.com/badges/672c14d2-71a7-45e2-8a1e-9ac16de6c252",
  },
  {
    name: "Generative AI Fundamentals",
    issuer: "Databricks",
    year: "2025",
    badge: "/badges/databricks.webp",
    url: "https://credentials.databricks.com/812f267d-76c2-4995-9fa7-c563b2588259",
  },
  {
    name: "Alteryx Designer Core",
    issuer: "Alteryx",
    year: "2025",
    badge: "/badges/alteryx.webp",
    url: "https://www.credly.com/badges/98599ab0-e33c-4f43-bfe5-d1e23ff2b6b5",
  },
];

/** The path data takes, and what I do at each step. A real sequence, so it is numbered. */
export const pipeline = [
  {
    stage: "Source",
    does: "Land data from SAP, Oracle, REST APIs and files in S3 without hurting production.",
    tools: ["AWS S3", "Informatica IDMC", "REST APIs", "Python"],
  },
  {
    stage: "Stage",
    does: "Profile, validate and reconcile before anything is trusted.",
    tools: ["AWS Glue", "Informatica IDQ", "DQ rules", "SQL"],
  },
  {
    stage: "Warehouse",
    does: "Model facts and dimensions, keep history, load incrementally, query the lake in place.",
    tools: ["Amazon Redshift", "Amazon Athena", "SQL Server", "PostgreSQL", "Medallion"],
  },
  {
    stage: "Govern",
    does: "Classify, catalog and document to NDMO and NDI standards.",
    tools: ["Classification", "Metadata", "Data catalog"],
  },
  {
    stage: "Reason",
    does: "Serve the governed data: Power BI for reporting, and private LLM agents that answer from it.",
    tools: ["Power BI", "LLMs", "RAG", "LangGraph", "Ollama", "FastAPI", "Docker"],
  },
];
