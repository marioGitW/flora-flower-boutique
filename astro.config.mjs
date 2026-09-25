import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import pruneUnusedOriginals from "./src/integrations/prune-unused-originals.ts";

export default defineConfig({
  // TODO: domain not confirmed by the owner — verify before launch (drives canonical, OG and sitemap URLs).
  site: "https://floraboutique.mk",
  output: "static",
  integrations: [sitemap(), pruneUnusedOriginals()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "mk",
    locales: ["mk"],
  },
});
