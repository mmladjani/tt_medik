import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-14 items-center justify-center gap-3 rounded-tt-pill px-10 text-xs font-black uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tt-teal/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        teal: "bg-tt-teal text-white hover:bg-[#008c94]",
        green: "bg-tt-green text-white hover:bg-[#16a34a]",
        outlineNavy:
          "border border-tt-navy/20 bg-white text-tt-navy hover:border-tt-teal hover:text-tt-teal",
      },
    },
    defaultVariants: {
      variant: "teal",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, className }))} {...props} />;
}

export { buttonVariants };
