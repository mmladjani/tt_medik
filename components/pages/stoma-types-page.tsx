"use client";

import * as React from "react";
import Image from "next/image";
import { EyeOff, FileText } from "lucide-react";
import { Container } from "@/components/design-system/Container";
import { StomaCtaCard } from "@/components/pages/stoma-cta-card";
import { StomaPageTop } from "@/components/pages/stoma-page-top";
import { StomaSectionHeader } from "@/components/pages/stoma-section-header";
import { StomaSectionDivider } from "@/components/pages/stoma-section-divider";
import {
  KOLOSTOMA_SECTION,
  OTHER_STOMA_SECTION,
  STOMA_TYPES_PAGE_INTRO,
  type StomaTypeCardData,
} from "@/components/pages/stoma-types-page.data";
import { cn } from "@/lib/utils";

export function StomaTypesPage() {
  return (
    <main className="bg-white pb-24 pt-28">
      <StomaPageTop {...STOMA_TYPES_PAGE_INTRO} currentPage="tipovi-stome" />

      <Container className="mt-10">
        <section id="kolostoma">
          <StomaSectionHeader
            title={KOLOSTOMA_SECTION.title}
            description={KOLOSTOMA_SECTION.description}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KOLOSTOMA_SECTION.items.map((type) => (
              <MedicalTypeCard key={type.title} data={type} />
            ))}
          </div>
        </section>

        <StomaSectionDivider />

        <section id="ostali-tipovi">
          <StomaSectionHeader
            title={OTHER_STOMA_SECTION.title}
            description={OTHER_STOMA_SECTION.description}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OTHER_STOMA_SECTION.items.map((type) => (
              <MedicalTypeCard key={type.title} data={type} />
            ))}
          </div>
        </section>

        <StomaSectionDivider size="lg" />

        <section id="cta">
          <StomaCtaCard />
        </section>
      </Container>
    </main>
  );
}

function MedicalTypeCard({ data }: { data: StomaTypeCardData }) {
  const isSplitLayout = Boolean(data.note && data.splitNoteLayout);

  if (isSplitLayout) {
    return (
      <article
        className={cn(
          "tt-stoma-card",
          data.className,
        )}
      >
        <div className="grid h-full items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-6">
          <div className="flex min-h-full flex-col">
            <SensitiveAssetReveal asset={data.asset} />

            <h3 className="text-base font-black uppercase tracking-tight text-tt-navy">{data.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.description}</p>
            <TypeFacts
              facts={data.facts}
              className="mt-auto hidden border-t border-slate-100 pt-4 lg:block"
            />
          </div>

          <div aria-hidden className="h-px w-full bg-slate-100 lg:h-auto lg:w-px" />

          <div className="tt-stoma-note-card flex h-full flex-col p-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-tt-navy">
              {data.noteTitle ?? "Napomena"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-tt-navy/80">{data.note}</p>
          </div>
        </div>

        <TypeFacts facts={data.facts} className="mt-auto border-t border-slate-100 pt-4 lg:hidden" />
      </article>
    );
  }

  return (
      <article
        className={cn(
          "tt-stoma-card",
          data.className,
        )}
      >
      <SensitiveAssetReveal asset={data.asset} />

      <h3 className="text-base font-black uppercase tracking-tight text-tt-navy">{data.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.description}</p>
      {data.note ? (
        <div className="tt-stoma-note-card mt-4 p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-tt-navy">
            {data.noteTitle}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-tt-navy/80">{data.note}</p>
        </div>
      ) : null}
      <TypeFacts facts={data.facts} className="mt-auto border-t border-slate-100 pt-4" />
    </article>
  );
}

function TypeFacts({
  facts,
  className,
}: {
  facts: StomaTypeCardData["facts"];
  className?: string;
}) {
  return (
    <dl className={cn("space-y-2", className)}>
      {facts.map((fact) => (
        <div key={`${fact.label}-${fact.value}`} className="flex items-start justify-between gap-3">
          <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">{fact.label}</dt>
          <dd className="text-right text-xs font-medium leading-snug text-slate-700">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SensitiveAssetReveal({ asset }: { asset: StomaTypeCardData["asset"] }) {
  const [isRevealed, setIsRevealed] = React.useState(!asset.isSensitive);
  const revealRegionId = React.useId();

  const handleReveal = () => {
    if (asset.type !== "image") {
      return;
    }

    setIsRevealed(true);
  };

  return (
    <div
      className={cn(
        "relative mb-4 overflow-hidden rounded-xl border border-slate-100 bg-slate-50",
        "h-44",
      )}
    >
      {asset.type === "image" ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className={cn(
            "object-contain p-1 transition-all duration-500",
            !isRevealed && "scale-105 opacity-30",
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-tt-teal/60">
          <FileText size={28} />
        </div>
      )}

      <div
        id={revealRegionId}
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center bg-tt-navy/10 backdrop-blur-xl transition-all duration-300",
          isRevealed && "pointer-events-none opacity-0",
        )}
      >
        <div className="flex flex-col items-center gap-2 px-3 text-center">
          <span className="rounded-full bg-white p-2.5 text-tt-teal shadow-sm" aria-hidden="true">
            <EyeOff size={16} />
          </span>
          {asset.type === "image" ? (
            <button
              type="button"
              onClick={handleReveal}
              aria-controls={revealRegionId}
              aria-pressed={isRevealed}
              className="rounded-full border border-tt-navy/15 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-tt-navy transition-colors hover:border-tt-teal hover:text-tt-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-teal/40"
            >
              Prikaži ilustraciju
            </button>
          ) : (
            <a
              href={asset.src}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-tt-navy/15 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-tt-navy transition-colors hover:border-tt-teal hover:text-tt-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-teal/40"
            >
              Otvori dokument
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
