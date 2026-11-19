# Guide de mise à jour des contenus

Ce guide s'adresse aux membres de l'équipe qui ne sont pas développeurs. Chaque modification se fait dans **un seul fichier texte** de `src/content/`. Après enregistrement, `npm run dev` affiche le résultat immédiatement. Une fois en ligne, poussez la modification sur GitHub : Vercel republie le site.

> Règle d'or : chaque texte existe en trois langues, `{ fr: "…", en: "…", ar: "…" }`. Remplissez toujours les trois.

---

## Ajouter une activité

1. Créez le dossier `public/images/activities/mon-activite/` et déposez-y l'affiche et les photos, par exemple `affiche.png`, `photo-01.jpg`, `photo-02.jpg`. Les photos font idéalement 1600 px de large, en JPG.
2. Ouvrez `src/content/activities.ts`, copiez un bloc `{ slug: …, … }` et collez-le dans la liste `rawActivities`.
3. Modifiez les champs :
   - `slug` : identifiant unique sans espace ni accent (`atelier-pitch-2027`). Il devient l'adresse de la page.
   - `category` : `formation`, `evenement`, `atelier`, `competition` ou `cohesion`.
   - `date` : format `AAAA-MM-JJ`. Les activités se classent automatiquement de la plus récente à la plus ancienne.
   - `cover` : l'image de couverture. `poster` : l'affiche officielle (facultative).
   - `gallery` : la liste des photos, avec une courte description (`alt`) dans les trois langues.
   - `video` (facultatif) : `{ src: "/videos/ma-video.mp4", poster: "/videos/ma-video.jpg" }`.
4. Enregistrez : la carte apparaît sur l'accueil et dans « Nos activités », et sa page détaillée est créée.

**Ajouter des photos à une activité existante** (ex. la cérémonie d'ouverture) : déposez les fichiers dans son dossier, puis ajoutez des lignes dans son tableau `gallery: []`.

## Modifier l'équipe

`src/content/team.ts`
- Remplacer un poste « À compléter » : renseignez `name` et `photo`, puis supprimez la ligne `placeholder: true`.
- Ajouter une personne : copiez un bloc. Utilisez `group: "executive"` pour le bureau exécutif et `"leads"` pour les responsables de pôles.
- Photos : déposez-les dans `public/images/team/`. Pour un rendu homogène, préférez un format portrait 4:5.

## Pôles

`src/content/poles.ts` : nom, description, missions, et `leads`, c'est-à-dire les `id` des responsables définis dans `team.ts`. Vous pouvez ajouter, supprimer ou renommer des pôles. Leur nombre se met à jour dans les chiffres clés.

## Projets

`src/content/projects.ts` contient pour l'instant un **modèle provisoire**. Quand un projet est validé :
1. Remplacez chaque `tbd` par le vrai texte dans les trois langues : problématique, solution, bénéficiaires, objectifs, modèle économique, impact.
2. Dans `sdgs`, listez les numéros des ODD concernés, par exemple `[4, 8, 13]`.
3. Supprimez `placeholder: true`.

## Partenaires

`src/content/partners.ts` : déposez le **logo original** (PNG transparent ou SVG) dans `public/images/partners/`, puis ajoutez `logo: "/images/partners/nom.png"`. Les logos s'affichent en `object-contain` : jamais déformés ni recadrés. N'ajoutez que des partenaires réels et confirmés.

## Coordonnées, réseaux sociaux, chiffres clés

`src/content/site.ts`
- `email` et `phone` : laissés vides, ils affichent « À compléter ».
- `socials` : ajoutez LinkedIn, Facebook ou TikTok sur le modèle de la ligne Instagram.
- `keyFigures` : les chiffres sont calculés automatiquement. Pour afficher un chiffre validé par le bureau (ex. le nombre de membres), remplacez `value: …` par un nombre, par exemple `value: 45`.

## Qui sommes-nous

`src/content/about.ts`
- `historyText` : l'histoire de l'équipe (date de création, fondateurs, étapes).
- `vision` et `values` sont des **propositions**. Une fois validées par le bureau, passez `visionValidated` et `valuesValidated` à `true` pour retirer le badge.

## Textes d'interface

Boutons, menus et messages des formulaires se trouvent dans `src/i18n/dictionaries/fr.ts`, `en.ts` et `ar.ts`. Les trois fichiers ont la même structure.

## Remplacer les visuels par des fichiers en haute définition

Les visuels actuels de l'équipe et des affiches proviennent de captures d'écran d'Instagram. Certains portent encore, dans un coin, la pastille du compte et l'icône de repartage. Pour un rendu parfait, remplacez-les par les exports originaux du pôle Communication, **sous le même nom de fichier**. Aucune autre modification n'est nécessaire.
