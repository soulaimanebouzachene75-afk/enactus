import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource/pinyon-script/400.css";
import "@fontsource-variable/manrope/index.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { revealScript } from "@/components/Reveal";
import { Intro, introScript } from "@/components/Intro";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { CommandPalette, type SearchItem } from "@/components/CommandPalette";
import { PwaRegister } from "@/components/PwaRegister";
import { navItems } from "@/lib/nav";
import { activities } from "@/content/activities";
import { team } from "@/content/team";
import { poles } from "@/content/poles";
import { isLocale, locales, localeMeta, tr, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { asset } from "@/lib/utils";
import { shareImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const descriptions: Record<Locale, string> = {
  fr: "Enactus FSJES Souissi — section universitaire d'Enactus Morocco à Rabat. Entrepreneuriat social, innovation et développement durable. Think. Create. Impact.",
  en: "Enactus FSJES Souissi — Enactus Morocco university chapter in Rabat. Social entrepreneurship, innovation and sustainable development. Think. Create. Impact.",
  ar: "Enactus FSJES Souissi — فرع جامعي لـ Enactus Morocco بالرباط. ريادة الأعمال الاجتماعية والابتكار والتنمية المستدامة.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "fr") as Locale;
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — Think. Create. Impact.`, template: `%s · ${site.name}` },
    description: descriptions[l],
    icons: { icon: asset("/icons/icon-192.png"), apple: asset("/icons/apple-touch-icon.png") },
    manifest: asset("/manifest.webmanifest"),
    appleWebApp: { capable: true, title: "Enactus Souissi", statusBarStyle: "black-translucent" },
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}/`])) },
    ...shareImage(l, "home", site.name, descriptions[l]),
  };
}

export const viewport: Viewport = { themeColor: "#120814" };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const meta = localeMeta[locale];
  return (
    <html lang={meta.htmlLang} dir={meta.dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript + introScript }} />
      </head>
      <body>
        <Intro tagline="Think. Create. Impact." />
        <Header locale={locale} d={d} />
        <main id="main">{children}</main>
        <Footer locale={locale} d={d} />
        <MobileTabBar locale={locale} d={d} />
        <CommandPalette
          items={searchIndex(locale, d)}
          labels={{
            placeholder: d.extra.searchPlaceholder, hint: d.extra.searchHint, empty: d.extra.noResults,
            types: { page: d.extra.typePage, activity: d.extra.typeActivity, member: d.extra.typeMember, pole: d.extra.typePole },
          }}
        />
        <SmoothScroll />
        <Cursor />
        <PwaRegister />
      </body>
    </html>
  );
}

/** Index de la recherche rapide (Ctrl+K), construit à partir des contenus. */
function searchIndex(locale: Locale, d: ReturnType<typeof getDictionary>): SearchItem[] {
  return [
    { title: d.nav.home, href: `/${locale}`, type: "page" as const },
    ...navItems(locale, d).map((n) => ({ title: n.label, href: n.href, type: "page" as const })),
    { title: d.nav.join, href: `/${locale}/join`, type: "page" as const },
    ...activities.map((a) => ({ title: tr(a.title, locale), subtitle: a.subtitle ? tr(a.subtitle, locale) : undefined, href: `/${locale}/activities/${a.slug}`, type: "activity" as const })),
    ...team.filter((m) => !m.placeholder).map((m) => ({ title: m.name, subtitle: tr(m.role, locale), href: `/${locale}/team`, type: "member" as const })),
    ...poles.map((p) => ({ title: tr(p.name, locale), subtitle: tr(p.description, locale), href: `/${locale}/poles#${p.id}`, type: "pole" as const })),
  ];
}
