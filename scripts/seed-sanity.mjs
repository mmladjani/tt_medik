import { createClient } from "@sanity/client";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, "..", "content");

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID;

const dataset =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET;

const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN;

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-06";

if (!projectId || !dataset || !token) {
  console.error(
    [
      "Missing Sanity environment variables.",
      "Required:",
      "- SANITY_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID)",
      "- SANITY_DATASET (or NEXT_PUBLIC_SANITY_DATASET)",
      "- SANITY_API_WRITE_TOKEN (or SANITY_API_TOKEN)",
    ].join("\n"),
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function normalizeSeedText(value) {
  if (!value) {
    return "";
  }

  return value
    .replaceAll("\r\n", "\n")
    .replaceAll("rnrn", "\n\n")
    .replaceAll(":rn", ":\n")
    .replaceAll(".rn", ".\n")
    .trim();
}

function toPortableText(text) {
  const normalized = normalizeSeedText(text);
  if (!normalized) {
    return [];
  }

  return normalized.split(/\n{2,}/).map((paragraph) => ({
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        text: paragraph.replace(/\n+/g, " ").trim(),
      },
    ],
  }));
}

function slugify(value) {
  const latinized = value
    .replaceAll("đ", "d")
    .replaceAll("Đ", "D")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

  return latinized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function deriveSlugFromUrl(urlValue, fallback) {
  if (!urlValue) {
    return slugify(fallback);
  }

  try {
    const parsed = new URL(urlValue);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return slugify(segments[segments.length - 1] || fallback);
  } catch {
    const segments = urlValue.split("/").filter(Boolean);
    return slugify(segments[segments.length - 1] || fallback);
  }
}

async function readJson(fileName) {
  const raw = await fs.readFile(path.join(contentDir, fileName), "utf-8");
  return JSON.parse(raw);
}

async function seed() {
  const [homepage, contact, pages] = await Promise.all([
    readJson("homepage.json"),
    readJson("contact.json"),
    readJson("pages.json"),
  ]);

  const faqRefs = [];
  for (const [index, item] of homepage.faq.entries()) {
    const id = `faqItem.${String(index + 1).padStart(2, "0")}-${slugify(item.question)}`;
    await client.createOrReplace({
      _id: id,
      _type: "faqItem",
      question: item.question,
      answer: normalizeSeedText(item.answer),
      order: index + 1,
    });
    faqRefs.push({ _type: "reference", _ref: id });
  }

  const programRefs = [];
  for (const [index, program] of homepage.programs.entries()) {
    const slug = deriveSlugFromUrl(program.link?.url, program.title || `program-${index + 1}`);
    const id = `program.${slug}`;
    await client.createOrReplace({
      _id: id,
      _type: "program",
      title: program.title,
      slug: { _type: "slug", current: slug },
      description: program.description || "",
      order: index + 1,
      contentPortableText: [],
    });
    programRefs.push({ _type: "reference", _ref: id });
  }

  await client.createOrReplace({
    _id: "siteSettings.main",
    _type: "siteSettings",
    title: "TT Medik",
    primaryPhone: contact.phones?.[0] || "",
    secondaryPhones: (contact.phones || []).slice(1),
    email: contact.email || "",
    address: contact.address || "",
    socialLinks: [],
  });

  await client.createOrReplace({
    _id: "homePage.main",
    _type: "homePage",
    heroTitle: homepage.hero?.title || "",
    heroSubtitle: normalizeSeedText(homepage.hero?.subtitle || ""),
    quickLinks: (homepage.quickLinks || []).map((item) => ({
      _type: "quickLinkItem",
      title: item.title,
      description: normalizeSeedText(item.description || ""),
      linkLabel: item.link?.title || "Više",
      linkUrl: item.link?.url || "",
    })),
    aboutTitle: homepage.about?.title || "",
    aboutBody: normalizeSeedText(homepage.about?.body || ""),
    programCards: programRefs,
    faqItems: faqRefs,
  });

  let seededPages = 0;
  for (const page of pages) {
    const sourceSlug = page.slug || page.title || String(page.id);
    const slug = slugify(sourceSlug);
    if (!slug) {
      continue;
    }

    const textContent = normalizeSeedText(page.text_content || "");
    await client.createOrReplace({
      _id: `page.${slug}`,
      _type: "page",
      title: page.title || sourceSlug,
      slug: { _type: "slug", current: slug },
      contentPortableText: toPortableText(textContent),
      seo: {
        metaTitle: page.title || sourceSlug,
        metaDescription: textContent.slice(0, 160) || "",
        noIndex: false,
      },
    });
    seededPages += 1;
  }

  console.log(
    [
      "Sanity seed completed.",
      `- siteSettings: 1`,
      `- homePage: 1`,
      `- faqItem: ${faqRefs.length}`,
      `- program: ${programRefs.length}`,
      `- page: ${seededPages}`,
    ].join("\n"),
  );
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
