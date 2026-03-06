import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageShell({
  title,
  subtitle,
  eyebrow,
  actions,
  children,
  className,
  contentClassName,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <section className={cn("tt-container tt-section", className)}>
      <header className="tt-surface mb-8 p-6 sm:p-8">
        {eyebrow ? (
          <p className="tt-eyebrow">
            {eyebrow}
          </p>
        ) : null}
        <h1 className={cn("font-[family-name:var(--font-source-serif)] text-4xl text-slate-900 sm:text-5xl", eyebrow && "mt-4")}>
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {subtitle}
          </p>
        ) : null}
        {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
      </header>
      <div className={cn(contentClassName)}>{children}</div>
    </section>
  );
}
