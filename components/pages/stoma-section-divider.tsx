import { SpineDivider } from "@/components/design-system/SpineDivider";
import { cn } from "@/lib/utils";

export function StomaSectionDivider({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div
      className={cn(
        "flex justify-center",
        size === "sm" && "py-6",
        size === "md" && "py-8",
        size === "lg" && "py-12",
      )}
    >
      <SpineDivider height={size} />
    </div>
  );
}
