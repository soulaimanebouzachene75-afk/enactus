import type { Metadata } from "next";
import { shareImage } from "@/lib/seo";
import Image from "@/components/Img";
import { PageHero, Eyebrow, Placeholder, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { MemberCard } from "@/components/MemberCard";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { team, groupPhoto } from "@/content/team";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = getDictionary(locale).team.title;
  return { title, ...shareImage(locale, "team", title) };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const groups = [
    { key: "executive", title: d.team.executive, n: "01" },
    { key: "leads", title: d.team.leads, n: "02" },
  ] as const;

  return (
    <>
      <PageHero eyebrow="Enactus FSJES Souissi" title={d.team.title} lead={d.team.lead} crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: d.team.title }]} />

      <section className="lux-glow bg-ink pb-24 text-white">
        <div className="container">
          <Reveal>
            <figure>
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[1.75rem] border border-gold/30 shadow-[0_40px_120px_-30px_rgba(132,22,138,0.7)]">
                <Image src={groupPhoto} alt={d.team.groupCaption} fill sizes="(min-width: 768px) 448px, 100vw" className="object-cover" priority />
              </div>
              <figcaption className="mt-5 text-center text-sm text-white/50">{d.team.groupCaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {groups.map((g) => {
        const members = team.filter((m) => m.group === g.key);
        return (
          <section key={g.key} className="py-20 md:py-28 [&+section]:border-t [&+section]:border-ink/10">
            <div className="container">
              <Reveal>
                <Eyebrow>
                  <span className="text-accent">{g.n}</span>
                  {g.title}
                </Eyebrow>
              </Reveal>
              <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((m, i) => (
                  <Reveal as="li" key={m.id} delay={(i % 3) * 0.08}>
                    <MemberCard member={m} locale={locale} placeholderLabel={d.team.vacant} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="border-t border-ink/10 bg-bone py-20 md:py-28">
        <div className="container grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <Eyebrow>
              <span className="text-accent">03</span>
              {d.team.members}
            </Eyebrow>
            <p className="mt-6 font-display text-3xl font-light leading-snug md:text-4xl">{d.team.membersText}</p>
            <div className="mt-6">
              <Placeholder>{d.common.placeholderNote}</Placeholder>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:justify-self-end">
            <Button href={`/${locale}/join`}>{d.nav.join}</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
