"use client";

import { useEffect, useState } from "react";
import { topics, type Topic } from "@/content/profile";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; email: string } | { kind: "error"; text: string };

export default function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [topic, setTopic] = useState<Topic>("freelance");
  const t = topics.find((x) => x.value === topic)!;

  // The Services cards and the quick menu pre-select a topic.
  useEffect(() => {
    const on = (e: Event) => {
      setState((s) => (s.kind === "sent" ? { kind: "idle" } : s));
      setTopic((e as CustomEvent<Topic>).detail);
    };
    window.addEventListener("contact-topic", on);
    return () => window.removeEventListener("contact-topic", on);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "The message didn’t send. Try again, or email me directly.");
      setState({ kind: "sent", email: String(data.email) });
      form.reset();
    } catch (err) {
      setState({ kind: "error", text: (err as Error).message });
    }
  }

  if (state.kind === "sent") {
    return (
      <div className="form-done" role="status">
        <p className="h3">Message sent</p>
        <p>I’ll reply to {state.email}, usually within a day.</p>
        <button type="button" className="rerun" onClick={() => setState({ kind: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <fieldset className="b-topics">
        <legend>What’s this about?</legend>
        {topics.map((x) => (
          <span key={x.value}>
            <input type="radio" name="topic" id={`cf-t-${x.value}`} value={x.value} checked={topic === x.value} onChange={() => setTopic(x.value)} />
            <label htmlFor={`cf-t-${x.value}`}>{x.label}</label>
          </span>
        ))}
      </fieldset>
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" autoComplete="name" required maxLength={120} placeholder="Omar Khaled" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Your email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="omar@company.com" />
      </div>
      <div className="field">
        <label htmlFor="cf-message">{t.prompt}</label>
        <textarea id="cf-message" name="message" rows={5} required maxLength={5000} placeholder={t.example} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      {state.kind === "error" && (
        <p className="form-error" role="alert">
          {state.text}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
