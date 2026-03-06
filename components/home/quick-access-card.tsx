import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { HomeLink } from "./home-link";

export function QuickAccessCard({
  title,
  description,
  href,
  linkLabel,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
}) {
  return (
    <article className="tt-card tt-card-hover group p-6 hover:border-sky-200">
      <div className="inline-flex rounded-xl bg-sky-50 p-2 text-sky-700 ring-1 ring-sky-100">
        <Icon className="size-5" />
      </div>
      <h2 className="mt-4 text-balance font-[family-name:var(--font-source-serif)] text-2xl leading-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-3 min-h-24 whitespace-pre-line text-sm leading-relaxed text-slate-600">
        {description}
      </p>
      <HomeLink
        href={href || "#"}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
      >
        {linkLabel}
        <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </HomeLink>
    </article>
  );
}
