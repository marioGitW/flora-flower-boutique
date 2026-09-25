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
    // Each card opens the gallery on its own category. Read after the service name.
    cardAction: "погледнете ја галеријата",
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
    lead: "Бутик за цвеќе и подароци во Куманово.",
    // How an order goes, as a timeline. One short line per step.
    stepsLabel: "Од разговор до подарок",
    steps: [
      { title: "Разговор", text: "За приликата и за кого е" },
      { title: "Идеја", text: "Стил, бои и пакување" },
      { title: "Избор на цвеќе", text: "Цвеќиња и бои по Ваш вкус" },
      { title: "Изработка", text: "Рачно, по Ваша нарачка" },
      // TODO: the brief listed "достава" here, but delivery is not confirmed —
      // orders are picked up at the shop (see top of file). Confirm with the owner.
      { title: "Подигнување", text: "Подарокот Ве чека во бутикот" },
    ],
    imageAlt:
      "Внатрешноста на бутикот Флора: ѕидови со пастелни розови, жолти, виолетови и зелени панели и полици полни со шарени панделки.",
  },

  contact: {
    heading: "Контакт",
    // Group headings; shown in capitals.
    call: "Повик",
    message: "Порака",
    visit: "Посета",
    // Accessible names for icon-only links (contact section and footer).
    phoneAction: "Јавете ни се на", // followed by site.phoneFormatted
    viberAction: "Пишете ни на Viber",
    whatsappAction: "Пишете ни на WhatsApp",
    instagramAction: "Пишете ни на Instagram",
    hoursLabel: "Работно време",
    showMap: "Прикажи мапа",
    openInMaps: "Отвори во Google Maps",
    newWindow: "(се отвора во нов прозорец)",
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
