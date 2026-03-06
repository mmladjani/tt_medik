import Image from "next/image";
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
    <section className="relative isolate min-h-[58vh] overflow-hidden border-b border-slate-200/70">
      <Image
        src={imageSrc}
        alt="TT Medik hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/78 via-slate-900/55 to-slate-900/18" />
      <div className="tt-container relative flex flex-col gap-6 py-20 text-white sm:py-24 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-100/90">
          TT Medik
        </p>
        <h1 className="max-w-2xl text-balance font-[family-name:var(--font-source-serif)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <CtaButton href={primaryCta.href} label={primaryCta.label} />
          <CtaButton
            href={secondaryCta.href}
            label={secondaryCta.label}
            variant="outline"
            className="border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
          />
        </div>
      </div>
    </section>
  );
}
