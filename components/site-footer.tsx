import type { ReactNode } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Container } from "@/components/design-system/Container";
import {
  type ContactData,
  isExternalHref,
} from "@/lib/content";

function FooterLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const baseClass =
    className ??
    "text-xs font-bold uppercase tracking-widest text-white/70 transition-colors hover:text-[#00a3ad]";

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center ${baseClass}`}
      >
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={`inline-flex items-center ${baseClass}`}>
      <span>{label}</span>
    </Link>
  );
}

function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function DirectoryLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <li>
      <FooterLink href={href} label={label} />
    </li>
  );
}

function ContactInfo({
  icon,
  text,
  href,
  isTeal,
}: {
  icon: ReactNode;
  text: string;
  href?: string;
  isTeal?: boolean;
}) {
  const content = href ? (
    <a
      href={href}
      className={`inline-flex items-center text-sm transition-colors hover:text-[#00a3ad] ${isTeal ? "font-bold text-[#00a3ad]" : "text-white/70"}`}
    >
      <span>{text}</span>
    </a>
  ) : (
    <span className={`${isTeal ? "font-bold text-[#00a3ad]" : "text-white/70"} text-sm`}>
      {text}
    </span>
  );

  return (
    <div className="group flex items-center gap-4">
      <div
        className={`${isTeal ? "text-[#00a3ad]" : "text-white/40"} shrink-0 transition-colors group-hover:text-[#00a3ad]`}
      >
        {icon}
      </div>
      {content}
    </div>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/40 transition-all hover:bg-[#00a3ad] hover:text-white"
    >
      {icon}
    </a>
  );
}

export function SiteFooter({
  contact,
}: {
  contact: ContactData;
}) {
  const supportPhone = contact.phones.find((phone) => phone.includes("0800")) ?? contact.phones[0] ?? "";
  const programLinks = [
    { label: "Tipovi stome", href: "/stoma-program" },
    { label: "Nega stome", href: "/nega-stome" },
    { label: "Stoma pomagala", href: "/stoma-pomagala" },
  ];
  const usefulLinks = [
    { label: "O nama", href: "/o-nama" },
    { label: "Kutak za pacijente", href: "/kutak-za-osobe-sa-stomom" },
    { label: "Ishrana i saveti", href: "/stoma-program" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  return (
    <footer className="mt-16 overflow-hidden bg-[#00344d] pb-12 pt-24 text-white">
      <Container>
        <div className="grid grid-cols-1 gap-16 border-b border-white/5 pb-20 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div className="space-y-8">
            <h2 className="text-3xl font-black tracking-tighter">
              TT<span className="text-[#00a3ad]">Medik</span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Pouzdan partner u distribuciji inovativnih medicinskih tehnologija kompanije
              ConvaTec od 1993. godine.
            </p>
            <div className="flex gap-4">
              <SocialIcon href="#" icon={<Facebook size={18} />} label="Facebook" />
              <SocialIcon href="#" icon={<Instagram size={18} />} label="Instagram" />
              <SocialIcon href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#00a3ad]">
              Programi
            </h4>
            <ul className="space-y-4">
              {programLinks.map((program) => (
                <DirectoryLink
                  key={program.label}
                  href={program.href}
                  label={program.label}
                />
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#00a3ad]">
              Korisni linkovi
            </h4>
            <ul className="space-y-4">
              {usefulLinks.map((item) => (
                <DirectoryLink key={item.label} href={item.href} label={item.label} />
              ))}
            </ul>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
            <h4 className="mb-8 text-sm font-black uppercase tracking-widest text-white">Kontakt</h4>
            <div className="space-y-6">
              <ContactInfo icon={<MapPin size={18} />} text={contact.address} />
              {supportPhone ? (
                <ContactInfo
                  icon={<Phone size={18} />}
                  text={supportPhone}
                  href={formatPhoneLink(supportPhone)}
                  isTeal
                />
              ) : null}
              <ContactInfo
                icon={<Mail size={18} />}
                text={contact.email}
                href={`mailto:${contact.email}`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-12 md:flex-row">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            © {new Date().getFullYear()} TT Medik d.o.o. Sva prava zadržana.
          </p>
          <ul className="flex gap-8">
            <li>
              <FooterLink
                href="/politika-privatnosti"
                label="Politika privatnosti"
                className="text-[10px] font-bold uppercase tracking-widest text-white/30 transition-colors hover:text-[#00a3ad]"
              />
            </li>
            <li>
              <FooterLink
                href="/kontakt"
                label="Uslovi korišćenja"
                className="text-[10px] font-bold uppercase tracking-widest text-white/30 transition-colors hover:text-[#00a3ad]"
              />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter as TTMedikFooter };
