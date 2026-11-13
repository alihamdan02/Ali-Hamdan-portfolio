"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Stage } from "@/content/projects";

import { scramble } from "@/components/motion/scramble";

gsap.registerPlugin(ScrollTrigger);

/**
 * Architecture diagram. When it scrolls into view the lanes appear left to right,
 * then small packets keep travelling along each connector to show the direction of data.
 */
export default function Diagram({ stages }: { stages: Stage[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const lanes = gsap.utils.toArray<HTMLElement>(".lane");
      const packets = gsap.utils.toArray<HTMLElement>(".packet");
      gsap.set(lanes, { autoAlpha: 0, x: -12 });
      gsap.set(packets, { autoAlpha: 0 });

      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 75%", once: true } });
      lanes.forEach((lane, i) => {
        tl.to(lane, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, i * 0.14);
        tl.call(() => scramble(lane.querySelector("h3"), 0.6), undefined, i * 0.14);
      });
      tl.add(() => {
        packets.forEach((p, i) => {
          gsap.fromTo(
            p,
            { x: 0, autoAlpha: 0 },
            {
              keyframes: [
                { autoAlpha: 1, duration: 0.15 },
                { x: "2.25rem", duration: 0.9, ease: "power1.inOut" },
                { autoAlpha: 0, duration: 0.15 },
              ],
              repeat: -1,
              repeatDelay: 1.2,
              delay: i * 0.35,
            }
          );
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <figure className="diagram" ref={ref}>
      <div className="lanes">
        {stages.map((s, i) => (
          <div className="lane" key={s.label}>
            {i > 0 && <span className="packet" aria-hidden="true" />}
            <h3>{s.label}</h3>
            {s.nodes.map((n) => (
              <div className="node" key={n}>
                {n}
              </div>
            ))}
          </div>
        ))}
      </div>
      <figcaption>Architecture, simplified. Data flows left to right.</figcaption>
    </figure>
  );
}
