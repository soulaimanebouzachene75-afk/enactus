# Enactus FSJES Souissi — site officiel

Site institutionnel trilingue (français · العربية · English) d'**Enactus FSJES Souissi**, section universitaire d'Enactus Morocco à la Faculté des Sciences Juridiques, Économiques et Sociales Souissi (Rabat).

**Think. Create. Impact.**

---

## 1. Technologies

| Outil | Rôle |
|---|---|
| **Next.js 15** (App Router) | Pages, génération statique, routes API |
| **TypeScript 5** | Typage de tout le code et des contenus |
| **Tailwind CSS 3** | Design system luxe aux couleurs du logo : violet `#84168A`, or `#F8C012`, aubergine profond `#120814`, ivoire `#FBF8F2` |
| **Framer Motion** | Animations au défilement, menu mobile, galerie |
| **Lucide Icons** | Icônes |
| **Fontsource** | Polices hébergées localement : Bodoni Moda + Pinyon Script + Manrope (latin), Amiri + IBM Plex Sans Arabic (arabe) |

> ⚠️ Utilisez **TypeScript 5** (déjà fixé dans `package.json`). TypeScript 7 n'est pas compatible avec Next.js 15.

## 2. Installation

Prérequis : **Node.js 20 ou plus récent** et npm.

```bash
cd enactus-fsjes-souissi
npm install
cp .env.example .env.local   # facultatif : e-mail des formulaires, Instagram
```

## 3. Lancer le site en local

```bash
npm run dev
```

Ouvrez <http://localhost:3000> : vous êtes redirigé vers `/fr`. Les autres langues sont sur `/ar` et `/en`.

Version de production en local :

```bash
npm run build
npm start
```

Autres commandes : `npm run lint` (qualité du code), `npm run typecheck` (types).

## 4. Pages

| Page | Adresse (`fr` remplaçable par `ar` ou `en`) |
|---|---|
| Accueil | `/fr` |
| Qui sommes-nous | `/fr/about` |
| Notre équipe | `/fr/team` |
| Nos pôles | `/fr/poles` |
| Nos projets | `/fr/projects` |
| Nos activités | `/fr/activities` |
| Page détaillée d'une activité | `/fr/activities/<slug>` |
| Partenaires | `/fr/partners` |
| Nous rejoindre (candidature) | `/fr/join` |
| Contact | `/fr/contact` |

**Version téléphone** : barre de navigation façon application en bas d'écran (bouton doré « Rejoindre » au centre), carrousels à faire glisser pour le bureau et les activités, boutons pleine largeur. **Version ordinateur** : menu complet en haut, grilles éditoriales.

L'arabe est servi avec `dir="rtl"` : menus, grilles, flèches, marges et alignements s'inversent automatiquement.

## 5. Modifier les contenus

Tout le contenu éditable est dans **`src/content/`** — un fichier par sujet, avec des commentaires en tête. Voir le guide pas à pas : **[GUIDE-CONTENU.md](./GUIDE-CONTENU.md)**.

| Fichier | Contenu |
|---|---|
| `site.ts` | Nom, adresse, e-mail, téléphone, réseaux sociaux, chiffres clés |
| `team.ts` | Membres du bureau et responsables (nom, rôle, photo) |
| `poles.ts` | Pôles, missions, responsables |
| `activities.ts` | Activités : date, lieu, description, objectifs, intervenants, galerie, vidéo |
| `projects.ts` | Projets : problématique, solution, bénéficiaires, modèle économique, ODD, impact |
| `partners.ts` | Partenaires et leurs logos |
| `about.ts` | Présentation, histoire, mission, vision, valeurs |
| `instagram.ts` | Visuels affichés dans le bloc Instagram sans flux automatique |

Les textes d'interface (boutons, menus, libellés de formulaires) sont dans `src/i18n/dictionaries/fr.ts`, `ar.ts` et `en.ts`.

Les images vont dans `public/images/…` et la vidéo dans `public/videos/`.

## 6. Formulaires (contact et candidature)

Les deux formulaires valident les champs côté navigateur **et** côté serveur (`src/app/api/contact` et `src/app/api/join`), avec un champ piège anti-spam. Choisissez où arrivent les envois dans `.env.local` (ou dans les variables d'environnement de l'hébergeur) :

1. **Par e-mail via [Resend](https://resend.com)** (recommandé) : `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL`.
2. **Vers un webhook** (Google Apps Script → Google Sheets, Make, Zapier…) : `FORMS_WEBHOOK_URL`. Chaque envoi arrive en JSON.
3. **Sans configuration** : en local, les envois sont enregistrés dans `data/submissions.jsonl`.

## 7. Instagram

- Le compte [@enactus.fsjes.souissi](https://www.instagram.com/enactus.fsjes.souissi/) est relié dans le menu mobile, le pied de page, la page Contact, les pages Activités et un bloc dédié sur l'accueil.
- **Flux automatique (facultatif)** : avec un compte Instagram professionnel ou créateur, générez un jeton d'accès longue durée de l'API Instagram (Meta for Developers → votre app → Instagram → *API setup with Instagram login*) et renseignez `INSTAGRAM_ACCESS_TOKEN`. Les 6 derniers posts s'affichent alors automatiquement (rafraîchis toutes les heures). Ce jeton expire au bout de 60 jours : pensez à le renouveler.
- Sans jeton, le bloc affiche les visuels officiels déjà publiés, chacun renvoyant vers le profil.

## 8. Mise en ligne

> 📘 Guide pas à pas pour GitHub (GitHub Pages ou GitHub + Vercel) : **[HEBERGEMENT-GITHUB.md](./HEBERGEMENT-GITHUB.md)**.

### Option A — Vercel (recommandée, gratuite pour ce type de site)
1. Créez un dépôt GitHub et poussez-y ce dossier.
2. Sur <https://vercel.com>, cliquez sur **Add New → Project**, puis importez le dépôt. Vercel détecte Next.js tout seul.
3. Dans **Settings → Environment Variables**, ajoutez les variables de `.env.example` dont vous avez besoin (Resend ou webhook, Instagram).
4. Cliquez sur **Deploy**. Ajoutez votre domaine dans **Settings → Domains**, puis remplacez `url` dans `src/content/site.ts` par ce domaine.

Chaque modification poussée sur GitHub redéploie le site automatiquement.

### Option B — Netlify, Render ou un serveur Node
`npm run build` puis `npm start` (port 3000). Sur Netlify, le module Next.js officiel est appliqué automatiquement.

### Option C — Hébergement statique (sans serveur)
```bash
npm run build:static   # génère le dossier /out
```
Déposez le contenu de `out/` chez n'importe quel hébergeur de fichiers. Les routes API n'existent pas dans ce mode. Pour que les formulaires fonctionnent, créez un formulaire [Formspree](https://formspree.io) et renseignez `NEXT_PUBLIC_FORM_ENDPOINT` **avant** le build. Sans cette variable, ils affichent un message de mode aperçu.

## 9. Règles respectées

- **Logo officiel** affiché tel quel : fichier d'origine, proportions et couleurs intactes, posé sur un fond blanc pour rester lisible sur les zones sombres.
- **Photos réelles uniquement** : visuels officiels de l'équipe, affiches et images extraites de la vidéo « Need Assessment 1 — SDG in Action ». Aucune personne générée.
- **Aucun chiffre, partenaire, projet, membre ni témoignage inventé.** Les chiffres clés sont calculés à partir des contenus publiés. Tout contenu manquant porte un badge visible **« À compléter »** ou **« Proposition à valider »** (vision et valeurs).

## 10. Structure

```
enactus-fsjes-souissi/
├── public/
│   ├── images/brand/        logo officiel
│   ├── images/team/         visuels officiels des membres + photo d'équipe
│   ├── images/activities/   un dossier par activité (affiche + photos)
│   └── videos/              vidéo récapitulative (compressée pour le web)
├── src/
│   ├── app/
│   │   ├── (root)/          redirection « / » → langue
│   │   ├── [locale]/        toutes les pages, par langue
│   │   ├── api/             contact, join, instagram
│   │   ├── sitemap.ts · robots.ts
│   │   └── globals.css
│   ├── components/          composants réutilisables (Header, Footer, Gallery, Forms…)
│   ├── content/             ← CONTENUS À MODIFIER
│   ├── i18n/                langues + textes d'interface
│   └── lib/                 utilitaires, envoi des formulaires
├── .github/workflows/     publication automatique sur GitHub Pages
├── scripts/build-static.mjs
├── GUIDE-CONTENU.md
└── .env.example
```
