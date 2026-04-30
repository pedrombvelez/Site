"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export function PageNav({ current, total, onPrev, onNext, canPrev, canNext }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Página anterior"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-terracotta/40 bg-cream/70 text-terracotta-deep",
          "transition-all hover:bg-rose hover:text-ink hover:scale-105",
          "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="font-handwritten text-xl text-ink-soft tracking-wide">
        página {current} <span className="opacity-50">/</span> {total}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Página seguinte"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-terracotta/40 bg-cream/70 text-terracotta-deep",
          "transition-all hover:bg-rose hover:text-ink hover:scale-105",
          "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
