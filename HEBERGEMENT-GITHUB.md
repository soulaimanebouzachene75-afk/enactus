# Héberger le site avec GitHub — guide détaillé

Deux méthodes, au choix :

| | **Méthode 1 — GitHub Pages** | **Méthode 2 — GitHub + Vercel** (recommandée) |
|---|---|---|
| Coût | Gratuit | Gratuit (offre Hobby) |
| Adresse | `votre-compte.github.io/enactus-fsjes-souissi` | `enactus-fsjes-souissi.vercel.app` |
| Domaine personnalisé | Oui | Oui |
| Formulaires | Via Formspree (service externe gratuit) | Natifs : e-mail Resend ou Google Sheets |
| Flux Instagram automatique | Non (vignettes fixes) | Oui |
| Mise à jour | Automatique à chaque push | Automatique à chaque push |

Dans les deux cas, **le code est stocké sur GitHub**. Les étapes 1 à 3 sont communes.

---

## Étape 1 — Créer un compte GitHub

1. Allez sur <https://github.com/signup>.
2. Choisissez un nom d'utilisateur, de préférence celui du club, par exemple `enactus-fsjes-souissi`. Il apparaîtra dans l'adresse GitHub Pages.
3. Validez votre e-mail.

> Conseil : créez plutôt une **organisation** gratuite (icône de profil → *Your organizations* → *New organization* → *Free*). Ainsi, le site n'appartient pas à un seul membre et les prochains bureaux pourront en hériter.

## Étape 2 — Créer le dépôt (repository)

1. En haut à droite, cliquez sur **+** → **New repository**.
2. **Repository name** : `enactus-fsjes-souissi`.
3. **Public** : obligatoire pour GitHub Pages en offre gratuite. Vercel accepte aussi un dépôt privé.
4. Ne cochez **rien** d'autre (ni README, ni .gitignore, ni licence), car le projet les contient déjà.
5. Cliquez sur **Create repository**.

## Étape 3 — Envoyer les fichiers sur GitHub

Décompressez d'abord `enactus-fsjes-souissi.zip`.

### Option A — Sans ligne de commande (GitHub Desktop) — la plus simple
1. Installez **GitHub Desktop** : <https://desktop.github.com>, puis connectez-vous.
2. Menu **File → Add local repository…** → choisissez le dossier `enactus-fsjes-souissi`.
3. GitHub Desktop indique que ce n'est pas encore un dépôt : cliquez sur **create a repository**, puis sur **Create repository**.
4. Cliquez sur **Publish repository**. Décochez *Keep this code private* si vous choisissez GitHub Pages, puis validez.
   (Si vous avez déjà créé le dépôt à l'étape 2, utilisez plutôt **Repository → Repository settings → Remote** et collez son adresse `https://github.com/<compte>/enactus-fsjes-souissi.git`, puis **Push origin**.)

### Option B — En ligne de commande (Git)
Installez Git (<https://git-scm.com>), ouvrez un terminal **dans le dossier du projet**, puis :

```bash
git init
git add .
git commit -m "Site Enactus FSJES Souissi"
git branch -M main
git remote add origin https://github.com/<votre-compte>/enactus-fsjes-souissi.git
git push -u origin main
```

GitHub demande alors de vous connecter (navigateur ou *Personal access token*).

> ⚠️ **Ne passez pas par « Upload files » sur le site GitHub.** Le dossier `.github` (caché) ne serait pas envoyé, et la publication automatique ne fonctionnerait pas. Le glisser-déposer est aussi limité à 100 fichiers par envoi.

✅ Vérification : sur la page du dépôt, vous devez voir les dossiers `.github`, `public` et `src`, ainsi que `package.json`, `README.md`… Le dossier `node_modules` ne doit **pas** y figurer : c'est normal, il est exclu.

---

## Méthode 1 — Publier avec GitHub Pages

Le projet contient déjà le fichier d'automatisation `.github/workflows/deploy-github-pages.yml`. À chaque envoi sur la branche `main`, il construit le site et le publie.

1. Dans votre dépôt : **Settings → Pages**. Le menu Pages se trouve dans la colonne de gauche, rubrique *Code and automation*.
2. Sous **Build and deployment → Source**, choisissez **GitHub Actions**.
3. Ouvrez l'onglet **Actions**. Le workflow **« Déployer sur GitHub Pages »** démarre (sinon : cliquez dessus → **Run workflow**). Comptez 2 à 3 minutes.
4. Quand la pastille est verte ✅, revenez dans **Settings → Pages** : l'adresse du site s'affiche.
   `https://<votre-compte>.github.io/enactus-fsjes-souissi/`

Le sous-chemin `/enactus-fsjes-souissi` est géré automatiquement : images, vidéo et liens fonctionnent.

### Rendre les formulaires fonctionnels (GitHub Pages)
GitHub Pages n'héberge que des fichiers : les formulaires passent donc par **Formspree**.
1. Créez un compte sur <https://formspree.io> avec l'e-mail du club, puis créez un formulaire **New form**. Copiez l'adresse `https://formspree.io/f/xxxxxxx`.
2. Dans le dépôt : **Settings → Secrets and variables → Actions → onglet Variables → New repository variable**.
   - Name : `FORM_ENDPOINT`
   - Value : `https://formspree.io/f/xxxxxxx`
3. **Actions → Déployer sur GitHub Pages → Run workflow** pour republier.
Les messages du formulaire de contact et les candidatures arrivent alors par e-mail et dans le tableau de bord Formspree, qui permet un export CSV.

### Ajouter un nom de domaine (facultatif, ex. `enactus-souissi.ma`)
1. Achetez le domaine chez un registraire, par exemple un registraire `.ma` agréé, Namecheap ou OVH.
2. Dans le dépôt : **Settings → Secrets and variables → Actions → Variables** → `CUSTOM_DOMAIN` = `www.enactus-souissi.ma`.
3. Chez le registraire, dans la zone DNS, créez un enregistrement **CNAME** `www` → `<votre-compte>.github.io`.
   Pour le domaine nu (sans `www`), créez quatre enregistrements **A** vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153` et `185.199.111.153`.
4. Relancez le workflow, puis dans **Settings → Pages**, saisissez le domaine et cochez **Enforce HTTPS** quand l'option apparaît. La propagation DNS peut prendre jusqu'à 24 h.
5. Mettez à jour `url` dans `src/content/site.ts`.

---

## Méthode 2 — GitHub + Vercel (recommandée)

Vercel est l'hébergeur créé par les auteurs de Next.js. Il lit le code sur GitHub et active **toutes** les fonctionnalités : formulaires natifs et flux Instagram automatique.

1. Allez sur <https://vercel.com/signup> → **Continue with GitHub**, puis autorisez l'accès.
2. **Add New… → Project** → à côté de `enactus-fsjes-souissi`, cliquez sur **Import**.
   (Si le dépôt n'apparaît pas : **Adjust GitHub App Permissions** → autorisez ce dépôt.)
3. Vercel détecte **Next.js** : ne changez ni la commande de build ni le dossier.
4. Ouvrez **Environment Variables** et ajoutez ce dont vous avez besoin (voir `.env.example`) :
   - E-mails des formulaires : `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL`. Créez un compte sur <https://resend.com>, ajoutez et vérifiez votre domaine, puis créez une clé API.
   - **ou** Google Sheets : `FORMS_WEBHOOK_URL`
   - Instagram : `INSTAGRAM_ACCESS_TOKEN`
   - ⚠️ N'ajoutez **pas** `NEXT_PUBLIC_BASE_PATH` sur Vercel.
5. Cliquez sur **Deploy**. Environ 1 minute plus tard, le site est en ligne sur `https://enactus-fsjes-souissi.vercel.app`.
6. Domaine personnalisé : **Project → Settings → Domains → Add**. Vercel indique les enregistrements DNS à créer ; le HTTPS est automatique.

> Si vous choisissez Vercel, désactivez GitHub Pages pour éviter deux versions en ligne : **Settings → Pages → Source : None**. Vous pouvez aussi supprimer le fichier `.github/workflows/deploy-github-pages.yml`.

---

## Mettre à jour le site ensuite

1. Modifiez un fichier, par exemple `src/content/activities.ts` (voir `GUIDE-CONTENU.md`), ou ajoutez des photos dans `public/images/…`.
2. Envoyez la modification :
   - **GitHub Desktop** : écrivez un résumé en bas à gauche → **Commit to main** → **Push origin**.
   - **Terminal** : `git add . && git commit -m "Ajout activité X" && git push`
   - **Petite correction de texte** : directement sur github.com, ouvrez le fichier → icône ✏️ → **Commit changes**.
3. Le site se republie tout seul en 1 à 3 minutes. Suivez l'avancement dans l'onglet **Actions** (GitHub Pages) ou dans le tableau de bord Vercel.

## Donner accès aux autres membres

- **Settings → Collaborators** (ou **People**, pour une organisation) → **Add people** → saisissez le nom d'utilisateur GitHub du membre.
- Recommandé : **Settings → Branches → Add branch ruleset** sur `main` pour exiger une relecture (*pull request*) avant toute publication.

## En cas de problème

| Symptôme | Solution |
|---|---|
| Le workflow est rouge ❌ | Onglet **Actions** → cliquez sur l'exécution → lisez l'étape en rouge. Le plus souvent, un texte est mal fermé dans un fichier `src/content/…` (guillemet ou virgule manquants). Corrigez, puis renvoyez. |
| Page blanche ou images manquantes sur GitHub Pages | Vérifiez que **Source = GitHub Actions** (et non *Deploy from a branch*). |
| Erreur 404 sur `…github.io/enactus-fsjes-souissi` | Le premier déploiement n'est pas terminé, ou le dépôt est privé. |
| Les formulaires affichent « Mode aperçu » | La variable `FORM_ENDPOINT` n'est pas définie ; relancez le workflow après l'avoir ajoutée. |
| Fichier trop lourd refusé | GitHub refuse les fichiers de plus de 100 Mo : compressez les vidéos (la vidéo actuelle fait 4 Mo). |
