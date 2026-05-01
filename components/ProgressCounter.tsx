"use client";

type Props = {
  discovered: number;
  total: number;
};

export function ProgressCounter({ discovered, total }: Props) {
  const pct = Math.round((discovered / total) * 100);
  return (
    <div className="flex items-center gap-2 sm:gap-3 text-ink-soft">
      <span className="font-handwritten text-lg sm:text-xl whitespace-nowrap">
        ✿ {discovered}
        <span className="opacity-50"> de </span>
        {total}
        <span className="hidden sm:inline"> descobertos</span>
      </span>
      <div className="hidden sm:block h-2 w-32 rounded-full bg-cream border border-terracotta/30 overflow-hidden">
        <div
          className="h-full bg-terracotta transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
