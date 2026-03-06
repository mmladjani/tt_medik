import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContentPageShell } from "@/components/content/content-page-shell";
import { RichContent } from "@/components/content/rich-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getContactData } from "@/lib/content";
import { getSitePageBySlug } from "@/lib/site-pages";

function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default async function ContactPage() {
  const [contact, page] = await Promise.all([
    getContactData(),
    getSitePageBySlug("kontakt"),
  ]);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contact.address,
  )}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`;

  return (
    <ContentPageShell
      title="Kontakt"
      subtitle="Otvoreni smo za pitanja pacijenata, porodica i zdravstvenih radnika."
      eyebrow="Podrška"
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"
    >
      <div className="space-y-6">
        {page ? (
          <article className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-8">
            <RichContent portableText={page.portableText} textContent={page.textContent} />
          </article>
        ) : null}

        <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-8">
          <h2 className="font-[family-name:var(--font-source-serif)] text-3xl text-slate-900">
            Kontakt forma
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Pošaljite poruku, a tim TT Medik će odgovoriti u najkraćem roku.
          </p>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Ime i prezime *</Label>
              <Input id="contact-name" placeholder="primer, Nikola Nikolić" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email *</Label>
              <Input id="contact-email" type="email" placeholder="email@primer.rs" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Telefon *</Label>
              <Input id="contact-phone" placeholder="Broj telefona" required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact-subject">Naslov *</Label>
              <Input id="contact-subject" placeholder="Tema poruke" required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact-message">Poruka *</Label>
              <Textarea
                id="contact-message"
                rows={6}
                placeholder="Kako možemo pomoći?"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="button" className="w-full sm:w-auto">
                Pošalji poruku
              </Button>
            </div>
          </form>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Kontakt Podaci
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-slate-500" />
              <a href={`mailto:${contact.email}`} className="hover:text-sky-700">
                {contact.email}
              </a>
            </li>
            {contact.phones.map((phone) => (
              <li key={phone} className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-slate-500" />
                <a href={formatPhoneLink(phone)} className="hover:text-sky-700">
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-slate-500" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Lokacija
          </h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <iframe
              title="Mapa TT Medik lokacije"
              src={mapEmbedUrl}
              className="h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4">
            <Button asChild variant="outline" size="sm">
              <Link href={mapUrl} target="_blank" rel="noreferrer">
                Otvori mapu
              </Link>
            </Button>
          </div>
        </section>
      </aside>
    </ContentPageShell>
  );
}
