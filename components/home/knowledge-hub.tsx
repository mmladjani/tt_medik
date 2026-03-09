"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, ExternalLink, HeartPulse, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = {
  q: string;
  a: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Da li mogu da se kupam i tuširam?",
    a: "Naravno. Kese i diskovi su vodootporni. Kada se kupate i tuširate, nosite Vašu kesu kao i obično. Ukoliko koristite kese za kolostomu sa filterom, tokom tuširanja ili kupanja filter zaštitite nalepnicom koja se nalazi u kutiji sa kesama. Ako idete na plivanje kesu ispraznite pre ulaska u vodu i nosite je ispod kupaćeg kostima. Voda ne može ući u stomu niti oštetiti sluzokožu creva. Nakon tuširanja kesu i disk obrišite peškirom. Ukoliko plivate u moru ili bazenu, nakon kupanja se istuširajte, presvucite i posušite disk i kesu.",
  },
  {
    q: "Da li ću moći da se vratim na svoj posao?",
    a: "U većini slučajeva pacijenti sa stomom se vraćaju na posao. Međutim dizanje teških predmeta i teški fizički rad nisu preporučljivi jer mogu da dovedu do nastanka parastomalne kile. Zbog toga ćete morati da potražite neki lakši posao o čemu se možete konsultovati sa svojim lekarom.",
  },
  {
    q: "Da li mogu da putujem?",
    a: "Nemojte se odricati putovanja. Ako se dobro osećate i snalazite sa priborom za stomu, i ako imate dovoljno vremena za pripremu, dužina putovanja i vrsta prevoza ne predstavlja nikakvu prepreku. Imajte pri sebi dovoljno pribora za stomu u slučaju da Vam se negde izgubi prtljag. Raspitajte se da li u odredištu Vašeg putovanja možete nabaviti pribor za negu stome. Savetujte se i sa Vašim lekarom, ukoliko putujete u zemlje gde se jede drugačije nego što ste navikli. Tako ćete izbeći eventualne komplikacije.",
  },
  {
    q: "Šta će biti sa mojim društvenim životom?",
    a: "Vaš društveni život vrlo brzo će se nastaviti tamo gde je i stao. Možete ići u kafiće, restorane, u pozorišta, bioskope i na ples čim se budete osećali spremni za to.",
  },
  {
    q: "Šta je sa bavljenjem sportom i hobijima?",
    a: "Kada se oporavite činjenica da imate stomu neće Vas sprečiti da uživate u sportu i u hobijima. Šetnja, vožnja bicikla, rad u bašti, jedrenje, plivanje, kao i veliki broj sportova i ostalih aktivnosti predstavljaju deo svakodnevnog života. Trebalo bi da izbegavate upražnjavanje nekih dinamičnih aktivnosti-kontaktnih sportova, kao što je fudbal, karate ili rvanje, jer je moguća povreda same stome.",
  },
  {
    q: "Da li ću moći imati intimne odnose?",
    a: "Imati stomu ne znači da je intimnim odnosima došao kraj. Sasvim je normalno biti osetljiv na činjenicu da se dogodila promena na Vašem telu. Razgovarajte s partnerom, podelite osećanja i razmišljanja. Dajte mu/joj do znanja, da seksualni odnosi neće povrediti Vašu stomu. Ukoliko Vam određeni položaj pri seksualnom odnosu predstavlja problem ili izaziva bol, probajte neki drugi. Vremenom, uz razumevanje i pozitivan pristup, moći ćete zajednički uživati u intimnom odnosu.",
  },
];

export function KnowledgeHub({ className }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={cn("bg-white py-24", className)}>
      <div className="tt-container max-w-[90rem]">
        <div className="mb-24">
          <span className="mb-4 block text-lg font-black uppercase tracking-[0.12em] text-[#00a3ad] md:text-xl">
            Podrška
          </span>
          <h2 className="text-4xl font-black tracking-tighter text-[#00344d] md:text-6xl">
            Česta pitanja
          </h2>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
            Ovim savetima želimo da Vam pomognemo da bolje razumete osnovne pojmove o
            stomi, o nezi stome i kože oko stome, kao i o načinu ishrane nakon izlaska iz
            bolnice.
          </p>
        </div>

        <div className="mb-24 space-y-0 border-t border-slate-100">
          {FAQ_ITEMS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <article
                key={faq.q}
                className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between px-3 py-8 text-left md:px-4"
                >
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-black text-[#00a3ad]/20 transition-colors group-hover:text-[#00a3ad]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl font-bold text-[#00344d] md:text-2xl">{faq.q}</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border border-slate-200 p-2 text-[#00a3ad] transition-transform rotate-45",
                      isOpen && "rotate-[135deg] border-[#00a3ad] bg-[#00a3ad] text-white",
                    )}
                  >
                    <ArrowUpRight size={20} />
                  </span>
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500",
                    isOpen ? "max-h-[80rem] pb-8" : "max-h-0",
                  )}
                >
                  <p className="max-w-[96ch] pl-16 pr-4 text-lg leading-relaxed text-slate-500">
                    {faq.a}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <article className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2.5rem] border border-[#00a3ad]/5 bg-[#f0f9fa] p-10 transition-all hover:border-[#00a3ad]/20 hover:shadow-2xl hover:shadow-slate-900/20">
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-white p-4 text-[#00a3ad] shadow-sm transition-all group-hover:bg-[#00a3ad] group-hover:text-white">
                <Utensils size={32} />
              </div>
              <h4 className="mb-2 text-2xl font-black uppercase tracking-tighter text-[#00344d]">
                Ishrana
              </h4>
              <p className="max-w-[320px] text-sm leading-relaxed text-slate-500">
                U nastavku možete pročitati detaljnije informacije o ishrani u zavisnosti od
                vrste izvedene stome.
              </p>
              <a
                href="/assets/prirucnik-za-pacijente-sa-stomom.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0077a0] transition-colors duration-300 hover:text-[#00a3ad]"
              >
                Priručnik za pacijente sa stomom
                <ExternalLink size={14} className="shrink-0" aria-hidden="true" />
              </a>
            </div>

            <div className="relative z-10 flex items-start pt-6">
              <Link
                href="/stoma-program"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00a3ad]"
              >
                Otvori vodič
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-2" />
              </Link>
            </div>

            <Utensils
              className="absolute -bottom-10 -right-10 rotate-12 text-[#00a3ad]/5 transition-transform group-hover:scale-110"
              size={240}
            />
          </article>

          <article className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#00344d] p-10 transition-all hover:shadow-2xl hover:shadow-slate-900/20">
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-4 text-[#00a3ad] backdrop-blur-md transition-all group-hover:bg-[#00a3ad] group-hover:text-white">
                <HeartPulse size={32} />
              </div>
              <h4 className="mb-2 text-2xl font-black uppercase tracking-tighter text-white">
                Nega stome
              </h4>
              <p className="max-w-[320px] text-sm leading-relaxed text-white/60">
                U toku boravka u bolnici nakon operacije od Vaše stoma sestre ste dobili
                uputstva kako treba negovati kožu oko stome, kao i stomu. Ovde možete dobiti
                još neke korisne savete koji će Vam olakšati negu.
              </p>
            </div>

            <Link
              href="/stoma-program"
              className="relative z-10 flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-widest text-[#00a3ad]"
            >
              Pogledaj savete
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-2" />
            </Link>

            <HeartPulse
              className="absolute -bottom-10 -right-10 -rotate-12 text-white/5 transition-transform group-hover:scale-110"
              size={240}
            />
          </article>
        </div>
      </div>
    </section>
  );
}
