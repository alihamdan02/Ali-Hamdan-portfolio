"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

export default function WhatsApp() {
  // Rendered as a plain anchor to the contact section until the browser assembles the real link.
  const [href, setHref] = useState("#contact");
  useEffect(() => {
    const text = encodeURIComponent("Hi Ali, I found your portfolio and wanted to ask about ");
    setHref(`https://wa.me/${profile.whatsapp.join("")}?text=${text}`);
  }, []);

  return (
    <a className="btn btn-wa" href={href} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4V5.5Z" strokeLinejoin="round" />
      </svg>
      Message me on WhatsApp
    </a>
  );
}
