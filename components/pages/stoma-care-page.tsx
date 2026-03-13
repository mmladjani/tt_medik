import Image from "next/image";
import { Container } from "@/components/design-system/Container";
import { StomaCtaCard } from "@/components/pages/stoma-cta-card";
import { StomaPageIntro } from "@/components/pages/stoma-page-intro";
import { StomaSectionHeader } from "@/components/pages/stoma-section-header";
import { StomaSectionDivider } from "@/components/pages/stoma-section-divider";
import { StomaSubnav } from "@/components/pages/stoma-subnav";
import { cn } from "@/lib/utils";

type CareStep = {
  title: string;
  text: string;
  image: string;
};

const SECTION_ONE_PARAGRAPHS = [
  "U toku boravka u bolnici nakon operacije od Vaše stoma sestre ste dobili uputstva kako treba negovati kožu oko stome, kao i stomu. Ovde možete dobiti još neke korisne savete koji će Vam olakšati negu.",
  "Toplom vodom operite stomu i kožu koja je okružuje, zatim mekanim peškirom, pamučnom pelenom ili papirnom maramicom lagano posušite celu površinu. Prilikom pranja možete upotrebiti i blagi dečji sapun koji ćete zatim isprati toplom vodom. Muškarcima se preporučuje brijanje dlačica na stomaku u predelu oko stome kako bi se dobila što ravnija površina pogodna za lepljenje diska. Tako će se izbeći i upala korena dlake.",
  "Ne upotrebljavajte benzin, alkohol, jod ili bilo koje drugo dezinfekciono sredstvo jer time možete suviše isušiti i oštetiti kožu. Nemojte mazati kreme, masti i losione za telo oko stome jer je masna koža nepogodna za lepljenje diska. Nemojte koristiti bebi vlažne maramice jer mogu uticati na lepljiva svojstva diska.",
];

const CARE_STEPS: CareStep[] = [
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

const SKIN_PROTECTION_BULLETS = [
  "U slučaju oštećenja kože oko stome koristite pastu, sprej ili Esenta™ maramice za negu kože oko stome.",
  "Ako na koži postoje neravnine, nabori ili je stoma u nivou kože možete koristiti pastu za ispunu neravnina kojom ćete popuniti neravnine i omogućiti da disk legne na kožu. Pasta sadrži alkohol pa je ne treba nanositi na oštećenu kožu.",
  "Disk stoji na koži 3-5 dana, a kese se menjaju svakodnevno.",
  "Za lakše skidanje diska i lepljivog ostatka možete koristititi Esenta™ sprej i maramice za skidanje adheziva.",
];

export function StomaCarePage() {
  return (
    <main className="bg-white pb-24 pt-28">
      <Container>
        <StomaPageIntro
          label="Programi / Stoma"
          title="Nega stome"
          description="Ovim savetima želimo da Vam pomognemo da bolje razumete osnovne pojmove o stomi, o nezi stome i kože oko stome, kao i o načinu ishrane nakon izlaska iz bolnice."
        />
      </Container>

      <Container className="mt-8">
        <StomaSubnav currentPage="nega-stome" />
      </Container>

      <Container className="mt-10">
        <section id="kako-negovati">
          <StomaSectionHeader title="Kako negovati stomu i kožu oko stome?" />

          <div className="space-y-4">
              {SECTION_ONE_PARAGRAPHS.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={cn(
                    "tt-main-copy text-base leading-relaxed text-slate-700 md:text-lg",
                    index === 0 && "lg:max-w-[78%]",
                  )}
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </section>

        <StomaSectionDivider />

        <section id="kako-izmeriti">
          <StomaSectionHeader title="Kako da izmerite vašu stomu?" />

          <StepGuide steps={CARE_STEPS} />
        </section>

        <StomaSectionDivider />

        <section id="zastita-koze">
          <StomaSectionHeader title="Saveti za zaštitu kože" />

          <ul className="tt-main-copy list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-700 md:text-lg">
            {SKIN_PROTECTION_BULLETS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <StomaSectionDivider size="lg" />

        <section id="cta">
          <StomaCtaCard />
        </section>
      </Container>
    </main>
  );
}

function StepGuide({ steps }: { steps: CareStep[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <article
          key={`step-${index + 1}`}
          className="tt-stoma-card min-h-0 rounded-2xl p-4"
        >
          <div className="relative mb-4 h-36 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-40 md:h-44">
            <Image
              src={step.image}
              alt={`Korak ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-contain p-2"
            />
          </div>
          <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00a3ad] text-xs font-black text-white">
            {index + 1}
          </div>
          <h3 className="mb-2 text-sm font-black leading-snug text-tt-navy">{step.title}</h3>
          <p className="text-sm leading-relaxed text-slate-700">{step.text}</p>
        </article>
      ))}
    </div>
  );
}
