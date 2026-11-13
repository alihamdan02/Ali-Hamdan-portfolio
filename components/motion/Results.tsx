"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scramble } from "@/components/motion/scramble";

gsap.registerPlugin(ScrollTrigger);

type Result = { value: string; label: string };
type Kind =
  | { type: "percent"; n: number }
  | { type: "count"; n: number; unit: string; rest: string }
  | { type: "big"; n: number; suffix: string }
  | { type: "word" };

/** Picks the picture that fits the number: a ring for a share, pips for a few things, a bar for a large count. */
function kindOf(value: string): Kind {
  let m = value.match(/^(\d+)%$/);
  if (m) return { type: "percent", n: +m[1] };
  m = value.match(/^(\d+)([MK]\+?|\+)$/);
  if (m) return { type: "big", n: +m[1], suffix: m[2] };
  m = value.match(/^(\d+)(-|\s)?(.*)$/);
  if (m && +m[1] > 0 && +m[1] <= 10 && !/^(st|nd|rd|th)$/.test(m[3])) {
    return { type: "count", n: +m[1], unit: m[2] === "-" ? "-" : " ", rest: m[3] };
  }
  return { type: "word" };
}

const R = 30;
const C = 2 * Math.PI * R;

function Visual({ kind }: { kind: Kind }) {
  if (kind.type === "percent")
    return (
      <svg className="ring" viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r={R} className="ring-track" />
        <circle
          cx="36"
          cy="36"
          r={R}
          className="ring-fill"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - kind.n / 100)}
          data-target={C * (1 - kind.n / 100)}
        />
      </svg>
    );
  if (kind.type === "count")
    return (
      <div className="pips" aria-hidden="true">
        {Array.from({ length: kind.n }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    );
  if (kind.type === "big")
    return (
      <div className="bar" aria-hidden="true">
        <span />
      </div>
    );
  return <div className="word-mark" aria-hidden="true" />;
}

export default function Results({ results }: { results: Result[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".result");
      gsap.set(cards, { autoAlpha: 0, y: 18 });

      // Reset visuals to empty; they fill when their card arrives.
      root.querySelectorAll<SVGCircleElement>(".ring-fill").forEach((c) => gsap.set(c, { strokeDashoffset: C }));
      gsap.set(root.querySelectorAll(".pips span"), { scale: 0.4, opacity: 0.25 });
      gsap.set(root.querySelectorAll(".bar span"), { scaleX: 0 });
      gsap.set(root.querySelectorAll(".word-mark"), { scaleX: 0 });

      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
      cards.forEach((card, i) => {
        const at = i * 0.18;
        tl.to(card, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, at);

        const ring = card.querySelector<SVGCircleElement>(".ring-fill");
        if (ring) tl.to(ring, { strokeDashoffset: +ring.dataset.target!, duration: 1.4, ease: "power3.out" }, at + 0.15);

        const pips = card.querySelectorAll(".pips span");
        if (pips.length)
          tl.to(pips, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.12 }, at + 0.2);

        const bar = card.querySelector(".bar span");
        if (bar) tl.to(bar, { scaleX: 1, duration: 1.4, ease: "power3.out" }, at + 0.15);

        const mark = card.querySelector(".word-mark");
        if (mark) tl.to(mark, { scaleX: 1, duration: 0.6, ease: "power2.out" }, at + 0.15);

        // The number counts up alongside its visual; words decode instead.
        const num = card.querySelector<HTMLElement>("[data-count]");
        if (num) {
          const target = +num.dataset.count!;
          const suffix = num.dataset.suffix ?? "";
          const o = { n: 0 };
          num.textContent = `0${suffix}`;
          tl.to(o, { n: target, duration: 1.4, ease: "power3.out", onUpdate: () => (num.textContent = `${Math.round(o.n)}${suffix}`) }, at + 0.15);
        }
        const word = card.querySelector<HTMLElement>("[data-word]");
        if (word) tl.call(() => scramble(word, 0.9), undefined, at + 0.1);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="results" ref={ref}>
      {results.map((r) => {
        const k = kindOf(r.value);
        return (
          <div className="result" data-kind={k.type} key={r.label}>
            <div className="result-visual">
              <Visual kind={k} />
              {k.type === "percent" && (
                <b className="result-value ring-value" data-count={k.n} data-suffix="%" aria-label={r.value}>
                  {r.value}
                </b>
              )}
            </div>
            {k.type === "big" && (
              <b className="result-value" data-count={k.n} data-suffix={k.suffix} aria-label={r.value}>
                {r.value}
              </b>
            )}
            {k.type === "count" && (
              <b className="result-value" aria-label={r.value}>
                <span data-count={k.n}>{k.n}</span>
                {k.unit === "-" ? "-" : k.rest ? " " : ""}
                {k.rest && <span className="result-unit">{k.rest}</span>}
              </b>
            )}
            {k.type === "word" && (
              <b className="result-value" data-word>
                {r.value}
              </b>
            )}
            <span className="result-label">{r.label}</span>
          </div>
        );
      })}
    </div>
  );
}
