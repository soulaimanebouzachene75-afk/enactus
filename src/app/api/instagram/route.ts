import { NextResponse } from "next/server";

export const revalidate = 3600; // rafraîchi au plus toutes les heures

type IgMedia = { id: string; caption?: string; media_type: string; media_url: string; thumbnail_url?: string; permalink: string };

/**
 * Derniers posts du compte Instagram via l'API Instagram (Graph).
 * Nécessite INSTAGRAM_ACCESS_TOKEN (compte professionnel/créateur).
 * Sans jeton : renvoie une liste vide → le site affiche les visuels officiels.
 */
export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return NextResponse.json({ posts: [], configured: false });
  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=12&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Instagram ${res.status}`);
    const json = (await res.json()) as { data: IgMedia[] };
    const posts = json.data.map((m) => ({
      id: m.id,
      image: m.media_type === "VIDEO" ? m.thumbnail_url || m.media_url : m.media_url,
      caption: (m.caption || "").slice(0, 140),
      permalink: m.permalink,
    }));
    return NextResponse.json({ posts, configured: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ posts: [], configured: true, error: "fetch_failed" });
  }
}
