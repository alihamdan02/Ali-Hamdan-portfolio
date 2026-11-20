"use client";

import { services, type Topic } from "@/content/profile";
import { jumpTo } from "@/lib/jump";

const icons: Record<string, React.ReactNode> = {
  consulting: <path d="M12 3l8 4v5c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V7l8-4zM8.5 12l2.5 2.5 4.5-5" />,
  freelance: <path d="M4 6h16M4 12h10M4 18h6M17 15l3 3-3 3" />,
  research: <path d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM20 20l-4.5-4.5M8.5 11h5M11 8.5v5" />,
};

/** What I take on outside my day job. Each card pre-selects the matching topic in the contact form. */
export default function Services() {
  const pick = (t: Topic) => {
    window.dispatchEvent(new CustomEvent("contact-topic", { detail: t }));
    jumpTo("contact");
    setTimeout(() => document.getElementById("cf-name")?.focus({ preventScroll: true }), 900);
  };
  return (
    <>
      <div className="b-svc">
        {services.map((s, i) => (
          <article key={s.topic} className={`b-sv${i === 1 ? " hot" : ""}`}>
            <span className="b-sv-ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {icons[s.topic]}
              </svg>
            </span>
            <span className="b-eyebrow">
              {String(i + 1).padStart(2, "0")} · {s.kicker}
            </span>
            <h3>{s.title}</h3>
            <p>{s.pitch}</p>
            <ul>
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <span className="b-sv-tags">
              {s.tags.map((t) => (
                <span key={t} className={`b-chip${t === "AWS" ? " aws" : ""}`}>
                  {t}
                </span>
              ))}
            </span>
            <button type="button" className="btn btn-primary b-sv-go" onClick={() => pick(s.topic)}>
              {s.cta}
            </button>
          </article>
        ))}
      </div>
      <ol className="b-how" aria-label="How an engagement works">
        {[
          ["Intro call", "A short call to understand the problem."],
          ["Scope", "A written proposal with deliverables and timeline."],
          ["Build or advise", "Weekly check-ins, nothing hidden."],
          ["Handover", "Docs, runbooks and a walkthrough for your team."],
        ].map(([h, p], i) => (
          <li key={h}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>
              <strong>{h}</strong>
              {p}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
