import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { HomeLink } from "./home-link";

function splitHeroTitle(title: string): { main: string; accent?: string } {
  const match = title.match(/^(.*?)(ovom putu!?)(.*)$/i);
  if (!match) return { main: title };

  return {
    main: match[1].trim(),
    accent: `${match[2]}${match[3] ?? ""}`.trim(),
  };
}

export function HeroReframe({
  title,
  subtitle,
  imageSrc,
  primaryCta,
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
  primaryCta: {
    href: string;
    label: string;
  };
}) {
  const splitTitle = splitHeroTitle(title);

  return (
    <section className="bg-slate-50 px-4 pb-14 pt-8 md:px-8 md:pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#00344d] shadow-2xl shadow-blue-950/15">
          <div className="grid min-h-[560px] items-stretch lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10 flex items-center p-8 md:p-12 lg:p-16">
              <div className="max-w-2xl">
                <span className="mb-5 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-[#7ad7dd]">
                  Poverenje i podrška od 1993.
                </span>
                <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-6xl">
                  {splitTitle.main}
                  {splitTitle.accent ? (
                    <>
                      <br />
                      <span className="text-[#00a3ad]">{splitTitle.accent}</span>
                    </>
                  ) : null}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100/90 md:text-xl">
                  {subtitle}
                </p>

                <div className="mt-9 flex flex-wrap gap-4">
                  <HomeLink
                    href={primaryCta.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#00a3ad] px-7 py-3.5 font-bold text-white transition hover:bg-[#008c94]"
                  >
                    {primaryCta.label}
                    <ExternalLink className="size-4" />
                  </HomeLink>
                  <HomeLink
                    href="#programi"
                    className="inline-flex items-center rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 font-semibold text-white transition hover:bg-white/20"
                  >
                    Pogledajte programe
                  </HomeLink>
                </div>
              </div>
            </div>

            <div className="relative min-h-[300px]">
              <Image
                src={imageSrc}
                alt="TT Medik podrška"
                fill
                priority
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00344d]/55 via-[#00344d]/15 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-[#00344d]/0 lg:to-[#00344d]/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
