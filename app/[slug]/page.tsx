import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPageShell } from "@/components/content/content-page-shell";
import { RichContent } from "@/components/content/rich-content";
import { Button } from "@/components/ui/button";
import { getContactData, getHomepageData, normalizeCmsHref } from "@/lib/content";
import { getSitePageBySlug } from "@/lib/site-pages";

const programSlugs = new Set([
  "stoma-program",
  "inkontinencija",
  "program-za-negu-rana",
  "proizvodi-za-jedinice-intenzivne-nege",
  "kutak-za-osobe-sa-stomom",
]);

const pageSubtitles: Record<string, string> = {
  "o-nama": "Informacije o kompaniji TT Medik, vrednostima i dugogodišnjoj podršci pacijentima.",
  "politika-privatnosti": "Pravila obrade i zaštite podataka korisnika TT Medik sajta.",
  "vodic-za-dekubituse": "Praktične informacije o prevenciji, klasifikaciji i tretmanu dekubitusa.",
  "stoma-program": "Pregled stoma programa, saveta za negu i ključnih pojmova za pacijente.",
  inkontinencija: "Informacije o samokateterizaciji i dostupnim rešenjima za inkontinenciju.",
  "program-za-negu-rana": "Smernice i proizvodi za savremeni pristup tretmanu rana.",
  "proizvodi-za-jedinice-intenzivne-nege":
    "Pregled proizvoda za jedinice intenzivne nege i praćenje pacijenata.",
  "kutak-za-osobe-sa-stomom":
    "Edukativni sadržaji i praktični saveti za osobe sa stomom.",
};

function toSlug(pathValue: string): string {
  return pathValue.replace(/^\/+|\/+$/g, "");
}

function prettyDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("sr-RS");
}

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getSitePageBySlug(slug);

  if (!page) {
    notFound();
  }

  const isProgramPage = programSlugs.has(slug);
  const [homepage, contact] = await Promise.all([getHomepageData(), getContactData()]);

  const relatedPrograms = homepage.programs
    .map((program) => ({
      title: program.title,
      href: normalizeCmsHref(program.link.url),
    }))
    .filter((program) => program.href.startsWith("/"));

  return (
    <ContentPageShell
      title={page.title}
      eyebrow={isProgramPage ? "Program" : "Sadržaj"}
      subtitle={
        pageSubtitles[slug] ||
        (page.updatedAt
          ? `Poslednje ažuriranje: ${prettyDate(page.updatedAt)}`
          : "Informativna stranica TT Medik.")
      }
      className={isProgramPage ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]" : ""}
    >
      <article className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-8">
        <RichContent portableText={page.portableText} textContent={page.textContent} />
      </article>

      {isProgramPage ? (
        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Ostali Programi
            </h2>
            <ul className="mt-3 space-y-2">
              {relatedPrograms.map((program) => (
                <li key={program.href}>
                  <Link
                    href={program.href}
                    className={`text-sm transition hover:text-sky-700 ${
                      toSlug(program.href) === slug
                        ? "font-semibold text-sky-700"
                        : "text-slate-700"
                    }`}
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Kontakt Podrška
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Za dodatne informacije o programu kontaktirajte tim TT Medik.
            </p>
            <p className="mt-3 text-sm text-slate-700">{contact.email}</p>
            <p className="text-sm text-slate-700">{contact.phones[0]}</p>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/kontakt">Kontakt stranica</Link>
              </Button>
            </div>
          </section>
        </aside>
      ) : null}
    </ContentPageShell>
  );
}
