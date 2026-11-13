"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { levels, type Level } from "@/content/profile";

type Row = { col: string; type: string; sample: string; level: Level; conf: number };

// Invented sample data. Mirrors the kind of table the MOFA agents label.
const rows: Row[] = [
  { col: "applicant_name", type: "NVARCHAR(120)", sample: "Rana K•••••", level: "Restricted", conf: 0.91 },
  { col: "passport_no", type: "CHAR(9)", sample: "P•••••372", level: "Secret", conf: 0.97 },
  { col: "nationality", type: "CHAR(3)", sample: "JOR", level: "Public", conf: 0.95 },
  { col: "screening_notes", type: "NVARCHAR(MAX)", sample: "••••••••••", level: "Top Secret", conf: 0.89 },
  { col: "entry_port", type: "VARCHAR(40)", sample: "Jeddah KAIA", level: "Public", conf: 0.93 },
  { col: "visa_status", type: "VARCHAR(20)", sample: "Issued", level: "Restricted", conf: 0.88 },
];

const swatch = ["var(--l1)", "var(--l2)", "var(--l3)", "var(--l4)"];
const STEP = 620;

export default function Classifier() {
  // Number of rows already labelled; the row at index `done` is being scanned.
  const [done, setDone] = useState(0);
  const [running, setRunning] = useState(true);
  const timer = useRef<number | null>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(rows.length);
      setRunning(false);
      return;
    }
    if (timer.current) window.clearInterval(timer.current);
    setDone(0);
    setRunning(true);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      setDone(n);
      if (n >= rows.length) {
        window.clearInterval(timer.current!);
        timer.current = null;
        setRunning(false);
      }
    }, STEP);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(run, 500);
    return () => {
      window.clearTimeout(t);
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [run]);

  const tally = levels.map((l) => rows.slice(0, done).filter((r) => r.level === l).length);

  return (
    <figure className="classifier" aria-label="Demonstration: classifying a sample table by NDMO level">
      <div className="classifier-head">
        <strong>visa_applications</strong>
        <span>Sample table, invented data</span>
      </div>

      <ol aria-live="polite">
        {rows.map((r, i) => {
          const state = i < done ? "done" : i === done && running ? "scanning" : "pending";
          const idx = levels.indexOf(r.level);
          return (
            <li key={r.col} className="crow" data-state={state}>
              <div className="crow-col">
                <b>{r.col}</b>
                <i>
                  {r.type} {r.sample}
                </i>
              </div>
              <div className="meter" aria-hidden="true">
                {levels.map((l, j) => (
                  <span key={l} data-on={state === "done" && j <= idx} />
                ))}
              </div>
              <div className="crow-level">
                {state === "done" ? (
                  <>
                    <b>{r.level}</b>
                    <i>{r.conf.toFixed(2)}</i>
                  </>
                ) : (
                  <i>{state === "scanning" ? "reading…" : ""}</i>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <figcaption className="classifier-foot">
        <ul className="tally">
          {levels.map((l, i) => (
            <li key={l}>
              <span className="swatch" style={{ background: swatch[i] }} aria-hidden="true" />
              {l} {tally[i]}
            </li>
          ))}
        </ul>
        <div className="classifier-note">
          <span>
            How my agents label columns under NDMO levels. On the real project they matched expert review 92% of the
            time.
          </span>
          <button className="rerun" type="button" onClick={run} disabled={running}>
            {running ? "Classifying" : "Run again"}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
