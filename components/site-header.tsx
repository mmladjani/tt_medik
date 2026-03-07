"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type NavigationItem,
  isExternalHref,
  resolveNavigationHref,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isPathActive(pathname: string, href: string): boolean {
  if (!href || href === "#" || href.startsWith("http")) return false;
  const route = href.split("#")[0] || "/";
  if (route === "/") return pathname === "/";
  return pathname === route || pathname.startsWith(`${route}/`);
}

function hasActiveChild(pathname: string, items: NavigationItem[]): boolean {
  return items.some((item) => {
    const href = resolveNavigationHref(item);
    return isPathActive(pathname, href) || hasActiveChild(pathname, item.children);
  });
}

function formatPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function NavigationAnchor({
  item,
  className,
  isActive,
  onNavigate,
}: {
  item: NavigationItem;
  className?: string;
  isActive?: boolean;
  onNavigate?: () => void;
}) {
  const href = resolveNavigationHref(item);
  const isExternal = item.link.type === "external" && isExternalHref(href);
  const anchorClassName = cn(
    className,
    isActive && "text-primary",
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={anchorClassName}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={anchorClassName}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}

function DesktopDropdown({
  item,
  pathname,
}: {
  item: NavigationItem;
  pathname: string;
}) {
  const href = resolveNavigationHref(item);
  const parentIsActive = hasActiveChild(pathname, item.children);

  return (
    <div className="group relative">
      <div
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-primary",
          parentIsActive && "bg-slate-50 text-primary",
        )}
      >
        {href !== "#" && !isExternalHref(href) ? (
          <Link href={href} className="outline-none">
            {item.label}
          </Link>
        ) : href !== "#" ? (
          <a href={href} target="_blank" rel="noreferrer" className="outline-none">
            {item.label}
          </a>
        ) : (
          <span>{item.label}</span>
        )}
        <ChevronDown className="size-4 transition duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </div>

      <div className="invisible absolute left-0 z-40 mt-2 min-w-72 translate-y-1 rounded-xl border border-slate-200 bg-white p-4 opacity-0 shadow-lg transition-[opacity,transform,visibility] duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <ul className="space-y-2">
          {item.children.map((child) => (
            <li key={child.id}>
              <NavigationAnchor
                item={child}
                isActive={isPathActive(pathname, resolveNavigationHref(child))}
                className="block rounded-md px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-primary"
              />
              {child.children.length > 0 ? (
                <ul className="mt-2 space-y-1 border-l border-slate-200 pl-3">
                  {child.children.map((grandchild) => (
                    <li key={grandchild.id}>
                      <NavigationAnchor
                        item={grandchild}
                        isActive={isPathActive(pathname, resolveNavigationHref(grandchild))}
                        className="block rounded-md px-2 py-1 text-xs text-slate-500 transition hover:bg-slate-50 hover:text-primary"
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenuItem({
  item,
  pathname,
  onNavigate,
}: {
  item: NavigationItem;
  pathname: string;
  onNavigate: () => void;
}) {
  if (item.children.length === 0) {
    return (
      <NavigationAnchor
        item={item}
        isActive={isPathActive(pathname, resolveNavigationHref(item))}
        onNavigate={onNavigate}
        className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-primary"
      />
    );
  }

  return (
    <details className="group rounded-lg border border-slate-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-slate-700">
        {item.label}
        <ChevronDown className="size-4 transition group-open:rotate-180" />
      </summary>
      <div className="space-y-2 border-t border-slate-200 px-3 py-2">
        {item.children.map((child) => (
          <div key={child.id}>
            <NavigationAnchor
              item={child}
              isActive={isPathActive(pathname, resolveNavigationHref(child))}
              onNavigate={onNavigate}
              className="block rounded-md px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-primary"
            />
            {child.children.length > 0 ? (
              <div className="mt-1 space-y-1 border-l border-slate-200 pl-3">
                {child.children.map((grandchild) => (
                  <NavigationAnchor
                    key={grandchild.id}
                    item={grandchild}
                    isActive={isPathActive(pathname, resolveNavigationHref(grandchild))}
                    onNavigate={onNavigate}
                    className="block rounded-md px-2 py-1 text-xs text-slate-500 transition hover:bg-slate-50 hover:text-primary"
                  />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </details>
  );
}

export function SiteHeader({
  navigation,
  contact,
  accountHref,
  accountLabel,
}: {
  navigation: NavigationItem[];
  contact: {
    phones: string[];
    email?: string;
    address?: string;
  };
  accountHref: string;
  accountLabel: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const primaryPhone = contact.phones[0] ?? "+381113115152";
  const address = contact.address ?? "Bulevar Mihajla Pupina 10D/I, 11070 Beograd";
  const compactAddress = address.replace(/,\s*Srbija$/i, "");

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="border-b border-slate-200/80 bg-slate-50/90">
        <div className="tt-container flex flex-col gap-1 py-2 text-[14px] text-[#0077a0] lg:flex-row lg:items-center lg:justify-between">
          <p className="truncate">Podrška i pouzdane informacije za pacijente i zdravstvene radnike.</p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <a href={`mailto:${contact.email || "office@ttmedik.co.rs"}`} className="hover:underline">
              {contact.email || "office@ttmedik.co.rs"}
            </a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{compactAddress}</span>
            <span>|</span>
            <a href={formatPhoneLink(primaryPhone)} className="font-semibold hover:underline">
              {primaryPhone}
            </a>
          </p>
        </div>
      </div>

      <div className="tt-container">
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

          <nav aria-label="Glavna navigacija" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) =>
              item.children.length > 0 ? (
                <DesktopDropdown key={item.id} item={item} pathname={pathname} />
              ) : (
                <NavigationAnchor
                  key={item.id}
                  item={item}
                  isActive={isPathActive(pathname, resolveNavigationHref(item))}
                  className="rounded-lg px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-primary"
                />
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button asChild size="icon-sm" variant="outline" className="sm:hidden">
              <a href={formatPhoneLink(primaryPhone)} aria-label="Pozovite podršku">
                <Phone className="size-4" />
              </a>
            </Button>
            <a
              href={formatPhoneLink(primaryPhone)}
              className="hidden items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-primary sm:inline-flex"
            >
              <Phone className="size-4" />
              <span>{primaryPhone}</span>
            </a>
            <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
              <Link href={accountHref} aria-label={accountLabel}>
                <UserRound className="size-4" />
                <span>{accountLabel}</span>
              </Link>
            </Button>
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobilna navigacija"
            className="ml-auto flex h-full w-[86vw] max-w-sm flex-col border-l border-slate-200 bg-white p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Meni</p>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label="Zatvori meni"
                onClick={() => setMobileOpen(false)}
                ref={closeButtonRef}
              >
                <X className="size-4" />
              </Button>
            </div>
            <nav aria-label="Mobilna navigacija" className="space-y-2 overflow-y-auto">
              {navigation.map((item) => (
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </nav>
            <div className="mt-5 border-t border-slate-200 pt-4">
              <a
                href={formatPhoneLink(primaryPhone)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-primary"
              >
                <Phone className="size-4" />
                {primaryPhone}
              </a>
              <div className="mt-3">
                <Button asChild className="w-full rounded-full">
                  <Link href={accountHref} onClick={() => setMobileOpen(false)}>
                    <UserRound className="size-4" />
                    {accountLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
