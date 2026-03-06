import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CalloutNotice({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "tt-surface border-sky-100 bg-gradient-to-r from-sky-50 via-white to-white p-6 sm:p-8",
        className,
      )}
    >
      <h3 className="font-[family-name:var(--font-source-serif)] text-2xl leading-tight text-slate-900">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
        {children}
      </div>
    </aside>
  );
}
