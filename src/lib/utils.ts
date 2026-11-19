import type { Locale } from "@/i18n/config";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const intlLocale: Record<Locale, string> = { fr: "fr-FR", en: "en-GB", ar: "ar-MA" };

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
    numberingSystem: "latn",
    timeZone: "Africa/Casablanca",
  }).format(new Date(iso + "T12:00:00"));
}

export function href(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

/**
 * Préfixe un fichier de /public avec le sous-chemin de publication
 * (ex. "/enactus-fsjes-souissi" sur GitHub Pages). Vide partout ailleurs.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function asset(path: string) {
  return path.startsWith("/") && !path.startsWith(basePath + "/") ? `${basePath}${path}` : path;
}
