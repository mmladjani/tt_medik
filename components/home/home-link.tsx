import Link from "next/link";
import type { ReactNode } from "react";
import { isExternalHref } from "@/lib/navigation";

export function HomeLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
