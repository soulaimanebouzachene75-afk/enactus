"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, CalendarDays, Mail, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * Barre de navigation façon application, visible uniquement sur téléphone.
 * Le bouton central doré mène au formulaire de candidature.
 */
export function MobileTabBar({ locale, d }: { locale: Locale; d: Dictionary }) {
  const pathname = usePathname() || "";
  const items = [
    { href: `/${locale}`, label: d.tabs.home, icon: Home, exact: true },
    { href: `/${locale}/team`, label: d.tabs.team, icon: Users },
    { href: `/${locale}/join`, label: d.tabs.join, icon: Sparkles, primary: true },
    { href: `/${locale}/activities`, label: d.tabs.activities, icon: CalendarDays },
    { href: `/${locale}/contact`, label: d.tabs.contact, icon: Mail },
  ];
  const active = (href: string, exact?: boolean) => (exact ? pathname === href || pathname === href + "/" : pathname.startsWith(href));

  return (
    <nav
      aria-label="Navigation mobile"
      className="dark-scope fixed inset-x-3 bottom-3 z-40 rounded-[1.4rem] border border-gold/20 bg-ink/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_20px_60px_-15px_rgba(18,8,20,0.8)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-5 items-end">
        {items.map((it) => {
          const Icon = it.icon;
          const on = active(it.href, it.exact);
          if (it.primary)
            return (
              <li key={it.href} className="flex justify-center">
                <Link
                  href={it.href}
                  aria-current={on ? "page" : undefined}
                  className="-mt-7 flex flex-col items-center gap-1 text-[10.5px] font-semibold text-gold"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_10px_30px_-6px_rgba(248,192,18,0.7)] ring-4 ring-ink">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="max-w-[4.5rem] truncate">{it.label}</span>
                </Link>
              </li>
            );
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl py-1.5 text-[10.5px] font-medium transition",
                  on ? "text-gold" : "text-white/55",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="max-w-[4.5rem] truncate">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
