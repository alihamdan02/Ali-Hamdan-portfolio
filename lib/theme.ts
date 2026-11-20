/** Runs before paint (inlined in <head>): applies a saved theme and marks that JS is on, so nothing flashes. */
export const headScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")`;

export type Theme = "system" | "light" | "dark";

/** Applies and saves a theme, and tells every listener (switch, 3D scenes) that it changed. */
export function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "system") delete root.dataset.theme;
  else root.dataset.theme = t;
  try {
    if (t === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", t);
  } catch {}
  window.dispatchEvent(new CustomEvent("themechange", { detail: t }));
}

export function isDark() {
  const t = document.documentElement.dataset.theme;
  return t === "dark" || (t !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
}
