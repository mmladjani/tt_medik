import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { PortableTextBlock } from "@/lib/site-pages";

interface RichContentProps {
  portableText?: PortableTextBlock[] | null;
  textContent?: string | null;
  className?: string;
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

function renderPortableText(blocks: PortableTextBlock[]) {
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
              {toPlainText(item)}
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
            {text}
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
            {text}
          </h3>
        </div>,
      );
    } else if (style === "blockquote") {
      rendered.push(
        <blockquote
          key={key}
          className="my-5 rounded-xl border-l-4 border-sky-600 bg-sky-50 px-5 py-3 text-slate-700"
        >
          {text}
        </blockquote>,
      );
    } else {
      rendered.push(
        <p key={key} className="my-4 leading-relaxed text-slate-700">
          {text}
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

function renderTextChunks(chunks: TextChunk[]) {
  return chunks.map((chunk, index) => {
    if (chunk.type === "heading") {
      const headingId = slugifyHeading(chunk.text ?? "");
      const aliases = headingAliasMap[headingId] ?? [];
      return (
        <div key={`heading-${index}`}>
          {aliases.map((alias) => (
            <span key={alias} id={alias} className="relative -top-24 block" />
          ))}
          <h2
            id={headingId}
            className="mt-8 font-[family-name:var(--font-source-serif)] text-3xl text-slate-900"
          >
            {chunk.text}
          </h2>
        </div>
      );
    }

    if (chunk.type === "callout") {
      return (
        <aside
          key={`callout-${index}`}
          className="my-5 rounded-xl border-l-4 border-sky-600 bg-sky-50 px-5 py-3 text-slate-700"
        >
          {chunk.text}
        </aside>
      );
    }

    if (chunk.type === "bullet-list" || chunk.type === "number-list") {
      const ListTag = chunk.type === "number-list" ? "ol" : "ul";
      return (
        <ListTag
          key={`list-${index}`}
          className={cn(
            "my-4 space-y-2 pl-6 text-slate-700",
            chunk.type === "number-list" ? "list-decimal" : "list-disc",
          )}
        >
          {(chunk.items ?? []).map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>{item}</li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={`paragraph-${index}`} className="my-4 leading-relaxed text-slate-700">
        {chunk.text}
      </p>
    );
  });
}

export function RichContent({
  portableText,
  textContent,
  className,
}: RichContentProps) {
  const hasPortableText = Boolean(portableText && portableText.length > 0);
  const chunks = !hasPortableText ? parseTextContent(textContent ?? "") : [];

  return (
    <div className={cn("prose prose-slate max-w-none", className)}>
      {hasPortableText
        ? renderPortableText(portableText ?? [])
        : renderTextChunks(chunks)}
      {!hasPortableText && chunks.length === 0 ? (
        <p className="my-4 leading-relaxed text-slate-600">
          Sadržaj ove stranice je u pripremi.
        </p>
      ) : null}
    </div>
  );
}
