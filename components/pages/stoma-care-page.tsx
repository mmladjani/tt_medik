import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { Container } from "@/components/design-system/Container";
import { SpineDivider } from "@/components/design-system/SpineDivider";
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
        <PageIntro
          label="Programi / Stoma"
          title="Nega stome"
          description="Ovim savetima želimo da Vam pomognemo da bolje razumete osnovne pojmove o stomi, o nezi stome i kože oko stome, kao i o načinu ishrane nakon izlaska iz bolnice."
        />
      </Container>

      <Container className="mt-8">
        <PageSubnav />
      </Container>

      <Container className="mt-10">
        <section id="kako-negovati">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl font-black tracking-tight text-tt-navy md:text-4xl">
              Kako negovati stomu i kožu oko stome?
            </h2>
          </header>

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

        <InlineSectionDivider />

        <section id="kako-izmeriti">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl font-black tracking-tight text-tt-navy md:text-4xl">
              Kako da izmerite vašu stomu?
            </h2>
          </header>

          <StepGuide steps={CARE_STEPS} />
        </section>

        <InlineSectionDivider />

        <section id="zastita-koze">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl font-black tracking-tight text-tt-navy md:text-4xl">
              Saveti za zaštitu kože
            </h2>
          </header>

          <ul className="tt-main-copy list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-700 md:text-lg">
            {SKIN_PROTECTION_BULLETS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <InlineSectionDivider size="lg" />

        <section id="cta">
          <CtaCard />
        </section>
      </Container>
    </main>
  );
}

function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <header className="max-w-4xl">
      <span className="mb-3 block text-sm font-black uppercase tracking-widest text-tt-teal md:text-base">
        {label}
      </span>
      <h1 className="text-4xl font-black tracking-tight text-tt-navy md:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
        {description}
      </p>
    </header>
  );
}

function PageSubnav() {
  return (
    <nav
      aria-label="Stoma podnavigacija"
      className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-2 sm:w-fit sm:rounded-full"
    >
      <ul className="grid gap-2 sm:flex sm:flex-wrap">
        <li className="min-w-0">
          <Button
            asChild
            variant="outlineNavy"
            className="h-auto min-h-10 w-full rounded-full border-transparent bg-transparent px-4 py-2 text-[11px] leading-tight text-slate-500 hover:bg-white hover:text-tt-navy sm:w-auto sm:px-5"
          >
            <Link href="/tipovi-stome">Tipovi stome</Link>
          </Button>
        </li>
        <li className="min-w-0">
          <Button
            asChild
            variant="teal"
            className="h-auto min-h-10 w-full rounded-full px-4 py-2 text-[11px] leading-tight sm:w-auto sm:px-5"
          >
            <Link href="/nega-stome" aria-current="page">
              Nega stome
            </Link>
          </Button>
        </li>
        <li className="min-w-0">
          <Button
            asChild
            variant="outlineNavy"
            className="h-auto min-h-10 w-full rounded-full border-transparent bg-transparent px-4 py-2 text-[11px] leading-tight text-slate-500 hover:bg-white hover:text-tt-navy sm:w-auto sm:px-5"
          >
            <Link href="/stoma-pomagala">Stoma pomagala</Link>
          </Button>
        </li>
      </ul>
    </nav>
  );
}

function StepGuide({ steps }: { steps: CareStep[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <article
          key={`step-${index + 1}`}
          className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
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

function CtaCard() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-tt-navy p-10 text-white md:p-14">
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-tt-teal/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <span className="mb-4 block text-lg font-black uppercase tracking-[0.12em] text-[#7cd3d8] md:text-xl">
            Podrška i izbor pomagala
          </span>
          <h2 className="text-4xl font-black tracking-tighter md:text-6xl">
            Spremni za sledeći korak?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
            Pregledajte stoma pomagala ili kontaktirajte naš tim za podršku pri odabiru rešenja.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button asChild variant="teal" className="group">
            <Link href="/stoma-pomagala">Stoma pomagala</Link>
          </Button>
          <Button
            asChild
            variant="outlineNavy"
            className="border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/15 hover:text-white"
          >
            <Link href="/kontakt">Kontakt</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function InlineSectionDivider({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div
      className={cn(
        "flex justify-center",
        size === "sm" && "py-6",
        size === "md" && "py-8",
        size === "lg" && "py-12",
      )}
    >
      <SpineDivider height={size} />
    </div>
  );
}
