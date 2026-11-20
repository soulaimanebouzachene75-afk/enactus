import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import { PageHero, Eyebrow, Placeholder, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { tr, type Locale } from "@/i18n/config";
import { presentation, missionParagraphs, historyText, vision, visionValidated, values, valuesValidated } from "@/content/about";
import { activities } from "@/content/activities";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale).about.title };
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-8 border-t border-ink/10 py-16 md:grid-cols-12 md:py-20">
      <Reveal className="md:col-span-4">
        <Eyebrow>
          <span className="text-accent">{n}</span>
          {title}
        </Eyebrow>
      </Reveal>
      <div className="md:col-span-8">{children}</div>
    </div>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const timeline = [...activities].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        eyebrow="Enactus FSJES Souissi"
        title={d.about.title}
        lead={d.about.lead}
        crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: d.about.title }]}
        image={{ src: site.heroImage, alt: d.home.heroCaption }}
      />

      <section className="container py-8">
        <Block n="01" title={d.about.presentation}>
          <Reveal>
            <p className="h-section text-balance text-3xl md:text-4xl lg:text-5xl">{tr(presentation, locale)}</p>
          </Reveal>
        </Block>

        <Block n="02" title={d.about.history}>
          <Reveal>
            <p className="text-lg leading-relaxed text-ink/70">{tr(historyText, locale)}</p>
            <div className="mt-4">
              <Placeholder>{d.common.placeholderNote}</Placeholder>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <p className="text-sm font-semibold text-ink/50">{d.about.timeline} · 2026 — 2027</p>
            <ol className="relative mt-6 space-y-8 border-s border-ink/15 ps-8">
              {timeline.map((a) => (
                <li key={a.slug} className="relative">
                  <span className="absolute -start-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent ring-1 ring-accent" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent rtl:tracking-normal">{formatDate(a.date, locale)}</p>
                  <Link href={`/${locale}/activities/${a.slug}`} className="mt-1 block font-display text-2xl font-light hover:text-accent">
                    {tr(a.title, locale)}
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </Block>

        <Block n="03" title={d.about.mission}>
          <div className="space-y-6">
            {missionParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "font-display text-2xl font-light leading-snug md:text-3xl" : "text-lg leading-relaxed text-ink/70"}>{tr(p, locale)}</p>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block n="04" title={d.about.vision}>
          <Reveal>
            <blockquote className="border-s-4 border-accent ps-6 font-display text-2xl font-light italic leading-snug md:text-3xl">{tr(vision, locale)}</blockquote>
            {!visionValidated && (
              <div className="mt-5">
                <Placeholder>{d.about.proposed}</Placeholder>
              </div>
            )}
          </Reveal>
        </Block>

        <Block n="05" title={d.about.values}>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={i} delay={i * 0.06} className="group bg-white p-7 transition-colors hover:bg-ink hover:text-white">
                <span className="text-xs tabular-nums text-accent">0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-light">{tr(v.title, locale)}</h3>
                <p className="mt-2 text-sm text-ink/60 transition-colors group-hover:text-white/60">{tr(v.text, locale)}</p>
              </Reveal>
            ))}
          </ul>
          {!valuesValidated && (
            <div className="mt-5">
              <Placeholder>{d.about.proposed}</Placeholder>
            </div>
          )}
        </Block>
      </section>

      <section className="bg-ink py-24 text-white md:py-32">
        <div className="container grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Image src={site.logo} alt="Logo Enactus FSJES Souissi" width={420} height={255} className="h-auto w-[280px] md:w-[420px]" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <Eyebrow light>
              <span className="text-accent">06</span>
              {d.about.network}
            </Eyebrow>
            <p className="mt-6 font-display text-3xl font-light leading-snug md:text-4xl">{d.footer.affiliation}</p>
            <p className="mt-6 leading-relaxed text-white/60">{tr(missionParagraphs[1], locale)}</p>
            <div className="mt-8">
              <Button href={site.enactusMoroccoUrl} external variant="outline-light">
                Enactus Morocco
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
