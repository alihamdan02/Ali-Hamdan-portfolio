"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/**
 * The headline rises word by word from behind a mask, once, on load.
 * Hidden by CSS only when JS is on (html.js); a CSS fallback reveals it if this never runs.
 */
export default function HeroTitle({ text, id }: { text: string; id: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, { type: "words", mask: "words" });
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(split.words, {
        yPercent: 110,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.07,
        delay: 0.1,
      });
    }, el);
    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <h1 ref={ref} className="display hero-title" id={id}>
      {text}
    </h1>
  );
}
