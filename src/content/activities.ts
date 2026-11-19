/**
 * ACTIVITÉS — chaque activité possède sa propre page (/[langue]/activities/[slug]).
 * Pour ajouter une activité :
 *   1. créez un dossier /public/images/activities/<slug>/ et déposez-y les photos ;
 *   2. copiez un bloc ci-dessous et adaptez les champs ;
 *   3. les plus récentes s'affichent en premier (tri automatique par date).
 */
import type { L } from "@/i18n/config";

export type ActivityCategory = "formation" | "evenement" | "atelier" | "competition" | "cohesion";

export type Activity = {
  slug: string;
  category: ActivityCategory;
  date: string; // AAAA-MM-JJ
  time?: string;
  place: L;
  title: L;
  subtitle?: L;
  cover: string;
  poster?: string;
  excerpt: L;
  description: L[];
  objectives: L[];
  speakers: Array<{ name: string; role: L }>;
  gallery: Array<{ src: string; alt: L }>;
  video?: { src: string; poster: string };
};

export const categoryLabels: Record<ActivityCategory, L> = {
  formation: { fr: "Formation", en: "Training", ar: "تكوين" },
  evenement: { fr: "Événement", en: "Event", ar: "فعالية" },
  atelier: { fr: "Atelier", en: "Workshop", ar: "ورشة" },
  competition: { fr: "Compétition", en: "Competition", ar: "مسابقة" },
  cohesion: { fr: "Cohésion", en: "Team-building", ar: "تماسك" },
};

const sdg = "/images/activities/sdg-in-action";

const rawActivities: Activity[] = [
  {
    slug: "need-assessment-1-sdg-in-action",
    category: "formation",
    date: "2026-11-07",
    place: { fr: "FSJES Souissi, Rabat", en: "FSJES Souissi, Rabat", ar: "كلية السويسي، الرباط" },
    title: { fr: "Need Assessment 1 — SDG in Action", en: "Need Assessment 1 — SDG in Action", ar: "تقييم الحاجيات 1 — SDG in Action" },
    subtitle: {
      fr: "Avec Souha Belmahi, experte en ESG et développement durable",
      en: "With Souha Belmahi, ESG and sustainable development expert",
      ar: "مع Souha Belmahi، خبيرة في ESG والتنمية المستدامة",
    },
    cover: `${sdg}/photo-01.jpg`,
    poster: `${sdg}/affiche.png`,
    excerpt: {
      fr: "Première session de need assessment de la saison : comprendre les Objectifs de développement durable pour mieux identifier les besoins réels.",
      en: "The season's first need-assessment session: understanding the Sustainable Development Goals to better identify real needs.",
      ar: "أول جلسة لتقييم الحاجيات هذا الموسم: فهم أهداف التنمية المستدامة لرصد الحاجيات الحقيقية بشكل أفضل.",
    },
    description: [
      {
        fr: "Le 7 novembre 2026, Enactus FSJES Souissi a ouvert son cycle de need assessments avec « SDG in Action », animé par Souha Belmahi, experte en ESG et développement durable.",
        en: "On 7 November 2026, Enactus FSJES Souissi opened its need-assessment cycle with “SDG in Action”, led by Souha Belmahi, an ESG and sustainable development expert.",
        ar: "في 7 نونبر 2026، افتتح فريق Enactus FSJES Souissi سلسلة تقييم الحاجيات بجلسة «SDG in Action» من تأطير Souha Belmahi، الخبيرة في ESG والتنمية المستدامة.",
      },
      {
        fr: "Au programme : une présentation des Objectifs de développement durable et de leurs interactions, des échanges avec les participants, puis un travail en groupes suivi de restitutions. La séance s'est conclue par une remise de certificat.",
        en: "The programme included a presentation of the Sustainable Development Goals and how they interconnect, open discussion with participants, then group work followed by presentations. The session closed with a certificate ceremony.",
        ar: "تضمّن البرنامج عرضاً حول أهداف التنمية المستدامة وتفاعلاتها، ونقاشاً مع المشاركين، ثم عملاً في مجموعات تلته عروض. واختُتمت الجلسة بتسليم شهادة.",
      },
    ],
    objectives: [
      { fr: "Comprendre les 17 Objectifs de développement durable", en: "Understand the 17 Sustainable Development Goals", ar: "فهم أهداف التنمية المستدامة السبعة عشر" },
      { fr: "Relier les ODD aux besoins de notre environnement", en: "Connect the SDGs to the needs around us", ar: "ربط أهداف التنمية المستدامة بحاجيات محيطنا" },
      { fr: "Poser les bases de l'identification de nos futurs projets", en: "Lay the groundwork for identifying our future projects", ar: "وضع أسس تحديد مشاريعنا المستقبلية" },
    ],
    speakers: [
      { name: "Souha Belmahi", role: { fr: "Experte en ESG et développement durable", en: "ESG & sustainable development expert", ar: "خبيرة في ESG والتنمية المستدامة" } },
    ],
    gallery: [
      { src: `${sdg}/photo-01.jpg`, alt: { fr: "Présentation des ODD au tableau", en: "Presenting the SDGs on screen", ar: "عرض أهداف التنمية المستدامة" } },
      { src: `${sdg}/photo-02.jpg`, alt: { fr: "L'intervenante face aux participants", en: "The speaker addressing participants", ar: "المتدخلة أمام المشاركين" } },
      { src: `${sdg}/photo-03.jpg`, alt: { fr: "Échanges avec les participants", en: "Discussion with participants", ar: "نقاش مع المشاركين" } },
      { src: `${sdg}/photo-04.jpg`, alt: { fr: "Prise de parole d'un participant", en: "A participant speaking", ar: "مداخلة أحد المشاركين" } },
      { src: `${sdg}/photo-05.jpg`, alt: { fr: "Restitution d'un groupe", en: "A group presenting its work", ar: "عرض إحدى المجموعات" } },
      { src: `${sdg}/photo-06.jpg`, alt: { fr: "Lecture des conclusions", en: "Reading the conclusions", ar: "قراءة الخلاصات" } },
      { src: `${sdg}/photo-07.jpg`, alt: { fr: "Travail en groupes", en: "Group work", ar: "العمل في مجموعات" } },
      { src: `${sdg}/photo-08.jpg`, alt: { fr: "Remise de certificat", en: "Certificate ceremony", ar: "تسليم الشهادة" } },
    ],
    video: { src: "/videos/need-assessment-1-sdg-in-action.mp4", poster: "/videos/sdg-poster.jpg" },
  },
  {
    slug: "ceremonie-ouverture-2026",
    category: "evenement",
    date: "2026-11-11",
    time: "14:00",
    place: {
      fr: "Faculté des Sciences Juridiques, Économiques et Sociales Souissi",
      en: "Faculty of Legal, Economic and Social Sciences Souissi",
      ar: "كلية العلوم القانونية والاقتصادية والاجتماعية السويسي",
    },
    title: { fr: "Cérémonie d'ouverture", en: "Opening Ceremony", ar: "حفل الافتتاح" },
    subtitle: { fr: "Jeunes leaders et rigueur académique", en: "Young leaders and academic rigour", ar: "قادة شباب وصرامة أكاديمية" },
    cover: "/images/activities/ceremonie-ouverture/affiche.png",
    poster: "/images/activities/ceremonie-ouverture/affiche.png",
    excerpt: {
      fr: "Enactus FSJES Souissi vous prépare une cérémonie qui promet inspiration, découvertes et moments forts !",
      en: "Enactus FSJES Souissi has prepared a ceremony promising inspiration, discoveries and memorable moments!",
      ar: "يُحضّر لكم فريق Enactus FSJES Souissi حفلاً يعد بالإلهام والاكتشافات ولحظات قوية!",
    },
    description: [
      {
        fr: "Enactus FSJES Souissi vous prépare une cérémonie qui promet inspiration, découvertes et moments forts ! Le 11 novembre 2026 à 14h, la cérémonie d'ouverture de la saison réunit trois intervenants autour du thème « Jeunes leaders et rigueur académique ».",
        en: "Enactus FSJES Souissi has prepared a ceremony promising inspiration, discoveries and memorable moments! On 11 November 2026 at 2 pm, the season's opening ceremony brings together three speakers around the theme “Young leaders and academic rigour”.",
        ar: "يُحضّر لكم فريق Enactus FSJES Souissi حفلاً يعد بالإلهام والاكتشافات ولحظات قوية! يوم 11 نونبر 2026 على الساعة الثانية بعد الزوال، يجمع حفل افتتاح الموسم ثلاثة متدخلين حول موضوع «قادة شباب وصرامة أكاديمية».",
      },
      {
        fr: "Entrepreneuriat social, ingénierie et psychologie : trois parcours, trois regards sur le leadership des jeunes. Many surprises await you!",
        en: "Social entrepreneurship, engineering and psychology: three journeys, three perspectives on youth leadership. Many surprises await you!",
        ar: "ريادة الأعمال الاجتماعية والهندسة وعلم النفس: ثلاثة مسارات وثلاث رؤى حول قيادة الشباب. مفاجآت كثيرة في انتظاركم!",
      },
    ],
    objectives: [
      { fr: "Lancer officiellement la saison 2026 — 2027", en: "Officially launch the 2026 — 2027 season", ar: "الإطلاق الرسمي لموسم 2026 — 2027" },
      { fr: "Inspirer les étudiants par des parcours de leaders", en: "Inspire students through leaders' journeys", ar: "إلهام الطلبة عبر مسارات قادة" },
      { fr: "Présenter Enactus et son approche à la communauté de la faculté", en: "Introduce Enactus and its approach to the faculty community", ar: "تقديم Enactus ومقاربتها لمجتمع الكلية" },
    ],
    speakers: [
      { name: "Abdelghani Halhoul", role: { fr: "Social Entrepreneur", en: "Social Entrepreneur", ar: "رائد أعمال اجتماعي" } },
      { name: "Marouane Hagouch", role: { fr: "Software Engineer chez Cegid Atlas", en: "Software Engineer at Cegid Atlas", ar: "مهندس برمجيات لدى Cegid Atlas" } },
      { name: "Sami Chakour", role: { fr: "Psychologue clinicien et acteur de la société", en: "Clinical psychologist and civil society actor", ar: "أخصائي نفسي إكلينيكي وفاعل مجتمعي" } },
    ],
    gallery: [],
  },
  {
    slug: "need-assessment-problem-solving",
    category: "atelier",
    date: "2026-11-13",
    time: "10:00",
    place: { fr: "Cité d'Innovation, Rabat", en: "Cité d'Innovation, Rabat", ar: "مدينة الابتكار، الرباط" },
    title: { fr: "Need Assessment — Problem Solving", en: "Need Assessment — Problem Solving", ar: "تقييم الحاجيات — حل المشكلات" },
    subtitle: { fr: "Avec Abaakil Wail", en: "With Abaakil Wail", ar: "مع Abaakil Wail" },
    cover: "/images/activities/problem-solving/affiche.png",
    poster: "/images/activities/problem-solving/affiche.png",
    excerpt: {
      fr: "Un atelier pour apprendre à analyser un problème, en comprendre les causes et construire des solutions.",
      en: "A workshop on analysing a problem, understanding its causes and building solutions.",
      ar: "ورشة لتعلّم تحليل المشكلة وفهم أسبابها وبناء الحلول.",
    },
    description: [
      {
        fr: "Vendredi 13 novembre 2026 à 10h, à la Cité d'Innovation, Enactus FSJES Souissi a poursuivi son cycle de need assessments avec une session consacrée au problem solving, animée par Abaakil Wail.",
        en: "On Friday 13 November 2026 at 10 am, at the Cité d'Innovation, Enactus FSJES Souissi continued its need-assessment cycle with a problem-solving session led by Abaakil Wail.",
        ar: "يوم الجمعة 13 نونبر 2026 على الساعة العاشرة صباحاً، بمدينة الابتكار، واصل فريق Enactus FSJES Souissi سلسلة تقييم الحاجيات بجلسة حول حل المشكلات من تأطير Abaakil Wail.",
      },
    ],
    objectives: [
      { fr: "Structurer l'analyse d'un problème", en: "Structure problem analysis", ar: "هيكلة تحليل المشكلة" },
      { fr: "Distinguer symptômes et causes profondes", en: "Distinguish symptoms from root causes", ar: "التمييز بين الأعراض والأسباب العميقة" },
      { fr: "Préparer l'idéation de nos projets", en: "Prepare ideation for our projects", ar: "التحضير لتوليد أفكار مشاريعنا" },
    ],
    speakers: [{ name: "Abaakil Wail", role: { fr: "Intervenant", en: "Speaker", ar: "متدخل" } }],
    gallery: [],
  },
];

export const activities = [...rawActivities].sort((a, b) => b.date.localeCompare(a.date));

export function getActivity(slug: string) {
  return activities.find((a) => a.slug === slug);
}
