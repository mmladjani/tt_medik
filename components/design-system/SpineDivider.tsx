import { cn } from "@/lib/utils";

const HEIGHT_MAP = {
  sm: "h-10",
  md: "h-[60px]",
  lg: "h-20",
} as const;

export function SpineDivider({
  height = "md",
  className,
}: {
  height?: keyof typeof HEIGHT_MAP | number;
  className?: string;
}) {
  const customHeight = typeof height === "number" ? `${height}px` : undefined;
  const heightClass = typeof height === "number" ? "h-0" : HEIGHT_MAP[height];

  return (
    <div
      aria-hidden="true"
      className={cn("w-px bg-slate-100", heightClass, className)}
      style={customHeight ? { height: customHeight } : undefined}
    />
  );
}
