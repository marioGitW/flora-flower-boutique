// Page copy. Business facts (phone, address, links) live in site.ts;
// service lines live in services.json; photo alt text in gallery.json.
// Formal address throughout: Вие / Ви / Вас / Ваш — always capitalised.
// No delivery for now — orders are picked up at the shop.

export const copy = {
  hero: {
    kind: "Бутик за цвеќе",
    // Second line of the h1, under the name: carries the search terms.
    kicker: "Цвеќара и бутик за цвеќе во Куманово",
    // tagline comes from site.tagline
    lead: "Секој букет и аранжман го правиме по нарачка — за Вашата прилика и за човекот што ќе го добие.",
    callLabel: "Повикај", // followed by site.phoneFormatted
    viberLabel: "Пиши ни на Viber",
  },

  services: {
    heading: "Услуги",
    intro: "Секоја прилика има свое цвеќе. Кажете ни ја Вашата, а ние ќе се погрижиме за останатото.",
    // Each card opens the gallery on its own category. Screen readers only,
    // read after the card's description.
    cardAction: "Погледнете ја галеријата.",
  },

  // Scrolling band between services and the gallery. Shown in capitals,
  // joined by a bullet; read out once as a sentence.
  band: {
    phrases: ["Свежо", "со љубов"],
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

  // The one place the page explains ordering: a timeline, one short line per
  // step. The first step also shows the phone and message links.
  howToOrder: {
    heading: "Како нарачувате",
    stepsLabel: "Од разговор до подарок",
    steps: [
      { title: "Разговор", text: "Јавете се или пишете" },
      { title: "Идеја", text: "Стил, бои и пакување" },
      { title: "Избор на цвеќе", text: "Цвеќиња и бои по Ваш вкус" },
      { title: "Изработка", text: "Рачно, по Ваша нарачка" },
      // TODO: confirm with owner whether they deliver. Until then this stays
      // pickup only (see top of file); don't mention delivery anywhere.
      { title: "Подигнување", text: "Подарокот Ве чека во бутикот" },
    ],
    cta: "Повикај", // followed by site.phoneFormatted
  },

  // Who the shop is, told through two moments from customers' weddings.
  about: {
    heading: "За нас",
    // TODO: draft copy — statement, body and tags are for the owner to review.
    statement: "Секој букет е дел од нечија приказна.",
    body: "Флора е бутик за цвеќе и подароци во Куманово. Секој аранжман го изработуваме рачно, по Ваша нарачка — а во бутикот ќе најдете и готови букети, аранжмани и подароци.",
    tags: ["Рачна изработка", "Готови подароци во бутикот", "Чоколатца со наше лого"],
    photos: {
      car: "Невеста со букет од бели каранфили и младоженец со шампањ во автомобил, по венчавката",
      bride: "Невеста во бел фустан носи букет од бели каранфили",
    },
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
    // Photo in the visit card, so people recognise the shop when they arrive.
    interiorAlt: "Внатрешноста на бутикот Флора во Куманово",
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
      { href: "#za-nas", label: "За нас" },
      { href: "#kako-naracuvate", label: "Како нарачувате" },
      { href: "#kontakt", label: "Контакт" },
    ],
  },

  footer: {
    rights: "Сите права задржани.",
  },
} as const;
