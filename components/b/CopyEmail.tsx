"use client";

import { useState } from "react";

/** The address stays readable; one click copies it, because mail links often open nothing. A small icon still opens the mail app. */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const r = document.createRange();
      const el = document.getElementById("b-email-text");
      if (el) {
        r.selectNodeContents(el);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(r);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <span className="b-email">
      <button type="button" className="b-email-copy" onClick={copy} aria-label={`Copy ${email}`}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M4 7l8 6 8-6" />
        </svg>
        <span id="b-email-text">{email}</span>
        <span className={`b-email-tag${copied ? " on" : ""}`} aria-live="polite">
          {copied ? "Copied ✓" : "Click to copy"}
        </span>
      </button>
      <a className="b-email-open" href={`mailto:${email}`} aria-label="Open in your mail app" title="Open in your mail app">
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 12L12 4M6 4h6v6" />
        </svg>
      </a>
    </span>
  );
}
