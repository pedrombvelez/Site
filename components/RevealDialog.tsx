"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Hotspot } from "@/lib/content";

type Props = {
  hotspot: Hotspot | null;
  onClose: () => void;
};

export function RevealDialog({ hotspot, onClose }: Props) {
  const open = hotspot !== null;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && hotspot && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative rounded-3xl bg-cream paper shadow-2xl ring-1 ring-terracotta/20 overflow-hidden">
                  <Dialog.Close
                    aria-label="Fechar"
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/80 text-ink-soft hover:bg-rose hover:text-ink transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </Dialog.Close>

                  <Dialog.Title className="sr-only">
                    {hotspot.label}
                  </Dialog.Title>

                  <RevealBody reveal={hotspot.reveal} label={hotspot.label} />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function RevealBody({
  reveal,
  label,
}: {
  reveal: Hotspot["reveal"];
  label: string;
}) {
  if (reveal.type === "photo") {
    return (
      <div>
        <div className="aspect-[3/4] w-full bg-peach">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={reveal.src}
            alt={reveal.caption ?? label}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="px-6 py-4 text-center">
          <p className="font-handwritten text-2xl text-terracotta-deep">
            {label}
          </p>
          {reveal.caption && (
            <p className="mt-1 text-ink-soft text-base italic">
              {reveal.caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (reveal.type === "video") {
    return (
      <div>
        <div className="aspect-video w-full bg-ink">
          <video
            src={reveal.src}
            poster={reveal.poster}
            controls
            playsInline
            className="h-full w-full"
          />
        </div>
        <div className="px-6 py-4 text-center">
          <p className="font-handwritten text-2xl text-terracotta-deep">
            {label}
          </p>
          {reveal.caption && (
            <p className="mt-1 text-ink-soft text-base italic">
              {reveal.caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  // message
  return (
    <div className="px-7 py-9 text-center">
      <p className="font-handwritten text-3xl text-terracotta-deep mb-4">
        {label}
      </p>
      <p className="font-serif text-xl leading-relaxed text-ink whitespace-pre-line">
        {reveal.text}
      </p>
      {reveal.signature && (
        <p className="font-handwritten text-2xl text-ink-soft mt-5">
          {reveal.signature}
        </p>
      )}
    </div>
  );
}
