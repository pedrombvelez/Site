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
    <div className="relative h-full w-full overflow-hidden flex flex-col">
      {/* Paper backdrop for the whole chapter */}
      <div className="absolute inset-0 paper" aria-hidden="true" />

      {/* Scrollable content area: text on top, scene below.
          On mobile this is the only viable layout (no overlap with hotspots). */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto overflow-x-hidden">
        {/* TEXT ZONE */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-shrink-0 px-5 sm:px-10 md:px-12 pt-6 sm:pt-9 pb-3"
        >
          <p className="font-handwritten text-lg sm:text-xl text-terracotta-deep">
            capítulo {chapter.id}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.1] mt-1">
            {chapter.title}
          </h2>
          {chapter.subtitle && (
            <p className="font-handwritten text-xl sm:text-2xl text-ink-soft mt-1">
              {chapter.subtitle}
            </p>
          )}
          <p className="font-serif text-[1.05rem] sm:text-lg md:text-xl text-ink/90 leading-relaxed mt-4 whitespace-pre-line">
            {chapter.intro}
          </p>
          {chapter.note && (
            <p className="font-handwritten text-lg sm:text-xl text-terracotta-deep/90 mt-3">
              ✿ {chapter.note}
            </p>
          )}
        </motion.div>

        {/* SCENE ZONE — watercolor area where the hotspots live */}
        <div className="flex-1 min-h-[260px] sm:min-h-[320px] mx-3 sm:mx-6 mb-3 sm:mb-5 mt-1 relative rounded-2xl overflow-hidden ring-1 ring-terracotta/25 shadow-inner">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${chapter.background})` }}
            aria-hidden="true"
          />
          {/* Light paper texture over the SVG aguarela */}
          <div
            className="absolute inset-0 paper opacity-30 mix-blend-multiply"
            aria-hidden="true"
          />
          {/* Subtle vignette to deepen the corners and keep hotspots readable */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 60%, rgba(74, 58, 50, 0.14) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Hotspots are absolutely positioned within this scene area */}
          {chapter.hotspots.map((h) => (
            <Hotspot
              key={h.id}
              hotspot={h}
              discovered={discoveredIds.has(h.id)}
              onClick={() => onHotspotClick(h)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
