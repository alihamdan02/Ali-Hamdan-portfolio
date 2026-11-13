import Link from "next/link";
import { profile, type Client } from "@/content/profile";
import ThemeSwitch from "@/components/ThemeSwitch";

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
        <div className="header-right">
          <nav className="nav" aria-label="Main">
            <Link href="/#work">Work</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#contact" className="nav-keep">
              Contact
            </Link>
          </nav>
          <ThemeSwitch />
        </div>
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

export function ClientLogo({ client }: { client: Client }) {
  return client.logo ? (
    <span className="client-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={client.logo} alt={`${client.name} logo`} />
    </span>
  ) : (
    <span className="client-logo" data-empty="true" aria-hidden="true">
      {client.short}
    </span>
  );
}

export function Clients() {
  return (
    <div className="clients">
      <p>Organisations I have built for</p>
      <ul className="client-grid">
        {profile.clients.map((c) => (
          <li key={c.name} className="client">
            <ClientLogo client={c} />
            <div className="client-text">
              <b>{c.name}</b>
              <span>{c.work}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
