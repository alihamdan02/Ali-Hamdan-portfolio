/** Scrolls to an element by id (through Lenis when it is running) and flashes it so the eye lands on it. */
export function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  const offset = -Math.max(96, (window.innerHeight - Math.min(el.offsetHeight, window.innerHeight * 0.8)) / 2);
  if (lenis && !reduce) lenis.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  el.classList.remove("b-flash");
  void el.offsetWidth;
  el.classList.add("b-flash");
}
