import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { site } from "@/content/site";

/**
 * Image de partage (WhatsApp, LinkedIn, Facebook…) propre à chaque page et langue.
 * Les images sont dans public/og/ (générées par scripts/generate-og-images.py).
 */
const tagline: Record<Locale, string> = {
  fr: "Think. Create. Impact. — Section universitaire d'Enactus Morocco à la FSJES Souissi, Rabat.",
  en: "Think. Create. Impact. — Enactus Morocco university chapter at FSJES Souissi, Rabat.",
  ar: "Think. Create. Impact. — فرع جامعي لـ Enactus Morocco بكلية السويسي، الرباط.",
};

export function shareImage(locale: Locale, key: string, title?: string, description?: string): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `${site.url}/og/${locale}-${key}.jpg`;
  const t = title && title !== site.name ? `${title} · ${site.name}` : `${site.name} — Think. Create. Impact.`;
  const desc = description ?? tagline[locale];
  return {
    openGraph: { title: t, description: desc, images: [{ url, width: 1200, height: 630, alt: t }], siteName: site.name, locale, type: "website" },
    twitter: { card: "summary_large_image", title: t, description: desc, images: [url] },
  };
}
