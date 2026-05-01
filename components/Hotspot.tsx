"use client";

import { Heart, Star, Sparkles, Flower, Moon, Sun, Leaf, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Hotspot as HotspotType } from "@/lib/content";

const ICONS = {
  heart: Heart,
  star: Star,
  sparkle: Sparkles,
  flower: Flower,
  moon: Moon,
  sun: Sun,
  leaf: Leaf,
} as const;

type Props = {
  hotspot: HotspotType;
  discovered: boolean;
  onClick: () => void;
};

export function Hotspot({ hotspot, discovered, onClick }: Props) {
  const Icon = ICONS[hotspot.icon ?? "heart"];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={hotspot.label}
      title={hotspot.label}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 z-10",
        "flex h-12 w-12 sm:h-11 sm:w-11 items-center justify-center rounded-full",
        "backdrop-blur-sm border-2 transition-colors shadow-md",
        "cursor-pointer focus-visible:outline-none focus-visible:ring-4",
        discovered
          ? "bg-sage/90 border-sage text-cream focus-visible:ring-sage/40"
          : "bg-cream/90 border-terracotta/70 text-terracotta-deep focus-visible:ring-terracotta/40 hotspot-pulse",
      )}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      {discovered ? (
        <Check className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={2.5} />
      ) : (
        <Icon className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={2} />
      )}
    </motion.button>
  );
}
