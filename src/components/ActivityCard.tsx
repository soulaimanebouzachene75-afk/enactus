import Image from "@/components/Img";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { categoryLabels, type Activity } from "@/content/activities";
import { tr, type Locale } from "@/i18n/config";
import { cn, formatDate } from "@/lib/utils";
import { Tilt } from "./Tilt";

export function ActivityCard({
  activity,
  locale,
  featured,
  dark,
  row,
}: {
  activity: Activity;
  locale: Locale;
  featured?: boolean;
  dark?: boolean;
  row?: boolean;
}) {
  return (
    <Link href={`/${locale}/activities/${activity.slug}`} className="group block h-full">
      <article className={cn("flex h-full", row ? "flex-col lg:flex-row lg:items-center lg:gap-6" : "flex-col")}>
        <Tilt className={cn("shrink-0", row && "lg:w-[46%]")} max={featured ? 5 : 8} glare={false}>
        <div className={cn("relative overflow-hidden rounded-2xl bg-ink/5 shadow-[0_25px_60px_-35px_rgba(18,8,20,0.6)]", featured ? "aspect-[4/3]" : "aspect-square")}>
          <Image
            src={activity.cover}
            alt={tr(activity.title, locale)}
            fill
            sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute start-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            {tr(categoryLabels[activity.category], locale)}
          </span>
          <span className="absolute bottom-4 end-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5 rtl:-scale-x-100" aria-hidden />
          </span>
          <span className="tilt-glare" aria-hidden />
        </div>
        </Tilt>
        <div className={cn("pt-5", row && "lg:pt-0")}>
          <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-xs", dark ? "text-white/55" : "text-ink/55")}>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden />
              {formatDate(activity.date, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden />
              {tr(activity.place, locale).split(",")[0]}
            </span>
          </div>
          <h3
            className={cn(
              "mt-3 font-display font-light leading-tight transition-colors",
              featured ? "text-3xl md:text-4xl" : "text-2xl",
              dark ? "text-white group-hover:text-accent" : "text-ink group-hover:text-accent",
            )}
          >
            {tr(activity.title, locale)}
          </h3>
          {activity.subtitle && <p className={cn("mt-2 text-sm", dark ? "text-white/60" : "text-ink/60")}>{tr(activity.subtitle, locale)}</p>}
        </div>
      </article>
    </Link>
  );
}
