export const locales = ["fr", "ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeMeta: Record<Locale, { label: string; short: string; dir: "ltr" | "rtl"; htmlLang: string }> = {
  fr: { label: "Français", short: "FR", dir: "ltr", htmlLang: "fr" },
  ar: { label: "العربية", short: "ع", dir: "rtl", htmlLang: "ar" },
  en: { label: "English", short: "EN", dir: "ltr", htmlLang: "en" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Texte traduit dans les trois langues. */
export type L = Record<Locale, string>;

export function tr(value: L | string, locale: Locale): string {
  return typeof value === "string" ? value : value[locale] ?? value.fr;
}
