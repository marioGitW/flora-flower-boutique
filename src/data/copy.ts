// Page copy. Business facts (phone, address, links) live in site.ts;
// service lines live in services.json; photo alt text in gallery.json.
// Formal address throughout: Вие / Ви / Вас / Ваш — always capitalised.
// No delivery for now — orders are picked up at the shop.

export const copy = {
  hero: {
    kind: "Бутик за цвеќе",
    // tagline comes from site.tagline
    lead: "Секој букет и аранжман го правиме по нарачка — за Вашата прилика и за човекот што ќе го добие.",
    callLabel: "Повикај", // followed by site.phoneFormatted
    viberLabel: "Пиши ни на Viber",
  },

  services: {
    heading: "Услуги",
    intro: "Секоја прилика има свое цвеќе. Кажете ни ја Вашата, а ние ќе се погрижиме за останатото.",
    // Card action: opens call / Viber for that category.
    orderLabel: "Нарачајте",
    // Sheet that opens when a card is tapped (JS only; without JS the card just calls).
    sheetLead: "Јавете ни се или пишете ни — заедно ќе се договориме за деталите.",
    sheetClose: "Затвори",
  },

  gallery: {
    heading: "Галерија",
    intro: "Дел од она што сме го изработиле досега. Секоја нарачка е различна — како и приликата за која е наменета.",
    filterAll: "Сè",
    filterLabel: "Филтрирај по прилика",
    open: "Отвори ја фотографијата:", // + alt text
    close: "Затвори",
    prev: "Претходна фотографија",
    next: "Следна фотографија",
    counter: "од", // "3 од 16"
  },

  howToOrder: {
    heading: "Како нарачувате",
    intro: "Едноставно е — три чекори и готово.",
    steps: [
      {
        title: "Јавете се или пишете",
        text: "Јавете ни се на телефон или пишете ни на Viber, WhatsApp или Instagram.",
      },
      {
        title: "Се договараме",
        text: "Кажете ни за приликата и за кого е цвеќето. Заедно ги избираме деталите, стилот и буџетот.",
      },
      {
        title: "Подготвуваме за Вас",
        text: "Аранжманот го изработуваме рачно, по Ваша нарачка, и Ве чека во бутикот.",
      },
    ],
    cta: "Повикај", // followed by site.phoneFormatted
  },

  about: {
    heading: "За нас",
    paragraphs: [
      "Флора е бутик за цвеќе и подароци во Куманово.",
      "Секој букет и аранжман го правиме по нарачка — ништо не чека готово на полица.",
      "Прво прашуваме за приликата и за човекот што ќе го добие, а потоа ги бираме цвеќињата, боите и пакувањето.",
      "Затоа секој подарок што ќе излезе од бутикот е единствен.",
    ],
    imageAlt:
      "Внатрешноста на бутикот Флора: ѕидови со пастелни розови, жолти, виолетови и зелени панели и полици полни со шарени панделки.",
  },

  contact: {
    heading: "Контакт",
    intro: "Јавете се, пишете ни или свратете во бутикот.",
    addressLabel: "Адреса",
    phoneLabel: "Телефон",
    hoursLabel: "Работно време",
    hoursPending: "Работното време наскоро ќе го објавиме.", // shown only if site.hours is null
    viber: "Viber",
    viberAction: "Пишете ни на Viber",
    whatsapp: "WhatsApp",
    whatsappAction: "Пишете ни на WhatsApp",
    instagram: "Instagram",
    mapTitle: "Мапа — локација на бутикот Флора",
  },

  nav: {
    label: "Главна навигација",
    open: "Отвори мени",
    close: "Затвори мени",
    home: "Флора — на почетокот",
    quickContact: "Брз контакт",
    stickyCall: "Повикај",
    stickyViber: "Viber",
    headerCall: "Повикај",
    links: [
      { href: "#uslugi", label: "Услуги" },
      { href: "#galerija", label: "Галерија" },
      { href: "#kako-naracuvate", label: "Како нарачувате" },
      { href: "#za-nas", label: "За нас" },
      { href: "#kontakt", label: "Контакт" },
    ],
  },

  footer: {
    rights: "Сите права задржани.",
  },
} as const;
