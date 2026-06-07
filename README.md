# Procurement Governance Platform — Prototype

A branded, clickable prototype of the **AI-Powered Procurement Governance Platform** for the Ministry of Tourism. It demonstrates the end-to-end experience: upload a procurement document, view an AI analysis with a quality score and categorised findings, review prioritised recommendations, see an automatically improved (before/after) version, and read an executive report.

> This is a **front-end demonstration** using representative sample data — there is no live AI backend. It is intended for stakeholder walkthroughs and leadership presentations.

## Branding
- **Colours** — official Ministry palette (dark green `#003232`, aqua `#009696`, mid green `#007846`, purple `#785fdc`, grey `#556478`).
- **Font** — FS Albert Arabic (embedded in `/fonts`, loaded via `@font-face`).
- **Logo** — official Ministry of Tourism logo.

## Tech
Zero-build static site (plain HTML/CSS/JS). No framework, no build step.

```
index.html
assets/styles.css
assets/app.js
assets/logo-white.svg
fonts/FSAlbertArabic-*.otf
vercel.json
```

## Run locally
Open `index.html` in a browser, or serve the folder with any static file server.

## Deploy to Vercel
From this folder:

```bash
vercel login      # one-time, opens your browser
vercel --prod     # deploys; accept the defaults
```

No build command or output directory is required — Vercel serves the static files directly.
