import Link from "next/link";
import { profile, type Client } from "@/content/profile";
import ThemeSwitch from "@/components/ThemeSwitch";
import ContactForm from "@/components/ContactForm";
import WhatsApp from "@/components/WhatsApp";
import LogoReveal from "@/components/motion/LogoReveal";
import Cube from "@/components/b/Cube";
import CmdButton from "@/components/b/CmdButton";
import ScrollProgress from "@/components/b/ScrollProgress";
import Jump from "@/components/b/Jump";
import { brandIcons } from "@/lib/brandIcons";
import CopyEmail from "@/components/b/CopyEmail";
import PhotoZoom from "@/components/b/PhotoZoom";

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
    <header className="b-nav" aria-label="Site">
      <Link href="/" className="b-brand">
        <Cube />
        <span>
          <b>{profile.name}</b>
          <small>{profile.role}</small>
        </span>
      </Link>
      <nav className="b-links" aria-label="Main">
        <Link href="/#work">Work</Link>
        <Link href="/#approach">Approach</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#services">Services</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <div className="b-nav-right">
        <CmdButton />
        <ThemeSwitch />
        <Jump to="contact" className="btn btn-primary b-magnet b-talk">
          Let’s talk
        </Jump>
      </div>
      <ScrollProgress />
    </header>
  );
}

export function Contact() {
  return (
    <section className="b-contact-wrap" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
      <div className="b-contact">
        <div className="contact-info">
          <p className="b-eyebrow">Contact</p>
          <h2 className="b-h2" id="contact-title">
            Have data to govern or an AI system to build?
          </h2>
          <p className="lede">
            Ask me a question, tell me about a project, or just say hello. I read everything and reply within a day.
          </p>
          <div className="b-mail">
            <PhotoZoom className="b-me-small">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/me.webp" alt="" width={760} height={883} loading="lazy" />
            </PhotoZoom>
            <CopyEmail email={profile.email} />
          </div>
          <div className="actions">
            <WhatsApp />
            <a className="btn" href={profile.cv.ai} download>
              AI Engineer CV <small>PDF</small>
            </a>
            <a className="btn" href={profile.cv.data} download>
              Data Engineer CV <small>PDF</small>
            </a>
          </div>
          <ul className="b-socials" aria-label="Find me elsewhere">
            {profile.links.map((l) => {
              const icon = brandIcons[l.label];
              return (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label} style={{ "--brand": icon?.hex } as React.CSSProperties}>
                    {icon ? (
                      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                        <path d={icon.path} fill="currentColor" />
                      </svg>
                    ) : (
                      l.label
                    )}
                    <span>{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <ContactForm />
      </div>
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
        <span className="b-foot-k">
          Press <kbd>Ctrl K</kbd> anywhere
        </span>
        <span>
          Colours on this site follow the four NDMO data classification levels
          <span className="b-sw" aria-hidden="true">
            <i data-l="0" />
            <i data-l="1" />
            <i data-l="2" />
            <i data-l="3" />
          </span>
        </span>
      </div>
    </footer>
  );
}

export function ClientLogo({ client }: { client: Client }) {
  return client.logo ? (
    <span className="client-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={client.logo} alt={`${client.name} logo`} width={client.w} height={client.h} loading="lazy" decoding="async" />
    </span>
  ) : (
    <span className="client-logo" data-empty="true" aria-hidden="true">
      {client.short}
    </span>
  );
}

function OrgGroup({ title, orgs }: { title: string; orgs: Client[] }) {
  return (
    <div className="org-group">
      <p>{title}</p>
      <ul className="client-grid">
        {orgs.map((c) => (
          <li key={c.name} className="client">
            <a href={`#${c.exp}`} className="client-card" data-flash={c.exp}>
              <ClientLogo client={c} />
              <div className="client-text">
                <b>{c.name}</b>
                <span>{c.work}</span>
                <em className="client-more">{c.more}</em>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Clients() {
  return (
    <LogoReveal>
      <OrgGroup title="Where I’ve worked" orgs={profile.employers} />
      <OrgGroup title="Who I’ve built for" orgs={profile.clients} />
    </LogoReveal>
  );
}
