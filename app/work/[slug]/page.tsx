import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Chrome";
import { getProject, projects } from "@/content/projects";
import { logoFor } from "@/lib/orgs";
import Results from "@/components/motion/Results";
import ArchFlow from "@/components/case/ArchFlow";
import BuiltSteps from "@/components/case/BuiltSteps";
import CaseNav from "@/components/case/CaseNav";
import Tilt from "@/components/case/Tilt";
import TiltLink from "@/components/case/TiltLink";
import AskAbout from "@/components/case/AskAbout";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: { title: p.title, description: p.summary } };
}

const isAws = (t: string) => /^(AWS|Amazon)/.test(t);
const kind = (d: string) => (d === "AI" ? "AI system" : "Data platform");

export default async function CaseStudy({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const org = logoFor(p);
  const top = p.results[0];

  return (
    <>
      <article className="wrap b-case">
        <header className="b-case-head">
          <div className="b-tile b-case-main">
            <Link href="/#work" className="b-back">
              ← All work
            </Link>
            <span className="b-eyebrow">
              Case study · {p.disciplines.map(kind).join(" · ")} · {p.year}
            </span>
            <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
              <h1 className="b-case-title">{p.title}</h1>
            </ViewTransition>
            <p className="b-lead">{p.summary}</p>
            <div className="b-ctas">
              <AskAbout title={p.title} className="btn btn-primary b-magnet">
                Want something like this?
              </AskAbout>
              <a href="#c-arch" className="btn b-magnet">
                See the architecture
              </a>
            </div>
          </div>

          <Tilt className="b-tile b-case-side" strength={0.6}>
            <span className="b-case-logo">
              {org ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={org.logo} alt="" width={org.w} height={org.h} className={org.h > org.w ? "tall" : undefined} />
              ) : (
                <b>{p.client}</b>
              )}
            </span>
            <dl className="b-facts">
              <div>
                <dt>Client</dt>
                <dd>{p.client}</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>{p.role}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{p.year}</dd>
              </div>
            </dl>
            <span className="b-case-top">
              <strong>{top.value}</strong>
              <span>{top.label}</span>
            </span>
          </Tilt>
        </header>

        <CaseNav />

        <section className="b-csec" id="c-arch" aria-labelledby="c-arch-h">
          <div className="b-sh">
            <div>
              <p className="b-eyebrow">Architecture</p>
              <h2 className="b-h2" id="c-arch-h">
                How the data moves
              </h2>
            </div>
            <p>A simplified view of the system, stage by stage. Watch a record travel through it, or hover a stage to stop on it.</p>
          </div>
          <ArchFlow stages={p.architecture} />
        </section>

        <section className="b-csec b-case-body" aria-label="Problem and what I built">
          <div className="b-tile b-problem" id="c-problem">
            <p className="b-eyebrow">The problem</p>
            <p className="b-problem-t">{p.problem}</p>
          </div>
          <div id="c-built">
            <p className="b-eyebrow">What I built</p>
            <BuiltSteps items={p.built} />
          </div>
        </section>

        <section className="b-csec" id="c-results" aria-labelledby="c-results-h">
          <div className="b-sh">
            <div>
              <p className="b-eyebrow">Results</p>
              <h2 className="b-h2" id="c-results-h">
                What changed
              </h2>
            </div>
          </div>
          <div className="b-results">
            <Results results={p.results} />
          </div>
        </section>

        <section className="b-csec" id="c-stack" aria-labelledby="c-stack-h">
          <div className="b-sh">
            <div>
              <p className="b-eyebrow">Stack</p>
              <h2 className="b-h2" id="c-stack-h">
                Built with
              </h2>
            </div>
          </div>
          <ul className="b-stack">
            {p.stack.map((s) => (
              <li key={s} className={`b-chip big${isAws(s) ? " aws" : ""}`}>
                {s}
              </li>
            ))}
          </ul>
        </section>

        <nav className="b-pn" aria-label="More case studies">
          {[
            ["Previous", prev],
            ["Next", next],
          ].map(([label, q]) => {
            const pr = q as typeof p;
            const o = logoFor(pr);
            return (
              <TiltLink key={label as string} href={`/work/${pr.slug}`} className={`b-card b-pn-c${label === "Next" ? " next" : ""}`}>
                <span className="b-meta">
                  <b>{label === "Next" ? "Next →" : "← Previous"}</b> {pr.disciplines.map(kind).join(" · ")}
                </span>
                <h3>{pr.title}</h3>
                <span className="b-bot">
                  <span className="b-client">
                    {o && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={o.logo} alt="" width={o.w} height={o.h} loading="lazy" />
                    )}
                    {pr.client}
                  </span>
                </span>
              </TiltLink>
            );
          })}
        </nav>
      </article>
      <Contact />
    </>
  );
}
