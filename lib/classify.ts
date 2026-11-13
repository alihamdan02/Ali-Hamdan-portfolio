import { levels, type Level } from "@/content/profile";

/**
 * A small, readable rule set that mimics how a column name points to an NDMO level.
 * It is illustrative: the production agents read data samples, glossaries and policy, not just names.
 */
type Rule = { level: Level; words: string[]; why: string };

const rules: Rule[] = [
  {
    level: "Top Secret",
    words: ["security", "clearance", "intelligence", "classified", "military", "defense", "defence", "weapon",
      "screening", "surveillance", "threat", "covert", "secretkey", "privatekey", "encryption"],
    why: "points to national-security or intelligence content, where disclosure could cause exceptionally grave damage",
  },
  {
    level: "Secret",
    words: ["national", "nid", "iqama", "passport", "ssn", "salary", "wage", "iban", "account", "card", "cvv",
      "password", "pwd", "pin", "medical", "diagnosis", "health", "biometric", "fingerprint", "religion",
      "ethnicity", "criminal", "visa", "tax", "bank", "insurance"],
    why: "identifies a person directly or exposes sensitive personal, financial or health data",
  },
  {
    level: "Restricted",
    words: ["fullname", "firstname", "lastname", "customer", "applicant", "person", "email", "phone", "mobile", "address", "employee", "staff", "contract",
      "internal", "approval", "budget", "cost", "supplier", "vendor", "gender", "age", "birth", "dob", "salary_band",
      "manager", "department", "status", "note", "notes", "comment", "ip"],
    why: "is internal or personal but low-impact; it should stay inside the organisation",
  },
  {
    level: "Public",
    words: ["country", "nationality", "city", "region", "language", "currency", "category", "type", "created",
      "updated", "date", "year", "title", "description", "product", "public", "port", "gate", "website", "count"],
    why: "describes general or reference information that could be published without harm",
  },
];

const known = new Set(rules.flatMap((r) => r.words));

export type Verdict = { level: Level; confidence: number; matched: string[]; why: string };

export function tokens(name: string) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

export function classify(name: string): Verdict | null {
  const t = tokens(name);
  if (!t.length) return null;
  const joined = t.join("");
  // Compound words written without separators ("nationalid", "privatekey") are searched inside
  // the whole name, but a token that is itself a known word ("nationality") is never split.
  const unknown = t.filter((x) => !known.has(x)).join("|");
  const hit = (w: string) => t.includes(w) || joined === w || (w.length > 5 && unknown.includes(w));
  // Highest level wins: one sensitive word is enough to raise the whole column.
  for (const level of [...levels].reverse()) {
    const rule = rules.find((r) => r.level === level)!;
    const matched = rule.words.filter(hit);
    if (matched.length) {
      return { level, confidence: Math.min(0.97, 0.78 + 0.08 * matched.length), matched, why: rule.why };
    }
  }
  return {
    level: "Restricted",
    confidence: 0.55,
    matched: [],
    why: "has no clear signal in its name, so it stays Restricted until a reviewer looks at sample values",
  };
}
