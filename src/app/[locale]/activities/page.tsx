import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ActivitiesExplorer } from "@/components/ActivitiesExplorer";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { activities } from "@/content/activities";
import { instagramFallback } from "@/content/instagram";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale).activities.title };
}

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const d = getDictionary(locale);
  return (
    <>
      <PageHero eyebrow="Enactus FSJES Souissi" title={d.activities.title} lead={d.activities.lead} crumbs={[{ label: d.nav.home, href: `/${locale}` }, { label: d.activities.title }]} />
      <section className="py-20 md:py-28">
        <div className="container">
          <ActivitiesExplorer activities={activities} locale={locale} allLabel={d.activities.all} />
        </div>
      </section>
      <section className="border-t border-ink/10 bg-bone py-20 md:py-28">
        <div className="container">
          <Reveal>
            <h2 className="h-section">{d.home.instagramTitle}</h2>
          </Reveal>
          <div className="mt-10">
            <InstagramFeed fallback={instagramFallback(locale)} followLabel={d.instagram.follow} />
          </div>
        </div>
      </section>
    </>
  );
}
