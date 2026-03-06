import { ArrowUpRight } from "lucide-react";
import { HomeLink } from "./home-link";

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("sr-RS");
}

export function NewsCard({
  slug,
  title,
  excerpt,
  publishedAt,
}: {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}) {
  return (
    <article className="tt-card tt-card-hover group p-5 hover:border-sky-200">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {formatDate(publishedAt)}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-snug text-slate-900">{title}</h3>
      <p className="mt-3 min-h-20 text-sm leading-relaxed text-slate-600">
        {excerpt || "Sadržaj je dostupan na detaljnoj stranici vesti."}
      </p>
      <HomeLink
        href={`/novosti/${slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition hover:text-sky-900"
      >
        Pročitaj više
        <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </HomeLink>
    </article>
  );
}
