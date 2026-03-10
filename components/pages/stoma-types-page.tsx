import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { Container } from "@/components/design-system/Container";
import { SectionHeader } from "@/components/design-system/SectionHeader";
import { Button } from "@/components/design-system/Button";

export function StomaTypesPage() {
  return (
    <div className="bg-white pb-0 pt-32">
      <Container className="mb-20">
        <SectionHeader
          label="Programi / Stoma"
          title="Tipovi stome"
          description="Upoznavanje sa vrstom stome koju imate je ključni korak ka sigurnosti i pravilnom odabiru pomagala."
        />
      </Container>

      <section className="border-y border-slate-100 bg-slate-50/50 py-24">
        <Container>
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-black uppercase tracking-tighter text-[#00344d]">
              Kolostoma
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-slate-500">
              Nastaje kada se otvoreni kraj zdravog debelog creva izvuče na površinu stomaka
              (abdomena) i tu se fiksira kako bi se formirao otvor za izbacivanje sadržaja iz
              creva. Kolostoma u zavisnosti od vremena trajanja može biti privremena ili trajna.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <SubtypeCard
              title="Ascendentna"
              image="/assets/ascendentna-kolostoma.png"
              desc="Može biti izvedena na desnoj strani abdomena i tada je sadržaj tečan ili polutečan i jako iritira kožu."
            />
            <SubtypeCard
              title="Transverzalna"
              image="/assets/transverzalna-kolostoma.png"
              desc="Kolostoma može biti i transverzalna, stolica je tada tečna do poluformirana."
            />
            <SubtypeCard
              title="Descendentna"
              image="/assets/descendentna-kolostoma.png"
              desc="Izvodi se na levoj strani stomaka. Tada veći deo creva funkcioniše i kroz stomu se eliminiše poluformirana ili formirana stolica."
            />
            <SubtypeCard
              title="Sigmoidna"
              image="/assets/sigmoidma-kolostoma.png"
              desc="Kod ovog tipa kolostome stolica je formirana jer je sva voda apsorbovana u gornjim delovima creva."
            />
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container>
          <div className="grid items-stretch gap-8 lg:grid-cols-3">
            <ComparisonCard
              title="Ileostoma"
              image="/assets/ileostoma.png"
              text="Nastaje kada se zdravi deo tankog creva izvede na površinu stomaka gde se fiksira i na taj način formira otvor za eliminisanje sadržaja. Ileostoma može biti privremena i trajna, a sadržaj koji se iz nje izlučuje je tečan, obilan i po svojoj prirodi prilično agresivan."
            />

            <ComparisonCard
              title="Urostoma"
              image="/assets/urostoma.png"
              text="Urostoma se formira kada je neophodno preusmeriti tok urina iz organizma na neki drugi način. Sadržaj koji se izliva iz urostome - urin je agresivan i nezi kože oko urostome se mora posvetiti posebna pažnja."
              hasExtraNote
            />

            <ComparisonCard
              title="Ureterostoma"
              image="/assets/ureterostoma.png"
              text="Kod ureterostome jedan ili dva uretera se preusmeravaju iz bubrega i izvode na površinu stomaka."
            />
          </div>

          <div className="mt-12 flex items-start gap-6 rounded-[2.5rem] border border-tt-teal/10 bg-tt-teal/5 p-10">
            <div className="shrink-0 rounded-2xl bg-white p-3 text-tt-teal shadow-sm">
              <Info size={24} />
            </div>
            <p className="text-sm italic leading-relaxed text-[#00344d]/70">
              <strong className="mb-1 block text-[10px] font-black uppercase tracking-widest not-italic text-[#00344d]">
                Hirurška napomena:
              </strong>
              Stoma se može formirati od “pozajmljenog” dela tankog creva koje se zatvara sa jedne
              strane kako bi se formirao novi rezervoar urina (“nova bešika”). Ureteri koji
              sprovode urin od bubrega se povezuju sa ovom “novom bešikom”, a otvoreni kraj tankog
              creva se izvodi kroz trbušni zid da bi se kreirala stoma.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#00344d] p-12 shadow-2xl shadow-[#00344d]/20 md:p-20">
            <div className="relative z-10 max-w-4xl">
              <h2 className="mb-8 text-2xl font-black uppercase tracking-tighter text-white md:text-4xl">
                Prilagođeno Vašim <br /> životnim potrebama
              </h2>
              <p className="mb-10 text-base leading-relaxed text-white/70 md:text-lg">
                ConvaTec nudi mnogo različitih sistema diskova i kesa za zbrinjavanje svih tipova
                stome i negu kože oko stome, ali uvek imajući na umu, različitost Vaših životnih
                potreba. Od izuzetne je važnosti zbrinuti stomu na najbolji mogući način, a tome
                značajno doprinosi i pravilan odabir stoma pomagala koje ćete koristiti.
              </p>
              <Button asChild variant="teal" className="rounded-full shadow-lg shadow-tt-teal/20">
                <Link href="/kontakt">Otvori kontakt stranicu</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

type ComparisonCardProps = {
  title: string;
  image: string;
  text: string;
  hasExtraNote?: boolean;
};

function ComparisonCard({ title, image, text, hasExtraNote = false }: ComparisonCardProps) {
  return (
    <article className="flex flex-col rounded-[2.5rem] border border-slate-100 bg-white p-10 transition-all duration-500 hover:border-tt-teal hover:shadow-2xl hover:shadow-slate-200/50">
      <div className="mb-8 flex aspect-square items-center justify-center rounded-[2rem] border border-slate-50 bg-slate-50 p-8">
        <Image
          src={image}
          alt={title}
          width={220}
          height={220}
          className="max-h-full object-contain mix-blend-multiply"
        />
      </div>
      <h3 className="mb-6 text-2xl font-black uppercase tracking-tighter text-[#00344d]">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{text}</p>
      {hasExtraNote ? (
        <div className="mt-auto flex items-center gap-2 pt-6 text-[10px] font-black uppercase tracking-widest text-tt-teal">
          <div className="h-1.5 w-1.5 rounded-full bg-tt-teal" /> Tehnički detalji ispod
        </div>
      ) : null}
    </article>
  );
}

type SubtypeCardProps = {
  title: string;
  image: string;
  desc: string;
};

function SubtypeCard({ title, image, desc }: SubtypeCardProps) {
  return (
    <div className="flex flex-col items-center rounded-[2rem] border border-slate-100 bg-white p-6 text-center">
      <div className="mb-6 flex h-24 w-full items-center justify-center grayscale transition-all duration-500 hover:grayscale-0">
        <Image src={image} alt={title} width={120} height={120} className="max-h-full object-contain" />
      </div>
      <h4 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-tt-teal">{title}</h4>
      <p className="px-2 text-[11px] leading-relaxed text-slate-400">{desc}</p>
    </div>
  );
}
