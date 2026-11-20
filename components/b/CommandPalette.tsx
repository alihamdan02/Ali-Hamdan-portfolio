"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { projects } from "@/content/projects";
import { engagements, profile, type Topic } from "@/content/profile";
import { applyTheme } from "@/lib/theme";
import { jumpTo } from "@/lib/jump";

type Item = { label: string; kind: string; run: () => void; keys?: string };

/** Ctrl/⌘ K anywhere: jump to a section, a project or a setting. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const path = usePathname();

  const go = useCallback(
    (id: string) => {
      if (path === "/") jumpTo(id);
      else router.push(`/#${id}`);
    },
    [path, router]
  );
  const ask = useCallback(
    (t: Topic) => {
      window.dispatchEvent(new CustomEvent("contact-topic", { detail: t }));
      go("contact");
    },
    [go]
  );

  const items: Item[] = useMemo(
    () => [
      { label: "Selected work", kind: "section", run: () => go("work") },
      { label: "Approach, layer by layer", kind: "section", run: () => go("approach") },
      { label: "Experience", kind: "section", run: () => go("experience") },
      { label: "Services", kind: "section", run: () => go("services") },
      { label: "Contact", kind: "section", run: () => go("contact") },
      ...projects.map((p) => ({ label: p.title, kind: "case study", keys: `${p.client} ${p.short} ${p.stack.join(" ")}`, run: () => router.push(`/work/${p.slug}`) })),
      ...engagements.map((e) => ({ label: e.title, kind: "project", keys: `${e.client} ${e.meta} King Abdulaziz Foundation`, run: () => go(e.id) })),
      { label: "Book a consultation", kind: "work with me", run: () => ask("consulting") },
      { label: "Start a freelance project", kind: "work with me", run: () => ask("freelance") },
      { label: "Propose a research collaboration", kind: "work with me", run: () => ask("research") },
      { label: "Download AI Engineer CV", kind: "file", run: () => (window.location.href = profile.cv.ai) },
      { label: "Download Data Engineer CV", kind: "file", run: () => (window.location.href = profile.cv.data) },
      { label: "Theme: dark", kind: "setting", run: () => applyTheme("dark") },
      { label: "Theme: light", kind: "setting", run: () => applyTheme("light") },
      { label: "Theme: match system", kind: "setting", run: () => applyTheme("system") },
      { label: "Copy email address", kind: "action", run: () => navigator.clipboard?.writeText(profile.email).catch(() => {}) },
      ...profile.links.map((l) => ({ label: `Open ${l.label}`, kind: "link", run: () => window.open(l.href, "_blank", "noopener") })),
    ],
    [go, ask, router]
  );

  const shown = items.filter((i) => !q.trim() || `${i.label} ${i.kind} ${i.keys ?? ""}`.toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const openEv = () => setOpen(true);
    window.addEventListener("keydown", key);
    window.addEventListener("open-cmdk", openEv);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("open-cmdk", openEv);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => input.current?.focus(), 10);
    }
  }, [open]);

  const run = (i: number) => {
    const it = shown[i];
    if (!it) return;
    setOpen(false);
    it.run();
  };

  if (!open) return null;
  return (
    <div className="b-cmdk" role="dialog" aria-modal="true" aria-label="Quick menu" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="b-cmdk-box">
        <div className="b-cmdk-in">
          <span aria-hidden="true">&gt;_</span>
          <input
            ref={input}
            autoFocus
            value={q}
            aria-label="Search"
            placeholder="Jump to a project, section or setting"
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
              else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(shown.length - 1, s + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(0, s - 1));
              } else if (e.key === "Enter") run(sel);
            }}
          />
        </div>
        <ul role="listbox">
          {shown.length === 0 && <li className="b-cmdk-empty">No match. Try “warehouse” or “theme”.</li>}
          {shown.map((it, i) => (
            <li key={it.label} role="option" aria-selected={i === sel} className={i === sel ? "sel" : ""} onMouseEnter={() => setSel(i)} onClick={() => run(i)}>
              <span>{it.label}</span>
              <small>{it.kind}</small>
            </li>
          ))}
        </ul>
        <div className="b-cmdk-foot">
          <span>↑↓ move</span>
          <span>Enter open</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );
}
