import Image from "@/components/Img";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Logo officiel (version pour fond sombre : « enactus » en blanc), affiché
 * tel quel — proportions d'origine (1200×728), aucune modification de couleur.
 * À utiliser uniquement sur les zones sombres (en-tête, menu, pied de page).
 */
export function Logo({ href, className, size = "md" }: { href: string; className?: string; size?: "md" | "lg" }) {
  const dims = size === "lg" ? { w: 220, h: 133 } : { w: 120, h: 73 };
  return (
    <Link
      href={href}
      aria-label="Enactus FSJES Souissi — accueil"
      className={cn("inline-flex shrink-0 items-center transition hover:opacity-90", className)}
    >
      <Image src={site.logo} alt="Logo Enactus FSJES Souissi" width={dims.w} height={dims.h} priority className="h-auto" style={{ width: dims.w }} />
    </Link>
  );
}
