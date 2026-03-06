import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/page-shell";

export function ContentPageShell({
  title,
  subtitle,
  eyebrow,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <PageShell
      title={title}
      subtitle={subtitle}
      eyebrow={eyebrow}
      contentClassName={className}
    >
      {children}
    </PageShell>
  );
}
