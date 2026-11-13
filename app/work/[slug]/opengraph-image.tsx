import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { Mark, ogColors, ogFonts, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Ali Hamdan";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** One preview per case study: client, title, and the headline result, so a shared link says what it is. */
export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug)!;
  const top = p.results[0];
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
          padding: 72,
          fontFamily: "Schibsted",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Mark />
            <div style={{ fontSize: 28, fontWeight: 800 }}>Ali Hamdan</div>
          </div>
          <div style={{ fontSize: 26, color: ogColors.graphite }}>{p.client}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 70, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, maxWidth: 1000 }}>{p.title}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, borderTop: `3px solid ${ogColors.petrol}`, paddingTop: 22 }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: ogColors.accent, letterSpacing: -2 }}>{top.value}</div>
            <div style={{ fontSize: 28, color: ogColors.graphite, maxWidth: 760 }}>{top.label}</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await ogFonts() }
  );
}
