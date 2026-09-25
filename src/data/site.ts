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
  // Opens a DM instead of the profile. Checked: ig.me redirects to Instagram's
  // DM route (instagram.com/m/<handle>); logged-out browsers get the login
  // page first and continue to the chat after signing in.
  instagramDmHref: "https://ig.me/m/flora__flowerboutique",

  address: {
    street: "Ул. 3-та МУБ бр. 30",
    city: "Куманово",
    country: "Северна Македонија",
    full: "Ул. 3-та МУБ бр. 30, Куманово",
  },

  // From the shop's own Google Maps place ("Цвеќара Флора").
  geo: {
    lat: 42.1315,
    lng: 21.71895,
  },

  hours: [{ days: "Понеделник – Сабота", time: "10:00 – 18:00ч" }],

  // Google Maps place "Цвеќара Флора" — the owner's pin.
  mapUrl: "https://maps.google.com/?cid=3073187388721178971",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d503.25964542926715!2d21.71895419601442!3d42.13150003701935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13544f00096d24cd%3A0x2aa627a5c8efa95b!2z0KbQstC10ZzQsNGA0LAg0KTQu9C-0YDQsA!5e1!3m2!1smk!2smk!4v1790367880145!5m2!1smk!2smk",

  meta: {
    title: "Флора — Бутик за цвеќе | Куманово",
    description:
      "Флора — бутик за цвеќе и подароци во Куманово. Букети, аранжмани во кутија, подароци за новороденче, крштевки, свадби и венци, по нарачка. Јавете се на 078 207 443.",
    ogImage: "/og-image.jpg",
  },
} as const;

export type Site = typeof site;
