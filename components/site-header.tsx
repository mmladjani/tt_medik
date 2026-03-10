"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  LogOut,
  Menu,
  ShieldCheck,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type NavigationItem,
  isExternalHref,
  resolveNavigationHref,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const HIDDEN_TOP_LEVEL_LABELS = new Set(["nalog"]);
const HIDDEN_CHILD_LABELS = new Set<string>();

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
  trailingIcon = false,
}: {
  item: NavigationItem;
  className?: string;
  isActive?: boolean;
  activeClassName?: string;
  onNavigate?: () => void;
  trailingIcon?: boolean;
}) {
  const href = resolveNavigationHref(item);
  const isExternal = item.link.type === "external" && isExternalHref(href);
  const classes = cn(className, isActive && activeClassName);
  const content = trailingIcon ? (
    <>
      <span>{item.label}</span>
      <ExternalLink className="size-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </>
  ) : (
    item.label
  );

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
        {content}
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
      {content}
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
  const isProgrami = item.label.trim().toLowerCase() === "programi";
  const stomaItem = isProgrami
    ? item.children.find((child) => child.label.trim().toLowerCase() === "stoma program")
    : undefined;
  const otherItems = isProgrami
    ? item.children.filter((child) => child.id !== stomaItem?.id)
    : item.children;

  return (
    <div className="group relative">
      <div
        className={cn(
          "flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-[#00344d] transition hover:text-[#00a3ad]",
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

      <div className="pointer-events-none invisible absolute -left-8 top-full z-50 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="w-[320px] max-w-[82vw] rounded-[2rem] border border-slate-50 bg-white p-8 shadow-2xl shadow-[#00344d]/10">
          {isProgrami && stomaItem ? (
            <div className="space-y-8">
              <div>
                <span className="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-[#00a3ad]">
                  {stomaItem.label}
                </span>
                <ul className="space-y-3">
                  {stomaItem.children.map((grandchild) => (
                    <li key={grandchild.id}>
                      <NavigationAnchor
                        item={grandchild}
                        isActive={isPathActive(pathname, resolveNavigationHref(grandchild))}
                        className="block text-[13px] font-bold uppercase tracking-wider text-[#00344d]/70 transition-colors hover:text-[#00344d]"
                        activeClassName="text-[#00344d]"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px w-full bg-slate-100" />

              <ul className="space-y-3">
                {otherItems.map((child) => (
                  <li key={child.id}>
                    <NavigationAnchor
                      item={child}
                      isActive={isPathActive(pathname, resolveNavigationHref(child))}
                      className="block text-[13px] font-bold uppercase tracking-wider text-[#00344d]/70 transition-colors hover:text-[#00344d]"
                      activeClassName="text-[#00344d]"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="space-y-3">
              {item.children.map((child) => (
                <li key={child.id}>
                  <NavigationAnchor
                    item={child}
                    isActive={isPathActive(pathname, resolveNavigationHref(child))}
                    className="block text-[13px] font-bold uppercase tracking-wider text-[#00344d]/70 transition-colors hover:text-[#00344d]"
                    activeClassName="text-[#00344d]"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
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

function useHeaderScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSupportBar, setShowSupportBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
      setShowSupportBar(scrollY > 650);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isScrolled, showSupportBar };
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
  const { isScrolled, showSupportBar } = useHeaderScrollState();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const filteredNavigation = sanitizeNavigationItems(navigation);
  const isHome = pathname === "/";
  const supportLine = contact.phones.find((phone) => phone.includes("0800")) ?? "0800 101 102";

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
            "border-b border-slate-50 transition-all duration-300",
            isScrolled ? "bg-white/90 py-4 shadow-sm backdrop-blur-xl" : "bg-white py-6",
          )}
        >
          <div className="mx-auto flex w-full items-center justify-between px-8 md:px-16 lg:px-24">
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
                  className="text-sm font-black uppercase tracking-[0.15em] text-[#00344d]/70 transition hover:text-[#00a3ad]"
                  activeClassName="text-[#00a3ad]"
                />
              ),
            )}
            </nav>

            <div className="flex items-center gap-4 lg:gap-8">
              <div className="hidden h-6 w-px bg-slate-200 lg:block" />
              <details className="group relative hidden sm:block">
                <summary
                  className="flex list-none cursor-pointer items-center gap-3 rounded-full bg-[#00344d] px-8 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#00344d]/10 transition-all hover:bg-[#00a3ad]"
                >
                  <UserCircle size={16} className="text-white" />
                  {isLoggedIn ? accountLabel : "Nalog"}
                  <ChevronDown className="size-3 opacity-80 transition group-open:rotate-180" />
                </summary>

                <div className="absolute right-0 z-50 mt-4 w-[320px] max-w-[82vw] rounded-[2rem] border border-slate-50 bg-white p-8 shadow-2xl shadow-[#00344d]/10">
                {!isLoggedIn ? (
                  <div className="space-y-6">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-[#00a3ad]">
                      Nalog
                    </div>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/login"
                          className="block text-[13px] font-bold uppercase tracking-wider text-[#00344d]/70 transition-colors hover:text-[#00344d]"
                        >
                          Prijavi se
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/register"
                          className="block text-[13px] font-bold uppercase tracking-wider text-[#00344d]/70 transition-colors hover:text-[#00344d]"
                        >
                          Registruj se
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#00a3ad]">
                      Moj profil
                      {medicalStatus === "approved" ? (
                        <ShieldCheck size={16} className="text-[#00a3ad]" />
                      ) : null}
                    </div>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/nalog"
                          className="block text-[13px] font-bold uppercase tracking-wider text-[#00344d]/70 transition-colors hover:text-[#00344d]"
                        >
                          Podešavanja
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/portal"
                          className="block text-[13px] font-bold uppercase tracking-wider text-[#00344d]/70 transition-colors hover:text-[#00344d]"
                        >
                          Portal
                        </Link>
                      </li>
                      {medicalStatus === "approved" ? (
                        <li>
                          <Link
                            href="/portal/strucni"
                            className="block text-[13px] font-bold uppercase tracking-wider text-[#00344d]/70 transition-colors hover:text-[#00344d]"
                          >
                            Stručni materijali
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                    <div className="h-px w-full bg-slate-100" />
                    <Link
                      href="/nalog"
                      className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-rose-600 transition-colors hover:text-rose-700"
                    >
                      <LogOut className="size-4" />
                      Odjavi se
                    </Link>
                  </div>
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

export { SiteHeader as MainHeader };
