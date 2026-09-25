# CLAUDE.md

Read **AGENTS.md** — it is the single source of truth for project rules, git
conventions, stack constraints, and content policies. Everything below is
Claude-specific only.

## Commands

```
npm run dev          # dev server on :4321
npm run build        # static build → dist/
npm run preview      # preview build
npm run format       # prettier
```

## Key paths

- `src/data/site.ts` — phone, address, socials (single source of truth)
- `src/content/services.json` — service categories (zod-validated)
- `src/content/gallery.json` — gallery entries (zod-validated)
- `src/styles/global.css` — design tokens in `@theme`, keyframes
- `brand-images/` — raw originals, never imported by build
