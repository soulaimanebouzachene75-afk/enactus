import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { activities } from "@/content/activities";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/team", "/poles", "/projects", "/activities", "/partners", "/join", "/contact", ...activities.map((a) => `/activities/${a.slug}`)];
  return locales.flatMap((l) => paths.map((p) => ({ url: `${site.url}/${l}${p}`, changeFrequency: "weekly" as const })));
}
