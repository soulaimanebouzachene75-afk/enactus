/**
 * PARTENAIRES — uniquement des organisations réelles.
 * `logo` : déposez le fichier ORIGINAL (png/svg) dans /public/images/partners/
 * puis renseignez son chemin. Sans logo, une carte typographique s'affiche.
 * Les logos sont affichés avec `object-contain` : jamais déformés ni recadrés.
 */
import type { L } from "@/i18n/config";

export type Partner = {
  id: string;
  name: string;
  type: "network" | "institution" | "corporate" | "foundation";
  logo?: string;
  url?: string;
  description: L;
};

export const partnerTypeLabels: Record<Partner["type"], L> = {
  network: { fr: "Réseau", en: "Network", ar: "الشبكة" },
  institution: { fr: "Institution", en: "Institution", ar: "مؤسسة" },
  corporate: { fr: "Entreprise", en: "Company", ar: "مقاولة" },
  foundation: { fr: "Fondation", en: "Foundation", ar: "مؤسسة خيرية" },
};

export const partners: Partner[] = [
  {
    id: "enactus-morocco",
    name: "Enactus Morocco",
    type: "network",
    url: "https://enactus.ma",
    description: {
      fr: "ONG qui révèle le potentiel entrepreneurial des jeunes et les accompagne dans la création d'un impact durable et inclusif. Enactus FSJES Souissi en est une section universitaire.",
      en: "NGO that unlocks young people's entrepreneurial potential and supports them in creating sustainable, inclusive impact. Enactus FSJES Souissi is one of its university chapters.",
      ar: "منظمة غير حكومية تُطلق الطاقات الريادية للشباب وتواكبهم في خلق أثر مستدام وشامل. ويُعد Enactus FSJES Souissi أحد فروعها الجامعية.",
    },
  },
  {
    id: "fsjes-souissi",
    name: "FSJES Souissi",
    type: "institution",
    logo: "/images/partners/fsjes-souissi.png",
    url: "https://fsjes-souissi.um5.ac.ma/",
    description: {
      fr: "Faculté des Sciences Juridiques, Économiques et Sociales Souissi, établissement d'accueil de l'équipe.",
      en: "Faculty of Legal, Economic and Social Sciences Souissi, the team's host institution.",
      ar: "كلية العلوم القانونية والاقتصادية والاجتماعية السويسي، المؤسسة الحاضنة للفريق.",
    },
  },
  {
    id: "um5",
    name: "Université Mohammed V de Rabat",
    type: "institution",
    logo: "/images/partners/universite-mohammed-v-rabat.png",
    url: "https://www.um5.ac.ma/",
    description: {
      fr: "Université de rattachement de la FSJES Souissi.",
      en: "The university to which FSJES Souissi belongs.",
      ar: "الجامعة التي تنتمي إليها كلية السويسي.",
    },
  },
];
