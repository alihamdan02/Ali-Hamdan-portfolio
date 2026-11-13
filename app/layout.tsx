import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Chrome";
import { profile } from "@/content/profile";

const description =
  "AI & Data Engineer in Amman. Informatica pipelines, enterprise data warehouses and on-premise LLM agents for government teams in Saudi Arabia.";

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

export const viewport: Viewport = { themeColor: "#f1f2ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
