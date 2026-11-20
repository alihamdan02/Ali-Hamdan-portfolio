import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { ogDark as c, ogFonts, ogPortrait, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Ali Hamdan";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** One preview per case study, in the site's dark style: client, title, headline result, and the author. */
export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug)!;
  const top = p.results[0];
  const me = await ogPortrait();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          color: c.ink,
          fontFamily: "Schibsted",
          backgroundColor: c.bg,
          backgroundImage:
            "radial-gradient(circle at 96% 92%, rgba(196,87,58,0.85) 0%, rgba(111,55,39,0.45) 26%, rgba(11,20,22,0) 52%), radial-gradient(circle at 0% 0%, rgba(31,74,82,0.75) 0%, rgba(11,20,22,0) 45%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 900, height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", padding: "8px 14px", borderRadius: 10, border: "1px solid #a8492d", background: "#3d2721", color: c.coral, fontSize: 20 }}>
              Case study
            </div>
            <div style={{ fontSize: 22, color: c.muted }}>{p.client}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            <div style={{ fontSize: p.title.length > 60 ? 54 : 62, fontWeight: 800, letterSpacing: -2.5, lineHeight: 1.04 }}>{p.title}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, borderTop: `2px solid ${c.rule}`, paddingTop: 22 }}>
              <div style={{ fontSize: 52, fontWeight: 800, color: c.coral, letterSpacing: -2 }}>{top.value}</div>
              <div style={{ fontSize: 26, color: c.muted, maxWidth: 560 }}>{top.label}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 26, fontWeight: 800 }}>Ali Hamdan</div>
            <div style={{ fontSize: 20, color: c.muted }}>AI & Data Engineer · ali-hamdan-portfolio-seven.vercel.app</div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={me} width={300} height={348} style={{ position: "absolute", right: 24, bottom: 0 }} />
      </div>
    ),
    { ...ogSize, fonts: await ogFonts() }
  );
}
