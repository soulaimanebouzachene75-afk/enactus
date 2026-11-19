"use client";

import Image from "@/components/Img";
import { useEffect, useState } from "react";
import { InstagramIcon } from "./icons";
import { site } from "@/content/site";

export type IgPost = { id: string; image: string; caption: string; permalink: string; remote?: boolean };

/**
 * Bloc Instagram.
 * - Si INSTAGRAM_ACCESS_TOKEN est configuré côté serveur, /api/instagram
 *   renvoie les derniers posts réels du compte et ils s'affichent ici.
 * - Sinon (ou en mode statique), on affiche les visuels officiels déjà
 *   publiés sur le compte, chacun renvoyant vers le profil Instagram.
 */
export function InstagramFeed({ fallback, followLabel }: { fallback: IgPost[]; followLabel: string }) {
  const [posts, setPosts] = useState<IgPost[]>(fallback);
  const profile = site.socials.find((s) => s.name === "Instagram")!;

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") return;
    let cancelled = false;
    fetch("/api/instagram")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { posts?: IgPost[] } | null) => {
        if (!cancelled && data?.posts?.length) setPosts(data.posts.slice(0, 6).map((p) => ({ ...p, remote: true })));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {posts.map((p) => (
          <li key={p.id}>
            <a
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl bg-ink/5"
              aria-label={p.caption || "Instagram"}
            >
              {p.remote ? (
                // Images distantes Instagram (CDN) : balise img simple
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <Image src={p.image} alt={p.caption} fill sizes="(min-width:1024px) 16vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <InstagramIcon className="h-8 w-8 text-white" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
      >
        <InstagramIcon className="h-5 w-5" />
        <span dir="ltr">{followLabel}</span>
      </a>
    </div>
  );
}
