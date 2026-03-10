import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CONVATEC_URL = "https://www.convatec.com/sr-rs/";

export function BrandLink({
  children = "ConvaTec",
  href = CONVATEC_URL,
  className,
}: {
  children?: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "relative inline-block font-semibold text-[#0077a0] transition-colors duration-300 hover:text-[#00a3ad] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
        className,
      )}
    >
      {children}
    </Link>
  );
}
