"use client";

import { useEffect, useState } from "react";
import { jumpTo } from "@/lib/jump";

const all = [
  ["c-arch", "Architecture"],
  ["c-problem", "Problem"],
  ["c-built", "What I built"],
  ["c-hard", "The hard part"],
  ["c-results", "Results"],
  ["c-stack", "Stack"],
] as const;

/** Sticky section pills for a case study; the one you are reading is highlighted. */
export default function CaseNav({ hard = false }: { hard?: boolean }) {
  const parts = all.filter(([id]) => hard || id !== "c-hard");
  const [cur, setCur] = useState<string>("c-arch");
  useEffect(() => {
    const on = () => {
      let c: string = parts[0][0];
      for (const [id] of parts) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) c = id;
      }
      setCur(c);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [parts]);
  return (
    <nav className="b-casenav" aria-label="On this page">
      {parts.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={cur === id ? "true" : undefined}
          onClick={(e) => {
            e.preventDefault();
            jumpTo(id);
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
