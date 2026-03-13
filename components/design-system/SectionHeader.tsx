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
      <span className={cn("tt-section-label", labelClassName)}>
        {label}
      </span>
      <h2 className={cn("tt-section-title", titleClassName)}>
        {title}
      </h2>
      {description ? (
        <p className={cn("tt-section-description", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
