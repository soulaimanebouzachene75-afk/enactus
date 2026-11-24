/**
 * ─────────────────────────────────────────────────────────────
 *  INFORMATIONS GÉNÉRALES DU SITE — modifiez librement ce fichier.
 *  Les champs marqués `placeholder: true` s'affichent avec un
 *  badge « À compléter » tant qu'ils ne sont pas renseignés.
 * ─────────────────────────────────────────────────────────────
 */
import type { L } from "@/i18n/config";
import { activities } from "./activities";
import { team } from "./team";
import { poles } from "./poles";

export const site = {
  name: "Enactus FSJES Souissi",
  // Adresse publique du site (utilisée pour les aperçus de partage et le plan du site).
  // Si vous passez à un nom de domaine, remplacez-la ici.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://soulaimanebouzachene75-afk.github.io/enactus",
  logo: "/images/brand/logo-enactus-fsjes-souissi.png",
  heroImage: "/images/team/equipe.jpg",

  contact: {
    address: {
      fr: "Faculté des Sciences Juridiques, Économiques et Sociales Souissi\nAvenue Mohammed Ben Abdallah Ragragui, Madinat Al Irfane\nBP 6430 — Rabat, Maroc",
      en: "Faculty of Legal, Economic and Social Sciences Souissi\nAvenue Mohammed Ben Abdallah Ragragui, Madinat Al Irfane\nPO Box 6430 — Rabat, Morocco",
      ar: "كلية العلوم القانونية والاقتصادية والاجتماعية السويسي\nشارع محمد بن عبد الله الركراكي، مدينة العرفان\nص.ب 6430 — الرباط، المغرب",
    } satisfies L,
    // E-mail et téléphone du club : laisser vide ("") tant qu'ils ne sont pas communiqués.
    email: "",
    phone: "",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=FSJES+Souissi+Rabat",
  },

  socials: [
    { name: "Instagram", handle: "@enactus.fsjes.souissi", url: "https://www.instagram.com/enactus.fsjes.souissi/" },
    // Ajoutez ici LinkedIn, Facebook, TikTok… quand les comptes existent :
    // { name: "LinkedIn", handle: "Enactus FSJES Souissi", url: "https://www.linkedin.com/company/..." },
  ],

  enactusMoroccoUrl: "https://enactus.ma",
};

/**
 * Chiffres clés. Par défaut, ils sont CALCULÉS à partir des contenus
 * publiés (aucun chiffre inventé). Vous pouvez remplacer `value`
 * par un nombre fixe validé par le bureau (ex. nombre de membres).
 */
export const keyFigures: Array<{ value: number; suffix?: string; label: L }> = [
  {
    value: activities.length,
    label: { fr: "activités organisées en novembre 2026", en: "activities held in November 2026", ar: "أنشطة نُظّمت في نونبر 2026" },
  },
  {
    value: new Set(activities.flatMap((a) => a.speakers.map((s) => s.name))).size,
    label: { fr: "intervenant·e·s invité·e·s", en: "guest speakers", ar: "متدخلون ضيوف" },
  },
  {
    value: team.filter((m) => !m.placeholder).length,
    label: { fr: "responsables au bureau", en: "board members & leads", ar: "مسؤولون في المكتب" },
  },
  {
    value: poles.length,
    label: { fr: "pôles opérationnels", en: "operational departments", ar: "أقطاب عملية" },
  },
];
