import Link from "next/link";
import { Button } from "@/components/design-system/Button";

const STOMA_SUBNAV_ITEMS = [
  { href: "/tipovi-stome", label: "Tipovi stome", key: "tipovi-stome" },
  { href: "/nega-stome", label: "Nega stome", key: "nega-stome" },
  { href: "/stoma-pomagala", label: "Stoma pomagala", key: "stoma-pomagala" },
] as const;

type StomaSubnavKey = (typeof STOMA_SUBNAV_ITEMS)[number]["key"];

export function StomaSubnav({ currentPage }: { currentPage: StomaSubnavKey }) {
  return (
    <nav
      aria-label="Stoma podnavigacija"
      className="tt-stoma-subnav"
    >
      <ul className="grid gap-2 sm:flex sm:flex-wrap">
        {STOMA_SUBNAV_ITEMS.map((item) => {
          const isActive = item.key === currentPage;

          return (
            <li key={item.key} className="min-w-0">
              <Button
                asChild
                variant={isActive ? "teal" : "outlineNavy"}
                className={
                  isActive
                    ? "tt-stoma-subnav-button"
                    : "tt-stoma-subnav-button tt-stoma-subnav-button-inactive"
                }
              >
                <Link href={item.href} aria-current={isActive ? "page" : undefined}>
                  {item.label}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
