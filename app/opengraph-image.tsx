import { ImageResponse } from "next/og";
import { Mark, ogColors, ogFonts, ogSize } from "@/lib/og";

export const alt = "Ali Hamdan, AI & Data Engineer";
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: ogColors.paper,
          color: ogColors.ink,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "Schibsted",
        }}
      >
        <Mark scale={1.4} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            Governed data first. Private AI on top.
          </div>
          <div style={{ fontSize: 34, color: ogColors.graphite }}>Ali Hamdan, AI & Data Engineer, Amman</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await ogFonts() }
  );
}
