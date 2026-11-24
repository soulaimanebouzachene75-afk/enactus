"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/utils";

/**
 * Vidéo d'ambiance en fond (muette, en boucle).
 * Chargée uniquement sur ordinateur, hors mode « économie de données »
 * et hors « réduire les animations ». Sinon, l'image fixe (poster) reste affichée.
 */
export function BgVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const ok =
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !conn?.saveData;
    if (!ok) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!v.src) v.src = asset(src);
        v.play().catch(() => {});
      } else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={asset(poster)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
    />
  );
}
