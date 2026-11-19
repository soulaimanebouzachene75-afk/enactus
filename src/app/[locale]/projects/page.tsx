import type { Metadata } from "next";
import { PageHero, Eyebrow, Placeholder, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { tr, type Locale } from "@/i18n/config";
import { projects, projectProcess, sdgNames } from "@/content/projects";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale).projects.title };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const p = d.projects;

  return (
    <>
      <PageHero eyebrow="Enactus FSJES Souissi" title={p.title} lead={p.lead} crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: p.title }]} />

      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal>
            <Eyebrow>
              <span className="text-accent">01</span>
              {p.process}
            </Eyebrow>
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {projectProcess.map((s, i) => (
              <Reveal as="li" key={i} delay={i * 0.08} className="relative border-t-2 border-ink pt-6">
                <span className="absolute -top-[7px] start-0 h-3 w-3 rounded-full bg-accent" aria-hidden />
                <span className="text-xs tabular-nums text-ink/40">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-light">{tr(s.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{tr(s.text, locale)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-bone py-20 md:py-28">
        <div className="container space-y-10">
          {projects.map((pr, idx) => {
            const rows: Array<[string, string | string[]]> = [
              [p.problem, tr(pr.problem, locale)],
              [p.solution, tr(pr.solution, locale)],
              [p.beneficiaries, tr(pr.beneficiaries, locale)],
              [p.objectives, pr.objectives.map((o) => tr(o, locale))],
              [p.model, tr(pr.businessModel, locale)],
              [p.impact, tr(pr.impact, locale)],
            ];
            return (
              <Reveal key={pr.slug}>
                <article className="overflow-hidden rounded-3xl bg-white">
                  <header className="flex flex-wrap items-end justify-between gap-6 bg-ink p-8 text-white md:p-12">
                    <div>
                      <span className="text-xs tabular-nums text-accent">{String(idx + 1).padStart(2, "0")}</span>
                      <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">{tr(pr.name, locale)}</h2>
                      <p className="mt-3 text-white/60">{tr(pr.status, locale)}</p>
                    </div>
                    {pr.placeholder && <Placeholder light>{d.common.placeholderNote}</Placeholder>}
                  </header>
                  <dl className="grid gap-px bg-ink/10 md:grid-cols-2">
                    {rows.map(([label, value]) => (
                      <div key={label} className="bg-white p-8">
                        <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-accent rtl:tracking-normal">{label}</dt>
                        <dd className="mt-3 text-ink/70">
                          {Array.isArray(value) ? (
                            <ul className="list-inside list-disc space-y-1">
                              {value.map((v, i) => (
                                <li key={i}>{v}</li>
                              ))}
                            </ul>
                          ) : (
                            value
                          )}
                        </dd>
                      </div>
                    ))}
                    <div className="bg-white p-8 md:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-accent rtl:tracking-normal">{p.sdgs}</dt>
                      <dd className="mt-4 flex flex-wrap gap-2">
                        {pr.sdgs.length ? (
                          pr.sdgs.map((n) => (
                            <span key={n} className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white" dir="ltr">
                              ODD {n} · {sdgNames[n]}
                            </span>
                          ))
                        ) : (
                          <Placeholder>{d.common.placeholder}</Placeholder>
                        )}
                      </dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-20">
        <div className="container flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xl font-display text-3xl font-light">{d.home.joinTitle}</p>
          <Button href={`/${locale}/join`}>{d.nav.join}</Button>
        </div>
      </section>
    </>
  );
}
