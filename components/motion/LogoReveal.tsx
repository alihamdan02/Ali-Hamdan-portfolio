"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The organisation tiles arrive one after another the first time they scroll into view,
 * each logo starting in grey and settling into its own colours, like a record being confirmed.
 */
export default function LogoReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".client");
      const logos = gsap.utils.toArray<HTMLElement>(".client-logo");
      gsap.set(tiles, { autoAlpha: 0, y: 14 });
      gsap.set(logos, { filter: "grayscale(1)" });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
      tl.to(tiles, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08 });
      tl.to(logos, { filter: "grayscale(0)", duration: 0.6, ease: "power1.out", stagger: 0.08, clearProps: "filter" }, 0.25);
    }, root);
    return () => ctx.revert();
  }, []);

  // Clicking a tile scrolls to its Experience entry (Lenis handles the scroll); then the entry glows briefly.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-flash]");
      const target = card && document.getElementById(card.dataset.flash!);
      if (!target) return;
      target.classList.remove("flash");
      window.setTimeout(() => {
        void target.offsetWidth;
        target.classList.add("flash");
        target.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
      }, 650);
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="clients" ref={ref}>
      {children}
    </div>
  );
}
