import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Ali Hamdan, AI & Data Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const bars = ["#efd6cc", "#d9a08b", "#bc6448", "#9e3d24"];

const font = (w: number) =>
  readFile(join(process.cwd(), `node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-${w}-normal.woff`));

export default async function OG() {
  const [regular, heavy] = await Promise.all([font(400), font(800)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f0f1ee",
          color: "#1b2326",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "Schibsted",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          {bars.map((c, i) => (
            <div key={c} style={{ width: 22, height: 30 + i * 18, background: c, borderRadius: 4 }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            Governed data first. Private AI on top.
          </div>
          <div style={{ fontSize: 34, color: "#586064" }}>Ali Hamdan, AI & Data Engineer, Amman</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted", data: regular, weight: 400, style: "normal" },
        { name: "Schibsted", data: heavy, weight: 800, style: "normal" },
      ],
    }
  );
}
