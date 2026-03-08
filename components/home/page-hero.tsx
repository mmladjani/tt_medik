import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { CtaButton } from "./cta-button";

export function PageHero({
  title,
  subtitle,
  imageSrc,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta: {
    href: string;
    label: string;
  };
}) {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-12 sm:pb-24 sm:pt-16">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-full w-1/3 translate-x-1/4 -skew-x-12 bg-[#f0f9fa] lg:block" />

      <div className="tt-container grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="mb-6 inline-block rounded-full bg-[#00a3ad]/10 px-4 py-1.5 text-sm font-bold text-[#00a3ad]">
            Poverenje i podrška od 1993.
          </span>
          <h1 className="text-balance font-[family-name:var(--font-source-serif)] text-4xl font-black leading-[1.12] text-[#00344d] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <CtaButton
              href={primaryCta.href}
              label={primaryCta.label}
              className="rounded-2xl bg-[#00a3ad] px-7 py-3.5 font-bold text-white shadow-lg shadow-[#00a3ad]/20 hover:bg-[#008c94]"
            />
            <CtaButton
              href={secondaryCta.href}
              label={secondaryCta.label}
              variant="outline"
              className="rounded-2xl border-2 border-slate-200 bg-white px-7 py-3.5 font-bold text-slate-700 hover:border-[#00a3ad] hover:text-[#00a3ad]"
            />
          </div>
        </div>

        <div className="relative">
          <div className="relative z-10 overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl">
            <Image
              src={imageSrc}
              alt="TT Medik hero"
              width={900}
              height={1000}
              priority
              className="h-[420px] w-full object-cover sm:h-[500px]"
            />
          </div>

          <div className="absolute -bottom-5 left-2 z-20 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-bottom-6 sm:-left-6 sm:p-6">
            <div className="flex size-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 sm:size-12">
              <ShieldCheck size={26} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Status</p>
              <p className="font-bold text-[#00344d]">Sertifikovana podrška</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
