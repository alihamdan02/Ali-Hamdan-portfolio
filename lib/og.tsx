import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogColors = { paper: "#f0f1ee", ink: "#1b2326", graphite: "#586064", accent: "#9e3d24", petrol: "#1f4a52" };
/** Dark palette used by the share images, matching the site in dark mode. */
export const ogDark = { bg: "#0b1416", panel: "#152023", rule: "#263438", ink: "#e6e9e5", muted: "#9aa5a7", coral: "#e48a6a", petrol: "#7fb0b8" };

/** The cut-out portrait as a data URI (share images cannot read webp). */
export async function ogPortrait() {
  const buf = await readFile(join(process.cwd(), "lib/og-me.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}
export const ogBars = ["#efd6cc", "#d9a08b", "#bc6448", "#9e3d24"];

const file = (w: number) =>
  readFile(join(process.cwd(), `node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-${w}-normal.woff`));

export async function ogFonts() {
  const [regular, heavy] = await Promise.all([file(400), file(800)]);
  return [
    { name: "Schibsted", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Schibsted", data: heavy, weight: 800 as const, style: "normal" as const },
  ];
}

export function Mark({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6 * scale }}>
      {ogBars.map((c, i) => (
        <div key={c} style={{ width: 16 * scale, height: (22 + i * 13) * scale, background: c, borderRadius: 3 * scale }} />
      ))}
    </div>
  );
}
