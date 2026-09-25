import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const services = defineCollection({
  loader: file("src/content/services.json"),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

const gallery = defineCollection({
  loader: file("src/content/gallery.json"),
  schema: z.object({
    src: z.string(),
    alt: z.string(),
    category: z.string(),
    width: z.number(),
    height: z.number(),
  }),
});

export const collections = { services, gallery };
