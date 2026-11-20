"use client";

import { useEffect, useRef, useState } from "react";
import { pipeline } from "@/content/experience";

const isAws = (t: string) => /^(AWS|Amazon)/.test(t);
const packets: [number, number, string][] = [
  [-70, -40, "0s"],
  [50, -80, "1.3s"],
  [-20, 70, "2.6s"],
  [80, 40, ".7s"],
  [-90, 20, "2s"],
];

/** The pipeline as an exploded stack of 3D layers. Records climb from Source to Reason; layers light up in turn or on hover. */
export default function LayerStack() {
  const [cur, setCur] = useState(0);
  const lock = useRef(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!lock.current) setCur((c) => (c + 1) % pipeline.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);
  const hold = (i: number) => {
    lock.current = true;
    setCur(i);
  };
  const free = () => (lock.current = false);

  return (
    <div className="b-layers">
      <div className="b-iso-stage" aria-hidden="true">
        <div className="b-iso">
          {pipeline.map((s, i) => (
            <div key={s.stage} className={`b-layer${i === cur ? " on" : ""}`} style={{ "--i": i } as React.CSSProperties} onPointerEnter={() => hold(i)} onPointerLeave={free}>
              <b>
                {String(i + 1).padStart(2, "0")} · {s.stage}
              </b>
            </div>
          ))}
          {packets.map(([x, y, d], i) => (
            <i key={i} className="b-packet" style={{ "--px": `${x}px`, "--py": `${y}px`, "--d": d } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <ol className="b-steps">
        {pipeline.map((s, i) => (
          <li key={s.stage}>
            <button type="button" className={`b-step${i === cur ? " on" : ""}`} aria-expanded={i === cur} onPointerEnter={() => hold(i)} onPointerLeave={free} onFocus={() => hold(i)} onBlur={free} onClick={() => setCur(i)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="b-step-h">{s.stage}</span>
                <span className="b-step-p">{s.does}</span>
                <span className="b-step-tags">
                  {s.tools.map((t) => (
                    <span key={t} className={`b-chip${isAws(t) ? " aws" : ""}`}>
                      {t}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
