import { CalloutNotice } from "@/components/home/callout-notice";
import { ContactCtaSection } from "@/components/home/contact-cta-section";
import { CtaButton } from "@/components/home/cta-button";
import { HomeFaqSection } from "@/components/home/home-faq-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeMissionSection } from "@/components/home/home-mission-section";
import { HomeProgramsSection } from "@/components/home/home-programs-section";
import { SectionGap } from "@/components/home/section-gap";
import { Container } from "@/components/design-system/Container";
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
        <HomeHeroSection
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

      <HomeMissionSection />
      <SectionGap size="sm" divider />
      <HomeProgramsSection className="pb-0" />
      <SectionGap size="lg" divider />
      <HomeFaqSection className="pb-0 pt-0" />

      <MedicalOnly>
        <section className="bg-white">
          <Container className="pt-4">
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
          </Container>
        </section>
      </MedicalOnly>

      <SectionGap size="lg" divider />
      <ContactCtaSection contact={contact} className="pt-0" />
    </div>
  );
}
