import type { ReactNode } from "react";
import { ChevronRight, GraduationCap, History, Quote, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SUPPORT_ITEMS = [
  "nezi stome",
  "modernom lečenju rana i zaštiti kože",
  "rešavanju problema inkontinencije",
  "tretmanu pacijenata na intenzivnoj nezi",
];

export function AboutUsSection({ className }: { className?: string }) {
  return (
    <section className={cn("overflow-hidden bg-white py-32", className)}>
      <div className="relative w-full">
        <div className="relative grid gap-16 lg:grid-cols-[1fr_480px]">
          <div className="space-y-8 px-8 md:px-16 lg:pl-24 lg:pr-16">
            <div>
              <span className="mb-4 block text-lg font-bold uppercase tracking-[0.12em] text-[#00a3ad] md:text-xl">
                O kompaniji
              </span>
              <h2 className="mb-8 text-4xl font-black tracking-tighter text-[#00344d] md:text-6xl">
                TT Medik
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
                TT Medik, d.o.o. je distributer kompanije <strong>ConvaTec</strong>, jednog
                od svetskih lidera u razvoju i proizvodnji inovativnih medicinskih
                tehnologija i proizvoda koji doprinose poboljšanju kvaliteta života
                miliona ljudi širom sveta.
              </p>
            </div>

            <div className="pt-2">
              <p className="mb-8 text-lg font-bold tracking-tight text-[#00344d] md:text-xl">
                ConvaTec paleta proizvoda namenjena je:
              </p>
              <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
                {SUPPORT_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="group flex cursor-default items-center gap-3 border-b border-slate-50 py-2"
                  >
                    <ChevronRight
                      size={18}
                      className="text-[#00a3ad] transition-transform group-hover:translate-x-1"
                    />
                    <span className="text-lg font-medium capitalize text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="flex flex-col justify-center space-y-16 border-l border-slate-100 bg-slate-50/40 px-8 md:px-12 lg:w-[480px] lg:px-12">
            <SidebarTile
              icon={<History size={32} />}
              title="Tradicija od 1993."
              text="Pacijente u Srbiji kontinuirano snabdevamo visokokvalitetnim medicinskim sredstvima."
            />
            <SidebarTile
              icon={<Users2 size={32} />}
              title="Komunikacija"
              text="Pronađemo individualno prilagođena rešenja kroz stalni kontakt sa stručnjacima."
            />
            <SidebarTile
              icon={<GraduationCap size={32} />}
              title="Edukacija"
              text="Posebnu pažnju poklanjamo kontinuiranoj edukaciji svih učesnika u zdravstvu."
            />
          </aside>
        </div>

        <div className="mx-8 mt-32 relative overflow-hidden rounded-[3rem] bg-[#00344d] p-12 text-center shadow-2xl md:mx-12 md:p-20 lg:mx-24">
          <Quote className="absolute left-8 top-8 text-white/5" size={140} />
          <div className="relative z-10 mx-auto max-w-4xl">
            <h3 className="mb-8 px-4 text-xl font-medium italic leading-relaxed text-white md:text-2xl">
              &ldquo;Ostajući privrženi osnovnim humanim načelima i principima etičkog
              poslovanja, gledamo u budućnost ističući kao svoj moto želju da
              unapredimo i produžimo život pacijenata obezbeđujući im proizvode i
              uslugu vrhunskog kvaliteta.&rdquo;
            </h3>
            <div className="mx-auto h-1 w-24 rounded-full bg-[#00a3ad]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SidebarTile({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="group space-y-4">
      <div className="text-[#00a3ad] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h4 className="text-lg font-bold uppercase tracking-tight text-[#00344d]">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-slate-500">{text}</p>
    </article>
  );
}
