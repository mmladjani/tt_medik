import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isExternalHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function ActionLink({
  href,
  children,
  className,
  iconClassName,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  external?: boolean;
}) {
  const isExternal = external ?? isExternalHref(href);
  const classes = cn(
    "group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00a3ad]",
    className,
  );
  const icon = <ArrowRight size={16} className={cn("transition-transform group-hover:translate-x-2", iconClassName)} />;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
