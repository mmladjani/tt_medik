import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  type ContactData,
  type HomepageProgram,
  isExternalHref,
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
      <a href={href} target="_blank" rel="noreferrer" className="hover:text-white">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="hover:text-white">
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
  return (
    <footer className="mt-20 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div className="space-y-4">
          <Image
            src="/assets/logo-white.png"
            alt="TT Medik"
            width={180}
            height={56}
          />
          <p className="max-w-xs text-sm text-slate-400">
            Partner u oblasti nege stome, tretmana rana i kontinuiteta podrške
            pacijentima.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Programi
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {programs.map((program) => (
              <li key={program.title}>
                <FooterLink href={program.link.url} label={program.title} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-slate-200" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
            {contact.phones.map((phone) => (
              <li key={phone} className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-slate-200" />
                <a href={formatPhoneLink(phone)} className="hover:text-white">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-slate-200" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800/80 px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
        © {new Date().getFullYear()} TT Medik. Sva prava zadržana.
      </div>
    </footer>
  );
}
