export interface InternalLink {
  type: "internal";
  slug: string;
  title?: string;
}

export interface ExternalLink {
  type: "external";
  url: string;
}

export type NavigationLink = InternalLink | ExternalLink;

export interface NavigationItem {
  id: number;
  label: string;
  menu_order: number;
  parent: number;
  link: NavigationLink;
  children: NavigationItem[];
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function normalizeCmsHref(href: string): string {
  const value = href.trim();

  if (!value) return "#";
  if (value === "#login") return "/login";
  if (value === "#register") return "/register";
  if (value === "#account") return "/nalog";
  if (value === "#") return "#";
  if (value.startsWith("/")) return value;

  if (isExternalHref(value)) {
    try {
      const url = new URL(value);
      const isTtMedikDomain =
        url.hostname === "ttmedik.co.rs" ||
        url.hostname === "www.ttmedik.co.rs";

      if (isTtMedikDomain) {
        if (url.searchParams.get("lrm_logout") === "1") {
          return "/nalog";
        }

        const path = url.pathname === "/naslovna/" ? "/" : url.pathname;
        const normalizedPath =
          path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
        return `${normalizedPath}${url.search}${url.hash}`;
      }
    } catch {
      return value;
    }
  }

  return value;
}

export function resolveNavigationHref(item: NavigationItem): string {
  if (item.link.type === "internal") {
    return item.link.slug === "naslovna" ? "/" : `/${item.link.slug}`;
  }

  return normalizeCmsHref(item.link.url || "#");
}
