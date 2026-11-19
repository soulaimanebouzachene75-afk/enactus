/**
 * PROJETS — aucun projet n'a encore été communiqué : la liste contient
 * un modèle `placeholder: true`, affiché comme contenu provisoire.
 * Quand un projet est validé, remplacez-le (ou ajoutez-en un) en
 * renseignant tous les champs, puis passez `placeholder` à false.
 *
 * sdgs : numéros des Objectifs de développement durable (1 à 17).
 */
import type { L } from "@/i18n/config";

export type Project = {
  slug: string;
  name: L;
  status: L;
  cover?: string;
  problem: L;
  solution: L;
  beneficiaries: L;
  objectives: L[];
  businessModel: L;
  sdgs: number[];
  impact: L;
  placeholder?: boolean;
};

const tbd: L = {
  fr: "À compléter par le pôle Gestion des projets.",
  en: "To be completed by the Project management department.",
  ar: "يُستكمل من طرف قطب تدبير المشاريع.",
};

export const projects: Project[] = [
  {
    slug: "projet-2026-2027",
    placeholder: true,
    name: { fr: "Projet de la saison 2026 — 2027", en: "2026 — 2027 season project", ar: "مشروع موسم 2026 — 2027" },
    status: {
      fr: "En phase de need assessment",
      en: "Need-assessment phase",
      ar: "في مرحلة تقييم الحاجيات",
    },
    problem: tbd,
    solution: tbd,
    beneficiaries: tbd,
    objectives: [tbd],
    businessModel: tbd,
    sdgs: [],
    impact: tbd,
  },
];

/** Démarche Enactus, affichée sur la page Projets. */
export const projectProcess: Array<{ title: L; text: L }> = [
  {
    title: { fr: "Need assessment", en: "Need assessment", ar: "تقييم الحاجيات" },
    text: {
      fr: "Identifier sur le terrain un besoin réel et en comprendre les causes.",
      en: "Identify a real need in the field and understand its causes.",
      ar: "رصد حاجة حقيقية في الميدان وفهم أسبابها.",
    },
  },
  {
    title: { fr: "Idéation", en: "Ideation", ar: "توليد الأفكار" },
    text: {
      fr: "Imaginer des solutions avec les bénéficiaires, les mentors et les partenaires.",
      en: "Design solutions with beneficiaries, mentors and partners.",
      ar: "تصور الحلول مع المستفيدين والمؤطرين والشركاء.",
    },
  },
  {
    title: { fr: "Modèle durable", en: "Sustainable model", ar: "نموذج مستدام" },
    text: {
      fr: "Construire un modèle économique viable pour que l'impact dure.",
      en: "Build a viable business model so the impact lasts.",
      ar: "بناء نموذج اقتصادي قابل للاستمرار ليدوم الأثر.",
    },
  },
  {
    title: { fr: "Mesure d'impact", en: "Impact measurement", ar: "قياس الأثر" },
    text: {
      fr: "Mesurer les résultats et les présenter lors des compétitions Enactus.",
      en: "Measure results and present them at Enactus competitions.",
      ar: "قياس النتائج وعرضها خلال مسابقات Enactus.",
    },
  },
];

export const sdgNames: Record<number, string> = {
  1: "No poverty", 2: "Zero hunger", 3: "Good health", 4: "Quality education", 5: "Gender equality",
  6: "Clean water", 7: "Clean energy", 8: "Decent work", 9: "Industry & innovation", 10: "Reduced inequalities",
  11: "Sustainable cities", 12: "Responsible consumption", 13: "Climate action", 14: "Life below water",
  15: "Life on land", 16: "Peace & justice", 17: "Partnerships",
};
