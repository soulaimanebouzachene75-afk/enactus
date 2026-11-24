import type { Metadata } from "next";
import { shareImage } from "@/lib/seo";
import Image from "@/components/Img";
import { Check } from "lucide-react";
import { PageHero, Placeholder, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { poleIcons } from "@/components/icons";
import { getDictionary } from "@/i18n/dictionaries";
import { tr, type Locale } from "@/i18n/config";
import { poles } from "@/content/poles";
import { team } from "@/content/team";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = getDictionary(locale).poles.title;
  return { title, ...shareImage(locale, "poles", title) };
}

export default async function PolesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);

  return (
    <>
      <PageHero eyebrow="Enactus FSJES Souissi" title={d.poles.title} lead={d.poles.lead} crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: d.poles.title }]} />

      <section className="py-20 md:py-28">
        <div className="container">
          <ul className="grid gap-6 md:grid-cols-2">
            {poles.map((p, i) => {
              const Icon = poleIcons[p.icon];
              const leads = p.leads.map((id) => team.find((m) => m.id === id)).filter(Boolean);
              return (
                <Reveal as="li" key={p.id} delay={(i % 2) * 0.08}>
                  <article id={p.id} className="group flex h-full scroll-mt-28 flex-col rounded-3xl border border-ink/10 p-8 transition duration-500 hover:border-ink hover:shadow-[0_30px_80px_-40px_rgba(16,16,16,0.5)] md:p-10">
                    <div className="flex items-start justify-between gap-6">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-accent transition group-hover:bg-gold group-hover:text-ink">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-5xl font-light text-ink/10">0{i + 1}</span>
                    </div>
                    <h2 className="mt-8 font-display text-3xl font-light md:text-4xl">{tr(p.name, locale)}</h2>
                    <p className="mt-3 text-ink/65">{tr(p.description, locale)}</p>
                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-ink/45 rtl:tracking-normal">{d.poles.missions}</p>
                    <ul className="mt-4 space-y-2.5">
                      {p.missions.map((m, k) => (
                        <li key={k} className="flex gap-3 text-sm text-ink/75">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                          {tr(m, locale)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <div className="flex flex-wrap items-center gap-4 border-t border-ink/10 pt-6">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45 rtl:tracking-normal">{d.poles.lead_label}</span>
                        {leads.map((m) =>
                          m!.placeholder ? (
                            <Placeholder key={m!.id}>{d.team.vacant}</Placeholder>
                          ) : (
                            <span key={m!.id} className="inline-flex items-center gap-3">
                              {m!.photo && (
                                <span className="relative h-9 w-9 overflow-hidden rounded-full bg-bone">
                                  <Image src={m!.photo} alt="" fill sizes="36px" className="object-cover" />
                                </span>
                              )}
                              <span className="text-sm">
                                <span className="font-semibold">{m!.name}</span>
                                <span className="block text-xs text-ink/50">{tr(m!.role, locale)}</span>
                              </span>
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
          <Reveal className="mt-16 flex justify-center">
            <Button href={`/${locale}/join`}>{d.nav.join}</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
