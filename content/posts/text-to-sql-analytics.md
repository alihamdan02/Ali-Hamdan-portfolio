---
title: "Enterprise AI Text-to-SQL & Analytics Platform"
date: 2024-10-10T08:00:00Z
image: /images/post/post-2.png
categories: ["Text-to-SQL", "Agentic-AI", "FastAPI"]
featured: true
draft: false
---

Designed and built a complex, schema-aware multi-agent system capable of converting natural language questions into safe, highly accurate SQL queries, executing them, and returning visual analytics.

### Key Implementation Details
* **Multi-Agent Design:** Created four specialized agents (Conversation Manager, Schema Analyst, SQL Engineer, and Visualization Expert) working together to process requests.
* **Contextual Grounding:** Implemented schema-aware retrieval to feed the model only the relevant database structures, improving accuracy and preventing hallucinated columns.
* **Dynamic Visualization:** Used Pandas and Plotly to automatically select and render the optimal visual chart based on the query result payload.
* **Multilingual Support:** Implemented robust handling for both Arabic and English queries.

### Tech Stack
* **Core:** FastAPI, Pandas, Plotly/Dash
* **Orchestration:** LangChain / Agentic workflows
* **Database integrations:** MySQL, OracleDB