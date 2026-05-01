"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { CHAPTERS, TOTAL_HOTSPOTS, type Hotspot } from "@/lib/content";
import { BookCover } from "./BookCover";
import { Chapter } from "./Chapter";
import { PageNav } from "./PageNav";
import { ProgressCounter } from "./ProgressCounter";
import { RevealDialog } from "./RevealDialog";
import { FinalSurprise } from "./FinalSurprise";
import { cn } from "@/lib/utils";

type View = { kind: "cover" } | { kind: "chapter"; index: number };

export function Book() {
  const [view, setView] = useState<View>({ kind: "cover" });
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [openHotspot, setOpenHotspot] = useState<Hotspot | null>(null);
  const [finalOpen, setFinalOpen] = useState(false);
  const [finalShown, setFinalShown] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const open = useCallback(() => {
    setDirection(1);
    setView({ kind: "chapter", index: 0 });
  }, []);

  const goPrev = useCallback(() => {
    setView((v) => {
      if (v.kind !== "chapter") return v;
      if (v.index === 0) {
        setDirection(-1);
        return { kind: "cover" };
      }
      setDirection(-1);
      return { kind: "chapter", index: v.index - 1 };
    });
  }, []);

  const goNext = useCallback(() => {
    setView((v) => {
      if (v.kind !== "chapter") return v;
      if (v.index >= CHAPTERS.length - 1) return v;
      setDirection(1);
      return { kind: "chapter", index: v.index + 1 };
    });
  }, []);

  const handleHotspotClick = useCallback(
    (h: Hotspot) => {
      setOpenHotspot(h);
      setDiscovered((prev) => {
        if (prev.has(h.id)) return prev;
        const next = new Set(prev);
        next.add(h.id);

        // If this discovery completes the collection AND we're on the last chapter,
        // schedule the final surprise once (after the dialog closes).
        if (
          !finalShown &&
          next.size === TOTAL_HOTSPOTS &&
          view.kind === "chapter" &&
          view.index === CHAPTERS.length - 1
        ) {
          // small delay so confetti fires after the user closes the message dialog
          setTimeout(() => {
            setFinalOpen(true);
            setFinalShown(true);
          }, 250);
        }
        return next;
      });
    },
    [finalShown, view],
  );

  const allDiscovered = discovered.size === TOTAL_HOTSPOTS;
  const onLastChapter =
    view.kind === "chapter" && view.index === CHAPTERS.length - 1;

  const viewKey = view.kind === "cover" ? "cover" : `c-${view.index}`;

  const flipVariants = useMemo(
    () => ({
      enter: (dir: 1 | -1) => ({
        rotateY: dir === 1 ? 90 : -90,
        opacity: 0,
        transformPerspective: 1400,
      }),
      center: {
        rotateY: 0,
        opacity: 1,
        transformPerspective: 1400,
      },
      exit: (dir: 1 | -1) => ({
        rotateY: dir === 1 ? -90 : 90,
        opacity: 0,
        transformPerspective: 1400,
      }),
    }),
    [],
  );

  return (
    <div className="relative flex flex-col min-h-screen-dvh">
      {/* Book stage */}
      <div className="flex-1 flex items-stretch sm:items-center justify-center p-0 sm:p-6 md:p-8">
        <div
          className={cn(
            "relative w-full max-w-4xl",
            // Mobile: fill almost the whole viewport (book IS the screen).
            // Tablet+: book has its own card aspect.
            "min-h-[calc(100dvh-7rem)] sm:min-h-0",
            "sm:aspect-[4/5] md:aspect-[5/4]",
            "rounded-none sm:rounded-[1.75rem] shadow-2xl ring-1 ring-terracotta/20",
            "bg-cream paper overflow-hidden",
          )}
          style={{ perspective: "1400px" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={viewKey}
              custom={direction}
              variants={flipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 0.9, 0.34, 1] }}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {view.kind === "cover" ? (
                <BookCover onOpen={open} />
              ) : (
                <Chapter
                  chapter={CHAPTERS[view.index]}
                  discoveredIds={discovered}
                  onHotspotClick={handleHotspotClick}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer: nav + progress + final button */}
      {view.kind === "chapter" && (
        <div className="sticky bottom-0 z-30 mx-auto w-full max-w-4xl px-2 sm:px-4 pb-2 sm:pb-5 safe-bottom">
          <div className="rounded-2xl bg-cream/95 backdrop-blur border border-terracotta/30 shadow-lg">
            <PageNav
              current={view.index + 1}
              total={CHAPTERS.length}
              onPrev={goPrev}
              onNext={goNext}
              canPrev={true}
              canNext={view.index < CHAPTERS.length - 1}
            />
            <div className="border-t border-terracotta/20 px-3 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 flex-wrap">
              <ProgressCounter discovered={discovered.size} total={TOTAL_HOTSPOTS} />
              {onLastChapter && (
                <button
                  type="button"
                  onClick={() => setFinalOpen(true)}
                  disabled={!allDiscovered}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 font-serif text-base sm:text-lg transition-all",
                    allDiscovered
                      ? "bg-terracotta text-cream shadow-md hover:bg-terracotta-deep hover:scale-105 focus-visible:ring-4 focus-visible:ring-terracotta/40"
                      : "bg-cream border border-terracotta/30 text-ink-soft cursor-not-allowed opacity-70",
                  )}
                  title={
                    allDiscovered
                      ? "Beijinho final"
                      : "Descobre primeiro todos os pontinhos do livro"
                  }
                >
                  {allDiscovered ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    <Heart className="h-4 w-4" />
                  )}
                  <span>
                    {allDiscovered ? "Beijinho final" : "Faltam alguns ♡"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <RevealDialog hotspot={openHotspot} onClose={() => setOpenHotspot(null)} />
      <FinalSurprise open={finalOpen} onClose={() => setFinalOpen(false)} />
    </div>
  );
}
