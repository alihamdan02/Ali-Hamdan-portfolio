import Classifier from "@/components/Classifier";
import WorkList from "@/components/WorkList";
import { Contact } from "@/components/Chrome";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { certifications, education, experience, pipeline } from "@/content/experience";

export default function Home() {
  return (
    <>
      <div className="wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="whereabouts">
              {profile.role}, {profile.location}
            </p>
            <h1 className="display" id="hero-title">
              {profile.headline}
            </h1>
            <p className="lede">{profile.intro}</p>
            <div className="actions">
              <a className="btn btn-primary" href={profile.cv.ai} download>
                AI Engineer CV <small>PDF</small>
              </a>
              <a className="btn" href={profile.cv.data} download>
                Data Engineer CV <small>PDF</small>
              </a>
              <a className="link" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
          <Classifier />
        </section>

        <div className="clients">
          <p>Built for</p>
          <ul>
            {profile.clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="section" id="work">
        <div className="wrap">
          <WorkList projects={projects} />
        </div>
      </section>

      <section className="section" aria-labelledby="stack-title">
        <div className="wrap">
          <div className="section-head">
            <div style={{ display: "grid", gap: "0.9rem" }}>
              <h2 className="h2" id="stack-title">
                From source system to answer
              </h2>
              <p className="muted">
                Most AI projects stall on the data underneath. I work the whole path, so the model on top is reading
                something you can trust.
              </p>
            </div>
          </div>
          <ol className="pipeline">
            {pipeline.map((s, i) => (
              <li key={s.stage} className="stage">
                <span className="stage-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{s.stage}</h3>
                <p>{s.does}</p>
                <ul>
                  {s.tools.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="experience" aria-labelledby="exp-title">
        <div className="wrap">
          <div className="cols">
            <div style={{ display: "grid", gap: "0.9rem", alignContent: "start" }}>
              <h2 className="h2" id="exp-title">
                Experience
              </h2>
              <p className="muted">Three years across data engineering and applied AI, most of it for the public sector.</p>
            </div>
            <ol className="jobs">
              {experience.map((j) => (
                <li key={j.company} className="job">
                  <span className="job-period">{j.period}</span>
                  <div>
                    <h3 className="h3">{j.company}</h3>
                    <p className="muted">{j.title}</p>
                    <p>{j.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="credentials">
            <div className="degree">
              <p className="muted small">
                {education.school}, {education.period}
              </p>
              <h3 className="h3">{education.degree}</h3>
              <p className="degree-note">{education.note}</p>
            </div>
            <div>
              <h3 className="h3" style={{ marginBottom: "0.9rem" }}>
                Certifications
              </h3>
              <ul className="certs">
                {certifications.map((c) => (
                  <li key={c.name}>
                    {c.name}
                    <span>
                      {c.issuer}, {c.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
