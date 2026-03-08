import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  Headphones,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { HomeLink } from "./home-link";

function formatPhoneLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function splitHeroTitle(title: string): { firstLine: string; highlight: string } {
  const match = title.match(/^(.*?)(ovom putu!?)(.*)$/i);

  if (!match) {
    return {
      firstLine: title,
      highlight: "",
    };
  }

  const firstLine = `${match[1].trim()}`.replace(/\s+$/, "");
  const highlight = `${match[2]}${match[3] ?? ""}`.trim();
  return { firstLine, highlight };
}

export function HeroModernIntegrated({
  title,
  subtitle,
  imageSrc,
  primaryCta,
  phone,
  privacyHref,
  contactHref,
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
  phone: string;
  privacyHref: string;
  contactHref: string;
  accountHref: string;
  isLoggedIn: boolean;
}) {
  const { firstLine, highlight } = splitHeroTitle(title);
  const accountTitle = isLoggedIn ? "Moj nalog" : "Nemate nalog?";
  const accountCopy = isLoggedIn
    ? "Upravljajte profilom i pristupom edukativnim materijalima."
    : "Registracijom dobijate pristup edukativnim materijalima.";
  const accountCta = isLoggedIn ? "Otvori nalog" : "Napravi nalog";

  return (
    <section className="relative flex min-h-[700px] w-full flex-col overflow-hidden bg-[#00344d] lg:flex-row">
      <div className="relative flex flex-1 items-center overflow-hidden p-8 md:p-16 lg:p-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt="Freedom and support"
            fill
            priority
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00344d] via-[#00344d]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl">
          <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl">
            {firstLine}
            {highlight ? (
              <>
                <br />
                <span className="text-[#00a3ad]">{highlight}</span>
              </>
            ) : null}
          </h1>
          <p className="mb-10 text-xl font-medium leading-relaxed text-white/90 md:text-2xl">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <HomeLink
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00a3ad] px-8 py-4 font-bold text-white transition-colors hover:bg-[#008c94]"
            >
              {primaryCta.label}
              <FileText size={18} />
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

      <aside className="w-full border-l border-white/5 bg-[#002a3e] p-8 lg:w-[450px] lg:p-12">
        <div className="flex h-full flex-col justify-center gap-8">
          <Link href={privacyHref} className="group block">
            <div className="flex items-start gap-5">
              <div className="mt-1 rounded-xl bg-white/5 p-3 text-[#00a3ad] transition-all group-hover:bg-[#00a3ad] group-hover:text-white">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="mb-1 flex items-center gap-2 text-lg font-bold text-white">
                  Politika privatnosti
                  <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </h4>
                <p className="text-sm leading-relaxed text-white/50">
                  Vaši podaci su sigurni. Saznajte kako štitimo vašu privatnost.
                </p>
              </div>
            </div>
          </Link>

          <div className="h-px w-full bg-white/5" />

          <div className="group">
            <div className="flex items-start gap-5">
              <div className="mt-1 rounded-xl bg-white/5 p-3 text-[#00a3ad] transition-all group-hover:bg-[#00a3ad] group-hover:text-white">
                <Headphones size={24} />
              </div>
              <div>
                <Link href={contactHref} className="mb-1 block text-lg font-bold text-white transition hover:text-[#59cccf]">
                  Kontaktirajte nas
                </Link>
                <a
                  href={formatPhoneLink(phone)}
                  className="text-lg font-bold text-[#00a3ad] transition hover:text-[#59cccf]"
                >
                  {phone}
                </a>
                <p className="mt-1 text-xs italic text-white/50">Radnim danima: 8:30 – 15:30</p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/5" />

          <Link href={accountHref} className="group block">
            <div className="flex items-start gap-5">
              <div className="mt-1 rounded-xl bg-white/5 p-3 text-[#00a3ad] transition-all group-hover:bg-[#00a3ad] group-hover:text-white">
                <UserPlus size={24} />
              </div>
              <div>
                <h4 className="mb-1 text-lg font-bold text-white">{accountTitle}</h4>
                <p className="mb-3 text-sm leading-relaxed text-white/50">{accountCopy}</p>
                <span className="text-sm font-bold uppercase tracking-wider text-[#00a3ad] group-hover:underline">
                  {accountCta}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </section>
  );
}
