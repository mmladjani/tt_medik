import type { LucideIcon } from "lucide-react";
import {
  Bandage,
  Bed,
  BookOpen,
  FileText,
  Newspaper,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { CalloutNotice } from "@/components/home/callout-notice";
import { CtaButton } from "@/components/home/cta-button";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { HomeLink } from "@/components/home/home-link";
import { NewsCard } from "@/components/home/news-card";
import { PageHero } from "@/components/home/page-hero";
import { ProgramCard } from "@/components/home/program-card";
import { QuickAccessCard } from "@/components/home/quick-access-card";
import { SectionContainer, SectionHeading } from "@/components/home/section-container";
import {
  LoggedInOnly,
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
    : "/assets/cover-photo-homepage.jpg";

  const quickAccessDefaults = [
    {
      title: "Politika privatnosti",
      description:
        "Politikom privatnosti uređuju se način na koji TT MEDIK prikuplja, koristi i objavljuje informacije korisnika.",
      href: "/politika-privatnosti",
      label: "Saznaj više",
      icon: FileText,
    },
    {
      title: "Kontakt",
      description:
        "Besplatna telefonska linija za pacijente i podrška našeg stručnog tima svakog radnog dana.",
      href: "/kontakt",
      label: "Kontaktirajte nas",
      icon: PhoneCall,
    },
    {
      title: "Nalog",
      description:
        "Prijavite se ili registrujte nalog i pristupite celokupnom sadržaju sajta.",
      href: accountHref,
      label: viewerAccess.isLoggedIn ? "Moj nalog" : "Prijava i registracija",
      icon: UserRound,
    },
  ] as const;

  const quickAccessItems = quickAccessDefaults.map((fallbackItem, index) => {
    const seedItem = homepage.quickLinks[index];
    const href = seedItem?.link?.url
      ? normalizeCmsHref(seedItem.link.url)
      : fallbackItem.href;

    return {
      title: seedItem?.title || fallbackItem.title,
      description: normalizeSeedText(seedItem?.description || fallbackItem.description),
      href,
      label: seedItem?.link?.title || fallbackItem.label,
      icon: fallbackItem.icon,
    };
  });

  const aboutBody = normalizeSeedText(homepage.about.body);
  const aboutParts = aboutBody.split(/\n{2,}/).filter((part) => part.trim().length > 0);
  const newsPreview = newsPosts.slice(0, 3);
  const primaryPhone = contact.phones[0] ?? "011 311 51 52";

  return (
    <div>
      <VisibilityBlock visibility="public">
        <PageHero
          title={homepage.hero.title}
          subtitle={heroSubtitle}
          imageSrc={heroImage}
          primaryCta={{
            href: normalizeCmsHref(homepage.hero.primaryCta.href),
            label: homepage.hero.primaryCta.label,
          }}
          secondaryCta={{
            href: normalizeCmsHref(homepage.hero.secondaryCta.href),
            label: homepage.hero.secondaryCta.label,
          }}
        />
      </VisibilityBlock>

      <SectionContainer className="-mt-4 pb-10 pt-0 sm:-mt-6 sm:pb-12 lg:-mt-8">
        <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickAccessItems.map((item) => (
            <QuickAccessCard
              key={item.title}
              title={item.title}
              description={item.description}
              href={item.href}
              linkLabel={item.label}
              icon={item.icon}
            />
          ))}
        </div>
        <LoggedInOnly>
          <p className="mt-4 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-slate-700">
            Prijavljeni ste kao {viewerAccess.fullName || viewerAccess.email || "korisnik"}. Upravljajte
            podacima i pristupom na stranici naloga.
          </p>
        </LoggedInOnly>
      </SectionContainer>

      <SectionContainer className="pt-2">
        <div className="tt-surface grid gap-8 p-7 lg:grid-cols-[1.45fr_1fr] lg:p-10">
          <div>
            <SectionHeading eyebrow="Ukratko" title={homepage.about.title} />
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              {aboutParts.length > 0 ? (
                aboutParts.map((part) => <p key={part}>{part}</p>)
              ) : (
                <p>{aboutBody}</p>
              )}
            </div>
          </div>
          <CalloutNotice title="Naša područja podrške" className="h-fit bg-slate-50">
            <ul className="space-y-2 text-slate-700">
              <li>Nega stome i podrška pacijentima</li>
              <li>Moderno lečenje rana i zaštita kože</li>
              <li>Rešenja za inkontinenciju</li>
              <li>Programi za intenzivnu negu</li>
            </ul>
          </CalloutNotice>
        </div>
      </SectionContainer>

      <SectionContainer id="programi" className="bg-slate-100/65 pb-10">
        <SectionHeading
          eyebrow="Programi"
          title="Područja podrške"
          subtitle="Pogledajte naše ključne programe i pronađite informacije prilagođene vašim potrebama."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homepage.programs.map((program) => {
            const href = normalizeCmsHref(program.link.url);

            return (
              <ProgramCard
                key={program.title}
                title={program.title}
                description={resolveProgramDescription(
                  program.title,
                  href,
                  program.description,
                )}
                href={href}
                icon={resolveProgramIcon(program.title)}
              />
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer className="py-10 sm:py-12">
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

      <SectionContainer className="pt-4">
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
      </SectionContainer>

      <MedicalOnly>
        <SectionContainer className="pt-0">
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
        </SectionContainer>
      </MedicalOnly>

      <SectionContainer className="bg-slate-100/65 pb-10">
        <SectionHeading
          eyebrow="Novosti"
          title="Najnovije vesti"
          subtitle="Pratite aktuelne informacije i edukativne objave TT Medik tima."
        />

        {newsPreview.length > 0 ? (
          <>
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
            <div className="mt-4">
              <HomeLink
                href="/novosti"
                className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
              >
                Sve novosti
                <Newspaper className="size-4" />
              </HomeLink>
            </div>
          </>
        ) : (
          <p className="mt-6 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            Trenutno nema objavljenih novosti.
          </p>
        )}
      </SectionContainer>

      <SectionContainer className="pt-2">
        <CalloutNotice title="Potrebna vam je pomoć?">
          <p>
            Pozovite nas na <strong>{primaryPhone}</strong> ili nas kontaktirajte putem
            kontakt forme. Naš tim je tu da pomogne pacijentima i zdravstvenim
            radnicima.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <CtaButton href={formatPhoneHref(primaryPhone)} label={`Pozovite ${primaryPhone}`} />
            <CtaButton href="/kontakt" label="Kontakt strana" variant="outline" />
          </div>
        </CalloutNotice>
      </SectionContainer>
    </div>
  );
}
