export const site = {
  name: "Флора",
  nameEn: "Flora Flower Boutique",
  nameFull: "Флора — Бутик за цвеќе",
  tagline: "Вашите моменти, наши цветни инспирации",

  phone: "078207443",
  phoneFormatted: "078 207 443",
  phoneHref: "tel:+38978207443",
  viberHref: "viber://chat?number=%2B38978207443",
  whatsappHref: "https://wa.me/38978207443",

  instagram: "@flora__flowerboutique",
  instagramUrl: "https://www.instagram.com/flora__flowerboutique/",

  address: {
    street: "Ул. 3-та МУБ бр. 30",
    city: "Куманово",
    country: "Северна Македонија",
    full: "Ул. 3-та МУБ бр. 30, Куманово",
  },

  // TODO: coordinates not confirmed — check against the shop's real pin before launch (used in JSON-LD).
  geo: {
    lat: 42.1322,
    lng: 21.7144,
  },

  // TODO: days not confirmed — only the time is known. Add e.g. days: "Понеделник – Сабота".
  hours: [{ time: "10:00 – 18:00" }] as null | ReadonlyArray<{ days?: string; time: string }>,

  mapUrl:
    "https://maps.google.com/?q=Ул.+3-та+МУБ+бр.+30,+Куманово",
  // Keyless embed, searched by address (not by the unconfirmed geo pin).
  mapEmbedUrl:
    "https://maps.google.com/maps?q=%D0%A3%D0%BB.%203-%D1%82%D0%B0%20%D0%9C%D0%A3%D0%91%2030%2C%20%D0%9A%D1%83%D0%BC%D0%B0%D0%BD%D0%BE%D0%B2%D0%BE&z=16&output=embed",

  meta: {
    title: "Флора — Бутик за цвеќе | Куманово",
    description:
      "Флора — бутик за цвеќе и подароци во Куманово. Букети, аранжмани во кутија, подароци за новороденче, крштевки, свадби и венци, по нарачка. Јавете се на 078 207 443.",
    ogImage: "/og-image.jpg",
  },
} as const;

export type Site = typeof site;
