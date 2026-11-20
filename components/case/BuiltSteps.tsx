"use client";

import { useEffect, useRef, useState } from "react";

/** What I built, as steps on a line that fills as you read. Each step lights up when it reaches the middle of the screen. */
export default function BuiltSteps({ items }: { items: string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(items.length);
  const [fill, setFill] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = () => {
      const root = ref.current;
      if (!root) return;
      const mid = window.innerHeight * 0.6;
      const r = root.getBoundingClientRect();
      setFill(Math.max(0, Math.min(1, (mid - r.top) / r.height)));
      let n = 0;
      root.querySelectorAll<HTMLElement>(".b-built-i").forEach((li) => {
        if (li.getBoundingClientRect().top < mid) n++;
      });
      setLit(n);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <ol className="b-built" ref={ref} style={{ "--fill": fill } as React.CSSProperties}>
      {items.map((b, i) => (
        <li key={b} className={`b-built-i${i < lit ? " on" : ""}`}>
          <span className="b-built-n">{String(i + 1).padStart(2, "0")}</span>
          <p>{b}</p>
        </li>
      ))}
    </ol>
  );
}
