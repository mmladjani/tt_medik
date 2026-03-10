import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { ContactData } from "@/lib/content";
import { cn } from "@/lib/utils";

function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function ContactCtaSection({
  contact,
  className,
}: {
  contact: ContactData;
  className?: string;
}) {
  const supportPhone = contact.phones.find((phone) => phone.includes("0800")) ?? contact.phones[0] ?? "";

  return (
    <section className={cn("bg-white py-24", className)}>
      <div className="tt-container max-w-[90rem]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#00344d] p-10 text-white md:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00a3ad]/20 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="mb-4 block text-lg font-black uppercase tracking-[0.12em] text-[#7cd3d8] md:text-xl">
                Podrška i saradnja
              </span>
              <h2 className="text-4xl font-black tracking-tighter md:text-6xl">Potrebna vam je pomoć?</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
                Na stranici Kontakt možete poslati upit i dobiti pouzdane informacije od našeg
                stručnog tima.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {supportPhone ? (
                <a
                  href={formatPhoneHref(supportPhone)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
                >
                  <Phone size={16} />
                  {supportPhone}
                </a>
              ) : null}
              <Link
                href="/kontakt"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-[#00a3ad] px-10 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#008c94]"
              >
                Otvori kontakt stranicu
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
