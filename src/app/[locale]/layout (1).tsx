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
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { asset } from "@/lib/utils";

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
    icons: { icon: asset(site.logo) },
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `/${x}`])) },
    openGraph: { title: site.name, description: descriptions[l], images: [asset(site.heroImage)], locale: l, type: "website" },
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
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body>
        <Header locale={locale} d={d} />
        <main id="main">{children}</main>
        <Footer locale={locale} d={d} />
        <MobileTabBar locale={locale} d={d} />
      </body>
    </html>
  );
}
