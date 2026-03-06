import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import {
  type NavigationItem,
  type NavigationLink,
  isExternalHref,
  normalizeCmsHref,
  resolveNavigationHref,
} from "@/lib/navigation";
import { sanityClient } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";
import { homePageQuery, siteSettingsQuery } from "@/lib/sanity/queries";

export type { NavigationLink, NavigationItem };

export interface NavigationData {
  primary: NavigationItem[];
}

export interface ContentLink {
  url: string;
  title?: string;
}

export interface HomepageQuickLink {
  title: string;
  description: string;
  link: ContentLink | null;
}

export interface HomepageProgram {
  title: string;
  description: string;
  link: ContentLink;
}

export interface HomepageFaq {
  question: string;
  answer: string;
}

export interface HomepageData {
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
    backgroundImage: string;
  };
  quickLinks: HomepageQuickLink[];
  about: {
    title: string;
    body: string;
  };
  programs: HomepageProgram[];
  faq: HomepageFaq[];
}

export interface ContactData {
  email: string;
  phones: string[];
  address: string;
  source: string;
}

interface SanitySiteSettings {
  title?: string;
  primaryPhone?: string;
  secondaryPhones?: string[];
  email?: string;
  address?: string;
}

interface SanityQuickLink {
  title?: string;
  description?: string;
  linkLabel?: string;
  linkUrl?: string;
}

interface SanityProgramCard {
  title?: string;
  description?: string;
  slug?: string;
}

interface SanityFaqItem {
  question?: string;
  answer?: string;
  order?: number;
}

interface SanityHomePage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  quickLinks?: SanityQuickLink[];
  aboutTitle?: string;
  aboutBody?: string;
  programCards?: SanityProgramCard[];
  faqItems?: SanityFaqItem[];
}

const contentDir = path.join(process.cwd(), "content");
const FALLBACK_PRIMARY_PHONE = "011 311 51 52";

async function readJsonFile<T>(fileName: string): Promise<T> {
  const filePath = path.join(contentDir, fileName);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
}

const getLocalNavigationData = cache(async () => {
  return readJsonFile<NavigationData>("navigation.json");
});

const getLocalHomepageData = cache(async () => {
  return readJsonFile<HomepageData>("homepage.json");
});

const getLocalContactData = cache(async () => {
  return readJsonFile<ContactData>("contact.json");
});

async function fetchSanitySiteSettings(): Promise<ContactData | null> {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }

  try {
    const settings = await sanityClient.fetch<SanitySiteSettings | null>(
      siteSettingsQuery,
    );

    if (!settings?.email && !settings?.primaryPhone && !settings?.address) {
      return null;
    }

    const phones = [
      settings.primaryPhone,
      ...(settings.secondaryPhones ?? []),
    ].filter((phone): phone is string => Boolean(phone));

    return {
      email: settings.email ?? "",
      phones: phones.length > 0 ? phones : [FALLBACK_PRIMARY_PHONE],
      address: settings.address ?? "",
      source: "sanity://siteSettings",
    };
  } catch {
    return null;
  }
}

async function fetchSanityHomePage(
  localFallback: HomepageData,
): Promise<HomepageData | null> {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }

  try {
    const homePage = await sanityClient.fetch<SanityHomePage | null>(
      homePageQuery,
    );

    if (!homePage) {
      return null;
    }

    const quickLinks =
      homePage.quickLinks
        ?.filter((item) => Boolean(item?.title))
        .map((item) => ({
          title: item.title ?? "",
          description: item.description ?? "",
          link: item.linkUrl
            ? {
                url: normalizeCmsHref(item.linkUrl),
                title: item.linkLabel || item.title || "Više",
              }
            : null,
        })) ?? [];

    const programs =
      homePage.programCards
        ?.filter((item) => Boolean(item?.title))
        .map((item) => ({
          title: item.title ?? "",
          description: item.description ?? "",
          link: {
            url: item.slug ? `/${item.slug}` : "#",
            title: item.title || "Program",
          },
        })) ?? [];

    const faq =
      homePage.faqItems
        ?.filter((item) => Boolean(item?.question && item?.answer))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => ({
          question: item.question ?? "",
          answer: item.answer ?? "",
        })) ?? [];

    return {
      ...localFallback,
      hero: {
        ...localFallback.hero,
        title: homePage.heroTitle || localFallback.hero.title,
        subtitle: homePage.heroSubtitle || localFallback.hero.subtitle,
        backgroundImage:
          homePage.heroImageUrl || localFallback.hero.backgroundImage,
      },
      quickLinks: quickLinks.length > 0 ? quickLinks : localFallback.quickLinks,
      about: {
        title: homePage.aboutTitle || localFallback.about.title,
        body: homePage.aboutBody || localFallback.about.body,
      },
      programs: programs.length > 0 ? programs : localFallback.programs,
      faq: faq.length > 0 ? faq : localFallback.faq,
    };
  } catch {
    return null;
  }
}

export const getNavigationData = cache(async () => {
  return getLocalNavigationData();
});

export const getHomepageData = cache(async () => {
  const localFallback = await getLocalHomepageData();
  const sanityHomePage = await fetchSanityHomePage(localFallback);
  return sanityHomePage ?? localFallback;
});

export const getContactData = cache(async () => {
  const localFallback = await getLocalContactData();
  const sanitySettings = await fetchSanitySiteSettings();
  return sanitySettings ?? localFallback;
});
export { isExternalHref, normalizeCmsHref, resolveNavigationHref };

export function normalizeSeedText(value: string): string {
  return value
    .replaceAll("\r\n", "\n")
    .replaceAll("rnrn", "\n\n")
    .replaceAll(":rn", ":\n")
    .replaceAll(".rn", ".\n")
    .trim();
}
