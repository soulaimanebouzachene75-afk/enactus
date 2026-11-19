import { cn } from "@/lib/utils";

/**
 * Sur téléphone : carrousel horizontal à faire glisser (scroll-snap).
 * Sur ordinateur : grille classique (colonnes passées via `desktopCols`).
 */
export function Rail({ children, desktopCols = "md:grid-cols-4", className }: { children: React.ReactNode[]; desktopCols?: string; className?: string }) {
  return (
    <ul
      className={cn(
        "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:grid md:gap-8 md:overflow-visible md:px-0 md:pb-0",
        desktopCols,
        className,
      )}
    >
      {children.map((c, i) => (
        <li key={i} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
          {c}
        </li>
      ))}
    </ul>
  );
}
