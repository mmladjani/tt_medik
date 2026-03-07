import type { LucideIcon } from "lucide-react";
import { CtaButton } from "@/components/home/cta-button";
import { ProgramCard } from "@/components/home/program-card";

export interface ProgramsHubItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function ProgramsHub({
  eyebrow,
  title,
  subtitle,
  items,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ProgramsHubItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  const [featured, ...rest] = items;

  return (
    <div className="tt-surface border-sky-100 bg-white p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,290px)_1fr] lg:gap-8">
        <aside className="space-y-4">
          <p className="tt-eyebrow">{eyebrow}</p>
          <h2 className="font-[family-name:var(--font-source-serif)] text-3xl leading-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p>
          <CtaButton href="/kontakt" label="Konsultujte naš tim" />
        </aside>

        <div className="space-y-4">
          <ProgramCard
            title={featured.title}
            description={featured.description}
            href={featured.href}
            icon={featured.icon}
            variant="embedded"
            className="border-sky-200 bg-sky-50/40 p-6"
          />

          {rest.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {rest.map((item) => (
                <ProgramCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  icon={item.icon}
                  variant="embedded"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
