import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Chrome";
import { profile } from "@/content/profile";
import { headScript } from "@/lib/theme";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Ambient from "@/components/b/Ambient";
import CommandPalette from "@/components/b/CommandPalette";
import FaviconSpin from "@/components/b/FaviconSpin";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { certifications, education, experience } from "@/content/experience";

const description =
  "AI & Data Engineer in Amman. AWS and Informatica pipelines, enterprise data warehouses, NDMO / NDI governance and on-premise LLM agents. Open to consulting, freelance and research.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name}, ${profile.role}`, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: `${profile.name}, ${profile.role}`,
    description,
    url: "/",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f1ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1719" },
  ],
};

/** Structured data so search engines can show a proper card for "Ali Hamdan". */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
  worksFor: { "@type": "Organization", name: experience[0].company },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    recognizedBy: { "@type": "Organization", name: c.issuer },
    url: c.url,
  })),
  knowsAbout: ["Data engineering", "AWS", "Amazon Redshift", "AWS Glue", "Informatica IDMC", "Informatica Data Quality", "Power BI", "NDMO", "Data warehousing", "Data governance", "LLM agents", "RAG"],
  sameAs: profile.links.map((l) => l.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </head>
      <body>
        <div className="b-bgfx" aria-hidden="true" />
        <Ambient />
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <CommandPalette />
        <FaviconSpin />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
