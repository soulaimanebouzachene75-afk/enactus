import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink pt-32 text-white">
      <div className="container">
        <p className="eyebrow text-white/60">404</p>
        <h1 className="h-display mt-6 text-6xl md:text-8xl">Page introuvable</h1>
        <p className="mt-6 text-white/60">Page not found · الصفحة غير موجودة</p>
        <Link href="/fr" className="mt-10 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink">Retour à l&apos;accueil</Link>
      </div>
    </section>
  );
}
