import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  type ContactData,
  type HomepageProgram,
  isExternalHref,
  normalizeCmsHref,
} from "@/lib/content";

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="transition hover:text-sky-700">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="transition hover:text-sky-700">
      {label}
    </Link>
  );
}

function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function SiteFooter({
  programs,
  contact,
}: {
  programs: HomepageProgram[];
  contact: ContactData;
}) {
  const primaryPhone = contact.phones[0] ?? "";
  const secondaryPhone = contact.phones[1] ?? "";

  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white text-slate-700">
      <div className="tt-container grid gap-10 py-14 lg:grid-cols-[1.25fr_1fr_1fr]">
        <div className="space-y-5">
          <Image
            src="/assets/cropped-tt-medik-logo-short.png"
            alt="TT Medik"
            width={200}
            height={52}
          />
          <p className="max-w-sm text-sm leading-relaxed text-slate-600">
            TT Medik pruža podršku pacijentima i zdravstvenim radnicima kroz
            proverene medicinske programe, edukativne sadržaje i dostupnu stručnu
            pomoć.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Programi
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {programs.map((program) => (
              <li key={program.title}>
                <FooterLink
                  href={normalizeCmsHref(program.link.url)}
                  label={program.title}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-sky-700" />
              <a href={`mailto:${contact.email}`} className="hover:text-sky-700">
                {contact.email}
              </a>
            </li>
            {primaryPhone ? (
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-sky-700" />
                <a href={formatPhoneLink(primaryPhone)} className="hover:text-sky-700">
                  {primaryPhone}
                </a>
              </li>
            ) : null}
            {secondaryPhone ? (
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-sky-700" />
                <a href={formatPhoneLink(secondaryPhone)} className="hover:text-sky-700">
                  {secondaryPhone}
                </a>
              </li>
            ) : null}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-sky-700" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
        Pre upotrebe pročitajte uputstvo. O nameni i neželjenim reakcijama
        konsultujte lekara ili farmaceuta. © {new Date().getFullYear()} TT Medik.
      </div>
    </footer>
  );
}
