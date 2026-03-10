import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SplitSpineLayout({
  left,
  right,
  className,
  gridClassName = "gap-20 lg:grid-cols-[1fr_480px] lg:gap-32",
  leftClassName,
  rightClassName,
  showSpine = false,
  rightColumnWidth = "480px",
  spineClassName,
}: {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  gridClassName?: string;
  leftClassName?: string;
  rightClassName?: string;
  showSpine?: boolean;
  rightColumnWidth?: string;
  spineClassName?: string;
}) {
  return (
    <div className={cn("relative grid", gridClassName, className)}>
      <div className={leftClassName}>{left}</div>

      {showSpine ? (
        <div
          className={cn(
            "absolute bottom-0 top-0 hidden w-px bg-slate-100 lg:block",
            spineClassName,
          )}
          style={{ left: `calc(100% - ${rightColumnWidth})` }}
          aria-hidden="true"
        />
      ) : null}

      <div className={rightClassName}>{right}</div>
    </div>
  );
}
