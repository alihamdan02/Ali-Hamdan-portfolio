/** Pointer handlers that tilt a card toward the cursor and move a glare with it. */
export function tilt(e: React.PointerEvent<HTMLElement>, strength = 1) {
  const c = e.currentTarget;
  const r = c.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  c.style.setProperty("--gx", `${x * 100}%`);
  c.style.setProperty("--gy", `${y * 100}%`);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    c.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8 * strength}deg) rotateY(${(x - 0.5) * 10 * strength}deg) translateZ(6px)`;
}
export const untilt = (e: React.PointerEvent<HTMLElement>) => (e.currentTarget.style.transform = "");
