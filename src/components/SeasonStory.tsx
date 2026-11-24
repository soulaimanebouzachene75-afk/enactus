"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Image from "@/components/Img";
import { Tilt } from "./Tilt";
import { cn } from "@/lib/utils";

export type Chapter = {
  slug: string;
  href: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  place: string;
  category: string;
  cover: string;
};

/**
 * « Le récit de la saison » : sur ordinateur, la colonne de gauche reste fixe
 * (numéro de chapitre, date, barre de progression) pendant que les activités
 * défilent à droite. Sur téléphone, les chapitres s'empilent simplement.
 * Les activités viennent de src/content/activities.ts (ordre chronologique).
 */
export function SeasonStory({
  chapters,
  eyebrow,
  title,
  chapterLabel,
  readMore,
  seeAll,
  seeAllHref,
}: {
  chapters: Chapter[];
  eyebrow: string;
  title: string;
  chapterLabel: string;
  readMore: string;
  seeAll: string;
  seeAllHref: string;
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [chapters.length]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const current = chapters[active];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Colonne fixe */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow text-white/70">{eyebrow}</p>
          <h2 className="h-section mt-5 text-balance text-white">{title}</h2>
          <div className="mt-10 hidden lg:block">
            <p className="text-xs uppercase tracking-[0.25em] text-gold/80 rtl:tracking-normal">{chapterLabel}</p>
            <p className="mt-2 font-display text-[7rem] leading-none text-gold-gradient tabular-nums" dir="ltr">
              {pad(active + 1)}
              <span className="text-3xl text-white/30">/{pad(chapters.length)}</span>
            </p>
            <p key={current?.slug} className="page-enter mt-4 flex items-center gap-2 text-white/70">
              <CalendarDays className="h-4 w-4 text-gold" aria-hidden /> {current?.date}
            </p>
            <div className="mt-8 h-px w-full max-w-xs bg-white/10">
              <div
                className="h-px bg-gold transition-all duration-700 ease-out"
                style={{ width: `${((active + 1) / chapters.length) * 100}%` }}
              />
            </div>
            <Link href={seeAllHref} className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-gold decoration-2 underline-offset-[6px] hover:text-gold">
              {seeAll}
            </Link>
          </div>
        </div>
      </div>

      {/* Chapitres qui défilent */}
      <ol className="space-y-16 lg:col-span-7 lg:space-y-0">
        {chapters.map((c, i) => (
          <li
            key={c.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={cn("transition-opacity duration-700 lg:flex lg:min-h-[85vh] lg:items-center", i === active ? "lg:opacity-100" : "lg:opacity-35")}
          >
            <article className="w-full">
              <Link href={c.href} className="group block">
                <Tilt max={6} glare={false}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-gold/20 shadow-[0_40px_100px_-40px_rgba(132,22,138,0.8)]">
                    <Image src={c.cover} alt={c.title} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
                    <span className="absolute start-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">{c.category}</span>
                    <span className="absolute bottom-5 start-5 font-display text-6xl text-white/90 tabular-nums lg:hidden" dir="ltr">{pad(i + 1)}</span>
                    <span className="tilt-glare" aria-hidden />
                  </div>
                </Tilt>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/55">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden />{c.date}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-gold" aria-hidden />{c.place}</span>
                </div>
                <h3 className="mt-3 font-display text-3xl text-white transition-colors group-hover:text-gold md:text-4xl">{c.title}</h3>
                {c.subtitle && <p className="mt-2 font-display text-lg italic text-white/60">{c.subtitle}</p>}
                <p className="mt-4 max-w-xl leading-relaxed text-white/65">{c.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  {readMore} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ol>
      <Link href={seeAllHref} className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-gold decoration-2 underline-offset-[6px] lg:hidden">
        {seeAll}
      </Link>
    </div>
  );
}
