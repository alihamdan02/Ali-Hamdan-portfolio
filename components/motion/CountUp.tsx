"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Counts a leading number up from zero when it scrolls into view ("92%", "6M+", "4").
 * Values that don't start with a number ("Incremental") render as they are.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    const el = ref.current;
    if (!el || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parseFloat(m[1]);
    const suffix = m[2];
    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: target,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onStart: () => {
          el.textContent = `0${suffix}`;
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value]);

  return (
    <b ref={ref} aria-label={value}>
      {value}
    </b>
  );
}
