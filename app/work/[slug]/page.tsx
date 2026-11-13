import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Chrome";
import { getProject, projects } from "@/content/projects";
import Diagram from "@/components/motion/Diagram";
import CountUp from "@/components/motion/CountUp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: { title: p.title, description: p.summary } };
}

export default async function CaseStudy({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <article className="wrap">
        <header className="case-head">
          <Link href="/#work" className="back">
            ← All work
          </Link>
          <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
            <h1 className="case-title">{p.title}</h1>
          </ViewTransition>
          <p className="lede">{p.summary}</p>
          <dl className="facts">
            <div>
              <dt>Client</dt>
              <dd>{p.client}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{p.disciplines.map((d) => (d === "AI" ? "AI system" : "Data platform")).join(", ")}</dd>
            </div>
          </dl>
        </header>

        <Diagram stages={p.architecture} />

        <div className="case-body">
          <section className="prose">
            <h2>The problem</h2>
            <p>{p.problem}</p>
          </section>
          <section>
            <h2>What I built</h2>
            <ul className="built">
              {p.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-label="Results">
          <h2 className="h3" style={{ marginBottom: "1rem" }}>
            Results
          </h2>
          <div className="results">
            {p.results.map((r) => (
              <div className="result" key={r.label}>
                <CountUp value={r.value} />
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ paddingBlock: "3rem" }} aria-label="Stack">
          <h2 className="h3" style={{ marginBottom: "1rem" }}>
            Stack
          </h2>
          <ul className="tags">
            {p.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <nav className="next" aria-label="Next project">
          <Link href={`/work/${next.slug}`}>
            <span className="muted small">Next project</span>
            <span className="h3">{next.title}</span>
          </Link>
        </nav>
      </article>
      <Contact />
    </>
  );
}
