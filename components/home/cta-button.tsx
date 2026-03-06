import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeLink } from "./home-link";

export function CtaButton({
  href,
  label,
  variant = "default",
  className,
  icon = false,
}: {
  href: string;
  label: string;
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
  icon?: boolean;
}) {
  return (
    <Button
      asChild
      variant={variant}
      className={cn(
        "rounded-full px-6 transition-all duration-200 hover:-translate-y-0.5",
        className,
      )}
    >
      <HomeLink href={href} className="inline-flex items-center gap-2">
        {label}
        {icon ? <ArrowUpRight className="size-4" /> : null}
      </HomeLink>
    </Button>
  );
}
