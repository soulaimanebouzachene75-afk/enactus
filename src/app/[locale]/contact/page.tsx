import type { Metadata } from "next";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { PageHero, Eyebrow, Placeholder } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/Forms";
import { InstagramIcon } from "@/components/icons";
import { getDictionary } from "@/i18n/dictionaries";
import { tr, type Locale } from "@/i18n/config";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale).contact.title };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const c = d.contact;

  return (
    <>
      <PageHero eyebrow="Enactus FSJES Souissi" title={c.title} lead={c.lead} crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: c.title }]} />

      <section className="py-20 md:py-28">
        <div className="container grid gap-16 lg:grid-cols-12">
          <aside className="space-y-10 lg:col-span-4">
            <Reveal>
              <h2 className="flex items-center gap-3 text-sm font-semibold"><MapPin className="h-5 w-5 text-accent" />{c.address}</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-ink/70">{tr(site.contact.address, locale)}</p>
              <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-[6px]">
                Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="flex items-center gap-3 text-sm font-semibold"><Mail className="h-5 w-5 text-accent" />{c.email}</h2>
              <div className="mt-4">
                {site.contact.email ? (
                  <a href={`mailto:${site.contact.email}`} className="text-ink/70 hover:text-accent" dir="ltr">{site.contact.email}</a>
                ) : (
                  <Placeholder>{d.common.placeholder}</Placeholder>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="flex items-center gap-3 text-sm font-semibold"><Phone className="h-5 w-5 text-accent" />{c.phone}</h2>
              <div className="mt-4">
                {site.contact.phone ? (
                  <a href={`tel:${site.contact.phone}`} className="text-ink/70 hover:text-accent" dir="ltr">{site.contact.phone}</a>
                ) : (
                  <Placeholder>{d.common.placeholder}</Placeholder>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="text-sm font-semibold">{c.socials}</h2>
              <ul className="mt-4 space-y-3">
                {site.socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-ink/10 p-4 transition hover:border-accent">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white transition group-hover:bg-violet">
                        <InstagramIcon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{s.name}</span>
                        <span className="block text-sm text-ink/55" dir="ltr">{s.handle}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>

          <div className="lg:col-span-8">
            <Reveal className="rounded-3xl bg-bone p-6 sm:p-10 md:p-12">
              <Eyebrow>{c.formTitle}</Eyebrow>
              <div className="mt-10">
                <ContactForm d={d} locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
