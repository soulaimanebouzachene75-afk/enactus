import type { Metadata } from "next";
import { PageHero, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { JoinForm } from "@/components/Forms";
import { getDictionary } from "@/i18n/dictionaries";
import { tr, type Locale } from "@/i18n/config";
import { poles } from "@/content/poles";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale).join.title };
}

export default async function JoinPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);

  return (
    <>
      <PageHero eyebrow="Think. Create. Impact." title={d.join.title} lead={d.join.lead} crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: d.join.title }]} />

      <section className="py-20 md:py-28">
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>
                <span className="text-accent">01</span>
                {d.join.why}
              </Eyebrow>
            </Reveal>
            <ul className="mt-10 space-y-8">
              {d.join.whyItems.map(([title, text], i) => (
                <Reveal as="li" key={title} delay={i * 0.06} className="border-s-2 border-accent ps-5">
                  <h3 className="font-display text-2xl font-light">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <Reveal className="rounded-3xl bg-bone p-6 sm:p-10 md:p-12">
              <Eyebrow>
                <span className="text-accent">02</span>
                {d.join.formTitle}
              </Eyebrow>
              <div className="mt-10">
                <JoinForm d={d} locale={locale} poles={poles.map((p) => tr(p.name, locale))} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
