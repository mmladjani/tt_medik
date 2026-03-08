"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Menu, ShieldCheck, User, UserCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type NavigationItem,
  isExternalHref,
  resolveNavigationHref,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const HIDDEN_TOP_LEVEL_LABELS = new Set(["nalog"]);
const HIDDEN_CHILD_LABELS = new Set([
  "tipovi stome",
  "nega stome",
  "stoma pomagala",
]);

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

function sanitizeNavigationItems(
  items: NavigationItem[],
  depth: number = 0,
): NavigationItem[] {
  return items
    .filter((item) => {
      const label = item.label.trim().toLowerCase();

      if (depth === 0 && HIDDEN_TOP_LEVEL_LABELS.has(label)) {
        return false;
      }

      if (depth > 0 && HIDDEN_CHILD_LABELS.has(label)) {
        return false;
      }

      return true;
    })
    .map((item) => ({
      ...item,
      children: sanitizeNavigationItems(item.children, depth + 1),
    }));
}

function NavigationAnchor({
  item,
  className,
  isActive,
  activeClassName = "text-[#00a3ad]",
  onNavigate,
}: {
  item: NavigationItem;
  className?: string;
  isActive?: boolean;
  activeClassName?: string;
  onNavigate?: () => void;
}) {
  const href = resolveNavigationHref(item);
  const isExternal = item.link.type === "external" && isExternalHref(href);
  const classes = cn(className, isActive && activeClassName);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
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
      className={classes}
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
  const active = hasActiveChild(pathname, item.children);

  return (
    <div className="group relative">
      <div
        className={cn(
          "flex items-center gap-1 text-[13px] font-bold uppercase tracking-widest text-slate-600 transition hover:text-[#00a3ad]",
          active && "text-[#00a3ad]",
        )}
      >
        {href !== "#" && !isExternalHref(href) ? (
          <Link href={href}>{item.label}</Link>
        ) : href !== "#" ? (
          <a href={href} target="_blank" rel="noreferrer">
            {item.label}
          </a>
        ) : (
          <span>{item.label}</span>
        )}
        <ChevronDown className="size-4 transition duration-200 group-hover:rotate-180" />
      </div>

      <div className="invisible absolute left-0 z-50 mt-3 w-[320px] max-w-[82vw] translate-y-1 rounded-xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition-[opacity,transform,visibility] duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <ul className="space-y-1">
          {item.children.map((child) => (
            <li key={child.id} className="rounded-lg p-2 transition hover:bg-slate-50">
              <NavigationAnchor
                item={child}
                isActive={isPathActive(pathname, resolveNavigationHref(child))}
                className="block text-sm font-semibold text-slate-800"
                activeClassName="text-[#005b82]"
              />
              {child.children.length > 0 ? (
                <ul className="mt-2 space-y-1 border-l border-slate-200 pl-3">
                  {child.children.map((grandchild) => (
                    <li key={grandchild.id}>
                      <NavigationAnchor
                        item={grandchild}
                        isActive={isPathActive(pathname, resolveNavigationHref(grandchild))}
                        className="block text-xs text-slate-600 transition hover:text-[#005b82]"
                        activeClassName="text-[#005b82]"
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
        className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#005b82]"
        activeClassName="text-[#005b82]"
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
              className="block rounded-md px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#005b82]"
              activeClassName="text-[#005b82]"
            />
            {child.children.length > 0 ? (
              <div className="mt-1 space-y-1 border-l border-slate-200 pl-3">
                {child.children.map((grandchild) => (
                  <NavigationAnchor
                    key={grandchild.id}
                    item={grandchild}
                    isActive={isPathActive(pathname, resolveNavigationHref(grandchild))}
                    onNavigate={onNavigate}
                    className="block rounded-md px-2 py-1 text-xs text-slate-500 transition hover:bg-slate-50 hover:text-[#005b82]"
                    activeClassName="text-[#005b82]"
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
  isLoggedIn,
  medicalStatus,
}: {
  navigation: NavigationItem[];
  contact: {
    phones: string[];
    email?: string;
    address?: string;
  };
  accountHref: string;
  accountLabel: string;
  isLoggedIn: boolean;
  medicalStatus: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSupportBar, setShowSupportBar] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const filteredNavigation = sanitizeNavigationItems(navigation);
  const isHome = pathname === "/";
  const supportLine = contact.phones.find((phone) => phone.includes("0800")) ?? "0800 101 102";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setShowSupportBar(window.scrollY > 650);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full transition-all duration-300">
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden bg-[#00a3ad] text-white transition-all duration-500",
            showSupportBar ? "h-10 opacity-100" : "h-0 opacity-0",
          )}
        >
          <div className="px-3 text-center text-sm font-bold tracking-wide">
            Besplatna telefonska linija za pacijente:{" "}
            <a
              href={`tel:${supportLine.replace(/[^\d+]/g, "")}`}
              className="font-black text-white underline underline-offset-2"
            >
              {supportLine}
            </a>{" "}
            | Radnim danima: 8:30 - 15:30
          </div>
        </div>

        <div
          className={cn(
            "bg-white px-4 transition-all duration-300 sm:px-6 xl:px-8",
            showSupportBar ? "py-3 shadow-md" : "border-b border-slate-100 py-6",
          )}
        >
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black uppercase tracking-tighter text-[#005b82]"
            >
              TT <span className="text-[#00a3ad]">Medik</span>
            </Link>

            <nav aria-label="Glavna navigacija" className="hidden items-center gap-10 lg:flex">
            {filteredNavigation.map((item) =>
              item.children.length > 0 ? (
                <DesktopDropdown
                  key={item.id}
                  item={item}
                  pathname={pathname}
                />
              ) : (
                <NavigationAnchor
                  key={item.id}
                  item={item}
                  isActive={isPathActive(pathname, resolveNavigationHref(item))}
                  className="text-[13px] font-bold uppercase tracking-widest text-slate-600 transition hover:text-[#00a3ad]"
                  activeClassName="text-[#00a3ad]"
                />
              ),
            )}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <details className="group relative hidden sm:block">
                <summary
                  className={cn(
                    "flex list-none cursor-pointer items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-all",
                    showSupportBar
                      ? "bg-[#005b82] text-white"
                      : "bg-[#f0f9fa] text-[#005b82] hover:bg-[#e0f2f5]",
                  )}
                >
                  <UserCircle size={18} />
                  {isLoggedIn ? accountLabel : "Nalog"}
                  <ChevronDown className="size-3 opacity-80 transition group-open:rotate-180" />
                </summary>

                <div className="absolute right-0 z-50 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                {!isLoggedIn ? (
                  <>
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500">Dobrodošli</div>
                    <Link href="/login" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">
                      Prijavite se
                    </Link>
                    <Link href="/register" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">
                      Napravite nalog
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500">
                      Moj profil
                      {medicalStatus === "approved" ? (
                        <ShieldCheck size={16} className="text-[#00a3ad]" />
                      ) : null}
                    </div>
                    <Link href="/nalog" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">
                      Podešavanja
                    </Link>
                    <Link href="/portal" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-50">
                      Portal
                    </Link>
                    {medicalStatus === "approved" ? (
                      <Link
                        href="/portal/strucni"
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#005b82] hover:bg-slate-50"
                      >
                        Stručni materijali
                      </Link>
                    ) : null}
                    <Link
                      href="/nalog"
                      className="mt-1 block rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                    >
                      <span className="inline-flex items-center gap-2">
                        <LogOut className="size-4" />
                        Odjavi se
                      </span>
                    </Link>
                  </>
                )}
                </div>
              </details>

              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="lg:hidden"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {!isHome ? <div className="h-[98px]" aria-hidden /> : null}

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)}>
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
              {filteredNavigation.map((item) => (
                <MobileMenuItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </nav>

            <div className="mt-5 border-t border-slate-200 pt-4">
              <Button asChild className="w-full rounded-xl">
                <Link href={accountHref} onClick={() => setMobileOpen(false)}>
                  <User className="size-4" />
                  {accountLabel}
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
