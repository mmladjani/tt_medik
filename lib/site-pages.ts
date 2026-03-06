import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { normalizeSeedText } from "@/lib/content";
import { sanityClient } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";
import { pageBySlugQuery } from "@/lib/sanity/queries";

export interface PortableTextSpan {
  _type: "span";
  text: string;
}

export interface PortableTextBlock {
  _type: "block";
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PortableTextSpan[];
}

interface LocalPageRecord {
  id: number;
  title: string;
  slug: string;
  raw_wp_content: string;
  text_content: string;
  last_modified: string;
}

interface SanityPageRecord {
  _id: string;
  title?: string;
  slug?: string;
  contentPortableText?: PortableTextBlock[];
  _updatedAt?: string;
}

export interface SitePageContent {
  slug: string;
  title: string;
  portableText: PortableTextBlock[] | null;
  textContent: string;
  source: "sanity" | "local";
  updatedAt?: string;
}

const contentDir = path.join(process.cwd(), "content");

const getLocalPages = cache(async (): Promise<LocalPageRecord[]> => {
  const filePath = path.join(contentDir, "pages.json");
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as LocalPageRecord[];
});

function decodeHtmlEntities(value: string): string {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#039;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function cleanupWpToken(value: string): string {
  let cleaned = value;

  cleaned = cleaned.replaceAll("\\/", "/");
  cleaned = cleaned.replaceAll("\\n", "\n");
  cleaned = cleaned.replaceAll("rn", "\n");
  cleaned = cleaned.replaceAll("|url:", " ");
  cleaned = cleaned.replaceAll("|title:", " ");
  cleaned = cleaned.replaceAll("||", " ");
  cleaned = cleaned.replaceAll("|", " ");

  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {
    // Some values are not URI encoded.
  }

  cleaned = decodeHtmlEntities(cleaned);
  cleaned = cleaned.replace(/<[^>]+>/g, " ");
  cleaned = cleaned.replace(/[ \t]+\n/g, "\n");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  cleaned = cleaned.replace(/[ \t]{2,}/g, " ");
  return cleaned.trim();
}

function isUsefulText(value: string): boolean {
  if (!value) return false;
  if (value.length < 3) return false;
  if (/^https?:\/\//i.test(value)) return false;
  if (/^(url|title|target)$/i.test(value)) return false;
  return true;
}

function extractReadableTextFromRawWp(rawWpContent: string): string {
  if (!rawWpContent) {
    return "";
  }

  const extracted: string[] = [];

  for (const match of rawWpContent.matchAll(/\b(?:heading|text|title)="([^"]+)"/g)) {
    const value = cleanupWpToken(match[1]);
    if (isUsefulText(value)) extracted.push(value);
  }

  for (const match of rawWpContent.matchAll(/item_title%22%3A%22(.*?)%22/g)) {
    const value = cleanupWpToken(match[1]);
    if (isUsefulText(value)) extracted.push(value);
  }

  for (const match of rawWpContent.matchAll(/\[vc_column_text[^\]]*\]([\s\S]*?)\[\/vc_column_text\]/g)) {
    const value = cleanupWpToken(match[1]);
    if (isUsefulText(value)) extracted.push(value);
  }

  const uniqueValues = Array.from(new Set(extracted));
  return uniqueValues.join("\n\n");
}

function getLocalPageText(page: LocalPageRecord): string {
  const directText = normalizeSeedText(page.text_content || "");
  const extractedText = normalizeSeedText(
    extractReadableTextFromRawWp(page.raw_wp_content || ""),
  );

  const directLength = directText.replace(/\s+/g, "").length;
  const extractedLength = extractedText.replace(/\s+/g, "").length;

  if (directLength > 40 && extractedLength > directLength + 300) {
    return `${directText}\n\n${extractedText}`.trim();
  }

  if (directLength > 40) {
    return directText;
  }

  return extractedText;
}

function portableTextHasContent(blocks: PortableTextBlock[] | undefined): boolean {
  if (!blocks || blocks.length === 0) return false;

  return blocks.some((block) =>
    (block.children ?? []).some((child) => child.text.trim().length > 0),
  );
}

export const getSitePageBySlug = cache(
  async (slug: string): Promise<SitePageContent | null> => {
    const safeSlug = slug.trim().toLowerCase();
    if (!safeSlug) {
      return null;
    }

    const localPages = await getLocalPages();
    const localPage = localPages.find((page) => page.slug === safeSlug);
    const localFallback = localPage
      ? {
          title: localPage.title,
          textContent: getLocalPageText(localPage),
          updatedAt: localPage.last_modified,
        }
      : null;

    if (isSanityConfigured && sanityClient) {
      try {
        const sanityPage = await sanityClient.fetch<SanityPageRecord | null>(
          pageBySlugQuery,
          { slug: safeSlug },
        );

        if (sanityPage?.slug || sanityPage?.title) {
          const title = sanityPage.title || localFallback?.title || safeSlug;
          const portableText = sanityPage.contentPortableText ?? null;
          const textContent = localFallback?.textContent || "";

          return {
            slug: sanityPage.slug || safeSlug,
            title,
            portableText: portableTextHasContent(portableText ?? undefined)
              ? portableText
              : null,
            textContent,
            source: "sanity",
            updatedAt: sanityPage._updatedAt || localFallback?.updatedAt,
          };
        }
      } catch {
        // fall through to local data
      }
    }

    if (!localFallback) {
      return null;
    }

    return {
      slug: safeSlug,
      title: localFallback.title,
      portableText: null,
      textContent: localFallback.textContent,
      source: "local",
      updatedAt: localFallback.updatedAt,
    };
  },
);

export const getAllLocalPageSlugs = cache(async (): Promise<string[]> => {
  const localPages = await getLocalPages();
  return localPages.map((page) => page.slug);
});
