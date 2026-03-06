import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ContactData,
  type NavigationItem,
  isExternalHref,
  resolveNavigationHref,
} from "@/lib/content";

function NavigationAnchor({
  item,
  className,
}: {
  item: NavigationItem;
  className?: string;
}) {
  const href = resolveNavigationHref(item);
  const isExternal = item.link.type === "external" && isExternalHref(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {item.label}
    </Link>
  );
}

function DropdownChildren({ items }: { items: NavigationItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((child) => (
        <li key={child.id}>
          <NavigationAnchor
            item={child}
            className="text-sm text-slate-700 transition hover:text-sky-700"
          />
          {child.children.length > 0 ? (
            <ul className="mt-2 space-y-1 border-l border-slate-200 pl-3">
              {child.children.map((grandchild) => (
                <li key={grandchild.id}>
                  <NavigationAnchor
                    item={grandchild}
                    className="text-sm text-slate-500 transition hover:text-sky-700"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function SiteHeader({
  navigation,
  contact,
  accountHref,
  accountLabel,
}: {
  navigation: NavigationItem[];
  contact: ContactData;
  accountHref: string;
  accountLabel: string;
}) {
  const primaryPhone = contact.phones[0] ?? "+381113115152";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="shrink-0" aria-label="TT Medik">
            <Image
              src="/assets/cropped-tt-medik-logo-short.png"
              alt="TT Medik logo"
              width={182}
              height={44}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) =>
              item.children.length > 0 ? (
                <details key={item.id} className="group relative">
                  <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-sky-700">
                    {item.label}
                    <ChevronDown className="size-4 transition group-open:rotate-180" />
                  </summary>
                  <div className="absolute left-0 mt-2 min-w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                    <DropdownChildren items={item.children} />
                  </div>
                </details>
              ) : (
                <NavigationAnchor
                  key={item.id}
                  item={item}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-sky-700"
                />
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={formatPhoneLink(primaryPhone)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-sky-700"
            >
              <Phone className="size-4" />
              <span className="hidden md:inline">{primaryPhone}</span>
            </a>
            <Button asChild size="sm" className="rounded-full">
              <Link href={accountHref} aria-label={accountLabel}>
                <UserRound className="size-4" />
                <span className="hidden md:inline">{accountLabel}</span>
              </Link>
            </Button>
          </div>
        </div>

        <nav className="flex gap-4 overflow-x-auto pb-3 text-sm font-semibold text-slate-700 lg:hidden">
          {navigation.map((item) => (
            <NavigationAnchor
              key={item.id}
              item={item}
              className="whitespace-nowrap rounded-md px-1 py-1 transition hover:text-sky-700"
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
