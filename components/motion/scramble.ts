"use client";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

/** Decodes an element's own text from random characters, like a value resolving out of raw data. Once per element. */
export function scramble(el: HTMLElement | null, duration = 0.8) {
  if (!el || el.dataset.scrambled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.dataset.scrambled = "true";
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  gsap.to(el, {
    duration,
    scrambleText: { text, chars: "01ABCDEFGHIJKLMNOPQRSTUVWXYZ_", revealDelay: 0.15, speed: 0.6 },
    ease: "none",
  });
}
