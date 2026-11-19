/**
 * ÉQUIPE — un objet par personne.
 * - `photo` : chemin d'une image placée dans /public/images/team/
 * - `placeholder: true` : poste non encore renseigné (affiché « À compléter »)
 * - `group` : "executive" (bureau exécutif) | "leads" (responsables des pôles)
 * Pour ajouter un membre : copiez un bloc, changez les valeurs, enregistrez.
 */
import type { L } from "@/i18n/config";

export type Member = {
  id: string;
  name: string;
  role: L;
  group: "executive" | "leads";
  photo?: string;
  pole?: string; // id d'un pôle (voir poles.ts)
  placeholder?: boolean;
};

export const team: Member[] = [
  {
    id: "hiba-derkaoui",
    name: "Hiba Derkaoui",
    role: { fr: "Team Leader · Présidente", en: "Team Leader · President", ar: "قائدة الفريق · الرئيسة" },
    group: "executive",
    photo: "/images/team/hiba-derkaoui.jpg",
  },
  {
    id: "hiba-ouaali",
    name: "Hiba Ouaali",
    role: { fr: "Vice Team Leader · Vice-présidente", en: "Vice Team Leader · Vice President", ar: "نائبة قائدة الفريق" },
    group: "executive",
    photo: "/images/team/hiba-ouaali.jpg",
  },
  {
    id: "secretaire-general",
    name: "—",
    role: { fr: "Secrétaire général·e", en: "General Secretary", ar: "الكاتب(ة) العام(ة)" },
    group: "executive",
    placeholder: true,
  },
  {
    id: "hiba-kriat",
    name: "Hiba Kriat",
    role: { fr: "Vice-présidente Communication", en: "Vice President, Communication", ar: "نائبة الرئيسة مكلفة بالتواصل" },
    group: "leads",
    pole: "communication",
    photo: "/images/team/hiba-kriat.jpg",
  },
  {
    id: "safae-mouhsini",
    name: "Safae Mouhsini",
    role: { fr: "Vice-présidente Ressources humaines", en: "Vice President, Human Resources", ar: "نائبة الرئيسة مكلفة بالموارد البشرية" },
    group: "leads",
    pole: "rh",
    photo: "/images/team/safae-mouhsini.jpg",
  },
  {
    id: "hajji-mohammed-hassan",
    name: "Hajji Mohammed Hassan",
    role: { fr: "Vice-président Finance & Événementiel", en: "Vice President, Finance & Events", ar: "نائب الرئيسة مكلف بالمالية والفعاليات" },
    group: "leads",
    pole: "finance",
    photo: "/images/team/hajji-mohammed-hassan.jpg",
  },
  {
    id: "regragui-yasser",
    name: "Regragui Yasser",
    role: { fr: "Project Manager", en: "Project Manager", ar: "مدير المشاريع" },
    group: "leads",
    pole: "projets",
    photo: "/images/team/regragui-yasser.jpg",
  },
  {
    id: "mssaadi-el-mahdi",
    name: "Mssaadi El Mahdi",
    role: { fr: "Community Manager", en: "Community Manager", ar: "مسيّر المجتمع الرقمي" },
    group: "leads",
    pole: "communication",
    photo: "/images/team/mssaadi-el-mahdi.jpg",
  },
  {
    id: "resp-partenariats",
    name: "—",
    role: { fr: "Responsable Partenariats", en: "Partnerships Lead", ar: "مسؤول(ة) الشراكات" },
    group: "leads",
    pole: "partenariats",
    placeholder: true,
  },
];

/** Photo de groupe de l'équipe (les membres n'y sont pas nommés individuellement). */
export const groupPhoto = "/images/team/equipe.jpg";
