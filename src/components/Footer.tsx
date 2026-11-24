import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Tilt } from "./Tilt";
import { InstagramIcon } from "./icons";
import { navItems } from "@/lib/nav";
import { site } from "@/content/site";
import { tr, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ locale, d }: { locale: Locale; d: Dictionary }) {
  const items = navItems(locale, d);
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="container pb-32 pt-20 md:pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Tilt max={12} glare={false} float className="inline-block">
              <Logo href={`/${locale}`} size="lg" />
            </Tilt>
            <p className="mt-8 font-display text-3xl italic text-gold-gradient md:text-4xl">{d.footer.tagline}</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">{d.footer.affiliation}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="eyebrow text-white/50">{d.footer.explore}</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {items.slice(0, 4).map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="text-white/75 transition hover:text-accent">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/50">{d.footer.engage}</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[...items.slice(4), { href: `/${locale}/join`, label: d.nav.join }].map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="text-white/75 transition hover:text-accent">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-white/50">{d.nav.contact}</p>
              <ul className="mt-5 space-y-4 text-sm text-white/75">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="whitespace-pre-line">{tr(site.contact.address, locale).split("\n").slice(1).join("\n")}</span>
                </li>
                {site.contact.email && (
                  <li className="flex gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <a href={`mailto:${site.contact.email}`} className="hover:text-accent">{site.contact.email}</a>
                  </li>
                )}
                {site.contact.phone && (
                  <li className="flex gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <a href={`tel:${site.contact.phone}`} dir="ltr" className="hover:text-accent">{site.contact.phone}</a>
                  </li>
                )}
                {site.socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-accent">
                      <InstagramIcon className="h-4 w-4 text-accent" />
                      <span dir="ltr">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 select-none overflow-hidden" aria-hidden>
          <p className="h-display whitespace-nowrap text-[9.5vw] leading-none text-white/[0.06] 2xl:text-[8.75rem]" dir="ltr">
            Think. Create. Impact.
          </p>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row">
          <p>
            © {year} {site.name}. {d.footer.rights}
          </p>
          <p>
            <a href={site.enactusMoroccoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Enactus Morocco
            </a>
            {" · "}FSJES Souissi · Rabat
          </p>
        </div>
      </div>
    </footer>
  );
}
