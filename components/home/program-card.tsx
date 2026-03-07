import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomeLink } from "./home-link";

export function ProgramCard({
  title,
  description,
  href,
  icon: Icon,
  variant = "default",
  className,
}: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  variant?: "default" | "embedded";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group p-5",
        variant === "default" &&
          "tt-card tt-card-hover hover:border-sky-200",
        variant === "embedded" &&
          "rounded-2xl border border-slate-200/80 bg-white/90 transition duration-200 hover:border-sky-200 hover:bg-white",
        className,
      )}
    >
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
