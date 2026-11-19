import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function navItems(locale: Locale, d: Dictionary) {
  return [
    { href: `/${locale}/about`, label: d.nav.about },
    { href: `/${locale}/team`, label: d.nav.team },
    { href: `/${locale}/poles`, label: d.nav.poles },
    { href: `/${locale}/projects`, label: d.nav.projects },
    { href: `/${locale}/activities`, label: d.nav.activities },
    { href: `/${locale}/partners`, label: d.nav.partners },
    { href: `/${locale}/contact`, label: d.nav.contact },
  ];
}
