import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { HomeLink } from "./home-link";

export function HeroModern({
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
    <section className="bg-slate-50 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex min-h-[600px] items-center overflow-hidden rounded-[2.5rem] bg-[#00344d] shadow-2xl shadow-blue-900/20">
          <div className="relative z-20 w-full p-8 md:p-16 lg:w-3/5 lg:p-24">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-[#00a3ad]">
              TT Medik &{" "}
              <Link
                href="https://www.convatec.com/sr-rs/"
                target="_blank"
                rel="noreferrer"
                className="relative inline-block text-[#00a3ad] transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                ConvaTec
              </Link>
            </span>

            <h1 className="mb-6 text-4xl font-black leading-[1.1] text-white md:text-6xl">
              {title}
            </h1>

            <p className="mb-12 max-w-lg text-lg font-medium leading-relaxed text-blue-100/80 md:text-xl">
              {subtitle}
            </p>

            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <HomeLink
                href={primaryCta.href}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00a3ad] px-8 py-4 font-bold text-white transition-all hover:bg-[#008c94] sm:w-auto"
              >
                {primaryCta.label}
                <ExternalLink
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </HomeLink>

              <HomeLink
                href="https://meplus.convatec.com"
                className="w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-4 rounded-2xl border-b-4 border-green-800 bg-[#28a745] px-8 py-4 shadow-lg transition-all hover:bg-[#218838] active:translate-y-1 active:border-b-0">
                  <span className="text-2xl font-black italic tracking-tighter text-white">
                    me+
                  </span>
                  <div className="h-6 w-px bg-white/20" />
                  <span className="text-sm font-extrabold uppercase tracking-tight text-white">
                    Program podrške
                  </span>
                </div>
              </HomeLink>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 z-10 w-full opacity-30 lg:w-1/2 lg:opacity-100">
            <Image
              src={imageSrc}
              alt="Freedom and health"
              fill
              priority
              className="h-full w-full object-cover [clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00344d] via-[#00344d]/40 to-transparent lg:hidden" />
          </div>

          <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-[#00a3ad]/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
