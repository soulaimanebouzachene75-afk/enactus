import Link from "next/link";
import Image from "@/components/Img";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return <p className={cn("eyebrow", light ? "text-white/70" : "text-ink/60", className)}>{children}</p>;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  light,
  className,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  light?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <Reveal className="md:col-span-8">
        <Eyebrow light={light}>
          {index && <span className="tabular-nums text-accent">{index}</span>}
          {eyebrow}
        </Eyebrow>
        <h2 className={cn("h-section mt-5 text-balance", light ? "text-white" : "text-ink")}>{title}</h2>
      </Reveal>
      {children && <Reveal delay={0.1} className="md:col-span-4 md:justify-self-end">{children}</Reveal>}
    </div>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "light" | "dark" | "outline-light" | "outline-dark";
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "gold", className, external }: BtnProps) {
  const styles = {
    gold: "bg-gold text-ink hover:bg-gold-200 shadow-[0_10px_40px_-12px_rgba(248,192,18,0.55)]",
    light: "bg-white text-ink hover:bg-bone",
    dark: "bg-ink text-white hover:bg-violet",
    "outline-light": "border border-gold/40 text-white hover:border-gold hover:bg-gold/10",
    "outline-dark": "border border-ink/20 text-ink hover:border-ink",
  }[variant];
  const cls = cn(
    "group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300",
    styles,
    className,
  );
  const icon = <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" aria-hidden />;
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {icon}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

export function TextLink({ href, children, light }: { href: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-[6px] transition-colors",
        light ? "text-white hover:text-accent" : "text-ink hover:text-accent",
      )}
    >
      {children}
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden />
    </Link>
  );
}

/** Badge visible pour tout contenu provisoire. */
export function Placeholder({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1 text-xs font-medium",
        light ? "border-white/40 text-white/70" : "border-ink/30 text-ink/60",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden />
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Array<{ label: string; href?: string }>;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="lux-glow relative overflow-hidden bg-ink pb-14 pt-32 text-white md:pb-24 md:pt-44">
      <div className="moucharabieh pointer-events-none absolute inset-0" aria-hidden />
      <div className="line-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -top-40 end-[-10%] h-[520px] w-[520px] rounded-full bg-violet/40 blur-[120px]" aria-hidden />
      <div className="container relative grid gap-10 md:grid-cols-12 md:items-end">
        <div className={image ? "md:col-span-8" : "md:col-span-10"}>
          <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-white/50">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/80">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 rtl:rotate-180" aria-hidden />}
              </span>
            ))}
          </nav>
          <Reveal>
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h1 className="h-display mt-6 text-balance text-[2.75rem] md:text-7xl lg:text-8xl">{title}</h1>
            <div className="gold-rule mt-8 max-w-xs" aria-hidden />
          </Reveal>
          {lead && (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:mt-8 md:text-xl">{lead}</p>
            </Reveal>
          )}
        </div>
        {image && (
          <Reveal delay={0.15} className="md:col-span-4">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[1.5rem] border border-gold/30">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" priority />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
