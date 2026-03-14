import Image from "next/image";
import { Container } from "@/components/design-system/Container";
import { StomaCtaCard } from "@/components/pages/stoma-cta-card";
import {
  CARE_STEPS,
  SECTION_ONE_PARAGRAPHS,
  SKIN_PROTECTION_BULLETS,
  STOMA_CARE_PAGE_INTRO,
  type CareStep,
} from "@/components/pages/stoma-care-page.data";
import { StomaPageTop } from "@/components/pages/stoma-page-top";
import { StomaSectionHeader } from "@/components/pages/stoma-section-header";
import { StomaSectionDivider } from "@/components/pages/stoma-section-divider";

export function StomaCarePage() {
  return (
    <main className="bg-white pb-24 pt-28">
      <StomaPageTop {...STOMA_CARE_PAGE_INTRO} currentPage="nega-stome" />

      <Container className="mt-10">
        <section id="kako-negovati">
          <StomaSectionHeader title="Kako negovati stomu i kožu oko stome?" />

          <div className="max-w-full space-y-10 lg:max-w-[85%]">
            <p className="text-base leading-relaxed text-slate-700 md:text-lg">
              {SECTION_ONE_PARAGRAPHS[0]}
            </p>

            <div className="space-y-8">
              <CareTextBlock title="Čišćenje i priprema">
                {SECTION_ONE_PARAGRAPHS[1]}
              </CareTextBlock>
              <CareTextBlock title="Šta izbegavati">
                {SECTION_ONE_PARAGRAPHS[2]}
              </CareTextBlock>
            </div>
          </div>
        </section>

        <StomaSectionDivider />

        <section id="kako-izmeriti">
          <StomaSectionHeader title="Kako da izmerite vašu stomu?" />

          <StepGuide steps={CARE_STEPS} />
        </section>

        <StomaSectionDivider />

        <section id="zastita-koze">
          <StomaSectionHeader title="Saveti za zaštitu kože" />

          <ul className="max-w-full list-disc space-y-4 pl-5 text-base leading-relaxed text-slate-700 md:text-lg lg:max-w-[85%]">
            {SKIN_PROTECTION_BULLETS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <StomaSectionDivider size="lg" />

        <section id="cta">
          <StomaCtaCard />
        </section>
      </Container>
    </main>
  );
}

function StepGuide({ steps }: { steps: CareStep[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <article key={`step-${index + 1}`} className="tt-stoma-card min-h-0 rounded-2xl p-5">
          <div className="relative mb-5 h-48 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 md:h-52">
            <Image
              src={step.image}
              alt={`Korak ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-contain p-3"
            />
          </div>
          <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00a3ad] text-xs font-black text-white">
            {index + 1}
          </div>
          <h3 className="mb-2 text-sm font-black leading-snug text-tt-navy">{step.title}</h3>
          <p className="text-sm leading-relaxed text-slate-700">{step.text}</p>
        </article>
      ))}
    </div>
  );
}

function CareTextBlock({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-widest text-tt-teal md:text-base">
        {title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">{children}</p>
    </div>
  );
}
