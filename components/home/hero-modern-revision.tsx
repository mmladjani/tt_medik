import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Headphones, Mail, MapPin, Phone, UserPlus } from "lucide-react";
import { HomeLink } from "./home-link";

const SUPPORT_LINE = "0800 101 102";

function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function splitHeroTitle(title: string): { first: string; accent?: string } {
  const match = title.match(/^(.*?)(ovom putu!?)(.*)$/i);
  if (!match) return { first: title };

  return {
    first: match[1].trim(),
    accent: `${match[2]}${match[3] ?? ""}`.trim(),
  };
}

function renderConvaTecLinks(text: string): ReactNode {
  return text.split(/(ConvaTec)/g).map((part, index) => {
    if (part === "ConvaTec") {
      return (
        <Link
          key={`convatec-${index}`}
          href="https://www.convatec.com/sr-rs/"
          target="_blank"
          rel="noreferrer"
          className="relative inline-block text-[#00a3ad] transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          ConvaTec
        </Link>
      );
    }

    return part;
  });
}

export function HeroModernRevision({
  title,
  subtitle,
  imageSrc,
  primaryCta,
  address,
  email,
  phone,
  accountHref,
  isLoggedIn,
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
  primaryCta: {
    href: string;
    label: string;
  };
  address: string;
  email: string;
  phone: string;
  accountHref: string;
  isLoggedIn: boolean;
}) {
  const { first, accent } = splitHeroTitle(title);
  const cleanAddress = address.replace(/,\s*Srbija$/i, "");
  const accountTitle = isLoggedIn ? "Moj nalog" : "Nemaš nalog?";
  const accountText = isLoggedIn
    ? "Upravljajte nalogom i pristupite edukativnim materijalima."
    : "Otvaranjem naloga dobijaš pristup celokupnom sadržaju sajta.";
  const accountCta = isLoggedIn ? "Otvori nalog" : "Registruj se";

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-[#00344d] pt-[88px] lg:flex-row">
      <div className="relative flex min-h-[500px] flex-1 items-center overflow-hidden p-8 md:p-16 lg:p-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt="Health and support"
            fill
            priority
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#00344d] via-[#00344d]/30 to-transparent" />
        </div>

        <div className="relative z-20 max-w-2xl">
          <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl">
            {first}
            {accent ? (
              <>
                <br />
                <span className="text-[#00a3ad]">{accent}</span>
              </>
            ) : null}
          </h1>
          <p className="mb-12 text-xl font-medium leading-relaxed text-white/90 md:text-2xl">
            {renderConvaTecLinks(subtitle)}
          </p>

          <div className="flex flex-wrap gap-5">
            <HomeLink
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00a3ad] px-8 py-4 font-bold text-white transition-colors hover:bg-[#008c94]"
            >
              <FileText size={18} />
              {primaryCta.label}
            </HomeLink>

            <HomeLink
              href="https://meplus.convatec.com"
              className="inline-flex items-center gap-3 rounded-xl bg-[#28a745] px-8 py-4 font-bold text-white transition-colors hover:bg-[#218838]"
            >
              <span className="text-2xl font-black italic tracking-tighter">me+</span>
              <span className="text-sm uppercase tracking-wider">Podrška</span>
            </HomeLink>
          </div>
        </div>
      </div>

      <aside className="w-full border-l border-white/5 bg-[#002a3e] p-12 shadow-[-20px_0_50px_rgba(0,0,0,0.2)] lg:w-[480px]">
        <div className="flex h-full flex-col justify-center gap-10">
          <div>
            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-white/5 p-3 text-[#00a3ad]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="mb-4 text-lg font-bold uppercase tracking-wide text-white">
                  Kontakt informacije
                </h4>
                <div className="space-y-3 text-base text-white/70">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#00a3ad]" />
                    {cleanAddress}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 transition-colors hover:text-[#00a3ad]"
                  >
                    <Mail size={14} />
                    {email}
                  </a>
                  <p className="flex items-center gap-2 text-white/80">
                    <Phone size={14} className="text-[#00a3ad]" />
                    {phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          <div className="rounded-3xl border border-[#00a3ad]/20 bg-[#00a3ad]/10 p-6">
            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-[#00a3ad] p-3 text-white">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="mb-1 text-lg font-bold uppercase tracking-wide text-[#00a3ad]">
                  Besplatna linija
                </h4>
                <a
                  href={formatPhoneLink(SUPPORT_LINE)}
                  className="mb-1 block text-3xl font-black text-white transition hover:text-white/90"
                >
                  {SUPPORT_LINE}
                </a>
                <p className="text-sm font-bold uppercase text-white/40">
                  Radnim danima: 8:30 - 15:30
                </p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          <div>
            <div className="flex items-start gap-5">
              <div className="rounded-2xl bg-white/5 p-3 text-[#00a3ad]">
                <UserPlus size={24} />
              </div>
              <div>
                <h4 className="mb-2 text-lg font-bold uppercase tracking-wide text-white">
                  {accountTitle}
                </h4>
                <p className="mb-4 text-base leading-relaxed text-white/50">{accountText}</p>
                <Link
                  href={accountHref}
                  className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00a3ad]"
                >
                  {accountCta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
