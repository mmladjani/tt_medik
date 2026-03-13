import { ContactCtaSection } from "@/components/home/contact-cta-section";
import { HomeFaqSection } from "@/components/home/home-faq-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeMissionSection } from "@/components/home/home-mission-section";
import { HomeProfessionalSection } from "@/components/home/home-professional-section";
import { HomeProgramsSection } from "@/components/home/home-programs-section";
import { SectionGap } from "@/components/home/section-gap";
import { VisibilityBlock } from "@/components/visibility/visibility-block";
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
    <main>
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

      <HomeProfessionalSection />

      <SectionGap size="lg" divider />
      <ContactCtaSection contact={contact} className="pt-0" />
    </main>
  );
}
