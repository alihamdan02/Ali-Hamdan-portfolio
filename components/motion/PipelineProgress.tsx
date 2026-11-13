"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scramble } from "@/components/motion/scramble";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps the source-to-answer list. As the reader scrolls, a line runs across the stages
 * and each stage switches on when the line reaches it, the way data moves down a pipeline.
 */
export default function PipelineProgress({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stages = Array.from(root.querySelectorAll<HTMLElement>(".stage"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stages.forEach((s) => (s.dataset.on = "true"));
      return;
    }
    root.dataset.animated = "true";
    // Each stage name decodes the first time its stage switches on.
    const observer = new MutationObserver(() =>
      stages.forEach((s) => s.dataset.on === "true" && scramble(s.querySelector("h3")))
    );
    stages.forEach((s) => observer.observe(s, { attributes: true, attributeFilter: ["data-on"] }));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Wide screens: one line across the row, scrubbed by scroll.
      mm.add("(min-width: 961px)", () => {
        const fill = root.querySelector(".pipeline-fill");
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.6,
              onUpdate: (self) => {
                stages.forEach((s, i) => (s.dataset.on = String(self.progress >= i / stages.length)));
              },
            },
          }
        );
      });
      // Narrow screens: stages are stacked, so each lights as it enters.
      mm.add("(max-width: 960px)", () => {
        stages.forEach((s) =>
          ScrollTrigger.create({
            trigger: s,
            start: "top 80%",
            onEnter: () => (s.dataset.on = "true"),
            onLeaveBack: () => (s.dataset.on = "false"),
          })
        );
      });
    }, root);
    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className="pipeline-wrap">
      <div className="pipeline-track" aria-hidden="true">
        <span className="pipeline-fill" />
      </div>
      {children}
    </div>
  );
}
