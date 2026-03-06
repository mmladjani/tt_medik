import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { HomeLink } from "./home-link";

export function ProgramCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <article className="tt-card tt-card-hover group p-5 hover:border-sky-200">
      <div className="inline-flex rounded-xl bg-slate-50 p-2 text-sky-700 ring-1 ring-slate-100 transition group-hover:bg-sky-50">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900">{title}</h3>
      <p className="mt-2 min-h-20 text-sm leading-relaxed text-slate-600">{description}</p>
      <HomeLink
        href={href}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
      >
        Saznaj više
        <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </HomeLink>
    </article>
  );
}
