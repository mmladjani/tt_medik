import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  label,
  title,
  description,
  className,
  labelClassName,
  titleClassName,
  descriptionClassName,
}: {
  label: string;
  title: string;
  description?: ReactNode;
  className?: string;
  labelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <header className={cn("mb-20", className)}>
      <span className={cn("mb-4 block text-lg font-black uppercase tracking-widest text-tt-teal md:text-xl", labelClassName)}>
        {label}
      </span>
      <h2 className={cn("text-4xl font-black tracking-tight text-tt-navy md:text-6xl", titleClassName)}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-6 w-full text-lg leading-relaxed text-slate-600 md:text-xl", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
