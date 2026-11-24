import type { Metadata } from "next";
import { shareImage } from "@/lib/seo";
import Image from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Mic2, Target } from "lucide-react";
import { Eyebrow, Placeholder } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { CalendarIfUpcoming } from "@/components/NextEvent";
import { ActivityCard } from "@/components/ActivityCard";
import { InstagramIcon } from "@/components/icons";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, tr, type Locale } from "@/i18n/config";
import { activities, categoryLabels, getActivity } from "@/content/activities";
import { site } from "@/content/site";
import { asset, formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => activities.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = getActivity(slug);
  if (!a) return {};
  return { title: tr(a.title, locale), description: tr(a.excerpt, locale), ...shareImage(locale, `activity-${a.slug}`, tr(a.title, locale), tr(a.excerpt, locale)) };
}

export default async function ActivityPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const a = getActivity(slug);
  if (!a) notFound();
  const d = getDictionary(locale);
  const t = d.activities;
  const others = activities.filter((x) => x.slug !== a.slug).slice(0, 2);
  const isPast = new Date(a.date + "T23:59:59") < new Date();

  return (
    <>
      {/* Couverture */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white md:pt-40">
        <div className="line-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="container relative">
          <Link href={`/${locale}/activities`} className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t.title}
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">{tr(categoryLabels[a.category], locale)}</span>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">{isPast ? t.past : t.upcoming}</span>
                </div>
                <h1 className="h-display mt-6 text-balance text-5xl md:text-7xl">{tr(a.title, locale)}</h1>
                {a.subtitle && <p className="mt-6 font-display text-2xl font-light italic text-white/75 md:text-3xl">{tr(a.subtitle, locale)}</p>}
              </Reveal>
              <Reveal delay={0.1}>
                <dl className="mt-10 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
                  <div>
                    <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/45 rtl:tracking-normal"><CalendarDays className="h-3.5 w-3.5 text-accent" />{d.common.date}</dt>
                    <dd className="mt-2 font-medium">{formatDate(a.date, locale)}</dd>
                  </div>
                  {a.time && (
                    <div>
                      <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/45 rtl:tracking-normal"><Clock className="h-3.5 w-3.5 text-accent" />{d.common.time}</dt>
                      <dd className="mt-2 font-medium" dir="ltr">{a.time}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/45 rtl:tracking-normal"><MapPin className="h-3.5 w-3.5 text-accent" />{d.common.place}</dt>
                    <dd className="mt-2 font-medium">{tr(a.place, locale)}</dd>
                  </div>
                </dl>
                <CalendarIfUpcoming
                  event={{ title: tr(a.title, locale), href: `/${locale}/activities/${a.slug}`, date: a.date, time: a.time, place: tr(a.place, locale), description: tr(a.excerpt, locale) }}
                  labels={{ add: d.extra.addToCalendar, google: d.extra.googleCalendar, ics: d.extra.icsFile }}
                />
              </Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-square">
                <Image src={a.cover} alt={tr(a.title, locale)} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Description + objectifs */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-3xl font-light leading-snug md:text-4xl">{tr(a.excerpt, locale)}</p>
            </Reveal>
            <div className="mt-10 space-y-5">
              {a.description.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-lg leading-relaxed text-ink/70">{tr(p, locale)}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <aside className="space-y-8 lg:col-span-5">
            <Reveal className="rounded-3xl bg-bone p-8">
              <h2 className="flex items-center gap-3 text-sm font-semibold"><Target className="h-5 w-5 text-accent" />{t.objectives}</h2>
              <ol className="mt-6 space-y-4">
                {a.objectives.map((o, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-xl text-accent">0{i + 1}</span>
                    <span className="pt-1 text-ink/75">{tr(o, locale)}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            {a.speakers.length > 0 && (
              <Reveal delay={0.08} className="rounded-3xl border border-ink/10 p-8">
                <h2 className="flex items-center gap-3 text-sm font-semibold"><Mic2 className="h-5 w-5 text-accent" />{t.speakers}</h2>
                <ul className="mt-6 divide-y divide-ink/10">
                  {a.speakers.map((s) => (
                    <li key={s.name} className="py-4 first:pt-0 last:pb-0">
                      <p className="font-display text-xl">{s.name}</p>
                      <p className="text-sm text-ink/55">{tr(s.role, locale)}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </aside>
        </div>
      </section>

      {/* Vidéo */}
      {a.video && (
        <section className="bg-ink py-20 text-white md:py-28">
          <div className="container">
            <Reveal>
              <Eyebrow light>{t.video}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <video
                controls
                playsInline
                preload="none"
                poster={asset(a.video.poster)}
                className="aspect-video w-full rounded-3xl bg-black"
              >
                <source src={asset(a.video.src)} type="video/mp4" />
              </video>
            </Reveal>
          </div>
        </section>
      )}

      {/* Galerie + affiche */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <Eyebrow>{t.gallery}</Eyebrow>
          </Reveal>
          <div className="mt-10">
            {a.gallery.length > 0 ? (
              <Gallery items={a.gallery.map((g) => ({ src: g.src, alt: tr(g.alt, locale) }))} closeLabel={d.nav.close} />
            ) : (
              <div className="flex flex-col items-start gap-4 rounded-3xl border-2 border-dashed border-ink/15 p-10">
                <p className="text-ink/60">{t.photosSoon}</p>
                <Placeholder>{d.common.placeholderNote}</Placeholder>
              </div>
            )}
          </div>
          {a.poster && (
            <div className="mt-16 grid items-center gap-10 md:grid-cols-12">
              <Reveal className="md:col-span-5">
                <div className="overflow-hidden rounded-3xl shadow-[0_40px_100px_-50px_rgba(16,16,16,0.6)]">
                  <Image src={a.poster} alt={`${t.poster} — ${tr(a.title, locale)}`} width={940} height={960} sizes="(min-width:768px) 40vw, 100vw" className="h-auto w-full" />
                </div>
              </Reveal>
              <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
                <Eyebrow>{t.poster}</Eyebrow>
                <p className="mt-6 font-display text-3xl font-light leading-snug">{tr(a.title, locale)}</p>
                <a
                  href={site.socials[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet"
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span dir="ltr">{d.instagram.follow}</span>
                </a>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* Autres activités */}
      {others.length > 0 && (
        <section className="border-t border-ink/10 bg-bone py-20 md:py-28">
          <div className="container">
            <h2 className="h-section">{t.other}</h2>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {others.map((o) => (
                <ActivityCard key={o.slug} activity={o} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
