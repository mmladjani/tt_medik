import Link from "next/link";
import { Button } from "@/components/design-system/Button";

export function StomaCtaCard() {
  return (
    <div className="tt-cta-panel">
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-tt-teal/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <span className="tt-cta-label">
            Podrška i izbor pomagala
          </span>
          <h2 className="tt-cta-title">
            Spremni za sledeći korak?
          </h2>
          <p className="tt-cta-description">
            Pregledajte stoma pomagala ili kontaktirajte naš tim za podršku pri odabiru rešenja.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button asChild variant="teal" className="group">
            <Link href="/stoma-pomagala">Stoma pomagala</Link>
          </Button>
          <Button
            asChild
            variant="outlineNavy"
            className="border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/15 hover:text-white"
          >
            <Link href="/kontakt">Kontakt</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
