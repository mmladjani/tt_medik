import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { Container } from "@/components/design-system/Container";
import { SectionHeader } from "@/components/design-system/SectionHeader";
import { Button } from "@/components/design-system/Button";
import { cn } from "@/lib/utils";

export function StomaTypesPage() {
  return (
    <div className="bg-white pb-0 pt-32">
      <Container className="mb-12">
        <div className="w-full max-w-full rounded-2xl border border-slate-100 bg-slate-50 p-2 sm:w-fit sm:rounded-full">
          <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
            <Button asChild variant="teal" className="h-10 rounded-full px-4 text-[11px] sm:px-6">
              <Link href="/tipovi-stome">Tipovi stome</Link>
            </Button>
            <Button
              asChild
              variant="outlineNavy"
              className="h-10 rounded-full border-transparent bg-transparent px-4 text-[11px] text-slate-500 hover:bg-white hover:text-tt-navy sm:px-6"
            >
              <Link href="/nega-stome">Nega stome</Link>
            </Button>
            <Button
              asChild
              variant="outlineNavy"
              className="h-10 rounded-full border-transparent bg-transparent px-4 text-[11px] text-slate-500 hover:bg-white hover:text-tt-navy sm:px-6"
            >
              <Link href="/stoma-pomagala">Stoma pomagala</Link>
            </Button>
          </div>
        </div>
      </Container>

      <Container className="mb-24">
        <SectionHeader
          label="Programi / Stoma"
          title="Tipovi stome"
          description="Upoznavanje sa vrstom stome koju imate je ključni korak ka sigurnosti i pravilnom odabiru pomagala."
          className="mb-0"
        />
      </Container>

      <section className="border-y border-slate-100 bg-slate-50/50 py-24">
        <Container>
          <div className="mb-16 max-w-3xl">
            <h2 className="mb-6 text-4xl font-black uppercase tracking-tighter text-tt-navy">
              Kolostoma
            </h2>
            <p className="text-lg leading-relaxed text-slate-500">
              Nastaje kada se otvoreni kraj zdravog debelog creva izvuče na površinu stomaka
              (abdomena) i tu se fiksira kako bi se formirao otvor za izbacivanje sadržaja iz
              creva. Kolostoma u zavisnosti od vremena trajanja može biti privremena ili trajna.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <SubtypeCard
              title="Ascendentna"
              image="/assets/ascendentna-kolostoma.png"
              facts={[
                { label: "Lokacija", value: "Desna strana abdomena" },
                { label: "Sadržaj", value: "Tečan ili polutečan" },
              ]}
              desc="Može biti izvedena na desnoj strani abdomena i tada je sadržaj tečan ili polutečan i jako iritira kožu."
            />
            <SubtypeCard
              title="Transverzalna"
              image="/assets/transverzalna-kolostoma.png"
              facts={[
                { label: "Lokacija", value: "Poprečni deo kolona" },
                { label: "Sadržaj", value: "Tečna do poluformirana stolica" },
              ]}
              desc="Kolostoma može biti i transverzalna, stolica je tada tečna do poluformirana."
            />
            <SubtypeCard
              title="Descendentna"
              image="/assets/descendentna-kolostoma.png"
              facts={[
                { label: "Lokacija", value: "Leva strana stomaka" },
                { label: "Sadržaj", value: "Poluformirana ili formirana" },
              ]}
              desc="Izvodi se na levoj strani stomaka. Tada veći deo creva funkcioniše i kroz stomu se eliminiše poluformirana ili formirana stolica."
            />
            <SubtypeCard
              title="Sigmoidna"
              image="/assets/sigmoidma-kolostoma.png"
              facts={[
                { label: "Lokacija", value: "Leva strana stomaka" },
                { label: "Sadržaj", value: "Formirana stolica" },
              ]}
              desc="Kod ovog tipa kolostome stolica je formirana jer je sva voda apsorbovana u gornjim delovima creva."
            />
          </div>
        </Container>
      </section>

      <section className="py-32">
        <section>
          <Container className="grid items-center gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-tt-navy">
                Ileostoma
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-500">
                Nastaje kada se zdravi deo tankog creva izvede na površinu stomaka gde se fiksira
                i na taj način formira otvor za eliminisanje sadržaja. Ileostoma može biti
                privremena i trajna, a sadržaj koji se iz nje izlučuje je tečan, obilan i po svojoj
                prirodi prilično agresivan. Zbog toga se nezi ileostome mora posvetiti posebna
                pažnja kako sadržaj ne bi došao u kontakt sa kožom na stomaku.
              </p>
              <CareChecklist
                items={[
                  "Posebnu pažnju usmeriti na zaštitu kože oko stome.",
                  "Zbog obilnog i tečnog sadržaja, pomagala menjati na vreme.",
                  "Prilikom svake zamene proveriti da li postoji iritacija kože.",
                ]}
              />
            </div>
            <IllustrationFrame src="/assets/ileostoma.png" />
          </Container>
        </section>

        <div className="my-32 flex justify-center">
          <div className="h-20 w-px bg-slate-100/70" />
        </div>

        <section>
          <Container className="grid items-start gap-20 lg:grid-cols-2">
            <IllustrationFrame src="/assets/urostoma.png" />
            <div className="space-y-6 lg:space-y-7">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-tt-navy">
                Urostoma
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-500">
                Urostoma se formira kada je neophodno preusmeriti tok urina iz organizma na neki
                drugi način. Sadržaj koji se izliva iz urostome - urin je agresivan i nezi kože oko
                urostome se mora posvetiti posebna pažnja.
              </p>
              <CareChecklist
                compact
                className="border-slate-200 bg-white/80"
                items={[
                  "Kožu oko stome održavati suvom i zaštićenom od kontakta sa urinom.",
                  "Koristiti pomagala namenjena za urostomu i redovno proveravati naleganje.",
                ]}
              />
              <InfoNote
                title="Hirurška napomena"
                lead="Stoma se može formirati od “pozajmljenog” dela tankog creva koje se zatvara sa jedne strane kako bi se formirao novi rezervoar urina (“nova bešika”)."
                detail="Ureteri koji sprovode urin od bubrega se povezuju sa ovom “novom bešikom”, a otvoreni kraj tankog creva se izvodi kroz trbušni zid da bi se kreirala stoma."
              />
            </div>
          </Container>
        </section>

        <div className="my-32 flex justify-center">
          <div className="h-20 w-px bg-slate-100/70" />
        </div>

        <section>
          <Container className="grid items-center gap-20 lg:grid-cols-2">
            <div className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-tt-navy">
                Ureterostoma
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-500">
                Kod ureterostome jedan ili dva uretera se preusmeravaju iz bubrega i izvode na
                površinu stomaka.
              </p>
              <CareChecklist
                items={[
                  "Posebno pažljivo pratiti kožu zbog kontinuiranog kontakta sa urinom.",
                  "Naleganje pomagala proveravati redovno, naročito nakon fizičke aktivnosti.",
                ]}
              />
            </div>
            <IllustrationFrame src="/assets/ureterostoma.png" />
          </Container>
        </section>
      </section>

      <section className="pb-32">
        <Container className="mb-16">
          <div className="h-px w-full bg-slate-100/70" />
        </Container>
        <Container>
          <div className="relative overflow-hidden rounded-[3rem] bg-tt-navy p-16 md:p-24">
            <div className="relative z-10 max-w-3xl">
              <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter text-white md:text-5xl">
                Prilagođeno Vašim <br /> <span className="text-tt-teal">životnim potrebama</span>
              </h2>
              <p className="mb-12 text-lg text-white/60">
                ConvaTec nudi mnogo različitih sistema diskova i kesa za zbrinjavanje svih tipova
                stome i negu kože oko stome, ali uvek imajući na umu, različitost Vaših životnih
                potreba. Od izuzetne je važnosti zbrinuti stomu na najbolji mogući način, a tome
                značajno doprinosi i pravilan odabir stoma pomagala koje ćete koristiti.
              </p>
              <div className="flex w-full max-w-xl flex-col gap-4 md:flex-row md:items-center">
                <Button
                  asChild
                  variant="teal"
                  className="h-12 w-full rounded-full px-8 text-[11px] md:w-auto md:min-w-[190px]"
                >
                  <Link href="/stoma-pomagala">Stoma pomagala</Link>
                </Button>
                <Button
                  asChild
                  variant="outlineNavy"
                  className="h-12 w-full rounded-full border-white/30 bg-transparent px-8 text-[11px] text-white hover:border-white/60 hover:bg-white/10 hover:text-white md:w-auto md:min-w-[160px]"
                >
                  <Link href="/kontakt">Kontakt</Link>
                </Button>
              </div>
              <p className="mt-5 text-sm text-white/70 transition-colors">
                Besplatna linija za pacijente: 0800 101 102 (radnim danima 8:30 - 15:30).
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

type SubtypeCardProps = {
  title: string;
  image: string;
  desc: string;
  facts: Array<{
    label: string;
    value: string;
  }>;
};

function SubtypeCard({ title, image, desc, facts }: SubtypeCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-slate-100 bg-white p-6 text-left transition-colors duration-300 hover:border-slate-200">
      <div className="mb-6 flex h-24 w-full items-center justify-center grayscale transition-all duration-500 hover:grayscale-0">
        <Image src={image} alt={title} width={120} height={120} className="max-h-full object-contain" />
      </div>
      <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-tt-teal">{title}</h4>
      <dl className="mb-3 space-y-2 border-y border-slate-100 pb-5 pt-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-start justify-between gap-3">
            <dt className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {fact.label}
            </dt>
            <dd className="text-right text-xs font-medium leading-snug text-slate-700">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-1 max-w-[30ch] text-sm leading-relaxed text-slate-500">{desc}</p>
    </article>
  );
}

function IllustrationFrame({ src, className }: { src: string; className?: string }) {
  return (
    <div className={cn("group relative mx-auto max-w-[480px] overflow-x-hidden lg:mx-0", className)}>
      <div className="flex aspect-square items-center justify-center rounded-[3rem] border border-slate-100 bg-slate-50 p-12 transition-transform duration-700 group-hover:scale-[1.03] lg:p-14">
        <Image
          src={src}
          alt="Medical Illustration"
          width={400}
          height={400}
          className="max-h-full w-auto object-contain mix-blend-multiply"
        />
      </div>
      <div className="pointer-events-none absolute right-2 top-2 -z-10 h-20 w-20 rounded-full bg-tt-teal/10 opacity-80 blur-xl" />
    </div>
  );
}

function CareChecklist({
  items,
  compact = false,
  className,
}: {
  items: string[];
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-100 bg-slate-50/60",
        compact ? "p-5 sm:p-6" : "p-6",
        className,
      )}
    >
      <h3 className="mb-3 text-xs font-black uppercase tracking-[0.12em] text-tt-navy sm:tracking-widest">
        Ključno za negu
      </h3>
      <ul className={cn(compact ? "space-y-1.5" : "space-y-2")}>
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tt-teal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InfoNote({
  title,
  lead,
  detail,
}: {
  title: string;
  lead: string;
  detail: string;
}) {
  return (
    <aside className="rounded-[2rem] border border-tt-teal/10 bg-tt-teal/5 p-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-tt-teal">
          <Info size={14} aria-hidden="true" />
        </span>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-tt-navy">{title}</h3>
      </div>
      <p className="text-sm font-medium leading-relaxed text-tt-navy/85">{lead}</p>
      <p className="mt-3 text-sm leading-relaxed text-tt-navy/70">{detail}</p>
    </aside>
  );
}
