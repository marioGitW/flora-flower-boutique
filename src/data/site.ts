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

  geo: {
    lat: 42.1322,
    lng: 21.7144,
  },

  mapUrl:
    "https://maps.google.com/?q=Ул.+3-та+МУБ+бр.+30,+Куманово",

  meta: {
    title: "Флора — Бутик за цвеќе | Куманово",
    description:
      "Флора — бутик за цвеќе и подароци во Куманово. Букети, аранжмани, подароци за новороденче, свадбени декорации и венци.",
    ogImage: "/og-image.png",
  },
} as const;

export type Site = typeof site;
