export type CareStep = {
  title: string;
  text: string;
  image: string;
};

export const STOMA_CARE_PAGE_INTRO = {
  label: "Programi / Stoma",
  title: "Nega stome",
  description:
    "Ovim savetima želimo da Vam pomognemo da bolje razumete osnovne pojmove o stomi, o nezi stome i kože oko stome, kao i o načinu ishrane nakon izlaska iz bolnice.",
} as const;

export const SECTION_ONE_PARAGRAPHS = [
  "U toku boravka u bolnici nakon operacije od Vaše stoma sestre ste dobili uputstva kako treba negovati kožu oko stome, kao i stomu. Ovde možete dobiti još neke korisne savete koji će Vam olakšati negu.",
  "Toplom vodom operite stomu i kožu koja je okružuje, zatim mekanim peškirom, pamučnom pelenom ili papirnom maramicom lagano posušite celu površinu. Prilikom pranja možete upotrebiti i blagi dečji sapun koji ćete zatim isprati toplom vodom. Muškarcima se preporučuje brijanje dlačica na stomaku u predelu oko stome kako bi se dobila što ravnija površina pogodna za lepljenje diska. Tako će se izbeći i upala korena dlake.",
  "Ne upotrebljavajte benzin, alkohol, jod ili bilo koje drugo dezinfekciono sredstvo jer time možete suviše isušiti i oštetiti kožu. Nemojte mazati kreme, masti i losione za telo oko stome jer je masna koža nepogodna za lepljenje diska. Nemojte koristiti bebi vlažne maramice jer mogu uticati na lepljiva svojstva diska.",
] as const;

export const CARE_STEPS: CareStep[] = [
  {
    title: "Izmerite stomu pomoću šablona",
    text: "Na šablonu koji ćete dobiti uz diskove ucrtajte tačan oblik i veličinu Vaše stome. Izaberite one diskove i kese čija je veličina plastičnog prstena 10 – 12 mm veća od promera Vaše stome. Zatim izvadite disk iz zaštitne folije i na njegovu belu poleđinu prislonite pripremljeni šablon i precrtajte ucrtani oblik.",
    image: "/assets/1476395016.jpg",
  },
  {
    title: "Isecite otvor na disku",
    text: "Malim zakrivljenim makazama isecite disk po iscrtanoj liniji. Tako ćete dobiti podlogu koja pruža najbolju zaštitu Vašoj koži. Otvor na disku treba da bude izrezan tako da bude samo nekoliko milimetara veći od samog promera stome kako bi u potpunosti zaštitili kožu oko stome.",
    image: "/assets/1476395017.jpg",
  },
  {
    title: "Pripremite otvor na kesi",
    text: "Na zaštitnu foliju samolepljive kese prislonite pripremljeni šablon i precrtajte ucrtani oblik. Zatim pažljivo isecite otvor po iscrtanoj liniji vodeći računa da ne isečete kesu zajedno sa podlogom. Odlepite zaštitnu foliju i zalepite kesu.",
    image: "/assets/1476395014.jpg",
  },
  {
    title: "Postavite disk i kesu",
    text: 'Odlepite zaštitnu foliju sa diska i pažljivo postavite disk na kožu. Na disk postavite kesu i proverite da li je kesa dobro prikopčana (treba da se čuje "klik"). Pri primeni jednodelnog sistema važe isti principi nege kože stome kao i pri korišćenju dvodelnog sistema.',
    image: "/assets/1476395015.jpg",
  },
];

export const SKIN_PROTECTION_BULLETS = [
  "U slučaju oštećenja kože oko stome koristite pastu, sprej ili Esenta™ maramice za negu kože oko stome.",
  "Ako na koži postoje neravnine, nabori ili je stoma u nivou kože možete koristiti pastu za ispunu neravnina kojom ćete popuniti neravnine i omogućiti da disk legne na kožu. Pasta sadrži alkohol pa je ne treba nanositi na oštećenu kožu.",
  "Disk stoji na koži 3-5 dana, a kese se menjaju svakodnevno.",
  "Za lakše skidanje diska i lepljivog ostatka možete koristititi Esenta™ sprej i maramice za skidanje adheziva.",
] as const;
