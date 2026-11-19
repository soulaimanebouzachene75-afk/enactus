import type { Metadata } from "next";
import Link from "next/link";
import { basePath } from "@/lib/utils";

export const metadata: Metadata = { title: "Enactus FSJES Souissi", robots: { index: false } };

/** La racine « / » renvoie vers la version française (langue par défaut). */
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${basePath}/fr/`} />
      <script dangerouslySetInnerHTML={{ __html: `(function(){var l=(navigator.language||'fr').slice(0,2);location.replace('${basePath}/'+(l==='ar'||l==='en'?l:'fr')+'/');})();` }} />
      <p style={{ fontFamily: "sans-serif", padding: 24 }}>
        <Link href="/fr">Enactus FSJES Souissi — Français</Link> · <Link href="/ar">العربية</Link> · <Link href="/en">English</Link>
      </p>
    </>
  );
}
