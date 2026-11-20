"use client";

import { useEffect, useRef, useState } from "react";
import type { Stage } from "@/content/projects";

/**
 * The architecture as a tilted 3D floor. Records travel between stages, each stage rises in turn,
 * hovering or picking a stage holds it, and the whole floor leans toward the cursor.
 */
export default function ArchFlow({ stages }: { stages: Stage[] }) {
  const [cur, setCur] = useState(0);
  const [held, setHeld] = useState(false);
  const floor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCur((c) => (c + 1) % stages.length), 2200);
    return () => clearInterval(id);
  }, [held, stages.length]);

  const lean = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!floor.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 900) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    floor.current.style.transform = `rotateX(${16 - y * 8}deg) rotateY(${x * 8}deg)`;
  };

  const s = stages[cur];
  return (
    <figure className="b-arch" onPointerMove={lean} onPointerLeave={() => floor.current && (floor.current.style.transform = "")}>
      <div className="b-arch-floor" ref={floor} style={{ "--n": stages.length } as React.CSSProperties}>
        {stages.map((st, i) => (
          <div
            key={st.label}
            className={`b-lane${i === cur ? " on" : ""}${i < cur ? " done" : ""}`}
            onPointerEnter={() => {
              setHeld(true);
              setCur(i);
            }}
            onPointerLeave={() => setHeld(false)}
          >
            <span className="b-lane-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="b-lane-l">{st.label}</span>
            {st.nodes.map((n) => (
              <span className="b-node" key={n}>
                {n}
              </span>
            ))}
            {i < stages.length - 1 && (
              <span className="b-wire" aria-hidden="true">
                <i style={{ animationDelay: `${i * 0.35}s` }} />
              </span>
            )}
          </div>
        ))}
      </div>
      <figcaption className="b-arch-bar">
        <span className="b-arch-dots" role="group" aria-label="Pick a stage">
          {stages.map((st, i) => (
            <button
              key={st.label}
              type="button"
              aria-label={st.label}
              aria-pressed={i === cur}
              onClick={() => {
                setHeld(true);
                setCur(i);
              }}
            />
          ))}
        </span>
        <span className="b-arch-now" aria-live="polite">
          <b>
            {String(cur + 1).padStart(2, "0")} · {s.label}
          </b>{" "}
          {s.nodes.join(", ")}
        </span>
        <span className="b-arch-hint">Data flows left to right. Hover a stage to hold it.</span>
      </figcaption>
    </figure>
  );
}
