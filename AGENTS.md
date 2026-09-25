# AGENTS.md

Canonical rules for any agent working in this repo.

## Project

One-page mobile-first microsite for Flora Flower Boutique, a flower and gift
shop in Kumanovo, North Macedonia.

**Goal:** lead capture — a phone call or a Viber message. No cart, no checkout,
no payment, no contact form, no accounts. Do not add any.

All user-facing content is Macedonian (Cyrillic). Never ship English or lorem
ipsum into the page. Never machine-translate without flagging it.

Mobile is the primary target. Design at 390px first; desktop adapts upward.

## Stack

- Astro 5, static output.
- Tailwind v4 via `@tailwindcss/vite`. Tokens in `@theme` in CSS.
  Do not create `tailwind.config.js`. Do not install `@astrojs/tailwind`.
- TypeScript, strict.
- Self-hosted fonts via Fontsource (Cyrillic subsets required).
- No UI framework, no component library, no animation library.

## Git — strict, no exceptions

- **No AI attribution.** No `Co-Authored-By`, no `Generated with`, no tool
  names in commits, PR descriptions, code comments, or anywhere in the repo.
- Commit messages are a **subject line only**. No body, no bullets, no
  explanation.
- Format: `<type>: <short description in lowercase>`
  - Types: `feat`, `bugfix`, `style`, `refactor`, `perf`, `chore`, `docs`
  - Keep under ~60 characters.
- Never commit or push unless explicitly asked.

## Content & data

- Content lives in `src/content/*.json` and `src/data/site.ts`.
- Adding a photo or changing a phone number must never require editing
  component markup.
- `brand-images/` holds raw originals and placeholders. It is not imported by
  the build. Photography will be replaced before launch.
- Never invent business facts — prices, working hours, services, delivery
  terms. If something is missing, ask.

## Fonts

Must carry a full Cyrillic subset. Check ѓ ќ џ ј љ њ ѕ before approving any
typeface. Latin rendering proves nothing.

## Motion

- `transform` and `opacity` only — nothing that triggers layout or paint.
- IntersectionObserver-driven, fires once, paused offscreen.
- Full `prefers-reduced-motion` path: instant final state, petals removed.
- No canvas particles, no animation libraries, no parallax on text, no
  autoplay video, no auto-advancing carousels.

## Performance

- Lighthouse mobile ≥ 95 performance and accessibility.
- LCP < 2.5 s, CLS < 0.1, measured with animations running.
- Treat a regression as a bug.

## Accessibility

- WCAG AA.
- Gold (`#C9A961`) and pastels fail contrast as text — use them for lines,
  fills, and detail only.

## Dependencies

No new dependencies without asking first.
