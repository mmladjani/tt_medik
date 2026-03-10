import { SpineDivider } from "@/components/design-system/SpineDivider";
import { cn } from "@/lib/utils";

const GAP_SIZES = {
  sm: "h-8 md:h-10",
  md: "h-12 md:h-16",
  lg: "h-16 md:h-24",
} as const;

export function SectionGap({
  size = "md",
  divider = false,
  className,
}: {
  size?: keyof typeof GAP_SIZES;
  divider?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-white",
        GAP_SIZES[size],
        divider && "flex items-center justify-center",
        className,
      )}
    >
      {divider ? <SpineDivider height="md" /> : null}
    </div>
  );
}
