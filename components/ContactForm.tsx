"use client";

import { useState } from "react";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; email: string } | { kind: "error"; text: string };

export default function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

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
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" autoComplete="name" required maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Your email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>
      <div className="field">
        <label htmlFor="cf-message">Your question or project</label>
        <textarea id="cf-message" name="message" rows={5} required maxLength={5000} />
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
