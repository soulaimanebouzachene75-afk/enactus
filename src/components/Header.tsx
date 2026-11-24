"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Globe, Search } from "lucide-react";
import { Logo } from "./Logo";
import { InstagramIcon } from "./icons";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { navItems } from "@/lib/nav";

function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  parts[1] = to;
  return parts.join("/") || `/${to}`;
}

export function LanguageSwitcher({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}`;
  return (
    <div className={cn("flex items-center gap-0.5 rounded-full border border-gold/25 p-1", className)} role="group" aria-label={label}>
      <Globe className="mx-1 hidden h-3.5 w-3.5 text-white/50 sm:block" aria-hidden />
      {locales.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          hrefLang={localeMeta[l].htmlLang}
          lang={localeMeta[l].htmlLang}
          aria-current={l === locale ? "true" : undefined}
          title={localeMeta[l].label}
          className={cn(
            "min-w-8 rounded-full px-2.5 py-1 text-center text-xs font-semibold transition",
            l === locale ? "bg-gold text-ink" : "text-white/70 hover:text-white",
          )}
        >
          {localeMeta[l].short}
        </Link>
      ))}
    </div>
  );
}

export function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const pathname = usePathname() || "";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const items = navItems(locale, d);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        {d.nav.skip}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "bg-ink/85 py-3 shadow-[0_1px_0_rgba(248,192,18,0.18)] backdrop-blur-xl" : "bg-transparent py-5",
        )}
      >
        <div className="container flex items-center justify-between gap-6">
          <Logo href={`/${locale}`} />

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-0.5 2xl:gap-1">
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    aria-current={isActive(it.href) ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13.5px] font-medium transition-colors 2xl:px-3.5",
                      isActive(it.href) ? "text-white" : "text-white/65 hover:text-white",
                    )}
                  >
                    {it.label}
                    {isActive(it.href) && (
                      <motion.span layoutId="nav-dot" className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-accent" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 2xl:gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("enx-search"))}
              className="hidden h-10 shrink-0 items-center gap-2 rounded-full border border-gold/25 px-3 text-xs text-white/70 transition hover:border-gold hover:text-white sm:inline-flex"
              aria-label={d.extra.search}
            >
              <Search className="h-4 w-4" />
              <kbd className="hidden whitespace-nowrap font-sans text-[10px] text-white/45 2xl:inline">Ctrl K</kbd>
            </button>
            <LanguageSwitcher locale={locale} label={d.nav.language} />
            <Link
              href={`/${locale}/join`}
              className="hidden whitespace-nowrap rounded-full bg-gold px-5 py-2.5 text-[13.5px] font-semibold text-ink shadow-[0_8px_30px_-10px_rgba(248,192,18,0.6)] transition hover:bg-gold-200 md:inline-flex"
            >
              {d.nav.join}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 xl:hidden"
              aria-label={d.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={d.nav.menu}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container flex items-center justify-between py-5">
              <Logo href={`/${locale}`} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20"
                aria-label={d.nav.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container flex-1 overflow-y-auto pb-10 pt-6">
              <ul className="space-y-1">
                {[{ href: `/${locale}`, label: d.nav.home }, ...items].map((it, i) => (
                  <motion.li
                    key={it.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                  >
                    <Link
                      href={it.href}
                      className="flex items-baseline gap-4 border-b border-white/10 py-3 font-display text-3xl font-light transition hover:text-accent sm:text-4xl"
                    >
                      <span className="font-sans text-xs tabular-nums text-accent">0{i + 1}</span>
                      {it.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href={`/${locale}/join`} className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink">
                  {d.nav.join}
                </Link>
                <LanguageSwitcher locale={locale} label={d.nav.language} />
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => window.dispatchEvent(new Event("enx-search")), 350);
                  }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20"
                  aria-label={d.extra.search}
                >
                  <Search className="h-5 w-5" />
                </button>
                <a href={site.socials[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20" aria-label="Instagram">
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
