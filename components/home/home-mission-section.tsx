import type { ReactNode } from "react";
import { GraduationCap, History, MessageSquare } from "lucide-react";
import { ActionLink } from "@/components/design-system/ActionLink";
import { BrandLink } from "@/components/design-system/BrandLink";
import { Container } from "@/components/design-system/Container";
import { SectionHeader } from "@/components/design-system/SectionHeader";
import { SplitSpineLayout } from "@/components/design-system/SplitSpineLayout";

function PillarCard({
  icon,
  title,
  text,
  isFeatured = false,
}: {
  title: string;
  text: string;
  icon: ReactNode;
  isFeatured?: boolean;
}) {
  return (
    <article
      className={`group rounded-[2.5rem] border p-10 transition-all duration-500 ${
        isFeatured
          ? "border-[#00344d] bg-[#00344d] text-white"
          : "border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50"
      }`}
    >
      <div
        className={`mb-8 inline-flex rounded-2xl p-4 transition-colors ${
          isFeatured
            ? "bg-white/10 text-[#00a3ad]"
            : "bg-white text-[#00a3ad] shadow-sm group-hover:bg-[#00a3ad] group-hover:text-white"
        }`}
      >
        {icon}
      </div>

      <h3
        className={`mb-4 text-xl font-black uppercase tracking-tight ${
          isFeatured ? "text-white" : "text-[#00344d]"
        }`}
      >
        {title}
      </h3>

      <p className={`text-sm leading-relaxed ${isFeatured ? "text-white/70" : "text-slate-500"}`}>
        {text}
      </p>
    </article>
  );
}

export function HomeMissionSection() {
  return (
    <section className="bg-white py-32">
      <Container>
        <SplitSpineLayout
          gridClassName="items-start gap-20 lg:grid-cols-[1fr_1.2fr]"
          leftClassName="lg:sticky lg:top-40"
          left={
            <>
              <SectionHeader
                label="Naša misija"
                title="Više od distribucije. Briga o ljudima."
                className="mb-6"
                titleClassName="leading-[1.1]"
                description={
                  <>
                    Kao zvanični distributer kompanije <BrandLink>ConvaTec</BrandLink>, TT Medik već
                    decenijama postavlja standarde u modernoj medicinskoj nezi širom Srbije.
                  </>
                }
              />
              <ActionLink href="/o-nama">Saznajte više o nama</ActionLink>
            </>
          }
          right={
            <div className="grid grid-cols-1 gap-6">
              <PillarCard
                icon={<History size={28} />}
                title="Tradicija od 1993."
                text="Više od tri decenije osiguravamo neprekidnu dostupnost najkvalitetnijih medicinskih rešenja pacijentima širom Srbije."
                isFeatured
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <PillarCard
                  icon={<MessageSquare size={24} />}
                  title="Komunikacija"
                  text="Kroz stalni dijalog sa stručnim licima i korisnicima, kreiramo personalizovana rešenja prilagođena potrebama pacijenata."
                />
                <PillarCard
                  icon={<GraduationCap size={24} />}
                  title="Edukacija"
                  text="Unapređujemo standarde lečenja kroz kontinuirano stručno usavršavanje svih učesnika u lancu zdravstvenih usluga."
                />
              </div>
            </div>
          }
        />
      </Container>
    </section>
  );
}
