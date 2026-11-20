import { profile } from "@/content/profile";
import type { Project } from "@/content/projects";

export const orgs = [...profile.employers, ...profile.clients];

/** The logo to show next to a project: its client if it has one on the ring, else the company that built it. */
export const logoFor = (p: Project) =>
  orgs.find((o) => o.target === `p-${p.slug}`) ?? orgs.find((o) => p.client.startsWith(o.name) || p.client.startsWith(o.short)) ?? orgs.find((o) => p.client.includes(o.name));
