"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, FileText, Layers, Search, UserRound, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchItem = { title: string; subtitle?: string; href: string; type: "page" | "activity" | "member" | "pole" };

const icons = { page: FileText, activity: CalendarDays, member: UserRound, pole: Layers };

/** Retire accents et majuscules pour une recherche tolérante (« equipe » trouve « Équipe »). */
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Recherche rapide : Ctrl+K / ⌘K, ou la loupe du menu (événement « enx-search »).
 * Navigation au clavier : ↑ ↓ Entrée Échap.
 */
export function CommandPalette({
  items,
  labels,
}: {
  items: SearchItem[];
  labels: { placeholder: string; hint: string; empty: string; types: Record<SearchItem["type"], string> };
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("enx-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("enx-search", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => input.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
  }, [open]);

  const results = useMemo(() => {
    const n = norm(q.trim());
    if (!n) return items.filter((i) => i.type === "page");
    return items
      .map((i) => {
        const t = norm(i.title), s = norm(i.subtitle ?? "");
        const score = t.startsWith(n) ? 3 : t.includes(n) ? 2 : s.includes(n) ? 1 : 0;
        return { i, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.i);
  }, [q, items]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center bg-ink/70 px-4 pt-[12vh] backdrop-blur-sm" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={labels.placeholder}>
      <div className="page-enter w-full max-w-xl overflow-hidden rounded-3xl border border-gold/25 bg-ink text-white shadow-[0_40px_120px_-20px_rgba(132,22,138,0.7)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-white/10 px-5">
          <Search className="h-5 w-5 text-gold" aria-hidden />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
              if (e.key === "Enter" && results[sel]) go(results[sel].href);
            }}
            placeholder={labels.placeholder}
            className="h-16 w-full bg-transparent text-base text-white outline-none placeholder:text-white/35"
            aria-label={labels.placeholder}
          />
          <kbd className="hidden rounded-md border border-white/15 px-2 py-0.5 text-[10px] text-white/50 sm:block">Esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-4 py-8 text-center text-sm text-white/50">{labels.empty}</li>}
          {results.map((r, i) => {
            const Icon = icons[r.type];
            return (
              <li key={r.href + r.title} role="option" aria-selected={i === sel}>
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onClick={() => go(r.href)}
                  className={cn("flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-start transition", i === sel ? "bg-white/[0.07]" : "")}
                >
                  <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", i === sel ? "bg-gold text-ink" : "bg-white/5 text-gold")}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{r.title}</span>
                    {r.subtitle && <span className="block truncate text-xs text-white/50">{r.subtitle}</span>}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-white/35 rtl:tracking-normal">{labels.types[r.type]}</span>
                  {i === sel && <CornerDownLeft className="h-4 w-4 text-gold" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="border-t border-white/10 px-5 py-3 text-[11px] text-white/40">{labels.hint}</p>
      </div>
    </div>
  );
}
