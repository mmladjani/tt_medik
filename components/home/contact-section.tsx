import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { ClinicalInboxForm } from "@/components/forms/clinical-inbox-form";
import type { ContactData } from "@/lib/content";
import { cn } from "@/lib/utils";

function ContactItem({
  icon,
  label,
  value,
  desc,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  desc?: string;
}) {
  return (
    <div className="group flex gap-5">
      <div className="shrink-0 text-[#00a3ad] transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <span className="text-lg font-bold text-[#00344d]">{value}</span>
        {desc ? <span className="text-sm text-slate-500">{desc}</span> : null}
      </div>
    </div>
  );
}

export function ContactSection({
  contact,
  className,
}: {
  contact: ContactData;
  className?: string;
}) {
  const supportLine = contact.phones.find((phone) => phone.includes("0800")) ?? "0800 101 102";
  const supportHours = "Radnim danima: 8:30 – 15:30";

  return (
    <section className={cn("bg-white py-24", className)}>
      <div className="tt-container max-w-[90rem]">
        <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1fr)_480px] lg:gap-24">
          <div>
            <span className="mb-4 block text-xs font-black uppercase tracking-[0.25em] text-[#00a3ad]">
              Kontaktirajte nas
            </span>
            <h2 className="mb-12 text-4xl font-black tracking-tighter text-[#00344d] md:text-6xl">
              Pošaljite upit
            </h2>

            <ClinicalInboxForm idPrefix="homepage-clinical-inbox" />
          </div>

          <div className="absolute bottom-0 left-[calc(100%-480px)] top-0 hidden w-px bg-slate-100 lg:block" />

          <aside className="flex flex-col justify-center gap-12 lg:pl-16">
            <div className="space-y-10">
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#00344d]">
                Podrška i prodaja
              </h3>

              <ContactItem
                icon={<Phone size={24} />}
                label="Besplatna linija za pacijente"
                value={supportLine}
                desc={supportHours}
              />

              <ContactItem
                icon={<Mail size={24} />}
                label="Email adresa"
                value={contact.email}
              />

              <ContactItem
                icon={<MapPin size={24} />}
                label="Adresa sedišta"
                value={contact.address}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
