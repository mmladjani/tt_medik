import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PortableTextBlock } from "@/lib/site-pages";

interface RichContentProps {
  portableText?: PortableTextBlock[] | null;
  textContent?: string | null;
  className?: string;
  slug?: string;
}

interface TextChunk {
  type: "heading" | "paragraph" | "bullet-list" | "number-list" | "callout";
  text?: string;
  items?: string[];
}

const headingAliasMap: Record<string, string[]> = {
  "uobicajena-mesta-nastanka-dekubitusa": ["nastanak-dekubitusa"],
  "tipovi-tkiva-koji-se-mogu-javiti-kod-dekubitusa": ["tipovi-tkiva"],
  "prevencija-sprecavanje-nastanka-dekubitusa": ["prevencija-dekubitusa"],
  "smernice-za-tretman-dekubitusa-primena-gaza-za-rane": [
    "smernice-za-tretman-dekubitusa",
  ],
};
const CONVATEC_URL = "https://www.convatec.com/sr-rs/";
const STOMA_MEASUREMENT_HEADING_SLUG = "kako-da-izmerite-vasu-stomu";

const STOMA_MEASUREMENT_STEPS = [
  {
    title: "Pripremite šablon",
    text: "Na šablonu koji ćete dobiti uz diskove ucrtajte tačan oblik i veličinu Vaše stome.",
    image: "/assets/1476395016.jpg",
  },
  {
    title: "Isecite otvor na disku",
    text: "Izvadite disk iz zaštitne folije i na njegovu poleđinu prislonite pripremljeni šablon. Malim zakrivljenim makazama pažljivo isecite disk po iscrtanoj liniji.",
    image: "/assets/1476395017.jpg",
  },
  {
    title: "Postavite disk",
    text: "Odlepite zaštitnu foliju sa diska i pažljivo postavite disk na kožu oko stome.",
    image: "/assets/1476395014.jpg",
  },
  {
    title: "Postavite kesu",
    text: 'Na disk postavite kesu i proverite da li je pravilno prikopčana (treba da se čuje "klik").',
    image: "/assets/1476395015.jpg",
  },
] as const;

function slugifyHeading(value: string): string {
  return value
    .replaceAll("đ", "d")
    .replaceAll("Đ", "d")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPlainText(block: PortableTextBlock): string {
  return (block.children ?? [])
    .map((child) => child.text)
    .join("")
    .trim();
}

function renderTextWithConvaTecLinks(text: string): ReactNode {
  return text.split(/(ConvaTec)/g).map((part, index) => {
    if (part === "ConvaTec") {
      return (
        <Link
          key={`convatec-${index}`}
          href={CONVATEC_URL}
          target="_blank"
          rel="noreferrer"
          className="relative inline-block font-semibold text-[#0077a0] transition-colors duration-300 hover:text-[#00a3ad] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          ConvaTec
        </Link>
      );
    }

    return part;
  });
}

function renderPortableText(blocks: PortableTextBlock[], slug?: string) {
  const rendered: ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    if (block.listItem === "bullet" || block.listItem === "number") {
      const items: PortableTextBlock[] = [];
      const listType = block.listItem;

      while (
        index < blocks.length &&
        blocks[index].listItem === listType
      ) {
        items.push(blocks[index]);
        index += 1;
      }

      const ListTag = listType === "number" ? "ol" : "ul";

      rendered.push(
        <ListTag
          key={`list-${rendered.length}`}
          className={cn(
            "my-4 space-y-2 pl-6",
            listType === "number" ? "list-decimal" : "list-disc",
          )}
        >
          {items.map((item, itemIndex) => (
            <li key={`${item._key ?? "item"}-${itemIndex}`} className="text-slate-700">
              {renderTextWithConvaTecLinks(toPlainText(item))}
            </li>
          ))}
        </ListTag>,
      );

      continue;
    }

    const text = toPlainText(block);
    const style = block.style ?? "normal";
    const key = `${block._key ?? "block"}-${index}`;

    if (!text) {
      index += 1;
      continue;
    }

    if (style === "h1" || style === "h2") {
      const headingId = slugifyHeading(text);
      if (slug === "nega-stome" && headingId === STOMA_MEASUREMENT_HEADING_SLUG) {
        rendered.push(
          <StomaMeasurementStepGuide key={`stoma-measurement-${key}`} headingId={headingId} />,
        );

        index += 1;
        let skippedParagraphs = 0;
        while (index < blocks.length && skippedParagraphs < 3) {
          const candidate = blocks[index];
          const candidateStyle = candidate.style ?? "normal";
          const candidateText = toPlainText(candidate);
          if (candidate.listItem || !candidateText || candidateStyle !== "normal") {
            break;
          }
          skippedParagraphs += 1;
          index += 1;
        }
        continue;
      }

      const aliases = headingAliasMap[headingId] ?? [];
      rendered.push(
        <div key={key}>
          {aliases.map((alias) => (
            <span key={alias} id={alias} className="relative -top-24 block" />
          ))}
          <h2
            id={headingId}
            className="mt-8 font-[family-name:var(--font-source-serif)] text-3xl text-slate-900"
          >
            {renderTextWithConvaTecLinks(text)}
          </h2>
        </div>,
      );
    } else if (style === "h3" || style === "h4") {
      const headingId = slugifyHeading(text);
      const aliases = headingAliasMap[headingId] ?? [];
      rendered.push(
        <div key={key}>
          {aliases.map((alias) => (
            <span key={alias} id={alias} className="relative -top-24 block" />
          ))}
          <h3 id={headingId} className="mt-7 text-xl font-semibold text-slate-900">
            {renderTextWithConvaTecLinks(text)}
          </h3>
        </div>,
      );
    } else if (style === "blockquote") {
      rendered.push(
        <blockquote
          key={key}
          className="my-5 rounded-xl border-l-4 border-sky-600 bg-sky-50 px-5 py-3 text-slate-700"
        >
          {renderTextWithConvaTecLinks(text)}
        </blockquote>,
      );
    } else {
      rendered.push(
        <p key={key} className="tt-main-copy my-4 leading-relaxed text-slate-700">
          {renderTextWithConvaTecLinks(text)}
        </p>,
      );
    }

    index += 1;
  }

  return rendered;
}

function parseTextContent(textContent: string): TextChunk[] {
  const normalized = textContent
    .replaceAll("\r\n", "\n")
    .replaceAll("rnrn", "\n\n")
    .replaceAll(":rn", ":\n")
    .replaceAll(".rn", ".\n")
    .trim();

  if (!normalized) return [];

  const chunks = normalized
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return chunks.map((chunk): TextChunk => {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const bulletLines = lines.filter((line) => /^[-*•]\s+/.test(line));
    if (lines.length > 0 && bulletLines.length === lines.length) {
      return {
        type: "bullet-list",
        items: lines.map((line) => line.replace(/^[-*•]\s+/, "").trim()),
      };
    }

    const numberedLines = lines.filter((line) => /^\d+[\).\s]+/.test(line));
    if (lines.length > 0 && numberedLines.length === lines.length) {
      return {
        type: "number-list",
        items: lines.map((line) => line.replace(/^\d+[\).\s]+/, "").trim()),
      };
    }

    if (/^(napomena|važno|bitno|pažnja)\b/i.test(chunk)) {
      return { type: "callout", text: chunk };
    }

    if (/^#{1,3}\s+/.test(chunk)) {
      return { type: "heading", text: chunk.replace(/^#{1,3}\s+/, "") };
    }

    if (
      lines.length === 1 &&
      lines[0].length <= 80 &&
      !/[.!]$/.test(lines[0])
    ) {
      return { type: "heading", text: lines[0] };
    }

    return { type: "paragraph", text: chunk };
  });
}

function renderTextChunks(chunks: TextChunk[], slug?: string) {
  const rendered: ReactNode[] = [];
  let index = 0;

  while (index < chunks.length) {
    const chunk = chunks[index];

    if (
      slug === "nega-stome" &&
      chunk.type === "heading" &&
      slugifyHeading(chunk.text ?? "") === STOMA_MEASUREMENT_HEADING_SLUG
    ) {
      rendered.push(
        <StomaMeasurementStepGuide
          key={`stoma-measurement-chunks-${index}`}
          headingId={STOMA_MEASUREMENT_HEADING_SLUG}
        />,
      );
      index += 1;
      let skippedParagraphs = 0;
      while (index < chunks.length && skippedParagraphs < 3 && chunks[index].type === "paragraph") {
        skippedParagraphs += 1;
        index += 1;
      }
      continue;
    }

    if (chunk.type === "heading") {
      const headingId = slugifyHeading(chunk.text ?? "");
      const aliases = headingAliasMap[headingId] ?? [];
      rendered.push(
        <div key={`heading-${index}`}>
          {aliases.map((alias) => (
            <span key={alias} id={alias} className="relative -top-24 block" />
          ))}
          <h2
            id={headingId}
            className="mt-8 font-[family-name:var(--font-source-serif)] text-3xl text-slate-900"
          >
            {renderTextWithConvaTecLinks(chunk.text ?? "")}
          </h2>
        </div>
      );
      index += 1;
      continue;
    }

    if (chunk.type === "callout") {
      rendered.push(
        <aside
          key={`callout-${index}`}
          className="my-5 rounded-xl border-l-4 border-sky-600 bg-sky-50 px-5 py-3 text-slate-700"
        >
          {renderTextWithConvaTecLinks(chunk.text ?? "")}
        </aside>
      );
      index += 1;
      continue;
    }

    if (chunk.type === "bullet-list" || chunk.type === "number-list") {
      const ListTag = chunk.type === "number-list" ? "ol" : "ul";
      rendered.push(
        <ListTag
          key={`list-${index}`}
          className={cn(
            "my-4 space-y-2 pl-6 text-slate-700",
            chunk.type === "number-list" ? "list-decimal" : "list-disc",
          )}
        >
          {(chunk.items ?? []).map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>{renderTextWithConvaTecLinks(item)}</li>
          ))}
        </ListTag>
      );
      index += 1;
      continue;
    }

    rendered.push(
      <p key={`paragraph-${index}`} className="tt-main-copy my-4 leading-relaxed text-slate-700">
        {renderTextWithConvaTecLinks(chunk.text ?? "")}
      </p>
    );
    index += 1;
  }

  return rendered;
}

function StomaMeasurementStepGuide({ headingId }: { headingId: string }) {
  return (
    <section className="my-8" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="font-[family-name:var(--font-source-serif)] text-3xl text-slate-900"
      >
        Kako da izmerite vašu stomu?
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
        Za pravilnu zaštitu kože oko stome, koristite šablon koji dobijate uz diskove i pažljivo
        prilagodite otvor obliku i veličini stome pre postavljanja sistema.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {STOMA_MEASUREMENT_STEPS.map((step, index) => (
          <article
            key={step.title}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00a3ad] text-xs font-black text-white">
              {index + 1}
            </div>
            <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RichContent({
  portableText,
  textContent,
  className,
  slug,
}: RichContentProps) {
  const hasPortableText = Boolean(portableText && portableText.length > 0);
  const chunks = !hasPortableText ? parseTextContent(textContent ?? "") : [];

  return (
    <div className={cn("prose prose-slate max-w-none", className)}>
      {hasPortableText
        ? renderPortableText(portableText ?? [], slug)
        : renderTextChunks(chunks, slug)}
      {!hasPortableText && chunks.length === 0 ? (
        <p className="my-4 leading-relaxed text-slate-600">
          Sadržaj ove stranice je u pripremi.
        </p>
      ) : null}
    </div>
  );
}
