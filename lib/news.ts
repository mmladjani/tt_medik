import { cache } from "react";
import type { PortableTextBlock } from "@/lib/site-pages";
import { sanityClient } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";
import { newsPostBySlugQuery, newsPostsQuery } from "@/lib/sanity/queries";

interface SanityNewsPost {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  bodyPortableText?: PortableTextBlock[];
  publishedAt?: string;
  coverImageUrl?: string;
}

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  bodyPortableText: PortableTextBlock[] | null;
  bodyText: string;
  publishedAt: string;
  coverImageUrl?: string;
  source: "sanity" | "seed";
}

function textBlock(text: string): PortableTextBlock {
  return {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text }],
  };
}

const fallbackNewsPosts: NewsPost[] = [
  {
    slug: "podrska-pacijentima-u-kucnim-uslovima",
    title: "Podrška pacijentima u kućnim uslovima",
    excerpt:
      "Saveti za negovatelje i porodice kako da organizuju sigurnu negu u kućnom okruženju.",
    bodyPortableText: [
      textBlock(
        "TT Medik tim kontinuirano radi na edukaciji pacijenata i negovatelja kako bi nega bila jednostavnija i bezbednija.",
      ),
      textBlock(
        "U narednom periodu objavljivaćemo praktične vodiče za negu stome, tretman rana i pravilnu upotrebu pomagala.",
      ),
    ],
    bodyText:
      "TT Medik tim kontinuirano radi na edukaciji pacijenata i negovatelja kako bi nega bila jednostavnija i bezbednija.\n\nU narednom periodu objavljivaćemo praktične vodiče za negu stome, tretman rana i pravilnu upotrebu pomagala.",
    publishedAt: "2025-02-10T09:00:00.000Z",
    source: "seed",
  },
  {
    slug: "novi-edukativni-materijali-za-strucnu-javnost",
    title: "Novi edukativni materijali za stručnu javnost",
    excerpt:
      "Pripremljeni su novi stručni materijali za zdravstvene radnike u okviru portala.",
    bodyPortableText: [
      textBlock(
        "Stručni portal će postepeno dobijati nove protokole i preporuke za svakodnevnu praksu.",
      ),
      textBlock(
        "Pristup stručnom sadržaju je omogućen isključivo verifikovanim korisnicima sa statusom approved.",
      ),
    ],
    bodyText:
      "Stručni portal će postepeno dobijati nove protokole i preporuke za svakodnevnu praksu.\n\nPristup stručnom sadržaju je omogućen isključivo verifikovanim korisnicima sa statusom approved.",
    publishedAt: "2025-01-22T10:30:00.000Z",
    source: "seed",
  },
  {
    slug: "kako-pravilno-odabrati-pomagalo",
    title: "Kako pravilno odabrati pomagalo",
    excerpt:
      "Najvažniji kriterijumi pri izboru medicinskih pomagala i konsultaciji sa stručnim timom.",
    bodyPortableText: [
      textBlock(
        "Odabir pomagala zavisi od individualnih potreba pacijenta, tipa terapije i preporuke zdravstvenog radnika.",
      ),
      textBlock(
        "Uvek savetujemo konsultaciju sa stručnim licem pre promene režima nege ili tipa pomagala.",
      ),
    ],
    bodyText:
      "Odabir pomagala zavisi od individualnih potreba pacijenta, tipa terapije i preporuke zdravstvenog radnika.\n\nUvek savetujemo konsultaciju sa stručnim licem pre promene režima nege ili tipa pomagala.",
    publishedAt: "2024-12-18T08:15:00.000Z",
    source: "seed",
  },
];

function normalizeSanityPost(post: SanityNewsPost): NewsPost | null {
  if (!post.slug || !post.title) {
    return null;
  }

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    bodyPortableText: post.bodyPortableText ?? null,
    bodyText: "",
    publishedAt: post.publishedAt || new Date().toISOString(),
    coverImageUrl: post.coverImageUrl,
    source: "sanity",
  };
}

export const getNewsPosts = cache(async (): Promise<NewsPost[]> => {
  if (isSanityConfigured && sanityClient) {
    try {
      const sanityPosts = await sanityClient.fetch<SanityNewsPost[]>(newsPostsQuery);
      const normalized = sanityPosts
        .map(normalizeSanityPost)
        .filter((post): post is NewsPost => Boolean(post));

      if (normalized.length > 0) {
        return normalized;
      }
    } catch {
      // fallback below
    }
  }

  return fallbackNewsPosts;
});

export const getNewsPostBySlug = cache(
  async (slug: string): Promise<NewsPost | null> => {
    const safeSlug = slug.trim().toLowerCase();
    if (!safeSlug) return null;

    if (isSanityConfigured && sanityClient) {
      try {
        const sanityPost = await sanityClient.fetch<SanityNewsPost | null>(
          newsPostBySlugQuery,
          { slug: safeSlug },
        );

        const normalized = sanityPost ? normalizeSanityPost(sanityPost) : null;
        if (normalized) {
          return normalized;
        }
      } catch {
        // fallback below
      }
    }

    return fallbackNewsPosts.find((post) => post.slug === safeSlug) ?? null;
  },
);
