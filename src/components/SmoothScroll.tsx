"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type LenisLike = { raf: (t: number) => void; scrollTo: (t: number | string | HTMLElement, o?: { immediate?: boolean; offset?: number }) => void; destroy: () => void };
let lenis: LenisLike | null = null;

/**
 * Défilement fluide avec inertie (Lenis), uniquement à la souris sur ordinateur.
 * Désactivé sur téléphone/tablette et si « réduire les animations » est demandé.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    let raf = 0;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -90 } }) as unknown as LenisLike;
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Nouvelle page : retour en haut immédiat
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
