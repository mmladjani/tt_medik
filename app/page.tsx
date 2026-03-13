import { ContactCtaSection } from "@/components/home/contact-cta-section";
import { HomeFaqSection } from "@/components/home/home-faq-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeMissionSection } from "@/components/home/home-mission-section";
import { HomeProgramsSection } from "@/components/home/home-programs-section";
import { SectionGap } from "@/components/home/section-gap";
import { VisibilityBlock } from "@/components/visibility/visibility-block";
import {
  getContactData,
  getHomepageData,
} from "@/lib/content";
import { getViewerAccess } from "@/lib/viewer-access";

export default async function HomePage() {
  const [homepage, contact, viewerAccess] = await Promise.all([
    getHomepageData(),
    getContactData(),
    getViewerAccess(),
  ]);

  const accountHref = viewerAccess.isLoggedIn ? "/nalog" : "/login";
  const primaryPhone = contact.phones[0] ?? "011 311 51 52";

  return (
    <main>
      <VisibilityBlock visibility="public">
        <HomeHeroSection
          title={homepage.hero.title}
          subtitle={homepage.hero.subtitle}
          imageSrc={homepage.hero.backgroundImage}
          primaryCta={homepage.hero.primaryCta}
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

      <SectionGap size="lg" divider />
      <ContactCtaSection contact={contact} className="pt-0" />
    </main>
  );
}
