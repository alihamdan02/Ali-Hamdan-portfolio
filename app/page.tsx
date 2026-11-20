import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { certifications, education, experience } from "@/content/experience";
import { Contact } from "@/components/Chrome";
import PortraitOrbit from "@/components/b/PortraitOrbit";
import LogoRing from "@/components/b/LogoRing";
import WorkBento from "@/components/b/WorkBento";
import LayerStack from "@/components/b/LayerStack";
import Services from "@/components/b/Services";
import Jump from "@/components/b/Jump";

const orgs = [...profile.employers, ...profile.clients];

export default function Home() {
  const now = profile.employers[0];
  return (
    <>
      <div className="wrap">
        <section className="b-hero" aria-labelledby="hero-title">
          <div className="b-bento">
            <div className="b-tile b-head">
              <div className="b-badges">
                <span className="b-chip hot">NOW → {profile.current}</span>
                <Jump to="services" className="b-chip b-open">
                  <i aria-hidden="true" />
                  Open to consulting, freelance &amp; research
                </Jump>
              </div>
              <h1 id="hero-title">
                Governed data first.
                <br />
                <em>Private AI on top.</em>
              </h1>
              <p className="b-lead">{profile.intro}</p>
              <div className="b-ctas">
                <Jump to="work" className="btn btn-primary b-magnet">
                  See selected work
                </Jump>
                <Jump to="services" className="btn b-magnet">
                  Work with me
                </Jump>
                <span className="b-cv">
                  CV
                  <a href={profile.cv.ai} download>
                    AI Engineer ↓
                  </a>
                  <a href={profile.cv.data} download>
                    Data Engineer ↓
                  </a>
                </span>
              </div>
              <div className="b-stackline">
                <span>Stack</span>
                <span className="b-chip aws">AWS {profile.aws.join(" · ")}</span>
                <span className="b-chip">Informatica IDMC</span>
                <span className="b-chip">Power BI</span>
                <span className="b-chip">LangGraph</span>
                <span className="b-chip">Ollama</span>
              </div>
            </div>

            <PortraitOrbit />

            <Jump to={now.target} className="b-tile b-now" label={`${now.name}: go to my current role`}>
              <span className="b-eyebrow">Currently</span>
              <span className="b-now-row">
                <span className="b-logo-chip">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={now.logo} alt="" width={now.w} height={now.h} />
                </span>
                <span>
                  <b>{now.name}</b>
                  <small>{experience[0].title}</small>
                </span>
              </span>
              <span className="b-now-tags">
                {profile.aws.map((a) => (
                  <span key={a} className="b-chip aws">
                    {a}
                  </span>
                ))}
              </span>
            </Jump>
            <div className="b-tile b-stat">
              <strong>92%</strong>
              <span>agent labels matched expert review</span>
              <span className="b-viz">
                {[22, 30, 36, 18].map((w, i) => (
                  <i key={i} className="b-bar" data-l={i} style={{ width: `${w}%` }} />
                ))}
              </span>
            </div>
            <div className="b-tile b-stat">
              <strong>{orgs.length}</strong>
              <span>organizations I have worked at or built for</span>
              <span className="b-viz">
                {orgs.map((o, i) => (
                  <i key={o.name} className={`b-dot${i < profile.employers.length ? "" : " c"}`} />
                ))}
              </span>
            </div>
            <div className="b-tile b-stat wide">
              <strong>1st</strong>
              <span>
                in my class, {education.degree}, {education.note.replace("Ranked first in my graduating class. ", "")}
              </span>
              <span className="b-viz b-certs-mini">
                {certifications.map((c) => (
                  <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" title={`${c.name}, verify`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.badge} alt={c.name} width={40} height={40} loading="lazy" />
                  </a>
                ))}
              </span>
            </div>
          </div>
        </section>

        <section className="b-block" aria-labelledby="trust-title">
          <div className="b-sh">
            <div>
              <p className="b-eyebrow">Where I’ve worked · who I’ve built for</p>
              <h2 className="b-h2" id="trust-title">
                Trusted with data that can’t leave the building
              </h2>
            </div>
            <p>Drag the ring to spin it. Click a logo to jump to the work I did there.</p>
          </div>
          <LogoRing />
          <div className="b-legend">
            <div>
              <b>Worked at</b> {profile.employers.map((o) => o.short).join(" · ")}
            </div>
            <div>
              <b>Built for</b> {profile.clients.map((o) => o.short).join(" · ")}
            </div>
          </div>
        </section>

        <section className="b-block" id="work" aria-labelledby="work-title">
          <WorkBento projects={projects} />
        </section>

        <section className="b-block" id="approach" aria-labelledby="ap-title">
          <div className="b-sh">
            <div>
              <p className="b-eyebrow">Approach</p>
              <h2 className="b-h2" id="ap-title">
                From source system to answer, layer by layer
              </h2>
            </div>
            <p>Most AI projects stall on the data underneath. Watch a record climb the stack: I work the whole path, so the model on top reads something you can trust.</p>
          </div>
          <LayerStack />
        </section>

        <section className="b-block" id="experience" aria-labelledby="xp-title">
          <div className="b-sh">
            <div>
              <p className="b-eyebrow">Experience</p>
              <h2 className="b-h2" id="xp-title">
                Three years, mostly public sector
              </h2>
            </div>
          </div>
          <ol className="b-xp">
            {experience.map((j, i) => {
              const org = profile.employers.find((o) => o.exp === j.id);
              return (
                <li key={j.id} id={j.id} className={`b-job${i === 0 ? " now" : ""}`}>
                  <span className="b-when">{j.period}</span>
                  <span className="b-co">
                    <span className="b-co-logo">
                      {org && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={org.logo} alt="" width={org.w} height={org.h} loading="lazy" />
                      )}
                    </span>
                    <h3 tabIndex={-1}>{j.company}</h3>
                  </span>
                  <span className="b-role">{j.title}</span>
                  <p>{j.detail}</p>
                  {j.projects.length > 0 && (
                    <ul className="b-job-projects" aria-label={`Projects at ${j.company}`}>
                      {j.projects.map((slug) => {
                        const pr = projects.find((x) => x.slug === slug)!;
                        return (
                          <li key={slug}>
                            <Link href={`/work/${slug}`}>{pr.short}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="b-edu">
            <div className="b-tile">
              <span className="b-eyebrow">Education</span>
              <h3>{education.degree}</h3>
              <p className="muted">
                {education.school}, {education.period}
              </p>
              <span className="b-row">
                <span className="b-chip hot">Ranked 1st in class</span>
                <span className="b-chip">GPA 3.5 / 4.0</span>
              </span>
            </div>
            <div className="b-tile">
              <span className="b-eyebrow">Certifications</span>
              <ul className="b-certs">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.badge} alt="" width={36} height={36} loading="lazy" />
                      <span>
                        <b>{c.name}</b>
                        <small>
                          {c.issuer}, {c.year}
                        </small>
                      </span>
                      <em>Verify ↗</em>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="b-block" id="services" aria-labelledby="sv-title">
          <div className="b-sh">
            <div>
              <p className="b-eyebrow">Work with me</p>
              <h2 className="b-h2" id="sv-title">
                Consulting, freelance builds and research
              </h2>
            </div>
            <p>Alongside my role at Petra Ride I take on a small number of outside engagements. Pick the one that fits and the form below is set up for it.</p>
          </div>
          <Services />
        </section>
      </div>

      <Contact />
    </>
  );
}
