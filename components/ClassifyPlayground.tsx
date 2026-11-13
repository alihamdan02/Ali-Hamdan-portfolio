"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { levels } from "@/content/profile";
import { classify, type Verdict } from "@/lib/classify";

const examples = ["passport_no", "employee_email", "security_clearance", "city_name", "monthly_salary", "order_notes"];

export default function ClassifyPlayground() {
  const [value, setValue] = useState("");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const run = (name: string) => {
    setValue(name);
    setVerdict(classify(name));
  };

  // Each new verdict fills the meter segment by segment.
  useEffect(() => {
    const el = resultRef.current;
    if (!el || !verdict || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const segs = el.querySelectorAll('.meter span[data-on="true"]');
    gsap.fromTo(segs, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", duration: 0.25, stagger: 0.12, ease: "power2.out" });
    gsap.fromTo(el.querySelector(".verdict-level"), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, delay: 0.15 });
  }, [verdict]);

  const idx = verdict ? levels.indexOf(verdict.level) : -1;

  return (
    <section className="playground" aria-labelledby="pg-title">
      <div className="playground-copy">
        <h2 className="h3" id="pg-title">
          Name a column, see where it lands
        </h2>
        <p className="muted small">
          A simplified version of the rules behind my classification agents. The real ones also read sample values and
          the client’s own policies.
        </p>
      </div>

      <form
        className="pg-form"
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
        }}
      >
        <label htmlFor="pg-input" className="sr-only">
          Column name
        </label>
        <input
          id="pg-input"
          className="pg-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. customer_passport_no"
          autoComplete="off"
          spellCheck={false}
        />
        <button className="btn btn-primary" type="submit" disabled={!value.trim()}>
          Classify
        </button>
      </form>

      <div className="pg-examples">
        <span className="muted small">Try</span>
        {examples.map((x) => (
          <button key={x} type="button" className="chip" onClick={() => run(x)}>
            {x}
          </button>
        ))}
      </div>

      <div className="verdict" ref={resultRef} aria-live="polite">
        {verdict ? (
          <>
            <div className="verdict-head">
              <div className="meter meter-lg" aria-hidden="true">
                {levels.map((l, j) => (
                  <span key={l} data-on={j <= idx} />
                ))}
              </div>
              <b className="verdict-level">{verdict.level}</b>
              <span className="verdict-conf">{verdict.confidence.toFixed(2)}</span>
            </div>
            <p>
              <code>{value}</code> {verdict.why}.
              {verdict.matched.length > 0 && (
                <>
                  {" "}
                  Signal: <code>{verdict.matched.join(", ")}</code>.
                </>
              )}
            </p>
          </>
        ) : (
          <p className="muted small">Type a column name or pick an example to classify it.</p>
        )}
      </div>
    </section>
  );
}
