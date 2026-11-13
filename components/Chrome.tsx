import Link from "next/link";
import { profile } from "@/content/profile";

export function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link href="/" className="wordmark">
          <Mark />
          {profile.name}
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#work">Work</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#contact" className="nav-keep">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <h2 className="h2" id="contact-title">
          Have data to govern or an AI system to build?
        </h2>
        <p className="lede">
          I’m open to full-time roles and project work across Jordan and the Gulf. Email is the fastest way to reach
          me.
        </p>
        <a className="email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="actions">
          <a className="btn btn-primary" href={profile.cv.ai} download>
            AI Engineer CV <small>PDF</small>
          </a>
          <a className="btn" href={profile.cv.data} download>
            Data Engineer CV <small>PDF</small>
          </a>
        </div>
        <ul className="contact-links">
          {profile.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} {profile.name}, {profile.location}
        </span>
        <span>Colours on this site follow the four NDMO data classification levels.</span>
      </div>
    </footer>
  );
}
