# Ali Hamdan, AI & Data Engineer

Personal portfolio. Next.js 16, TypeScript, plain CSS. Deployed on Vercel.

## Run it

```bash
npm install
npm run dev
```

## Edit content

Everything you see on the site lives in `content/`:

- `content/profile.ts`: name, headline, intro, links, client list
- `content/projects.ts`: case studies (problem, what I built, results, architecture diagram, stack)
- `content/experience.ts`: jobs, education, certifications, the source-to-answer pipeline

CVs are in `public/cv/`. Replace the PDFs to update the download buttons.

## Design notes

The colour system is one ultramarine "stamp" ink with four tints. The tints are the four NDMO
classification levels (Public, Restricted, Secret, Top Secret), and wherever they appear they mean
sensitivity. Type is Schibsted Grotesk, with JetBrains Mono only for data (table columns, diagram nodes).
