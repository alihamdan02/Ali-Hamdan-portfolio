"use client";

import { useEffect, useState } from "react";
import { levels } from "@/content/profile";

const cols: [string, string, number][] = [
  ["applicant_name", "NVARCHAR(120)", 1],
  ["passport_no", "CHAR(9)", 3],
  ["nationality", "CHAR(3)", 0],
  ["screening_notes", "NVARCHAR(MAX)", 2],
  ["entry_port", "VARCHAR(40)", 0],
  ["visa_status", "VARCHAR(20)", 1],
];

/** A looping sample of the classification agents at work. The table and values are invented. */
export default function MiniClassifier() {
  const [done, setDone] = useState(cols.length);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let k = 0;
    setDone(0);
    const id = setInterval(() => {
      k = k >= cols.length + 5 ? 0 : k + 1;
      setDone(Math.min(k, cols.length));
    }, 650);
    return () => clearInterval(id);
  }, []);
  const counts = [0, 0, 0, 0];
  cols.slice(0, done).forEach((c) => counts[c[2]]++);
  return (
    <div className="b-clf" aria-label="Sample classification on an invented table">
      <div className="b-clf-top">
        visa_applications <span>{done < cols.length ? "classifying…" : "done · 92% match with expert review"}</span>
      </div>
      {cols.map((c, i) => (
        <div className="b-crow" key={c[0]}>
          <b>{c[0]}</b>
          <span className="t">{c[1]}</span>
          <span className="b-lvl" data-l={i < done ? c[2] : undefined}>
            {i < done ? levels[c[2]] : "…"}
          </span>
        </div>
      ))}
      <div className="b-tally">
        {levels.map((l, i) => (
          <span key={l} data-l={i}>
            {l} {counts[i]}
          </span>
        ))}
      </div>
    </div>
  );
}
