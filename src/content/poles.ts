/**
 * PÔLES — adaptez la liste à l'organisation réelle du club.
 * `leads` contient les `id` des membres (voir team.ts).
 * Remarque : dans l'organigramme actuel, la Finance et l'Événementiel
 * sont pilotés par le même vice-président.
 */
import type { L } from "@/i18n/config";

export type Pole = {
  id: string;
  icon: "megaphone" | "users" | "handshake" | "calendar" | "target" | "wallet";
  name: L;
  description: L;
  missions: L[];
  leads: string[];
};

export const poles: Pole[] = [
  {
    id: "communication",
    icon: "megaphone",
    name: { fr: "Communication", en: "Communication", ar: "التواصل" },
    description: {
      fr: "Image de marque, contenus, réseaux sociaux et relations médias de l'équipe.",
      en: "Brand image, content, social media and media relations.",
      ar: "صورة العلامة، المحتوى، شبكات التواصل والعلاقات مع الإعلام.",
    },
    missions: [
      { fr: "Identité visuelle et affiches officielles", en: "Visual identity and official posters", ar: "الهوية البصرية والملصقات الرسمية" },
      { fr: "Animation d'Instagram et des réseaux", en: "Running Instagram and social channels", ar: "تنشيط إنستغرام وشبكات التواصل" },
      { fr: "Couverture photo et vidéo des activités", en: "Photo and video coverage of activities", ar: "التغطية المصورة للأنشطة" },
    ],
    leads: ["hiba-kriat", "mssaadi-el-mahdi"],
  },
  {
    id: "rh",
    icon: "users",
    name: { fr: "Ressources humaines", en: "Human resources", ar: "الموارد البشرية" },
    description: {
      fr: "Recrutement, intégration, suivi et cohésion des membres.",
      en: "Recruitment, onboarding, follow-up and team cohesion.",
      ar: "الاستقطاب، الإدماج، التتبع وتماسك الأعضاء.",
    },
    missions: [
      { fr: "Campagnes de recrutement et entretiens", en: "Recruitment campaigns and interviews", ar: "حملات الاستقطاب والمقابلات" },
      { fr: "Intégration des nouveaux membres", en: "Onboarding new members", ar: "إدماج الأعضاء الجدد" },
      { fr: "Activités de cohésion", en: "Team-building activities", ar: "أنشطة التماسك" },
    ],
    leads: ["safae-mouhsini"],
  },
  {
    id: "partenariats",
    icon: "handshake",
    name: { fr: "Partenariats", en: "Partnerships", ar: "الشراكات" },
    description: {
      fr: "Relations avec les entreprises, fondations et institutions.",
      en: "Relations with companies, foundations and institutions.",
      ar: "العلاقات مع المقاولات والمؤسسات والهيئات.",
    },
    missions: [
      { fr: "Prospection et suivi des partenaires", en: "Partner prospecting and follow-up", ar: "البحث عن الشركاء وتتبعهم" },
      { fr: "Dossiers de partenariat et sponsoring", en: "Partnership and sponsorship decks", ar: "ملفات الشراكة والرعاية" },
      { fr: "Mise en relation avec des mentors", en: "Connecting the team with mentors", ar: "ربط الفريق بالمؤطرين" },
    ],
    leads: ["resp-partenariats"],
  },
  {
    id: "evenementiel",
    icon: "calendar",
    name: { fr: "Événementiel", en: "Events", ar: "الفعاليات" },
    description: {
      fr: "Conception et logistique des cérémonies, formations et ateliers.",
      en: "Design and logistics of ceremonies, trainings and workshops.",
      ar: "تصميم ولوجستيك الحفلات والتكوينات والورشات.",
    },
    missions: [
      { fr: "Programmation des événements", en: "Event programming", ar: "برمجة الفعاليات" },
      { fr: "Accueil des intervenants", en: "Hosting guest speakers", ar: "استقبال المتدخلين" },
      { fr: "Logistique le jour J", en: "On-the-day logistics", ar: "اللوجستيك يوم الحدث" },
    ],
    leads: ["hajji-mohammed-hassan"],
  },
  {
    id: "projets",
    icon: "target",
    name: { fr: "Gestion des projets", en: "Project management", ar: "تدبير المشاريع" },
    description: {
      fr: "Need assessments, conception et pilotage des projets à impact.",
      en: "Need assessments, design and management of impact projects.",
      ar: "تقييم الحاجيات وتصميم وقيادة المشاريع ذات الأثر.",
    },
    missions: [
      { fr: "Identification des besoins sur le terrain", en: "Identifying needs in the field", ar: "رصد الحاجيات في الميدان" },
      { fr: "Conception des solutions et du modèle économique", en: "Designing solutions and business models", ar: "تصميم الحلول والنموذج الاقتصادي" },
      { fr: "Mesure de l'impact", en: "Impact measurement", ar: "قياس الأثر" },
    ],
    leads: ["regragui-yasser"],
  },
  {
    id: "finance",
    icon: "wallet",
    name: { fr: "Finance et administration", en: "Finance & administration", ar: "المالية والإدارة" },
    description: {
      fr: "Budget, trésorerie et suivi administratif de l'équipe.",
      en: "Budget, treasury and administrative follow-up.",
      ar: "الميزانية والخزينة والتتبع الإداري.",
    },
    missions: [
      { fr: "Budget prévisionnel et suivi des dépenses", en: "Budget planning and expense tracking", ar: "الميزانية التوقعية وتتبع المصاريف" },
      { fr: "Gestion administrative", en: "Administrative management", ar: "التدبير الإداري" },
      { fr: "Transparence financière", en: "Financial transparency", ar: "الشفافية المالية" },
    ],
    leads: ["hajji-mohammed-hassan"],
  },
];
