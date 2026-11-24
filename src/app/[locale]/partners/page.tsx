import type { Metadata } from "next";
import { shareImage } from "@/lib/seo";
import Image from "@/components/Img";
import { ExternalLink } from "lucide-react";
import { PageHero, Placeholder, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { tr, type Locale } from "@/i18n/config";
import { partners, partnerTypeLabels } from "@/content/partners";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = getDictionary(locale).partners.title;
  return { title, ...shareImage(locale, "partners", title) };
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const p = d.partners;

  return (
    <>
      <PageHero eyebrow="Enactus FSJES Souissi" title={p.title} lead={p.lead} crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: p.title }]} />

      <section className="py-20 md:py-28">
        <div className="container">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {partners.map((pt, i) => (
              <Reveal as="li" key={pt.id} delay={i * 0.06}>
                <article className="group grid gap-8 py-12 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-4">
                    <div className="flex aspect-[3/2] items-center justify-center rounded-2xl bg-bone p-8 transition group-hover:bg-white group-hover:shadow-[0_20px_60px_-30px_rgba(16,16,16,0.4)]">
                      {pt.logo ? (
                        <Image src={pt.logo} alt={pt.name} width={240} height={160} className="h-auto max-h-full w-auto object-contain" />
                      ) : (
                        <div className="text-center">
                          <p className="font-display text-2xl font-light">{pt.name}</p>
                          <div className="mt-3">
                            <Placeholder>{p.logoPending}</Placeholder>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-7 md:col-start-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent rtl:tracking-normal">{tr(partnerTypeLabels[pt.type], locale)}</span>
                    <h2 className="mt-3 font-display text-3xl font-light md:text-4xl">{pt.name}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-ink/65">{tr(pt.description, locale)}</p>
                    {pt.url && (
                      <a href={pt.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent" dir="ltr">
                        {pt.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-24 text-white md:py-32">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <h2 className="h-display text-5xl md:text-7xl">{p.becomeTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{p.becomeText}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:justify-self-end">
            <Button href={`/${locale}/contact`}>{p.becomeCta}</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
