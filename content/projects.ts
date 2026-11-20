export type Discipline = "AI" | "Data";

export type Stage = {
  /** Column heading in the architecture diagram, e.g. "Sources". */
  label: string;
  nodes: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** Short name used in chips, e.g. under Experience. */
  short: string;
  client: string;
  year: string;
  disciplines: Discipline[];
  role: string;
  /** How long it took, e.g. "5+ months". */
  duration?: string;
  /** One sentence shown in the work list. */
  summary: string;
  problem: string;
  built: string[];
  results: { value: string; label: string }[];
  architecture: Stage[];
  stack: string[];
  /** The hard parts, and how they were handled. Shown as its own section. */
  challenges?: { title: string; detail: string }[];
  /** Recognition from the client, stated plainly. */
  recognition?: string;
};

export const projects: Project[] = [
  {
    slug: "mofa-data-classification",
    short: "MOFA classification",
    title: "On-premise data classification for a foreign ministry",
    client: "Ministry of Foreign Affairs",
    year: "2025 – 2026",
    disciplines: ["AI", "Data"],
    role: "AI Engineer, sole engineer on the project, Tools & Solutions",
    duration: "5+ months",
    summary:
      "An on-premise tool where local LLM agents classify the ministry’s data as Top Secret, Secret, Restricted or Public, from whole systems down to single rows, with a written reason for every label.",
    problem:
      "To meet NDMO and NDI data classification requirements, the ministry had to label all of its data as Top Secret, Secret, Restricted or Public. That data lives in more than 10 systems, which stay unnamed here, and adds up to more than 6 million records. Classifying it by hand was not realistic, and sending it to a cloud model was not an option.",
    built: [
      "Deployed gpt-oss-20b through Ollama on the ministry’s own servers, so every prompt and every record stayed inside their infrastructure.",
      "Built a table agent that profiles each system, writes structured metadata and identifies master and reference entities.",
      "Built a column agent that infers business meaning and proposes data quality rules that analysts used to write manually.",
      "Built a compliance agent that assigns Top Secret, Secret, Restricted or Public at system, database, schema, column and row level, with a written justification and a confidence score for every label.",
      "Built a review screen where analysts see each label with its justification and confidence, then edit it or approve it.",
      "Grounded all three agents with RAG over the ministry’s own glossaries and policies, and served them through FastAPI in Docker.",
    ],
    challenges: [
      {
        title: "Five levels, not one",
        detail: "A label was needed for every system, database, schema, column and row, and the levels had to agree. They roll up by the strictest rule: a table takes the highest label among its columns and rows, a schema the highest among its tables, and so on up to the whole system.",
      },
      {
        title: "Every label has to explain itself",
        detail: "Reviewers needed to know why something was marked Secret rather than Restricted. Each label comes with a justification and a confidence score, and analysts check, edit or approve it in the review screen.",
      },
      {
        title: "Nothing leaves the building",
        detail: "Classified government data could not go to a cloud API, so the model, the retrieval and the agents all run on the ministry’s own servers.",
      },
    ],
    recognition: "Adopted by the ministry as its data classification tool, with formal thanks for the work.",
    results: [
      { value: "92%+", label: "accuracy against expert review, across the full dataset" },
      { value: "70%+", label: "less analyst time, and fewer days, spent on classification" },
      { value: "6M+", label: "records across 10+ systems" },
    ],
    architecture: [
      { label: "Sources", nodes: ["10+ systems", "Oracle", "Policy documents"] },
      { label: "Profiling", nodes: ["Informatica IDMC", "Schema reader"] },
      { label: "Agents", nodes: ["Table agent", "Column agent", "Compliance agent"] },
      { label: "Model", nodes: ["gpt-oss-20b on Ollama", "RAG context"] },
      { label: "Output", nodes: ["Labels on 5 levels", "Justification + confidence", "Analyst review screen"] },
    ],
    stack: ["gpt-oss-20b", "Ollama", "RAG", "Python", "FastAPI", "Docker", "Oracle", "Informatica IDMC"],
  },
  {
    slug: "kidana-hajj-umrah-warehouse",
    short: "Kidana warehouse",
    title: "Hajj & Umrah data warehouse on Informatica IDMC",
    client: "Kidana, through Elm",
    year: "2026",
    disciplines: ["Data"],
    role: "Data Engineer on the Elm team",
    duration: "7 months",
    summary:
      "Kidana’s first data warehouse: 8+ systems, from SAP Ariba and SuccessFactors to Maximo and Tasleem, brought into SQL Server through Informatica and connected to Power BI.",
    problem:
      "Kidana runs Hajj and Umrah operations on more than 8 systems, including SAP Ariba, SAP SuccessFactors, Maximo, supply chain, finance, IT Power, Tasleem and MOHU, with no data warehouse across them. Reporting depended on manual extracts, full reloads strained production, and the AI team needed clean, current data to ground its agents on.",
    built: [
      "Built ingestion from 8+ systems, SAP among them, through REST APIs and flat files into a staging layer with Informatica Cloud Data Integration.",
      "Modelled 100+ tables in SQL Server as facts and dimensions, with SCD Type 2 to keep the full history of every change.",
      "Replaced full reloads with incremental loads that only move new and changed records.",
      "Ran data profiling and data quality rules, and reconciled counts across source, staging and warehouse.",
      "Validated the numbers twice: first within the team, then with the business owners of each system, so every figure in Power BI was confirmed correct before release.",
      "Connected the warehouse to Power BI, and orchestrated everything as IDMC taskflows that notify the team on every pass and every failure.",
      "Documented every source system and every pipeline, and registered the datasets in the data catalog.",
    ],
    challenges: [
      {
        title: "Many systems, one model",
        detail: "Each of the 8+ systems describes the business its own way. The hard part was a single data model, facts and dimensions that every system maps into correctly, instead of one warehouse per source.",
      },
      {
        title: "Many kinds of source",
        detail: "SAP modules, APIs and files each need different handling. All of them had to be engineered in Informatica Data Integration so they land in staging in the same shape and on the same schedule.",
      },
      {
        title: "Parameters into API calls",
        detail: "Several systems only answer through REST APIs that expect parameters on each call. Passing those parameters from Informatica into the API requests was its own piece of engineering.",
      },
    ],
    results: [
      { value: "8+", label: "systems in one warehouse, where there was none" },
      { value: "100+", label: "tables modelled, with SCD Type 2 history" },
      { value: "1 source", label: "of truth for Power BI and the AI team, validated with the business" },
    ],
    architecture: [
      { label: "Sources", nodes: ["SAP Ariba, SuccessFactors", "Maximo, Tasleem, MOHU", "REST APIs, files"] },
      { label: "Staging", nodes: ["IDMC / CDI mappings", "API parameters", "Profiling, DQ rules"] },
      { label: "Warehouse", nodes: ["SQL Server, 100+ tables", "Facts & dimensions", "SCD Type 2"] },
      { label: "Orchestration", nodes: ["Taskflows", "Pass / fail alerts"] },
      { label: "Consumers", nodes: ["Power BI", "AI agents", "Data catalog"] },
    ],
    stack: ["Informatica IDMC", "CDI", "SAP Ariba", "SAP SuccessFactors", "Maximo", "REST APIs", "SQL Server", "SCD Type 2", "Incremental loading", "Data quality", "Data validation", "Power BI"],
  },
  {
    slug: "ncw-data-governance",
    short: "NCW governance",
    title: "Data governance and warehouse for a national wildlife center",
    client: "National Center for Wildlife",
    year: "2025",
    disciplines: ["Data", "AI"],
    role: "Data & AI consultant on the Tools & Solutions team",
    duration: "About a year",
    summary:
      "Governance plans, data quality and classification, a metadata extraction agent, and the center’s first data warehouse.",
    problem:
      "The center needed to meet NDMO and NDI requirements across 7+ systems, but had no inventory of what data it held, how sensitive it was or how reliable it was, and nothing yet to show an auditor. Reporting pulled straight from operational systems.",
    built: [
      "Advised the center on its data governance program and wrote the plans for quality, classification and ownership.",
      "Built an on-premise metadata extractor, running on a local model, that reads every schema, table and column across 7+ systems and drafts business descriptions and an Arabic classification for each.",
      "Defined data quality rules and profiled the core systems against them.",
      "Built the compliance evidence for two NDMO domains, data quality and data classification, in one month after a request that came without notice.",
      "Designed and built the center’s data warehouse with Informatica so reporting no longer hits operational systems.",
    ],
    results: [
      { value: "2 domains", label: "with NDMO evidence: data quality and classification" },
      { value: "1 month", label: "to build that evidence, on no notice" },
      { value: "1st", label: "data warehouse for the center" },
    ],
    architecture: [
      { label: "Sources", nodes: ["Operational DBs", "Business owners"] },
      { label: "Discovery", nodes: ["Metadata extractor", "Profiling"] },
      { label: "Governance", nodes: ["Classification", "DQ rules", "Ownership plan"] },
      { label: "Warehouse", nodes: ["Informatica", "Data warehouse"] },
    ],
    challenges: [
      {
        title: "Evidence, not just plans",
        detail: "NDMO asks for proof. The evidence for two domains, data quality and data classification, was requested suddenly and without notice, and the team built it in one month so the center could show compliance rather than describe it.",
      },
      {
        title: "No inventory to start from",
        detail: "Nobody had a full list of what the 7+ systems held. The metadata extractor drafted it, schema by schema and column by column, so the team reviewed instead of writing from scratch.",
      },
    ],
    recognition: "The center’s team sent a letter of thanks for the data quality and classification evidence.",
    stack: ["Informatica", "Python", "LLMs", "Data governance", "Data quality", "NDMO / NDI", "Data warehousing"],
  },
  {
    slug: "awqaf-hr-assistant",
    short: "Awqaf HR assistant",
    title: "An HR assistant that talks to SAP SuccessFactors",
    client: "Awqaf, proof of concept",
    year: "2026",
    disciplines: ["AI"],
    role: "AI Engineer, sole engineer on the project, Tools & Solutions",
    duration: "2 months",
    summary:
      "An AI agent on top of Awqaf’s SAP SuccessFactors. Employees ask in Arabic or English, the agent reads, creates and updates SuccessFactors records over OData, with their own credentials.",
    problem:
      "Checking a leave balance or the status of a time-off request meant logging into SuccessFactors and digging through screens, and every task was done by hand. Awqaf wanted an AI agent integrated with its own SAP that answers employees’ questions and acts for them, without copying HR data anywhere else.",
    built: [
      "Built a FastAPI service that sits between the chat and SAP SuccessFactors and speaks OData V2.",
      "Defined tools that read SAP data, such as leave history and time-account balances, with filters, sorting and paging the model sets itself.",
      "Added write tools so the agent can insert and update records in SAP, acting for the employee instead of only answering.",
      "Let the LLM decide when to call SAP and how to filter, then answer in plain Arabic or English.",
      "Passed each user’s own SAP credentials through, so the assistant can only see what that employee is allowed to see.",
      "Kept conversation history in Redis and shipped the whole stack with Docker Compose.",
    ],
    results: [
      { value: "Read + write", label: "the agent inserts and updates SAP records, not only looks them up" },
      { value: "Arabic", label: "and English questions, answered from live SAP data" },
      { value: "Per user", label: "permissions enforced by SAP itself" },
    ],
    architecture: [
      { label: "User", nodes: ["Chat question"] },
      { label: "Agent", nodes: ["gpt-oss-20b on Groq", "Tool registry", "Redis sessions"] },
      { label: "Integration", nodes: ["OData V2: get, insert, update", "Passthrough auth"] },
      { label: "SAP", nodes: ["EmployeeTime", "TimeAccountDetail"] },
      { label: "Answer", nodes: ["Plain-language summary"] },
    ],
    challenges: [
      {
        title: "The SAP integration",
        detail: "The hardest part. The agent has to build valid OData V2 queries against SuccessFactors, with the right entities, filters and paging, and call SAP with each employee’s own credentials so SAP, not the agent, decides what they can see.",
      },
    ],
    stack: ["FastAPI", "Groq", "gpt-oss-20b", "Tool calling", "SAP SuccessFactors", "OData", "Redis", "Docker"],
  },
  {
    slug: "document-intelligence",
    short: "Document intelligence",
    title: "Read any document, classify every page, search it all",
    client: "A Saudi government entity, through Unlimited Innovation",
    year: "2026",
    disciplines: ["AI"],
    role: "Freelance AI engineer, Unlimited Innovation",
    duration: "1 month",
    summary:
      "PDFs, scans, images and Office files become clean Markdown, structured metadata per page, and a searchable vector index.",
    problem:
      "A Saudi government entity held regulations, memos, contracts and letters as a mix of scanned PDFs, images and Office files, in Arabic and English. It needed every document classified, and nobody could search them or tell which was which without opening each one.",
    built: [
      "Built one pipeline that routes each file by type: PDFs and scans, images, and Office documents through MarkItDown.",
      "Converted every page to Markdown so tables and headings survive extraction.",
      "Had Gemini fill a strict schema per page: document type, category, languages, issuing organisation, dates and reference numbers.",
      "Embedded the pages into Qdrant with Gemini embeddings, so search is decoupled from extraction and runs on meaning, not keywords.",
      "Exposed extract, classify and search as three FastAPI endpoints, packaged with Docker.",
    ],
    results: [
      { value: "3", label: "file families handled: PDF and scans, images, Office" },
      { value: "Per page", label: "structured metadata from a validated schema" },
      { value: "Semantic", label: "search across every document" },
    ],
    architecture: [
      { label: "Files", nodes: ["PDF / scans", "Images", "Word / Excel / PPT"] },
      { label: "Extract", nodes: ["PDF service", "Image service", "MarkItDown"] },
      { label: "Understand", nodes: ["Gemini", "Page schema"] },
      { label: "Index", nodes: ["Gemini embeddings", "Qdrant"] },
      { label: "API", nodes: ["Extract", "Classify", "Search"] },
    ],
    stack: ["Gemini", "Qdrant", "MarkItDown", "OCR", "Pydantic", "FastAPI", "Docker"],
  },
  {
    slug: "ai-applicant-tracking",
    short: "AI applicant tracking",
    title: "An applicant tracking system that reads CVs for you",
    client: "A client, through Unlimited Innovation",
    year: "2026",
    disciplines: ["AI"],
    role: "Freelance AI engineer on a small team, Unlimited Innovation",
    duration: "2 months",
    summary:
      "Parses CVs in any format, ranks them against a job, and lets a recruiter describe the role in conversation instead of filters. Delivered to the client as a working product.",
    problem:
      "Recruiters were reading every CV by hand and matching on keywords, which misses good candidates who describe the same skill differently. Most CVs arrived as PDFs, Word files or photos, in Arabic or English.",
    built: [
      "Parsed CVs from PDF, Word and images into a structured profile with an LLM: contact details, experience, skills and education.",
      "Stored profiles in MySQL and their embeddings for semantic search over the whole candidate pool.",
      "Ranked candidates in two passes: a fast keyword filter, then an LLM that ranks the shortlist against the job description.",
      "Built a recruiter chat that asks for the four things it needs (title, years, skills, context) and then runs the search.",
      "Added Arabic and English translation, grammar correction, job-description drafting, salary estimates through Adzuna and a ZenHR integration.",
    ],
    results: [
      { value: "2-pass", label: "ranking: keyword filter, then LLM judgement" },
      { value: "2", label: "languages, with translation built in" },
      { value: "Delivered", label: "to the client as a working product, in 2 months" },
    ],
    architecture: [
      { label: "Input", nodes: ["CV files", "Job brief"] },
      { label: "Parse", nodes: ["unstructured.io", "LLM extraction"] },
      { label: "Store", nodes: ["MySQL", "Embeddings"] },
      { label: "Rank", nodes: ["Keyword filter", "LLM ranker", "Recruiter chat"] },
      { label: "Integrations", nodes: ["ZenHR", "Adzuna"] },
    ],
    stack: ["FastAPI", "Groq", "Gemini", "Hugging Face", "sentence-transformers", "MySQL", "SQLAlchemy", "Docker"],
  },
  {
    slug: "sitechat",
    short: "SiteChat",
    title: "Chat with any website, and keep it up to date",
    client: "A client, through Unlimited Innovation",
    year: "2026",
    disciplines: ["AI", "Data"],
    role: "Freelance AI engineer, Unlimited Innovation",
    summary:
      "Give it a URL. It crawls the site, indexes it, answers questions with sources, and re-syncs only the pages that changed.",
    problem:
      "Website chatbots go stale the day after they are built, because nobody re-indexes the site. Re-crawling and re-embedding everything on a schedule is slow and expensive.",
    built: [
      "Crawled each site with crawl4ai, staying on the domain and skipping binaries, with a page limit and parallel requests.",
      "Hashed every page’s content and compared it with what is already indexed, splitting the crawl into new, updated, deleted and unchanged pages.",
      "Embedded and upserted only new and updated pages into Qdrant, and removed deleted ones.",
      "Ran the sync in the background on a schedule, one collection per website.",
      "Kept the embedding model, vector store, chunker and LLM behind interfaces so each can be swapped.",
    ],
    results: [
      { value: "Only changes", label: "re-embedded on each sync" },
      { value: "1 collection", label: "per website, isolated" },
      { value: "Scheduled", label: "background re-sync, no manual step" },
    ],
    architecture: [
      { label: "Website", nodes: ["URL"] },
      { label: "Crawl", nodes: ["crawl4ai", "Content hash"] },
      { label: "Diff", nodes: ["New", "Updated", "Deleted"] },
      { label: "Index", nodes: ["Gemini embeddings", "Qdrant"] },
      { label: "Chat", nodes: ["Gemini", "Answers with sources"] },
    ],
    stack: ["crawl4ai", "Qdrant", "Gemini", "RAG", "FastAPI", "Docker"],
  },
  {
    slug: "text-to-sql-analytics",
    short: "Text-to-SQL analytics",
    title: "Arabic and English questions in, SQL and charts out",
    client: "Optimiza",
    year: "2024",
    disciplines: ["AI"],
    role: "AI Engineer, sole engineer on the project, Optimiza",
    duration: "3 months",
    summary:
      "Four cooperating agents that turn a question in either language into a checked SQL query and the right chart.",
    problem:
      "Teams inside Optimiza wanted answers from relational data without writing SQL, in Arabic as often as English. A single prompt to an LLM produced queries against columns that didn’t exist.",
    built: [
      "Split the job across four agents: a conversation manager, a schema analyst, a SQL engineer and a visualisation expert.",
      "Gave the SQL engineer only the tables and relationships the schema analyst found relevant, which stopped it inventing columns.",
      "Added Arabic and English handling with grammar correction before intent detection.",
      "Let the visualisation agent pick the chart from the shape of the result and render it with Plotly and Dash.",
    ],
    results: [
      { value: "4", label: "specialised agents in one pipeline" },
      { value: "2", label: "languages, Arabic and English" },
      { value: "In use", label: "inside Optimiza, accurate and fast enough for daily questions" },
    ],
    architecture: [
      { label: "Input", nodes: ["Arabic / English question"] },
      { label: "Agents", nodes: ["Conversation manager", "Schema analyst", "SQL engineer", "Visualisation expert"] },
      { label: "Data", nodes: ["MySQL"] },
      { label: "Output", nodes: ["Table", "Plotly chart"] },
    ],
    challenges: [
      {
        title: "An architecture that holds up",
        detail: "The hard part was the design, not the prompts. Each agent got one narrow job and only the context it needs, so a wrong guess in one step is caught by the next instead of reaching the user as a broken query.",
      },
    ],
    stack: ["OpenAI API", "Multi-agent", "FastAPI", "MySQL", "Pandas", "Plotly / Dash"],
  },
  {
    slug: "darah-data-quality-compliance",
    short: "Darah data quality",
    title: "Data quality, profiling and NDMO / NDI compliance for a national archive",
    client: "King Abdulaziz Foundation for Research and Archives (Darah)",
    year: "2025 – 2026",
    disciplines: ["Data"],
    role: "Data quality & governance consultant, Tools & Solutions",
    summary:
      "Informatica data quality and profiling across files and databases, the evidence for NDMO and NDI compliance, and the plans and strategies behind it.",
    problem:
      "The foundation’s data sits across many sources, from files to databases. It needed to know how reliable that data was, and to show NDMO and NDI compliance with evidence rather than statements, backed by a plan to close the gaps.",
    built: [
      "Profiled data from multiple sources, files and databases, with Informatica to see its real structure, completeness and patterns.",
      "Built data quality rules in Informatica and ran them across those sources.",
      "Built the evidence for NDMO and NDI compliance from the profiling and quality results.",
      "Wrote the data governance plans and strategies the foundation follows to meet and keep compliance.",
    ],
    results: [
      { value: "NDMO", label: "and NDI compliance backed by evidence" },
      { value: "Multi-source", label: "profiling across files and databases" },
      { value: "Plans", label: "and strategies for data governance" },
    ],
    architecture: [
      { label: "Sources", nodes: ["Files", "Databases"] },
      { label: "Profiling", nodes: ["Informatica profiling"] },
      { label: "Quality", nodes: ["DQ rules", "Rule results"] },
      { label: "Compliance", nodes: ["NDMO evidence", "NDI evidence"] },
      { label: "Governance", nodes: ["Plans", "Strategies"] },
    ],
    stack: ["Informatica Data Quality", "Informatica profiling", "Data governance", "NDMO", "NDI"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
