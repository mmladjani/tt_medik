import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/design-system/Container";
import { SectionHeader } from "@/components/design-system/SectionHeader";
import { EditorialContactForm } from "@/components/forms/editorial-contact-form";
import { getContactData } from "@/lib/content";

function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function ContactItem({
  icon,
  label,
  value,
  sub,
  isTeal,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  isTeal?: boolean;
  href?: string;
}) {
  const valueClass = isTeal ? "text-[#00a3ad]" : "text-[#00344d]";
  const content = href ? (
    <a href={href} className={`text-xl font-bold ${valueClass} transition-colors hover:text-[#00a3ad]`}>
      {value}
    </a>
  ) : (
    <span className={`text-xl font-bold ${valueClass}`}>{value}</span>
  );

  return (
    <div className="group flex items-start gap-6">
      <div
        className={`mt-1 ${isTeal ? "text-[#00a3ad]" : "text-[#00344d]/40"} transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>
      <div>
        <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
          {label}
        </span>
        {content}
        {sub ? <span className="mt-1 block text-sm text-slate-500">{sub}</span> : null}
      </div>
    </div>
  );
}

export default async function KontaktPage() {
  const contact = await getContactData();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contact.address,
  )}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`;
  const supportPhone = contact.phones.find((phone) => phone.includes("0800")) ?? contact.phones[0] ?? "";

  return (
    <main className="bg-white pb-32 pt-40">
      <Container>
        <SectionHeader
          label="Podrška i saradnja"
          title="Kontakt"
          className="mb-20"
          descriptionClassName="max-w-4xl"
          description="Otvoreni smo za pitanja pacijenata, porodica i zdravstvenih radnika. Tu smo da pružimo pouzdane informacije."
        />

        <div className="relative grid gap-20 lg:grid-cols-[1fr_480px] lg:gap-32">
          <div className="space-y-12">
            <div className="border-b border-slate-100 pb-8">
              <h3 className="mb-2 text-2xl font-black tracking-tight text-[#00344d]">Pošaljite upit</h3>
              <p className="text-slate-400">Naš tim će vam odgovoriti u najkraćem mogućem roku.</p>
            </div>

            <EditorialContactForm idPrefix="kontakt-editorial-form" />
          </div>

          <div className="absolute bottom-0 left-[calc(100%-480px)] top-0 hidden w-px bg-slate-100 lg:block" />

          <div className="space-y-12">
            <section className="group relative overflow-hidden rounded-[2.5rem] border border-[#00a3ad]/10 bg-[#f0f9fa] p-10">
              <h4 className="relative z-10 mb-8 text-xs font-black uppercase tracking-widest text-[#00a3ad]">
                Naša lokacija
              </h4>

              <div className="relative z-10 mb-8">
                <div className="mb-6 flex items-start gap-4">
                  <MapPin className="shrink-0 text-[#00344d]" size={24} />
                  <span className="text-lg font-bold leading-snug text-[#00344d]">{contact.address}</span>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-inner">
                  <iframe
                    title="Mapa TT Medik lokacije"
                    src={mapEmbedUrl}
                    className="h-full w-full border-0 grayscale transition-all duration-700 hover:grayscale-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <Link
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-slate-100 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#00344d] shadow-lg transition-all hover:bg-[#00a3ad] hover:text-white"
                  >
                    Otvori mapu <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </section>

            <section className="space-y-8 pl-4">
              {supportPhone ? (
                <ContactItem
                  icon={<Phone size={24} />}
                  label="Besplatna linija"
                  value={supportPhone}
                  sub="Radnim danima: 8:30 – 15:30"
                  isTeal
                  href={formatPhoneLink(supportPhone)}
                />
              ) : null}

              <ContactItem
                icon={<Mail size={24} />}
                label="Email adresa"
                value={contact.email}
                href={`mailto:${contact.email}`}
              />
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
