/**
 * TEXTES « QUI SOMMES-NOUS ».
 * Mission et présentation : textes officiels fournis par l'équipe.
 * Vision et valeurs : PROPOSITIONS rédigées à partir de ces textes,
 * affichées avec le badge « Proposition à valider » tant que
 * `visionValidated` / `valuesValidated` restent à false.
 */
import type { L } from "@/i18n/config";

export const presentation: L = {
  fr: "Enactus FSJES Souissi est une équipe de jeunes étudiants motivés, ambitieux et engagés, qui souhaitent transformer les idées en solutions concrètes à travers l'entrepreneuriat social, l'innovation et le développement durable.",
  en: "Enactus FSJES Souissi is a team of motivated, ambitious and committed young students who want to turn ideas into concrete solutions through social entrepreneurship, innovation and sustainable development.",
  ar: "Enactus FSJES Souissi فريق من الطلبة الشباب المتحمسين والطموحين والملتزمين، يسعون إلى تحويل الأفكار إلى حلول ملموسة عبر ريادة الأعمال الاجتماعية والابتكار والتنمية المستدامة.",
};

export const missionParagraphs: L[] = [
  {
    fr: "Enactus Morocco est une ONG qui a pour mission de révéler le potentiel entrepreneurial des jeunes en les accompagnant à la création d'impact durable et inclusif.",
    en: "Enactus Morocco is an NGO whose mission is to unlock young people's entrepreneurial potential by supporting them in creating sustainable and inclusive impact.",
    ar: "Enactus Morocco منظمة غير حكومية مهمتها إطلاق الطاقات الريادية لدى الشباب من خلال مواكبتهم في خلق أثر مستدام وشامل.",
  },
  {
    fr: "Œuvrant dans le domaine de l'entrepreneuriat social et du développement durable, Enactus développe des partenariats entre le monde des affaires, les acteurs institutionnels et ceux de l'enseignement supérieur, afin de préparer les jeunes à contribuer substantiellement au développement de leur pays en tant que leaders entrepreneurs, éthiques et socialement responsables.",
    en: "Working in social entrepreneurship and sustainable development, Enactus builds partnerships between business, institutions and higher education to prepare young people to contribute substantially to their country's development as ethical, socially responsible entrepreneurial leaders.",
    ar: "تعمل Enactus في مجال ريادة الأعمال الاجتماعية والتنمية المستدامة، وتطوّر شراكات بين عالم المقاولات والفاعلين المؤسساتيين ومؤسسات التعليم العالي، من أجل إعداد الشباب للمساهمة الفعلية في تنمية بلدهم كقادة رياديين أخلاقيين ومسؤولين اجتماعياً.",
  },
];

export const historyText: L = {
  fr: "Date de création, fondateurs, grandes étapes et distinctions de l'équipe : cette section sera complétée par le bureau.",
  en: "Founding date, founders, milestones and awards: this section will be completed by the board.",
  ar: "تاريخ التأسيس، المؤسسون، المحطات الكبرى والتتويجات: سيستكمل المكتب هذا القسم.",
};

export const visionValidated = false;
export const vision: L = {
  fr: "Devenir, au sein de la FSJES Souissi, un laboratoire d'entrepreneuriat social où chaque étudiant peut transformer une idée en solution à impact pour sa communauté.",
  en: "To become, within FSJES Souissi, a social entrepreneurship lab where every student can turn an idea into an impactful solution for their community.",
  ar: "أن نصبح، داخل كلية السويسي، مختبراً لريادة الأعمال الاجتماعية حيث يستطيع كل طالب تحويل فكرة إلى حل ذي أثر لمجتمعه.",
};

export const valuesValidated = false;
export const values: Array<{ title: L; text: L }> = [
  {
    title: { fr: "Engagement", en: "Commitment", ar: "الالتزام" },
    text: { fr: "Agir avec constance pour la communauté.", en: "Acting consistently for the community.", ar: "العمل بثبات من أجل المجتمع." },
  },
  {
    title: { fr: "Innovation", en: "Innovation", ar: "الابتكار" },
    text: { fr: "Chercher des solutions nouvelles à des problèmes réels.", en: "Seeking new solutions to real problems.", ar: "البحث عن حلول جديدة لمشكلات حقيقية." },
  },
  {
    title: { fr: "Éthique", en: "Ethics", ar: "الأخلاق" },
    text: { fr: "Entreprendre de façon responsable et transparente.", en: "Doing business responsibly and transparently.", ar: "المقاولة بمسؤولية وشفافية." },
  },
  {
    title: { fr: "Durabilité", en: "Sustainability", ar: "الاستدامة" },
    text: { fr: "Concevoir un impact qui dure dans le temps.", en: "Designing impact that lasts.", ar: "تصميم أثر يدوم في الزمن." },
  },
  {
    title: { fr: "Inclusion", en: "Inclusion", ar: "الشمول" },
    text: { fr: "Ne laisser personne de côté.", en: "Leaving no one behind.", ar: "عدم إقصاء أي أحد." },
  },
];
