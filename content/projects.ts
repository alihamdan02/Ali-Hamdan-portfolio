export type Discipline = "AI" | "Data";

export type Stage = {
  /** Column heading in the architecture diagram, e.g. "Sources". */
  label: string;
  nodes: string[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  disciplines: Discipline[];
  role: string;
  /** One sentence shown in the work list. */
  summary: string;
  problem: string;
  built: string[];
  results: { value: string; label: string }[];
  architecture: Stage[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "mofa-data-classification",
    title: "On-premise data classification for a foreign ministry",
    client: "Ministry of Foreign Affairs",
    year: "2025",
    disciplines: ["AI", "Data"],
    role: "AI Engineer, Tools & Solutions",
    summary:
      "Three local LLM agents that label every table, column and row against NDMO levels, without a byte leaving the ministry.",
    problem:
      "The ministry had to classify data across 10 enterprise systems and more than 6 million records under NDMO and NDI rules. Doing it by hand meant analysts reading schemas column by column, and sending the data to a cloud model was not an option.",
    built: [
      "Deployed gpt-oss-20b through Ollama on the ministry’s own servers, so every prompt and every record stayed inside their infrastructure.",
      "Built a table agent that profiles each system, writes structured metadata and identifies master and reference entities.",
      "Built a column agent that infers business meaning and proposes data quality rules that analysts used to write manually.",
      "Built a compliance agent that assigns Top Secret, Secret, Restricted or Public at table, schema, column and row level.",
      "Grounded all three agents with RAG over the ministry’s own glossaries and policies, and served them through FastAPI in Docker.",
    ],
    results: [
      { value: "92%", label: "agreement with expert reviewers on sampled classifications" },
      { value: "70%", label: "less manual classification and governance work" },
      { value: "6M+", label: "records across 10 enterprise systems" },
    ],
    architecture: [
      { label: "Sources", nodes: ["Oracle", "10 enterprise systems", "Policy documents"] },
      { label: "Profiling", nodes: ["Informatica IDMC", "Schema reader"] },
      { label: "Agents", nodes: ["Table agent", "Column agent", "Compliance agent"] },
      { label: "Model", nodes: ["gpt-oss-20b on Ollama", "RAG context"] },
      { label: "Output", nodes: ["Classified catalog", "DQ rule proposals"] },
    ],
    stack: ["gpt-oss-20b", "Ollama", "RAG", "Python", "FastAPI", "Docker", "Oracle", "Informatica IDMC"],
  },
  {
    slug: "kidana-hajj-umrah-warehouse",
    title: "Hajj & Umrah data warehouse on Informatica IDMC",
    client: "Kidana, through Elm",
    year: "2026",
    disciplines: ["Data"],
    role: "Data Engineer, Elm",
    summary:
      "End-to-end pipelines from SAP, APIs and files into a SQL Server warehouse that feeds Power BI and Kidana’s AI agents.",
    problem:
      "Kidana runs Hajj and Umrah operations on dozens of source systems, SAP among them. Reporting depended on manual extracts, full reloads strained production, and the AI team needed clean, current data to ground its agents on.",
    built: [
      "Built ingestion from SAP, REST APIs and flat files into a staging layer with Informatica Cloud Data Integration.",
      "Modelled the warehouse in SQL Server as facts and dimensions, with Slowly Changing Dimensions to keep history.",
      "Replaced full reloads with incremental loads that only move new and changed records.",
      "Ran data profiling and data quality rules, and reconciled counts across source, staging and warehouse before anything reached a report.",
      "Orchestrated it all as IDMC taskflows that notify the team on every pass and every failure.",
      "Registered datasets in the data catalog and documented each pipeline from source to target.",
    ],
    results: [
      { value: "Incremental", label: "loads instead of nightly full reloads" },
      { value: "3 layers", label: "reconciled: source, staging and warehouse" },
      { value: "1 source", label: "of truth for Power BI and the AI team" },
    ],
    architecture: [
      { label: "Sources", nodes: ["SAP", "REST APIs", "Flat files"] },
      { label: "Staging", nodes: ["IDMC / CDI mappings", "Profiling", "DQ rules"] },
      { label: "Warehouse", nodes: ["SQL Server", "Facts & dimensions", "SCD history"] },
      { label: "Orchestration", nodes: ["Taskflows", "Pass / fail alerts"] },
      { label: "Consumers", nodes: ["Power BI", "AI agents", "Data catalog"] },
    ],
    stack: ["Informatica IDMC", "CDI", "SAP", "SQL Server", "SCD", "Incremental loading", "Data quality", "Power BI"],
  },
  {
    slug: "ncw-data-governance",
    title: "Data governance and warehouse for a national wildlife center",
    client: "National Center for Wildlife",
    year: "2025",
    disciplines: ["Data", "AI"],
    role: "Data & AI consultant, Tools & Solutions",
    summary:
      "Governance plans, data quality and classification, a metadata extraction agent, and the center’s first data warehouse.",
    problem:
      "The center needed to meet NDMO and NDI requirements but had no inventory of what data it held, how sensitive it was or how reliable it was. Reporting pulled straight from operational systems.",
    built: [
      "Advised the center on its data governance program and wrote the plans for quality, classification and ownership.",
      "Built a metadata extractor that reads every schema, table and column and drafts business descriptions and an Arabic classification for each.",
      "Defined data quality rules and profiled the core systems against them.",
      "Designed and built the center’s data warehouse with Informatica so reporting no longer hits operational systems.",
    ],
    results: [
      { value: "NDMO", label: "and NDI aligned governance plan" },
      { value: "4 levels", label: "of classification applied column by column" },
      { value: "1st", label: "data warehouse for the center" },
    ],
    architecture: [
      { label: "Sources", nodes: ["Operational DBs", "Business owners"] },
      { label: "Discovery", nodes: ["Metadata extractor", "Profiling"] },
      { label: "Governance", nodes: ["Classification", "DQ rules", "Ownership plan"] },
      { label: "Warehouse", nodes: ["Informatica", "Data warehouse"] },
    ],
    stack: ["Informatica", "Python", "LLMs", "Data governance", "Data quality", "NDMO / NDI", "Data warehousing"],
  },
  {
    slug: "text-to-sql-analytics",
    title: "Arabic and English questions in, SQL and charts out",
    client: "Optimiza",
    year: "2024",
    disciplines: ["AI"],
    role: "AI Engineer, Optimiza",
    summary:
      "Four cooperating agents that turn a question in either language into a checked SQL query and the right chart.",
    problem:
      "Business users wanted answers from relational data without writing SQL, in Arabic as often as English. A single prompt to an LLM produced queries against columns that didn’t exist.",
    built: [
      "Split the job across four agents: a conversation manager, a schema analyst, a SQL engineer and a visualisation expert.",
      "Gave the SQL engineer only the tables and relationships the schema analyst found relevant, which stopped it inventing columns.",
      "Added Arabic and English handling with grammar correction before intent detection.",
      "Let the visualisation agent pick the chart from the shape of the result and render it with Plotly and Dash.",
    ],
    results: [
      { value: "4", label: "specialised agents in one pipeline" },
      { value: "2", label: "languages, Arabic and English" },
      { value: "Schema-aware", label: "SQL generation over relational data" },
    ],
    architecture: [
      { label: "Input", nodes: ["Arabic / English question"] },
      { label: "Agents", nodes: ["Conversation manager", "Schema analyst", "SQL engineer", "Visualisation expert"] },
      { label: "Data", nodes: ["MySQL"] },
      { label: "Output", nodes: ["Table", "Plotly chart"] },
    ],
    stack: ["OpenAI API", "Multi-agent", "FastAPI", "MySQL", "Pandas", "Plotly / Dash"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
