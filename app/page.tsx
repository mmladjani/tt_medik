import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHomepageData, isExternalHref, normalizeSeedText } from "@/lib/content";

function HomepageLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return <Link href={href} className={className}>{label}</Link>;
}

export default async function HomePage() {
  const homepage = await getHomepageData();
  const heroSubtitle = homepage.hero.subtitle.includes("TODO")
    ? "Podrška, informacije i pouzdani medicinski programi za pacijente i negovatelje."
    : normalizeSeedText(homepage.hero.subtitle);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <Image
          src="/assets/cover-photo-homepage.jpg"
          alt="TT Medik hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 text-white sm:px-6 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">
            TT Medik
          </p>
          <h1 className="max-w-2xl font-[family-name:var(--font-source-serif)] text-4xl leading-tight sm:text-5xl">
            {homepage.hero.title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-100 sm:text-lg">
            {heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <HomepageLink
                href={homepage.hero.primaryCta.href}
                label={homepage.hero.primaryCta.label}
              />
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/70 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              <HomepageLink
                href={homepage.hero.secondaryCta.href}
                label={homepage.hero.secondaryCta.label}
              />
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {homepage.quickLinks.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm"
          >
            <h2 className="font-[family-name:var(--font-source-serif)] text-xl text-slate-900">
              {item.title}
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {normalizeSeedText(item.description)}
            </p>
            {item.link ? (
              <HomepageLink
                href={item.link.url}
                label={item.link.title ?? "Više"}
                className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-800"
              />
            ) : (
              <span className="inline-flex items-center gap-2 pt-4 text-sm font-semibold text-sky-700">
                <CheckCircle2 className="size-4" />
                Dostupno putem korisničkog naloga
              </span>
            )}
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-sky-50/70 p-8">
          <h2 className="font-[family-name:var(--font-source-serif)] text-3xl text-slate-900">
            {homepage.about.title}
          </h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-slate-700">
            {normalizeSeedText(homepage.about.body)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-[family-name:var(--font-source-serif)] text-3xl text-slate-900">
          Programi
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homepage.programs.map((program) => (
            <article
              key={program.title}
              className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{program.title}</h3>
              <p className="mt-2 text-sm text-slate-600">
                {program.description || "Detaljan pregled programa i dostupnih rešenja."}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-700">
                <HomepageLink href={program.link.url} label="Saznaj više" />
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-source-serif)] text-3xl text-slate-900">
          Česta pitanja
        </h2>
        <div className="mt-6 space-y-3">
          {homepage.faq.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {normalizeSeedText(item.answer)}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
