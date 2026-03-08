import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { HomeLink } from "./home-link";

export function HeroOverlay({
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
  return (
    <section className="relative h-[600px] w-full overflow-hidden lg:h-[750px]">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt="TT Medik hero"
          fill
          priority
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00344d]/60 via-[#00344d]/20 to-transparent" />
      </div>

      <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-6">
        <div className="max-w-2xl rounded-[2.5rem] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md lg:p-12">
          <h1 className="text-balance text-4xl font-black leading-tight text-white lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-xl font-medium text-white/90 lg:text-2xl">
            {subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <HomeLink
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#00a3ad] px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#008c94]"
            >
              {primaryCta.label}
              <ExternalLink size={18} />
            </HomeLink>

            <a
              href="https://meplus.convatec.com"
              target="_blank"
              rel="noreferrer"
              className="transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-3 rounded-full border border-white/20 bg-[#28a745] px-6 py-3 shadow-md">
                <span className="text-lg font-black italic text-white">me+</span>
                <div className="h-4 w-px bg-white/30" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Podrška</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
