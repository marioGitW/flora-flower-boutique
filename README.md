# Флора — Бутик за цвеќе

Microsite for Flora Flower Boutique, Kumanovo. Built with Astro + Tailwind v4.

## Setup

```bash
npm install
npm run dev          # localhost:4321
npm run build        # static output in dist/
npm run preview      # preview the build
npm run format       # prettier
npm run lighthouse   # run lighthouse audit (start preview first)
```

## Adding a gallery photo

1. Place the edited image in `src/assets/images/gallery/`.
2. Add an entry to `src/content/gallery.json`:

```json
{
  "id": "unique-slug",
  "src": "/src/assets/images/gallery/filename.jpg",
  "alt": "Опис на сликата",
  "category": "buketi",
  "width": 800,
  "height": 1067
}
```

Categories: `novorodence`, `krstevki`, `aranzman-kutija`, `buketi`, `svadbi`,
`rodendeni`, `matura`, `svrsuvacki`, `dekoracija-avtomobili`, `venci`.

No component markup changes needed.

## Deploy

Static output — deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages).

Set the `site` value in `astro.config.mjs` to the production URL before deploying.

## Stack

- Astro 5 (static)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- TypeScript (strict)
- Self-hosted fonts via Fontsource (Playfair Display + Inter, Cyrillic)
- No UI framework — CSS + vanilla JS custom elements for motion
