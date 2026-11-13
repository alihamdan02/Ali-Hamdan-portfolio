export const experience = [
  {
    company: "Elm",
    title: "Data Engineer, AI Data Enablement",
    period: "Jul 2026 – now",
    detail:
      "On Kidana’s Hajj & Umrah transformation. I own Informatica IDMC pipelines from SAP and other sources into the warehouse, and prepare the governed data Kidana’s AI team grounds its agents on.",
  },
  {
    company: "Tools & Solutions",
    title: "AI & Data Engineer",
    period: "Jan 2025 – Jun 2026",
    detail:
      "Built on-premise LLM agents and Informatica pipelines for Saudi government clients, including MOFA and NCW. Classification, metadata extraction, data quality and medallion warehouses.",
  },
  {
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

export const certifications = [
  { name: "Cloudera AI Technical Professional", issuer: "Cloudera", year: "2025" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2025" },
  { name: "Generative AI Fundamentals", issuer: "Databricks", year: "2025" },
  { name: "Alteryx Designer Core", issuer: "Alteryx", year: "2025" },
];

/** The path data takes, and what I do at each step. A real sequence, so it is numbered. */
export const pipeline = [
  {
    stage: "Source",
    does: "Pull from SAP, Oracle, REST APIs and files without hurting production.",
    tools: ["Informatica IDMC", "CDI", "REST APIs", "Python"],
  },
  {
    stage: "Stage",
    does: "Profile, validate and reconcile before anything is trusted.",
    tools: ["Data profiling", "DQ rules", "SQL"],
  },
  {
    stage: "Warehouse",
    does: "Model facts and dimensions, keep history, load incrementally.",
    tools: ["SQL Server", "Oracle", "PostgreSQL", "SCD", "Medallion"],
  },
  {
    stage: "Govern",
    does: "Classify, catalog and document to NDMO and NDI standards.",
    tools: ["Classification", "Metadata", "Data catalog"],
  },
  {
    stage: "Reason",
    does: "Put private LLM agents on top that answer from the governed data.",
    tools: ["LLMs", "RAG", "LangGraph", "Ollama", "FastAPI", "Docker"],
  },
];
