"use client";

import { motion } from "framer-motion";
import type { Chapter as ChapterType, Hotspot as HotspotType } from "@/lib/content";
import { Hotspot } from "./Hotspot";

type Props = {
  chapter: ChapterType;
  discoveredIds: Set<string>;
  onHotspotClick: (hotspot: HotspotType) => void;
};

export function Chapter({ chapter, discoveredIds, onHotspotClick }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Aguarela background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-55"
        style={{ backgroundImage: `url(${chapter.background})` }}
        aria-hidden="true"
      />
      {/* Wash overlay (cream + peach) for that watercolor paper feel */}
      <div
        className="absolute inset-0 paper mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-cream/70 via-peach/30 to-rose/30"
        aria-hidden="true"
      />

      {/* Chapter text block */}
      <div className="relative z-10 flex h-full flex-col px-6 sm:px-12 md:px-16 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="font-handwritten text-xl md:text-2xl text-terracotta-deep">
            capítulo {chapter.id}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl italic text-ink mt-1 leading-tight">
            {chapter.title}
          </h2>
          {chapter.subtitle && (
            <p className="font-handwritten text-2xl text-ink-soft mt-1">
              {chapter.subtitle}
            </p>
          )}
          <p className="font-serif text-lg md:text-xl text-ink/90 leading-relaxed mt-5 whitespace-pre-line">
            {chapter.intro}
          </p>
          {chapter.note && (
            <p className="font-handwritten text-xl text-terracotta-deep/90 mt-4">
              ✿ {chapter.note}
            </p>
          )}
        </motion.div>

        {/* Hotspots layer */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="relative h-full w-full">
            {chapter.hotspots.map((h) => (
              <div key={h.id} className="pointer-events-auto">
                <Hotspot
                  hotspot={h}
                  discovered={discoveredIds.has(h.id)}
                  onClick={() => onHotspotClick(h)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
