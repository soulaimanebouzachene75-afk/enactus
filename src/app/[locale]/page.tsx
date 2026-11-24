import Image from "@/components/Img";
import Link from "next/link";
import { ArrowDown, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button, Eyebrow, Placeholder, SectionHeading, TextLink } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { Counter } from "@/components/Counter";
import { InstagramFeed } from "@/components/InstagramFeed";
import { MemberCard } from "@/components/MemberCard";
import { Rail } from "@/components/Rail";
import { Hero3D } from "@/components/Hero3D";
import { SeasonStory } from "@/components/SeasonStory";
import { NextEvent } from "@/components/NextEvent";
import { BgVideo } from "@/components/BgVideo";
import { Tilt } from "@/components/Tilt";
import { getDictionary } from "@/i18n/dictionaries";
import { tr, type Locale } from "@/i18n/config";
import { keyFigures, site } from "@/content/site";
import { activities, categoryLabels } from "@/content/activities";
import { projectProcess, projects } from "@/content/projects";
import { partners, partnerTypeLabels } from "@/content/partners";
import { team } from "@/content/team";
import { missionParagraphs } from "@/content/about";
import { instagramFallback } from "@/content/instagram";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  // Mise en avant : la plus récente activité disposant d'une galerie photo.
  const board = team.filter((m) => !m.placeholder);

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="lux-glow relative overflow-hidden bg-ink text-white">
        <div className="moucharabieh pointer-events-none absolute inset-0" aria-hidden />
        <Hero3D targetId="hero-team-photo" />
        <div className="container relative grid min-h-[100svh] items-center gap-10 pb-28 pt-28 md:pb-20 lg:grid-cols-12 lg:gap-12 lg:pt-36">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow light>{d.home.eyebrow}</Eyebrow>
            </Reveal>
            <h1 className="h-display mt-7 text-[clamp(3.4rem,11vw,8.5rem)] md:mt-8">
              {d.home.slogan.map((w, i) => (
                <Reveal key={w} delay={0.1 + i * 0.12} y={40}>
                  {i === 2 ? (
                    <span className="block font-script text-[1.12em] font-normal leading-[1.05] text-gold-gradient shimmer rtl:font-display rtl:italic">{w}</span>
                  ) : (
                    <span className="block uppercase tracking-[0.02em] rtl:normal-case">{w}</span>
                  )}
                </Reveal>
              ))}
            </h1>
            <Reveal delay={0.5}>
              <div className="gold-rule mt-8 max-w-md" aria-hidden />
              <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-xl">{d.home.intro}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button href={`/${locale}/join`} className="justify-center">{d.home.ctaJoin}</Button>
                <Button href={`/${locale}/activities`} variant="outline-light" className="justify-center">
                  {d.home.ctaDiscover}
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="lg:col-span-5">
            <figure className="relative mx-auto max-w-[22rem] sm:max-w-sm lg:max-w-[26rem]">
              <Tilt max={7} glare={false}>
              <div className="relative" id="hero-team-photo">
                <div className="absolute -inset-3 rounded-[2rem] border border-gold/40" aria-hidden />
                <div className="absolute -inset-6 hidden rounded-[2.4rem] border border-gold/15 md:block" aria-hidden />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] shadow-[0_40px_120px_-30px_rgba(132,22,138,0.7)]">
                  <Image src={site.heroImage} alt={d.home.heroCaption} fill priority sizes="(min-width:1024px) 420px, 90vw" className="object-cover" />
                  <span className="tilt-glare" aria-hidden />
                </div>
              </div>
              </Tilt>
              <figcaption className="mt-7 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-gold/80 rtl:tracking-normal">
                <span className="h-px w-8 bg-gold/60" aria-hidden />
                {d.home.boardEyebrow}
                <span className="h-px w-8 bg-gold/60" aria-hidden />
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <a href="#mission" className="absolute bottom-8 start-1/2 hidden -translate-x-1/2 text-gold/50 transition hover:text-gold lg:block rtl:translate-x-1/2" aria-label="Scroll">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* ───────── BANDEAU ───────── */}
      <div className="overflow-hidden border-y border-gold/30 bg-violet-900 py-4 md:py-5" aria-hidden dir="ltr">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl italic md:gap-12 md:text-4xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10 md:gap-12">
              {["Think.", "Create.", "Impact.", "Enactus FSJES Souissi", "Rabat", "Think.", "Create.", "Impact.", "Enactus Morocco"].map((w, i) => (
                <span key={i} className="flex items-center gap-10 text-gold-gradient md:gap-12">
                  {w}
                  <span className="inline-block h-2 w-2 rotate-45 bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ───────── MISSION ───────── */}
      <section id="mission" className="bg-bone py-20 md:py-36">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Eyebrow>
              <span className="text-accent">01</span>
              {d.home.missionEyebrow}
            </Eyebrow>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="h-section text-balance text-[2rem] md:text-5xl lg:text-6xl">{d.home.missionTitle}</p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
              {missionParagraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 * i}>
                  <p className="leading-relaxed text-ink/70">{tr(p, locale)}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10">
              <TextLink href={`/${locale}/about`}>{d.common.readMore}</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── LE BUREAU ───────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <SectionHeading index="02" eyebrow={d.home.boardEyebrow} title={d.home.boardTitle}>
            <TextLink href={`/${locale}/team`}>{d.common.seeAll}</TextLink>
          </SectionHeading>
          <p className="mt-6 flex items-center gap-2 text-xs text-ink/45 md:hidden">
            <span className="inline-block h-px w-6 bg-ink/30" /> {d.home.swipe} →
          </p>
          <div className="mt-6 md:mt-14">
            <Rail desktopCols="md:grid-cols-3 lg:grid-cols-4">
              {board.map((m) => (
                <MemberCard key={m.id} member={m} locale={locale} placeholderLabel={d.team.vacant} />
              ))}
            </Rail>
          </div>
        </div>
      </section>

      {/* ───────── CHIFFRES ───────── */}
      <section className="lux-glow relative overflow-hidden bg-ink py-20 text-white md:py-28">
        <div className="moucharabieh pointer-events-none absolute inset-0" aria-hidden />
        <div className="container relative">
          <Reveal>
            <Eyebrow light>
              <span className="text-accent">03</span>
              {d.home.statsEyebrow}
            </Eyebrow>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gold/20 bg-gold/15 md:mt-12 lg:grid-cols-4">
            {keyFigures.map((k, i) => (
              <Reveal key={i} delay={i * 0.08} className="bg-ink p-6 md:p-10">
                <dt className="sr-only">{tr(k.label, locale)}</dt>
                <dd>
                  <span className="block font-display text-6xl text-gold-gradient md:text-8xl">
                    <Counter value={k.value} suffix={k.suffix} />
                  </span>
                  <span className="mt-3 block max-w-[14rem] text-xs leading-snug text-white/60 md:mt-4 md:text-sm">{tr(k.label, locale)}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
          <p className="mt-5 text-xs text-white/35">{d.home.statsNote}</p>
        </div>
      </section>

      {/* ───────── PROCHAIN RENDEZ-VOUS (s'affiche seulement si une activité est à venir) ───────── */}
      <NextEvent
        events={activities.map((a) => ({
          title: tr(a.title, locale),
          href: `/${locale}/activities/${a.slug}`,
          date: a.date,
          time: a.time,
          place: tr(a.place, locale),
          description: tr(a.excerpt, locale),
        }))}
        labels={{
          title: d.extra.nextEvent, days: d.extra.days, hours: d.extra.hours, minutes: d.extra.minutes, seconds: d.extra.seconds,
          add: d.extra.addToCalendar, google: d.extra.googleCalendar, ics: d.extra.icsFile,
        }}
      />

      {/* ───────── RÉCIT DE LA SAISON (défilement) ───────── */}
      <section className="lux-glow relative bg-ink py-20 text-white md:py-32">
        <div className="moucharabieh pointer-events-none absolute inset-0" aria-hidden />
        <div className="container relative">
          <SeasonStory
            chapters={[...activities]
              .sort((x, y) => x.date.localeCompare(y.date))
              .map((a) => ({
                slug: a.slug,
                href: `/${locale}/activities/${a.slug}`,
                title: tr(a.title, locale),
                subtitle: a.subtitle ? tr(a.subtitle, locale) : undefined,
                excerpt: tr(a.excerpt, locale),
                date: formatDate(a.date, locale),
                place: tr(a.place, locale).split(",")[0],
                category: tr(categoryLabels[a.category], locale),
                cover: a.cover,
              }))}
            eyebrow={d.extra.seasonEyebrow}
            title={d.extra.seasonTitle}
            chapterLabel={d.extra.chapter}
            readMore={d.common.readMore}
            seeAll={d.common.seeAll}
            seeAllHref={`/${locale}/activities`}
          />
        </div>
      </section>

      {/* ───────── PROJETS ───────── */}
      <section className="relative overflow-hidden bg-violet-900 py-20 text-white md:py-36">
        <div className="moucharabieh pointer-events-none absolute inset-0" aria-hidden />
        <div className="container relative">
          <SectionHeading index="05" eyebrow={d.home.projectsEyebrow} title={d.home.projectsTitle} light>
            <TextLink href={`/${locale}/projects`} light>
              {d.common.discover}
            </TextLink>
          </SectionHeading>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-gold/20 bg-gold/15 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            {projectProcess.map((s, i) => (
              <Reveal as="li" key={i} delay={i * 0.08} className="group bg-violet-900 p-7 transition-colors duration-500 hover:bg-violet-700 md:p-8">
                <div>
                  <span className="font-display text-5xl italic text-gold-gradient">0{i + 1}</span>
                  <h3 className="mt-6 text-lg font-semibold md:mt-8 md:text-xl">{tr(s.title, locale)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{tr(s.text, locale)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          {projects.every((p) => p.placeholder) && (
            <Reveal className="mt-10 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <Placeholder light>{d.common.placeholderNote}</Placeholder>
              <span>{tr(projects[0].status, locale)}</span>
            </Reveal>
          )}
        </div>
      </section>

      {/* ───────── PARTENAIRES ───────── */}
      <section className="bg-bone py-20 md:py-32">
        <div className="container">
          <SectionHeading index="06" eyebrow={d.home.partnersEyebrow} title={d.home.partnersTitle}>
            <TextLink href={`/${locale}/partners`}>{d.common.seeAll}</TextLink>
          </SectionHeading>
          <ul className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3">
            {partners.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.08}>
                <Tilt className="h-full" max={6} glare={false}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-[11rem] flex-col justify-between rounded-3xl border border-ink/10 bg-white p-7 transition duration-500 relative overflow-hidden hover:border-gold hover:shadow-[0_30px_70px_-35px_rgba(132,22,138,0.45)]"
                >
                  <span className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-violet rtl:tracking-normal">
                    {tr(partnerTypeLabels[p.type], locale)}
                    <ExternalLink className="h-4 w-4 text-ink/25 transition group-hover:text-violet" aria-hidden />
                  </span>
                  <span className="mt-6 flex min-h-[5rem] items-end">
                    {p.logo ? (
                      <Image src={p.logo} alt={p.name} width={260} height={180} className="h-24 w-auto object-contain md:h-28" />
                    ) : (
                      <span className="font-display text-3xl leading-tight">{p.name}</span>
                    )}
                  </span>
                <span className="tilt-glare" aria-hidden />
                </a>
                </Tilt>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── INSTAGRAM ───────── */}
      <section className="py-20 md:py-32">
        <div className="container">
          <SectionHeading index="07" eyebrow="Instagram" title={d.home.instagramTitle} />
          <div className="mt-10 md:mt-12">
            <InstagramFeed fallback={instagramFallback(locale)} followLabel={d.instagram.follow} />
          </div>
        </div>
      </section>

      {/* ───────── REJOINDRE ───────── */}
      <section className="relative overflow-hidden bg-violet py-20 text-white md:py-32">
        <BgVideo src="/videos/need-assessment-1-sdg-in-action.mp4" poster="/videos/sdg-poster.jpg" label={d.extra.joinVideo} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet via-violet/85 to-violet/40 rtl:bg-gradient-to-l" aria-hidden />
        <div className="moucharabieh pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="pointer-events-none absolute -end-32 -top-32 h-[420px] w-[420px] rounded-full bg-gold/25 blur-[120px]" aria-hidden />
        <div className="container relative grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <h2 className="h-display text-balance text-[2.6rem] md:text-7xl">{d.home.joinTitle}</h2>
            <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">{d.home.joinText}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Button href={`/${locale}/join`} className="justify-center">
              {d.home.ctaJoin}
            </Button>
            <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold transition hover:border-gold hover:text-gold">
              {d.nav.contact}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
