import Image from "@/components/Img";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Logo officiel, affiché tel quel (proportions d'origine 1280×853, aucune
 * modification de couleur). Il est posé sur un fond blanc pour rester
 * lisible sur les sections sombres.
 */
export function Logo({ href, className, size = "md" }: { href: string; className?: string; size?: "md" | "lg" }) {
  const dims = size === "lg" ? { w: 168, h: 112 } : { w: 84, h: 56 };
  return (
    <Link
      href={href}
      aria-label="Enactus FSJES Souissi — accueil"
      className={cn("inline-flex shrink-0 items-center rounded-xl bg-white px-2 py-1 shadow-sm transition hover:shadow-md", className)}
    >
      <Image src={site.logo} alt="Logo Enactus FSJES Souissi" width={dims.w} height={dims.h} priority className="h-auto" style={{ width: dims.w }} />
    </Link>
  );
}
