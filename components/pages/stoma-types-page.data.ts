type AssetType = "image" | "pdf";

type MedicalAsset = {
  type: AssetType;
  src: string;
  alt: string;
  isSensitive?: boolean;
};

type Fact = {
  label: "Lokacija" | "Sadržaj";
  value: string;
};

export type StomaTypeCardData = {
  title: string;
  description: string;
  facts: Fact[];
  asset: MedicalAsset;
  className?: string;
  noteTitle?: string;
  note?: string;
  splitNoteLayout?: boolean;
};

export const STOMA_TYPES_PAGE_INTRO = {
  label: "Programi / Stoma",
  title: "Tipovi stome",
  description:
    "Upoznavanje sa vrstom stome je ključni korak ka sigurnosti i pravilnom odabiru pomagala za svakodnevnu negu. Kod pojedinih tipova, poput urostome, važno je razumeti i dodatni hirurški kontekst.",
} as const;

export const KOLOSTOMA_SECTION = {
  title: "Kolostoma",
  description:
    "Nastaje kada se otvoreni kraj zdravog debelog creva izvuče na površinu stomaka (abdomena) i tu se fiksira kako bi se formirao otvor za izbacivanje sadržaja iz creva. Kolostoma u zavisnosti od vremena trajanja može biti privremena ili trajna.",
  items: [
    {
      title: "Ascendentna",
      description:
        "Može biti izvedena na desnoj strani abdomena i tada je sadržaj tečan ili polutečan i jako iritira kožu ukoliko dođe u kontakt sa njom.",
      facts: [
        { label: "Lokacija", value: "Desna strana abdomena" },
        { label: "Sadržaj", value: "Tečan ili polutečan" },
      ],
      asset: {
        type: "image",
        src: "/assets/ascendentna-kolostoma.png",
        alt: "Ilustracija ascendentne kolostome",
        isSensitive: true,
      },
    },
    {
      title: "Transverzalna",
      description:
        "Kolostoma može biti i transverzalna, stolica je tada tečna do poluformirana.",
      facts: [
        { label: "Lokacija", value: "Poprečni deo kolona" },
        { label: "Sadržaj", value: "Tečna do poluformirana" },
      ],
      asset: {
        type: "image",
        src: "/assets/transverzalna-kolostoma.png",
        alt: "Ilustracija transverzalne kolostome",
        isSensitive: true,
      },
    },
    {
      title: "Descendentna",
      description:
        "Izvodi se na levoj strani stomaka. Tada veći deo creva funkcioniše i kroz stomu se eliminiše poluformirana ili formirana stolica.",
      facts: [
        { label: "Lokacija", value: "Leva strana stomaka" },
        { label: "Sadržaj", value: "Poluformirana ili formirana" },
      ],
      asset: {
        type: "image",
        src: "/assets/descendentna-kolostoma.png",
        alt: "Ilustracija descendentne kolostome",
        isSensitive: true,
      },
    },
    {
      title: "Sigmoidna",
      description:
        "Kod ovog tipa kolostome stolica je formirana jer je sva voda apsorbovana u gornjim delovima creva. Izvodi se na levoj strani stomaka.",
      facts: [
        { label: "Lokacija", value: "Leva strana stomaka" },
        { label: "Sadržaj", value: "Formirana stolica" },
      ],
      asset: {
        type: "image",
        src: "/assets/sigmoidna-kolostoma.png",
        alt: "Ilustracija sigmoidne kolostome",
        isSensitive: true,
      },
    },
  ] satisfies StomaTypeCardData[],
} as const;

export const OTHER_STOMA_SECTION = {
  title: "Ostali tipovi stome",
  description:
    "U nastavku su osnovne karakteristike ileostome, urostome i ureterostome kako biste lakše razumeli razlike i potrebe nege.",
  items: [
    {
      title: "Ileostoma",
      description:
        "Nastaje kada se zdravi deo tankog creva izvede na površinu stomaka gde se fiksira i na taj način formira otvor za eliminisanje sadržaja. Ileostoma može biti privremena i trajna, a sadržaj koji se iz nje izlučuje je tečan, obilan i po svojoj prirodi prilično agresivan.",
      facts: [
        { label: "Lokacija", value: "Najčešće desna strana stomaka" },
        { label: "Sadržaj", value: "Tečan, obilan i agresivan" },
      ],
      asset: {
        type: "image",
        src: "/assets/ileostoma.png",
        alt: "Ilustracija ileostome",
        isSensitive: true,
      },
    },
    {
      title: "Urostoma",
      description:
        "Urostoma se formira kada je neophodno preusmeriti tok urina iz organizma na neki drugi način. Sadržaj koji se izliva iz urostome - urin je agresivan i nezi kože oko urostome se mora posvetiti posebna pažnja.",
      className: "lg:col-span-2",
      facts: [
        { label: "Lokacija", value: "Prednji trbušni zid" },
        { label: "Sadržaj", value: "Urin" },
      ],
      noteTitle: "Napomena (urostoma)",
      note:
        "Stoma se može formirati od “pozajmljenog” dela tankog creva koje se zatvara sa jedne strane kako bi se formirao novi rezervoar urina (“nova bešika”). Ureteri se povezuju sa ovom “novom bešikom”, a otvoreni kraj tankog creva se izvodi kroz trbušni zid.",
      splitNoteLayout: true,
      asset: {
        type: "image",
        src: "/assets/urostoma.png",
        alt: "Ilustracija urostome",
        isSensitive: true,
      },
    },
    {
      title: "Ureterostoma",
      description:
        "Kod ureterostome jedan ili dva uretera se preusmeravaju iz bubrega i izvode na površinu stomaka.",
      facts: [
        { label: "Lokacija", value: "Površina stomaka" },
        { label: "Sadržaj", value: "Urin" },
      ],
      asset: {
        type: "image",
        src: "/assets/ureterostoma.png",
        alt: "Ilustracija ureterostome",
        isSensitive: true,
      },
    },
  ] satisfies StomaTypeCardData[],
} as const;
