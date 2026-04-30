"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart } from "lucide-react";
import { BOOK_TITLE, BOOK_SUBTITLE } from "@/lib/content";

type Props = {
  onOpen: () => void;
};

export function BookCover({ onOpen }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6 }}
      className="relative h-full w-full flex items-center justify-center px-6"
    >
      {/* Floating petals */}
      <Petals />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        className="relative max-w-md w-full text-center"
      >
        <div className="relative paper rounded-[2rem] border border-terracotta/30 shadow-2xl px-8 sm:px-12 py-14 sm:py-16">
          {/* Corner ornaments */}
          <Heart className="absolute top-5 left-5 h-4 w-4 text-rose" fill="currentColor" />
          <Heart className="absolute top-5 right-5 h-4 w-4 text-rose" fill="currentColor" />
          <Heart className="absolute bottom-5 left-5 h-4 w-4 text-rose" fill="currentColor" />
          <Heart className="absolute bottom-5 right-5 h-4 w-4 text-rose" fill="currentColor" />

          <p className="font-handwritten text-2xl text-terracotta-deep">
            feliz dia da mãe
          </p>
          <h1 className="mt-3 font-serif italic text-4xl sm:text-5xl text-ink leading-tight">
            {BOOK_TITLE}
          </h1>
          <p className="mt-4 font-handwritten text-2xl text-ink-soft">
            {BOOK_SUBTITLE}
          </p>

          <div className="mx-auto my-7 h-px w-24 bg-terracotta/40" />

          <p className="font-serif italic text-lg text-ink/80 mb-6">
            Vira as páginas devagar.
            <br />
            Em cada uma há coisas escondidas — clica nos pontinhos.
          </p>

          <button
            type="button"
            onClick={onOpen}
            className="group inline-flex items-center gap-3 rounded-full bg-terracotta px-7 py-3.5 text-cream shadow-lg hover:bg-terracotta-deep transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-terracotta/40"
          >
            <BookOpen className="h-5 w-5 group-hover:rotate-[-6deg] transition-transform" />
            <span className="font-serif text-xl">Abrir o livro</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Petals() {
  // Decorative floating hearts (CSS animated). Static positions, deterministic.
  const petals = [
    { left: "10%", duration: "22s", delay: "0s", size: 18 },
    { left: "25%", duration: "28s", delay: "5s", size: 14 },
    { left: "40%", duration: "26s", delay: "12s", size: 20 },
    { left: "60%", duration: "30s", delay: "3s", size: 16 },
    { left: "75%", duration: "24s", delay: "8s", size: 14 },
    { left: "88%", duration: "27s", delay: "15s", size: 18 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <Heart
          key={i}
          className="petal absolute text-rose/70"
          fill="currentColor"
          style={{
            left: p.left,
            bottom: "-40px",
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
