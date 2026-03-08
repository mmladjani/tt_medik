import type { ReactNode } from "react";
import Link from "next/link";
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
      <div className="tt-container max-w-[90rem]">
        <div className="relative w-full">
          <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr)_440px]">
            <div className="space-y-8">
            <div>
              <span className="mb-4 block text-lg font-bold uppercase tracking-[0.12em] text-[#00a3ad] md:text-xl">
                O kompaniji
              </span>
              <h2 className="mb-8 text-4xl font-black tracking-tighter text-[#00344d] md:text-6xl">
                TT Medik
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                TT Medik, d.o.o. je distributer kompanije{" "}
                <Link
                  href="https://www.convatec.com/sr-rs/"
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-block font-semibold text-[#0077a0] transition-colors duration-300 hover:text-[#00a3ad] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  ConvaTec
                </Link>
                , jednog od svetskih lidera u razvoju i proizvodnji inovativnih
                medicinskih tehnologija i proizvoda koji doprinose poboljšanju kvaliteta
                života miliona ljudi širom sveta.
              </p>
            </div>

            <div className="pt-2">
              <p className="mb-8 text-lg font-bold tracking-tight text-[#00344d]">
                <Link
                  href="https://www.convatec.com/sr-rs/"
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-block text-[#0077a0] transition-colors duration-300 hover:text-[#00a3ad] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  ConvaTec
                </Link>{" "}
                paleta proizvoda namenjena je:
              </p>
              <div className="grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2">
                {SUPPORT_ITEMS.map((item) => (
                  <div
                    key={item}
                    className="group flex cursor-default items-center gap-3 border-b border-slate-50 py-1.5"
                  >
                    <ChevronRight
                      size={18}
                      className="shrink-0 text-[#00a3ad] transition-transform group-hover:translate-x-1"
                    />
                    <span className="text-base font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-lg leading-relaxed text-slate-600">
                Mi u TT Mediku svojim velikim uspehom smatramo činjenicu da od svog
                osnivanja 1993. godine do danas, uprkos brojnim poteškoćama, pacijente u
                Srbiji kontinuirano snabdevamo visokokvalitetnim medicinskim sredstvima.
                Kroz svakodnevnu komunikaciju sa zdravstvenim radnicima i korisnicima naših
                proizvoda, trudimo se da pronađemo individualno prilagođena rešenja za
                potrebe pacijenata. Posebnu pažnju poklanjamo kontinuiranoj edukaciji svih
                učesnika u procesu pružanja usluga zdravstvene delatnosti.
              </p>
            </div>
          </div>

            <aside className="flex flex-col justify-center space-y-16 border-l border-slate-100 bg-slate-50/40 px-6 md:px-8 lg:w-[440px] lg:px-10">
              <SidebarTile
                icon={<History size={32} />}
                title="Tradicija od 1993."
                text="Više od tri decenije osiguravamo neprekidnu dostupnost najkvalitetnijih medicinskih rešenja pacijentima širom Srbije."
              />
              <SidebarTile
                icon={<Users2 size={32} />}
                title="Komunikacija"
                text="Kroz stalni dijalog sa stručnim licima i korisnicima, kreiramo personalizovana rešenja koja su u potpunosti prilagođena potrebama svakog pacijenta."
              />
              <SidebarTile
                icon={<GraduationCap size={32} />}
                title="Edukacija"
                text="Unapređujemo standarde lečenja kroz kontinuirano stručno usavršavanje svih učesnika u lancu pružanja zdravstvenih usluga."
              />
            </aside>
          </div>

          <div className="relative mt-32 overflow-hidden rounded-[3rem] bg-[#00344d] p-12 text-center shadow-2xl md:p-20">
            <Quote className="absolute left-8 top-8 text-white/5" size={140} />
            <div className="relative z-10 mx-auto max-w-4xl">
              <h3 className="mb-8 px-4 text-lg font-medium italic leading-relaxed text-white">
                &ldquo;Ostajući privrženi osnovnim humanim načelima i principima etičkog
                poslovanja, gledamo u budućnost ističući kao svoj moto želju da
                unapredimo i produžimo život pacijenata obezbeđujući im proizvode i
                uslugu vrhunskog kvaliteta.&rdquo;
              </h3>
              <div className="mx-auto h-1 w-24 rounded-full bg-[#00a3ad]" />
            </div>
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
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f9fa] text-[#00a3ad] transition-all duration-300 group-hover:bg-[#00a3ad] group-hover:text-white">
        {icon}
      </div>
      <h4 className="text-xl font-bold uppercase tracking-tight text-[#00344d]">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-slate-500">{text}</p>
    </article>
  );
}
