import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, GraduationCap, History, MessageSquare } from "lucide-react";

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

export function HomeAboutTrust() {
  return (
    <section className="bg-white py-32">
      <div className="tt-container max-w-[90rem]">
        <div className="grid items-start gap-20 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-10 lg:sticky lg:top-40">
            <div className="space-y-4">
              <span className="block text-lg font-black uppercase tracking-[0.12em] text-[#00a3ad] md:text-xl">
                Naša misija
              </span>
              <h2 className="text-4xl font-black leading-[1.1] tracking-tighter text-[#00344d] md:text-6xl">
                Više od distribucije. <br /> Briga o ljudima.
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-slate-600 md:text-xl">
              Kao zvanični distributer kompanije{" "}
              <Link
                href="https://www.convatec.com/sr-rs/"
                target="_blank"
                rel="noreferrer"
                className="relative inline-block font-semibold text-[#0077a0] transition-colors duration-300 hover:text-[#00a3ad] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                ConvaTec
              </Link>
              , TT Medik već decenijama postavlja standarde u modernoj medicinskoj nezi
              širom Srbije.
            </p>

            <Link
              href="/o-nama"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00a3ad]"
            >
              Saznajte više o nama
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

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
        </div>
      </div>
    </section>
  );
}
