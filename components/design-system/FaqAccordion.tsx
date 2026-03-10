import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqAccordionItem {
  id: string;
  question: string;
  answer: string;
}

export function FaqAccordion({
  items,
  openIndex,
  onToggle,
  className,
}: {
  items: FaqAccordionItem[];
  openIndex: number;
  onToggle: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-0 border-t border-slate-100", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={item.id}
            className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50"
          >
            <button
              type="button"
              onClick={() => onToggle(index)}
              className="flex w-full items-center justify-between px-3 py-8 text-left md:px-4"
            >
              <div className="flex items-center gap-8">
                <span className="text-sm font-black text-[#00a3ad]/20 transition-colors group-hover:text-[#00a3ad]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xl font-bold text-[#00344d] md:text-2xl">{item.question}</span>
              </div>
              <span
                className={cn(
                  "rounded-full border border-slate-200 p-2 text-[#00a3ad] transition-transform rotate-45",
                  isOpen && "rotate-[135deg] border-[#00a3ad] bg-[#00a3ad] text-white",
                )}
              >
                <ArrowUpRight size={20} />
              </span>
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-500",
                isOpen ? "max-h-[80rem] pb-8" : "max-h-0",
              )}
            >
              <p className="max-w-[96ch] pl-16 pr-4 text-lg leading-relaxed text-slate-500">
                {item.answer}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
