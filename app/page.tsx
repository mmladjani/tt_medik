import type { LucideIcon } from "lucide-react";
import {
  Bandage,
  Bed,
  BookOpen,
  Newspaper,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { AboutUsSection } from "@/components/content/about-us-section";
import { CalloutNotice } from "@/components/home/callout-notice";
import { CtaButton } from "@/components/home/cta-button";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { HeroModernRevision } from "@/components/home/hero-modern-revision";
import { HomeLink } from "@/components/home/home-link";
import { NewsCard } from "@/components/home/news-card";
import { ProgramsHub } from "@/components/home/programs-hub";
import { SectionContainer, SectionHeading } from "@/components/home/section-container";
import { ContactForm } from "@/components/forms/contact-form";
import {
  MedicalOnly,
  VisibilityBlock,
} from "@/components/visibility/visibility-block";
import {
  getContactData,
  getHomepageData,
  normalizeCmsHref,
  normalizeSeedText,
} from "@/lib/content";
import { getNewsPosts } from "@/lib/news";
import { getViewerAccess } from "@/lib/viewer-access";

const PROGRAM_FALLBACK_DESCRIPTION: Record<string, string> = {
  "stoma-program":
    "Informacije, saveti i podrška za svakodnevnu negu stome i kvalitetniji život.",
  inkontinencija:
    "Rešenja i edukacija za kontrolu inkontinencije uz stručno vođstvo i podršku.",
  "program-za-negu-rana":
    "Savremeni pristupi tretmanu rana i zaštiti kože za pacijente i negovatelje.",
  "proizvodi-za-jedinice-intenzivne-nege":
    "Program proizvoda za intenzivnu negu sa fokusom na sigurnost i efikasnost.",
  "kutak-za-osobe-sa-stomom":
    "Korisni vodiči i praktični sadržaji namenjeni osobama sa stomom i porodici.",
};

const PROGRAMS_SECTION_EYEBROW = "Programi";
const PROGRAMS_SECTION_TITLE = "Područja podrške";
const PROGRAMS_SECTION_SUBTITLE =
  "Pogledajte ključne TT Medik programe i odaberite sadržaj koji najbolje odgovara vašim potrebama.";

function resolveProgramIcon(title: string): LucideIcon {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("stoma")) return Stethoscope;
  if (lowerTitle.includes("inkontinen")) return ShieldCheck;
  if (lowerTitle.includes("rana")) return Bandage;
  if (lowerTitle.includes("intenzivne")) return Bed;
  if (lowerTitle.includes("kutak")) return BookOpen;

  return ShieldCheck;
}

function resolveProgramDescription(title: string, href: string, description: string): string {
  if (description.trim().length > 0) {
    return description;
  }

  const slug = href.split("#")[0].replace(/^\/+/, "");
  return (
    PROGRAM_FALLBACK_DESCRIPTION[slug] ||
    `Saznajte više o programu: ${title.toLowerCase()}.`
  );
}

function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default async function HomePage() {
  const [homepage, contact, newsPosts, viewerAccess] = await Promise.all([
    getHomepageData(),
    getContactData(),
    getNewsPosts(),
    getViewerAccess(),
  ]);

  const heroSubtitle = homepage.hero.subtitle.includes("TODO")
    ? "Podrška, informacije i pouzdani medicinski programi za pacijente i negovatelje."
    : normalizeSeedText(homepage.hero.subtitle);

  const accountHref = viewerAccess.isLoggedIn ? "/nalog" : "/login";
  const heroImage = homepage.hero.backgroundImage.startsWith("/")
    ? homepage.hero.backgroundImage
    : "/assets/tt_medik_heading.jpg";

  const newsPreview = newsPosts.slice(0, 3);
  const primaryPhone = contact.phones[0] ?? "011 311 51 52";

  const programs = homepage.programs.map((program) => {
    const href = normalizeCmsHref(program.link.url);
    return {
      title: program.title,
      description: resolveProgramDescription(program.title, href, program.description),
      href,
      icon: resolveProgramIcon(program.title),
    };
  });

  return (
    <div>
      <VisibilityBlock visibility="public">
        <HeroModernRevision
          title={homepage.hero.title}
          subtitle={heroSubtitle}
          imageSrc={heroImage}
          primaryCta={{
            href: normalizeCmsHref(homepage.hero.primaryCta.href),
            label: homepage.hero.primaryCta.label,
          }}
          address={contact.address}
          email={contact.email}
          phone={primaryPhone}
          accountHref={accountHref}
          isLoggedIn={viewerAccess.isLoggedIn}
        />
      </VisibilityBlock>

      <AboutUsSection />

      <SectionContainer id="programi" className="bg-slate-100/65">
        <ProgramsHub
          eyebrow={PROGRAMS_SECTION_EYEBROW}
          title={PROGRAMS_SECTION_TITLE}
          subtitle={PROGRAMS_SECTION_SUBTITLE}
          items={programs}
        />
      </SectionContainer>

      <SectionContainer className="pt-8">
        <SectionHeading
          eyebrow="Vodiči"
          title="Edukativni sadržaj"
          subtitle="Praktične informacije za svakodnevnu negu i sigurniji oporavak nakon terapije."
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="tt-card tt-card-hover p-6">
            <h3 className="font-[family-name:var(--font-source-serif)] text-2xl text-slate-900">
              Ishrana
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              U nastavku možete pročitati detaljnije informacije o ishrani u
              zavisnosti od vrste izvedene stome i svakodnevnim preporukama.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CtaButton href="/stoma-program" label="Detaljnije" icon />
              <CtaButton
                href="https://www.ttmedik.co.rs/wp-content/uploads/2018/10/Priručnik-za-pacijente-sa-stomom.pdf"
                label="Priručnik za pacijente"
                variant="outline"
              />
            </div>
          </article>

          <article className="tt-card tt-card-hover p-6">
            <h3 className="font-[family-name:var(--font-source-serif)] text-2xl text-slate-900">
              Nega stome
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Korisni saveti za negu kože oko stome, odabir pribora i organizaciju
              dnevne rutine nakon izlaska iz bolnice.
            </p>
            <div className="mt-5">
              <CtaButton href="/stoma-program" label="Saznaj više" icon />
            </div>
          </article>
        </div>

        <MedicalOnly>
          <div className="mt-4">
            <CalloutNotice
              title="Stručni savet za zdravstvene radnike"
              className="border-sky-200 bg-gradient-to-r from-sky-100 to-white"
            >
              <p>
                Sadržaj u stručnom portalu uključuje smernice, edukativne materijale i
                preporuke za tretman pacijenata u svakodnevnoj praksi.
              </p>
              <div className="mt-4">
                <CtaButton href="/portal/strucni" label="Otvori stručni portal" icon />
              </div>
            </CalloutNotice>
          </div>
        </MedicalOnly>
      </SectionContainer>

      <SectionContainer className="pb-10">
        <SectionHeading
          eyebrow="Imate pitanje?"
          title="Najčešće postavljena pitanja"
          subtitle="Kratki odgovori na pitanja koja pacijenti i negovatelji najčešće postavljaju."
        />
        <div className="mt-6">
          <FaqAccordion
            items={homepage.faq.map((item) => ({
              question: item.question,
              answer: normalizeSeedText(item.answer),
            }))}
          />
        </div>
      </SectionContainer>

      <SectionContainer className="bg-slate-100/65 pb-10">
        <SectionHeading
          eyebrow="Novosti"
          title="Najnovije vesti"
          subtitle="Aktuelne informacije i edukativni sadržaji TT Medik tima."
        />

        {newsPreview.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newsPreview.map((post) => (
              <NewsCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                publishedAt={post.publishedAt}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 tt-card p-4 text-sm text-slate-600">Trenutno nema objavljenih novosti.</p>
        )}

        <div className="mt-4">
          <HomeLink
            href="/novosti"
            className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
          >
            Sve novosti
            <Newspaper className="size-4" />
          </HomeLink>
        </div>
      </SectionContainer>

      <SectionContainer className="pb-16 pt-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <CalloutNotice title="Potrebna vam je pomoć?" className="h-full">
            <p>
              Pozovite nas na <strong>{primaryPhone}</strong> ili nas kontaktirajte putem
              kontakt stranice. Naš tim je tu da pomogne pacijentima i zdravstvenim
              radnicima.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CtaButton href={formatPhoneHref(primaryPhone)} label={`Pozovite ${primaryPhone}`} />
              <CtaButton href="/kontakt" label="Kontakt stranica" variant="outline" />
            </div>
          </CalloutNotice>

          <section className="tt-surface p-6 sm:p-7">
            <h2 className="font-[family-name:var(--font-source-serif)] text-2xl text-slate-900">
              Pošaljite poruku
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Kratko nam opišite pitanje i odgovorićemo u najkraćem roku.
            </p>
            <ContactForm
              mode="compact"
              idPrefix="homepage-contact-form"
              className="mt-5"
              submitLabel="Pošalji poruku"
            />
          </section>
        </div>
      </SectionContainer>
    </div>
  );
}
