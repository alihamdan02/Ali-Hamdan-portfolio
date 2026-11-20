"use client";

import Link from "next/link";
import { useState, ViewTransition } from "react";
import type { Discipline, Project } from "@/content/projects";
import { engagements } from "@/content/profile";
import { logoFor } from "@/lib/orgs";
import { tilt, untilt } from "@/lib/tilt";
import MiniClassifier from "./MiniClassifier";
import Jump from "./Jump";

const Arrow = () => (
  <span className="b-arrow" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12L12 4M6 4h6v6" />
    </svg>
  </span>
);

const filters: { key: "All" | Discipline; label: string }[] = [
  { key: "All", label: "All" },
  { key: "AI", label: "AI systems" },
  { key: "Data", label: "Data platforms" },
];

export default function WorkBento({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"All" | Discipline>("All");
  const all = active === "All";
  const shown = all ? projects : projects.filter((p) => p.disciplines.includes(active));
  const count = projects.length + engagements.length;

  return (
    <>
      <div className="b-sh">
        <div>
          <p className="b-eyebrow">Selected work</p>
          <h2 className="b-h2" id="work-title">Systems I designed and shipped</h2>
        </div>
        <div className="b-sh-side">
          <span className="b-count">({String(count).padStart(2, "0")}) projects · tilt any card</span>
          <div className="b-filter" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button key={f.key} type="button" aria-pressed={active === f.key} onClick={() => setActive(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`b-work${all ? "" : " flat"}`}>
        {shown.map((p) => {
          const feat = all && p.slug === "mofa-data-classification";
          const tall = all && p.slug === "kidana-hajj-umrah-warehouse";
          const org = logoFor(p);
          return (
            <Link key={p.slug} href={`/work/${p.slug}`} id={`p-${p.slug}`} className={`b-card${feat ? " feat" : ""}${tall ? " tall" : ""}`} onPointerMove={tilt} onPointerLeave={untilt}>
              <span className="b-glare" aria-hidden="true" />
              <span className="b-meta">
                <b>{p.year}</b> {p.disciplines.map((d) => (d === "AI" ? "AI system" : "Data platform")).join(" · ")}
              </span>
              <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
                <h3>{p.title}</h3>
              </ViewTransition>
              <p>{p.summary}</p>
              {feat && <MiniClassifier />}
              {tall && (
                <span className="b-flow" aria-label="Pipeline stages">
                  {p.architecture.map((s, i) => (
                    <span key={s.label} className={`b-fn${i === 2 ? " hub" : ""}`}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </span>
                  ))}
                </span>
              )}
              <span className="b-bot">
                <span className="b-client">
                  {org?.logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={org.logo} alt="" width={org.w} height={org.h} loading="lazy" decoding="async" />
                  )}
                  {p.client}
                </span>
                <Arrow />
              </span>
            </Link>
          );
        })}

        {(all || active === "Data") &&
          engagements.map((e) => (
            <article key={e.id} id={e.id} className="b-card" onPointerMove={tilt} onPointerLeave={untilt}>
              <span className="b-glare" aria-hidden="true" />
              <span className="b-meta">
                <b>{e.label}</b> {e.meta}
              </span>
              <h3>{e.title}</h3>
              <p>{e.summary}</p>
              <span className="b-bot">
                <span className="b-client">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.logo} alt="" width={283} height={379} loading="lazy" decoding="async" />
                  {e.client}
                </span>
              </span>
            </article>
          ))}

        {all && (
          <Jump to="services" className="b-card cta">
            <span className="b-glare" aria-hidden="true" />
            <span className="b-meta">
              <b>Next</b> your project
            </span>
            <h3>Have a warehouse to fix, data to govern, or an agent to build?</h3>
            <p>I take on consulting, freelance builds and research collaborations alongside my role at Petra Ride.</p>
            <span className="b-bot">
              <span className="b-client">See how we can work together</span>
              <Arrow />
            </span>
          </Jump>
        )}
      </div>
    </>
  );
}
