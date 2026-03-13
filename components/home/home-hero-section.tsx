import type { ReactNode } from "react";
import Image from "next/image";
import { FileText, Headphones, Mail, MapPin, Phone, UserPlus } from "lucide-react";
import { ActionLink } from "@/components/design-system/ActionLink";
import { BrandLink } from "@/components/design-system/BrandLink";
import { Button } from "@/components/design-system/Button";
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
        <BrandLink key={`convatec-${index}`} className="text-[#00a3ad] hover:text-white">
          ConvaTec
        </BrandLink>
      );
    }

    return part;
  });
}

export function HomeHeroSection({
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
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#00344d]/40 to-transparent" />
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
            <Button asChild variant="teal">
              <HomeLink href={primaryCta.href}>
                <FileText size={18} />
                {primaryCta.label}
              </HomeLink>
            </Button>

            <Button asChild variant="green" className="tracking-[0.1em]">
              <HomeLink href="https://meplus.convatec.com">
                <span className="h-6 w-6 rounded-full bg-white/20" aria-hidden="true" />
                <span className="text-2xl font-black italic tracking-tighter">me+</span>
                <span className="text-sm uppercase tracking-wider">Podrška</span>
              </HomeLink>
            </Button>
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
                  <a
                    href={formatPhoneLink(phone)}
                    className="flex items-center gap-2 text-white/80 transition-colors hover:text-[#00a3ad]"
                  >
                    <Phone size={14} className="text-[#00a3ad]" />
                    {phone}
                  </a>
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
                <ActionLink
                  href={accountHref}
                  className="text-[#00a3ad]"
                >
                  {accountCta}
                </ActionLink>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
