import { cn } from "@/lib/utils";

const GAP_SIZES = {
  sm: "h-8 md:h-10",
  md: "h-12 md:h-16",
  lg: "h-16 md:h-24",
} as const;

export function SectionGap({
  size = "md",
  className,
}: {
  size?: keyof typeof GAP_SIZES;
  className?: string;
}) {
  return <div aria-hidden="true" className={cn("bg-white", GAP_SIZES[size], className)} />;
}
