"use client";

import { jumpTo } from "@/lib/jump";

/** Opens the contact form set to a freelance project, with this case study already mentioned in the message. */
export default function AskAbout({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("contact-topic", { detail: "freelance" }));
        jumpTo("contact");
        setTimeout(() => {
          const m = document.getElementById("cf-message") as HTMLTextAreaElement | null;
          if (m && !m.value.trim()) m.value = `I read the “${title}” case study and I’d like something similar for `;
          m?.focus({ preventScroll: true });
        }, 900);
      }}
    >
      {children}
    </button>
  );
}
