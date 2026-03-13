import { cn } from "@/lib/utils";

export function StomaSectionHeader({
  title,
  description,
  className,
  descriptionClassName,
}: {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
}) {
  return (
    <header className={cn("mb-6 md:mb-8", className)}>
      <h2 className="text-3xl font-black tracking-tight text-tt-navy md:text-4xl">{title}</h2>
      {description ? (
        <p className={cn("tt-main-copy mt-4 text-base leading-relaxed text-slate-600 md:text-lg", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
