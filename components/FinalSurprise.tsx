"use client";

import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { FINAL_MESSAGE } from "@/lib/content";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function FinalSurprise({ open, onClose }: Props) {
  const fired = useRef(false);

  useEffect(() => {
    if (!open) {
      fired.current = false;
      return;
    }
    if (fired.current) return;
    fired.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const colors = ["#d49380", "#f5c5b8", "#a8b89c", "#c9a36a", "#fdf6ee"];
    const end = Date.now() + 1800;
    const tick = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        startVelocity: 45,
        origin: { x: 0, y: 0.7 },
        colors,
        shapes: ["circle"],
        scalar: 0.9,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        startVelocity: 45,
        origin: { x: 1, y: 0.7 },
        colors,
        shapes: ["circle"],
        scalar: 0.9,
      });
      if (Date.now() < end) requestAnimationFrame(tick);
    };
    tick();
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,600px)] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative paper rounded-3xl shadow-2xl ring-1 ring-terracotta/30 px-8 sm:px-12 py-12 text-center overflow-hidden">
                  <Dialog.Close
                    aria-label="Fechar"
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/80 text-ink-soft hover:bg-rose hover:text-ink transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </Dialog.Close>

                  <Sparkles className="mx-auto h-9 w-9 text-gold mb-3" />

                  <Dialog.Title className="font-serif italic text-3xl sm:text-4xl text-ink leading-tight">
                    {FINAL_MESSAGE.title}
                  </Dialog.Title>

                  <div className="mx-auto my-6 h-px w-20 bg-terracotta/40" />

                  <p className="font-serif text-xl leading-relaxed text-ink/90 whitespace-pre-line">
                    {FINAL_MESSAGE.body}
                  </p>

                  {FINAL_MESSAGE.signature && (
                    <p className="font-handwritten text-2xl text-ink-soft mt-6">
                      {FINAL_MESSAGE.signature}
                    </p>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
