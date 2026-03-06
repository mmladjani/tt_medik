"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
}: {
  items: Array<{
    question: string;
    answer: string;
  }>;
}) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = index === openIndex;

        return (
          <article
            key={item.question}
            className={cn(
              "rounded-xl border border-slate-200/80 bg-white shadow-sm transition-colors",
              isOpen && "border-sky-200 bg-sky-50/30",
            )}
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span className="inline-flex items-start gap-3">
                <span className="mt-0.5 text-xl font-semibold text-sky-700">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <span className="text-base font-semibold text-slate-900">
                  {item.question}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "mt-0.5 size-5 shrink-0 text-slate-500 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
