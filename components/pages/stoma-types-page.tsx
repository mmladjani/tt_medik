"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeOff, FileText } from "lucide-react";
import { Button } from "@/components/design-system/Button";
import { Container } from "@/components/design-system/Container";
import { SpineDivider } from "@/components/design-system/SpineDivider";
import { cn } from "@/lib/utils";

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

type MedicalTypeCardData = {
  title: string;
  description: string;
  facts: Fact[];
  asset: MedicalAsset;
  className?: string;
  noteTitle?: string;
  note?: string;
  splitNoteLayout?: boolean;
};

const KOLOSTOMA_TYPES: MedicalTypeCardData[] = [
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
      src: "/assets/sigmoidma-kolostoma.png",
      alt: "Ilustracija sigmoidne kolostome",
      isSensitive: true,
    },
  },
];

const OTHER_STOMA_TYPES: MedicalTypeCardData[] = [
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
];

export function StomaTypesPage() {
  return (
    <main className="bg-white pb-24 pt-28">
      <Container>
        <PageIntro
          label="Programi / Stoma"
          title="Tipovi stome"
          description="Upoznavanje sa vrstom stome je ključni korak ka sigurnosti i pravilnom odabiru pomagala za svakodnevnu negu. Kod pojedinih tipova, poput urostome, važno je razumeti i dodatni hirurški kontekst."
        />
      </Container>

      <Container className="mt-8">
        <PageSubnav />
      </Container>

      <Container className="mt-10">
        <section id="kolostoma">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl font-black tracking-tight text-tt-navy md:text-4xl">Kolostoma</h2>
            <p className="tt-main-copy mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Nastaje kada se otvoreni kraj zdravog debelog creva izvuče na površinu stomaka
              (abdomena) i tu se fiksira kako bi se formirao otvor za izbacivanje sadržaja iz
              creva. Kolostoma u zavisnosti od vremena trajanja može biti privremena ili trajna.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KOLOSTOMA_TYPES.map((type) => (
              <MedicalTypeCard key={type.title} data={type} />
            ))}
          </div>
        </section>

        <InlineSectionDivider />

        <section id="ostali-tipovi">
          <header className="mb-6 md:mb-8">
            <h2 className="text-3xl font-black tracking-tight text-tt-navy md:text-4xl">
              Ostali tipovi stome
            </h2>
            <p className="tt-main-copy mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              U nastavku su osnovne karakteristike ileostome, urostome i ureterostome kako biste
              lakše razumeli razlike i potrebe nege.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OTHER_STOMA_TYPES.map((type) => (
              <MedicalTypeCard key={type.title} data={type} />
            ))}
          </div>
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
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
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
            variant="teal"
            className="h-auto min-h-10 w-full rounded-full px-4 py-2 text-[11px] leading-tight sm:w-auto sm:px-5"
          >
            <Link href="/tipovi-stome" aria-current="page">
              Tipovi stome
            </Link>
          </Button>
        </li>
        <li className="min-w-0">
          <Button
            asChild
            variant="outlineNavy"
            className="h-auto min-h-10 w-full rounded-full border-transparent bg-transparent px-4 py-2 text-[11px] leading-tight text-slate-500 hover:bg-white hover:text-tt-navy sm:w-auto sm:px-5"
          >
            <Link href="/nega-stome">Nega stome</Link>
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

function MedicalTypeCard({ data }: { data: MedicalTypeCardData }) {
  const isSplitLayout = Boolean(data.note && data.splitNoteLayout);

  if (isSplitLayout) {
    return (
      <article
        className={cn(
          "flex h-full min-h-[24rem] flex-col rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm",
          data.className,
        )}
      >
        <div className="grid h-full items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-6">
          <div className="flex min-h-full flex-col">
            <SensitiveAssetReveal asset={data.asset} />

            <h3 className="text-base font-black uppercase tracking-tight text-tt-navy">{data.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.description}</p>
            <TypeFacts
              facts={data.facts}
              className="mt-auto hidden border-t border-slate-100 pt-4 lg:block"
            />
          </div>

          <div aria-hidden className="h-px w-full bg-slate-100 lg:h-auto lg:w-px" />

          <div className="flex h-full flex-col rounded-xl border border-tt-teal/10 bg-tt-teal/5 p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-tt-navy">
              {data.noteTitle ?? "Napomena"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-tt-navy/80">{data.note}</p>
          </div>
        </div>

        <TypeFacts facts={data.facts} className="mt-auto border-t border-slate-100 pt-4 lg:hidden" />
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex h-full min-h-[24rem] flex-col rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm",
        data.className,
      )}
    >
      <SensitiveAssetReveal asset={data.asset} />

      <h3 className="text-base font-black uppercase tracking-tight text-tt-navy">{data.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.description}</p>
      {data.note ? (
        <div className="mt-4 rounded-xl border border-tt-teal/10 bg-tt-teal/5 p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-tt-navy">
            {data.noteTitle}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-tt-navy/80">{data.note}</p>
        </div>
      ) : null}
      <TypeFacts facts={data.facts} className="mt-auto border-t border-slate-100 pt-4" />
    </article>
  );
}

function TypeFacts({ facts, className }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={cn("space-y-2", className)}>
      {facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`} className="flex items-start justify-between gap-3">
          <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">{fact.label}</dt>
          <dd className="text-right text-xs font-medium leading-snug text-slate-700">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SensitiveAssetReveal({ asset }: { asset: MedicalAsset }) {
  const [isRevealed, setIsRevealed] = React.useState(!asset.isSensitive);

  const handleReveal = () => {
    if (asset.type === "pdf") {
      window.open(asset.src, "_blank", "noopener,noreferrer");
      return;
    }

    setIsRevealed(true);
  };

  return (
    <div
      className={cn(
        "relative mb-4 overflow-hidden rounded-xl border border-slate-100 bg-slate-50",
        "h-44",
      )}
    >
      {asset.type === "image" ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className={cn(
            "object-contain p-1 transition-all duration-500",
            !isRevealed && "scale-105 opacity-30",
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-tt-teal/60">
          <FileText size={28} />
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center bg-tt-navy/10 backdrop-blur-xl transition-all duration-300",
          isRevealed && "pointer-events-none opacity-0",
        )}
      >
        <div className="flex flex-col items-center gap-2 px-3 text-center">
          <span className="rounded-full bg-white p-2.5 text-tt-teal shadow-sm">
            <EyeOff size={16} />
          </span>
          <button
            type="button"
            onClick={handleReveal}
            className="rounded-full border border-tt-navy/15 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-tt-navy transition-colors hover:border-tt-teal hover:text-tt-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-teal/40"
          >
            {asset.type === "image" ? "Prikaži ilustraciju" : "Otvori dokument"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CtaCard() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-tt-navy p-10 text-white md:p-14">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-tt-teal/20 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <span className="mb-4 block text-lg font-black uppercase tracking-[0.12em] text-[#7cd3d8] md:text-xl">
            Podrška i izbor pomagala
          </span>
          <h2 className="text-4xl font-black tracking-tighter md:text-6xl">Spremni za sledeći korak?</h2>
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
    <div className={cn("flex justify-center", size === "sm" && "py-6", size === "md" && "py-8", size === "lg" && "py-12")}>
      <SpineDivider height={size} />
    </div>
  );
}
