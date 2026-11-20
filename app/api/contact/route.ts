import { NextResponse } from "next/server";
import { profile } from "@/content/profile";

/**
 * Sends contact-form messages to Ali by email through Resend (https://resend.com).
 * Set on Vercel: RESEND_API_KEY, and optionally CONTACT_TO_EMAIL (defaults to the profile email).
 * Without a domain verified in Resend, the sender is onboarding@resend.dev and mail can only go
 * to the address the Resend account was created with, which is exactly what this form needs.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data could not be read. Refresh the page and try again." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  const topicLabels: Record<string, string> = { consulting: "Consulting", freelance: "Freelance project", research: "Research", role: "Full-time role", hi: "Hello" };
  const topic = topicLabels[String(body.topic ?? "")] ?? "Message";

  // Honeypot: real people never see or fill this field.
  if (String(body.company ?? "")) return NextResponse.json({ ok: true });

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Add your name, a valid email and a message." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: `The form isn’t connected yet. Email me directly at ${profile.email}.` },
      { status: 503 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || profile.email],
      reply_to: email,
      subject: `[${topic}] Portfolio message from ${name}`,
      text: `Topic: ${topic}\n\n${message}\n\n— ${name} <${email}>`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `The message didn’t send. Email me directly at ${profile.email}.` },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
