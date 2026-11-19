"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  // La vraie valeur est dans le HTML (lisible même sans JavaScript) ;
  // l'animation repart de 0 seulement quand le compteur entre à l'écran.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    setDisplay(0);
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toString().padStart(2, "0")}
      {suffix}
    </span>
  );
}
