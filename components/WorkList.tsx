"use client";

import Link from "next/link";
import { useState } from "react";
import type { Discipline, Project } from "@/content/projects";

const filters: { key: "All" | Discipline; label: string }[] = [
  { key: "All", label: "All" },
  { key: "AI", label: "AI systems" },
  { key: "Data", label: "Data platforms" },
];

export default function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"All" | Discipline>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.disciplines.includes(active));

  return (
    <>
      <div className="section-head">
        <div style={{ display: "grid", gap: "0.9rem" }}>
          <h2 className="h2" id="work-title">
            Selected work
          </h2>
          <p className="muted">
            Government and enterprise systems I designed and shipped. Each one opens to the problem, the architecture
            and the result.
          </p>
        </div>
        <div className="filter" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f.key} type="button" aria-pressed={active === f.key} onClick={() => setActive(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="work" aria-labelledby="work-title">
        {shown.map((p) => (
          <li key={p.slug} className="work-item" data-disciplines={p.disciplines.join(" ")}>
            <Link href={`/work/${p.slug}`} className="work-link">
              <span className="work-year">{p.year}</span>
              <div className="work-main">
                <h3 className="work-title">{p.title}</h3>
                <p className="work-summary">{p.summary}</p>
              </div>
              <div className="work-meta">
                <b>{p.client}</b>
                <div className="tags">
                  {p.disciplines.map((d) => (
                    <span key={d} className="tag">
                      {d === "AI" ? "AI system" : "Data platform"}
                    </span>
                  ))}
                </div>
              </div>
              <div className="trail" aria-hidden="true">
                {p.architecture.map((s) => (
                  <span key={s.label}>{s.label}</span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
