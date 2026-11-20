"use client";

import { useEffect } from "react";

/** Page-wide touches: a soft light that follows the cursor and magnetic primary buttons. Off for touch and reduced motion. */
export default function Ambient() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const spot = document.getElementById("b-spot");
    document.body.classList.add("b-pointer");
    const move = (e: PointerEvent) => {
      if (spot) spot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const m = (e.target as HTMLElement | null)?.closest?.(".b-magnet") as HTMLElement | null;
      document.querySelectorAll<HTMLElement>(".b-magnet").forEach((b) => {
        if (b !== m) b.style.transform = "";
      });
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("b-pointer");
    };
  }, []);
  return <div className="b-spot" id="b-spot" aria-hidden="true" />;
}
