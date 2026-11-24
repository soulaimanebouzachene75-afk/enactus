"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Effet « carte en relief » : l'élément s'incline en 3D selon la position
 * de la souris, avec un reflet de lumière qui la suit.
 * - Actif uniquement avec une souris (sur téléphone, rien ne change) ;
 * - désactivé si « réduire les animations » est demandé ;
 * - aucun rendu React pendant le mouvement (modifie directement le style).
 */
export function Tilt({
  children,
  className,
  max = 8,
  glare = true,
  float = false,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number; // inclinaison maximale en degrés
  glare?: boolean;
  float?: boolean; // léger flottement permanent (logo)
}) {
  const ref = useRef<HTMLDivElement>(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || !enabled()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.dataset.tilt = "on";
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.tilt;
  };

  return (
    <div className={cn("tilt-scene", className)}>
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("tilt-card", float && "tilt-float")}>
        {children}
        {glare && <span className="tilt-glare" aria-hidden />}
      </div>
    </div>
  );
}
