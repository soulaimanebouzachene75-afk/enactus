"use client";

import { useEffect } from "react";

/**
 * Curseur doré (anneau + point) qui suit la souris avec inertie et grossit
 * sur les éléments cliquables. Boutons « magnétiques » : les éléments
 * [data-magnetic] se déplacent légèrement vers le curseur.
 * Le curseur normal reste visible (accessibilité). Souris uniquement.
 */
export function Cursor() {
  useEffect(() => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const root = document.documentElement;
    const ring = document.createElement("div");
    const dot = document.createElement("div");
    ring.className = "lux-cursor";
    dot.className = "lux-cursor-dot";
    ring.setAttribute("aria-hidden", "true");
    dot.setAttribute("aria-hidden", "true");
    document.body.append(ring, dot);

    const target = { x: -100, y: -100 }, pos = { x: -100, y: -100 };
    let raf = 0;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactive = "a, button, [role='button'], input, select, textarea, label, .tilt-card, [data-cursor]";
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      root.classList.add("cursor-on");
      const el = e.target as Element | null;
      root.classList.toggle("cursor-hover", !!el?.closest?.(interactive));

      const m = el?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        m.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
      }
    };
    const onLeave = () => root.classList.remove("cursor-on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      ring.remove();
      dot.remove();
      root.classList.remove("cursor-on", "cursor-hover");
    };
  }, []);
  return null;
}
