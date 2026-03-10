import { CalloutNotice } from "@/components/home/callout-notice";
import { ContactCtaSection } from "@/components/home/contact-cta-section";
import { CtaButton } from "@/components/home/cta-button";
import { HeroModernRevision } from "@/components/home/hero-modern-revision";
import { HomeAboutTrust } from "@/components/home/home-about-trust";
import { KnowledgeHub } from "@/components/home/knowledge-hub";
import { ProductPrograms } from "@/components/home/product-programs";
import { SectionGap } from "@/components/home/section-gap";
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
import { getViewerAccess } from "@/lib/viewer-access";

export default async function HomePage() {
  const [homepage, contact, viewerAccess] = await Promise.all([
    getHomepageData(),
    getContactData(),
    getViewerAccess(),
  ]);

  const heroSubtitle = homepage.hero.subtitle.includes("TODO")
    ? "Podrška, informacije i pouzdani medicinski programi za pacijente i negovatelje."
    : normalizeSeedText(homepage.hero.subtitle);

  const accountHref = viewerAccess.isLoggedIn ? "/nalog" : "/login";
  const heroImage = homepage.hero.backgroundImage.startsWith("/")
    ? homepage.hero.backgroundImage
    : "/assets/tt_medik_heading.jpg";

  const primaryPhone = contact.phones[0] ?? "011 311 51 52";

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

      <HomeAboutTrust />
      <ProductPrograms className="pb-0" />
      <SectionGap size="lg" />
      <KnowledgeHub className="pb-0 pt-0" />

      <MedicalOnly>
        <section className="bg-white">
          <div className="tt-container max-w-[90rem] pt-4">
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
        </section>
      </MedicalOnly>

      <SectionGap size="lg" />
      <ContactCtaSection contact={contact} className="pt-0" />
    </div>
  );
}
