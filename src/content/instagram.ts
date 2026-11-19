/**
 * Visuels affichés dans le bloc Instagram quand le flux automatique
 * n'est pas configuré. Ce sont des visuels officiels publiés par le compte ;
 * chaque vignette renvoie vers le profil Instagram.
 */
import type { IgPost } from "@/components/InstagramFeed";
import { tr, type Locale } from "@/i18n/config";
import { site } from "./site";
import { activities } from "./activities";

export function instagramFallback(locale: Locale): IgPost[] {
  const profile = site.socials.find((s) => s.name === "Instagram")!.url;
  const fromActivities = activities
    .filter((a) => a.poster)
    .map((a) => ({ id: a.slug, image: a.poster!, caption: tr(a.title, locale), permalink: profile }));
  const portraits = [
    { id: "hiba-derkaoui", image: "/images/team/hiba-derkaoui.jpg", caption: "Hiba Derkaoui — Team Leader" },
    { id: "hiba-kriat", image: "/images/team/hiba-kriat.jpg", caption: "Hiba Kriat — Communication" },
    { id: "mssaadi", image: "/images/team/mssaadi-el-mahdi.jpg", caption: "Mssaadi El Mahdi — Community Manager" },
  ].map((p) => ({ ...p, permalink: profile }));
  return [...fromActivities, ...portraits].slice(0, 6);
}
