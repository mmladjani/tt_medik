import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionContainer({
  children,
  className,
  containerClassName,
  id,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("tt-section", className)}>
      <div className={cn("tt-container", containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="tt-eyebrow">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-[family-name:var(--font-source-serif)] text-3xl leading-tight text-slate-900 sm:text-4xl",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
