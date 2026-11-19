"use client";

import Image from "@/components/Img";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { src: string; alt: string };

/** Galerie en mosaïque + visionneuse plein écran (clavier : ← → Échap). */
export function Gallery({ items, closeLabel = "Fermer" }: { items: Item[]; closeLabel?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const isRtl = typeof document !== "undefined" && document.dir === "rtl";

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(isRtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(isRtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, go, isRtl]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {items.map((it, i) => (
          <li key={it.src} className={cn(i === 0 && items.length % 4 === 1 && "md:col-span-2 md:row-span-2")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-[4/3] h-full w-full overflow-hidden rounded-xl bg-ink/5"
              aria-label={it.alt}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(min-width: 768px) 40vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Expand className="absolute bottom-3 end-3 h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-12"
            role="dialog"
            aria-modal="true"
            aria-label={items[index].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              key={index}
              className="relative h-full w-full"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={items[index].src} alt={items[index].alt} fill sizes="100vw" className="object-contain" />
            </motion.div>
            <p className="absolute bottom-5 start-1/2 -translate-x-1/2 text-center text-sm text-white/70 rtl:translate-x-1/2">
              {items[index].alt} · {index + 1}/{items.length}
            </p>
            <button type="button" onClick={close} aria-label={closeLabel} className="absolute end-5 top-5 rounded-full bg-white/10 p-3 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(-1); }}
                  aria-label="Précédent / Previous"
                  className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); go(1); }}
                  aria-label="Suivant / Next"
                  className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                >
                  <ChevronRight className="h-6 w-6 rtl:rotate-180" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
