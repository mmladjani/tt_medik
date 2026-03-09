"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  HeartPulse,
  HelpCircle,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  number: string;
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({
  number,
  question,
  answer,
  isOpen,
  onClick,
}: AccordionItemProps) {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <div className="flex items-center gap-6">
          <span className="text-sm font-black text-[#00a3ad]/30 transition-colors group-hover:text-[#00a3ad]">
            {number}
          </span>
          <span className="text-lg font-bold text-[#00344d] md:text-xl">{question}</span>
        </div>
        <ChevronDown
          className={`text-[#00a3ad] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[80rem] pb-6" : "max-h-0"}`}
      >
        <div className="pl-16 text-slate-500">
          <p className="max-w-2xl leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

interface AdviceTileProps {
  title: string;
  icon: LucideIcon;
  desc: string;
  href: string;
  guideHref?: string;
  guideLabel?: string;
}

function AdviceTile({
  title,
  icon: Icon,
  desc,
  href,
  guideHref,
  guideLabel,
}: AdviceTileProps) {
  return (
    <article className="group relative overflow-hidden rounded-[2.5rem] border border-transparent bg-slate-50 p-8 transition-all duration-300 hover:border-slate-100 hover:bg-white hover:shadow-xl">
      <div className="mb-6 inline-flex rounded-2xl bg-white p-4 text-[#00a3ad] shadow-sm transition-all group-hover:bg-[#00a3ad] group-hover:text-white">
        <Icon size={28} />
      </div>
      <h4 className="mb-3 text-xl font-black uppercase tracking-tighter text-[#00344d]">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-slate-500">{desc}</p>

      <div
        className={cn(
          "mt-6 flex flex-col items-start",
          guideHref && guideLabel ? "gap-3" : "gap-0",
        )}
      >
        {guideHref && guideLabel ? (
          <a
            href={guideHref}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-[#0077a0] transition-colors duration-300 hover:text-[#00a3ad] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {guideLabel}
            <ExternalLink size={14} className="shrink-0" aria-hidden="true" />
          </a>
        ) : null}

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00a3ad]"
        >
          Pročitaj više
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
    </article>
  );
}

const faqs: Array<{ q: string; a: ReactNode }> = [
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
    a: "Kada se oporavite činjenica da imate stomu neće Vas sprečiti da uživate u sportu i u hobijima. Šetnja, vožnja bicikla, rad u bašti, jedrenje, plivanje, kao i veliki broj sportova i ostalih aktivnosti predstavljaju deo svakodnevnog života.Trebalo bi da izbegavate upražnjavanje nekih dinamičnih aktivnosti-kontaktnih sportova, kao što je fudbal, karate ili rvanje, jer je moguća povreda same stome.",
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
        <div className="mb-20">
          <span className="mb-4 block text-lg font-black uppercase tracking-[0.12em] text-[#00a3ad]">
            Podrška i Saveti
          </span>
          <h2 className="text-4xl font-black tracking-tighter text-[#00344d] md:text-6xl">
            Sve što treba da znate
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3 text-[#00344d]">
              <HelpCircle size={24} className="text-[#00a3ad]" />
              <h3 className="text-2xl font-black tracking-tight">NAJČEŠĆE POSTAVLJENA PITANJA</h3>
            </div>
            <p className="mb-8 max-w-3xl text-base leading-relaxed text-slate-600">
              Ovim savetima želimo da Vam pomognemo da bolje razumete osnovne pojmove o
              stomi, o nezi stome i kože oko stome, kao i o načinu ishrane nakon izlaska
              iz bolnice.
            </p>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  number={`${String(i + 1).padStart(2, "0")}.`}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <AdviceTile
              icon={Utensils}
              title="Ishrana"
              desc="U nastavku možete pročitati detaljnije informacije o ishrani u zavisnosti od vrste izvedene stome."
              href="/stoma-program"
              guideHref="/assets/prirucnik-za-pacijente-sa-stomom.pdf"
              guideLabel="Priručnik za pacijente sa stomom"
            />
            <AdviceTile
              icon={HeartPulse}
              title="Nega stome"
              desc="U toku boravka u bolnici nakon operacije od Vaše stoma sestre ste dobili uputstva kako treba negovati kožu oko stome, kao i stomu. Ovde možete dobiti još neke korisne savete koji će Vam olakšati negu."
              href="/stoma-program"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
