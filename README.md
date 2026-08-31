# Kastell Conseil — site web

Site vitrine de **Kastell Conseil** (conseil en affaires publiques, lobbying et
communication d'influence — Rennes). Next.js 16 (App Router) + Tailwind CSS,
prêt à déployer sur Vercel.

La page d'accueil est une reproduction fidèle de la maquette Claude Design :
mêmes polices (Instrument Serif / Instrument Sans), mêmes couleurs, mêmes
rampes `clamp()`. Chaque section rend à la même hauteur au pixel près que
l'artboard source en 1440 px.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # build de production
npm run lint     # ESLint
```

## Déploiement Vercel

Importer le dépôt dans Vercel : le framework est détecté automatiquement,
aucune variable d'environnement n'est requise. Build `npm run build`,
sortie `.next`.

## Structure

```
src/app/            routes (/ et /missions) + layout et styles globaux
src/components/     Header, Footer, Reveal
src/components/sections/   sections de la page d'accueil
src/content/site.ts textes, navigation, missions, témoignages, posts
public/brand/       logos et marque (PNG d'origine)
```

Les valeurs de la maquette (couleurs, `clamp()`, interlignages) sont
centralisées dans `tailwind.config.ts` et `src/app/globals.css`.

## Accessibilité, performance, animations

Un audit a été passé sur la page d'accueil (axe-core WCAG 2.1 AA, plus des
vérifications manuelles). État après corrections :

- **axe-core : 0 violation** en 1440 px et en 390 px (28 auparavant, toutes des
  contrastes insuffisants). Trois teintes de la charte ont été très légèrement
  assombries pour atteindre 4,5:1 — elles sont regroupées dans
  `tailwind.config.ts` si la marque préfère revenir aux valeurs d'origine :
  `sage` `#5E7E7E` → `#557272`, `dim` `#7C8582` → `#707876`,
  `muted` `#9AA3A0` → `#666F6C`.
- **Sans JavaScript, la page reste lisible.** Le voile d'apparition est
  conditionné à `@media (scripting: enabled)` : JS désactivé, rien n'est masqué.
- **Focus clavier visible** partout, avec une variante claire sur les bandeaux
  vert foncé, et un lien d'évitement en tête de page.
- **Cibles tactiles ≥ 24 px** (WCAG 2.2) sur les liens de navigation et de pied
  de page, élargies via `.hit-area` — un pseudo-élément, donc sans décaler la
  mise en page.
- **Poids des images et polices divisé par deux** (210 → 116 Ko) : le favicon
  pointait sur le PNG de la marque en pleine résolution (94 Ko), remplacé par
  `app/icon.png` en 64 px (3 Ko). La mesure ne couvre pas les bundles JS.
- `robots.txt` et `sitemap.xml` générés depuis `site.url`.

### Logos et bascule du header

Le héros affiche le mot-symbole complet en grand. Le header, lui, part de la
marque seule tant que le héros est à l'écran — inutile de répéter un logo déjà
visible — puis bascule sur le mot-symbole dès qu'on le quitte, et sur toute
autre page. La détection se fait par `IntersectionObserver` sur `#top` ; l'état
initial suit la route (`usePathname`) pour éviter un saut à l'hydratation.
Les deux faces se croisent en fondu et la largeur du conteneur s'anime.

### Illustration du héros

`public/brand/manifeste-carte.svg` est un motif cartographique **abstrait**
(courbes de niveau, graticule, trois places reliées) généré pour évoquer
l'ancrage territorial et la liaison vers Paris. Il n'affirme aucune géographie
réelle. Un masque en dégradé efface ses bords, sinon le graticule dessine un
rectangle net posé sur la page.

Il déborde volontairement à droite et dépasse en hauteur : la section le rogne
(`overflow-hidden`), d'où la coupe franche au bord. Seul son bord gauche reste
en fondu, pour qu'il ne vienne pas buter contre le texte. En dessous de 900 px
la colonne se resserre et le texte le recouvre, d'où une opacité réduite à ce
palier.

Le `.h1` porte un `margin-left: -0.018em` : le « P » a une chasse gauche que le
mot-symbole, détouré au ras du « K », n'a pas. Sans cette correction le titre
est décalé de 1,5 px vers la droite à 84 px de corps. Exprimée en em, elle tient
à toutes les tailles — vérifié à 1440, 1100 et 700 px, l'encre du logo, du titre
et du bouton démarre au même pixel.

### Visuel de fond du manifeste

Déposer une image dans `public/brand/manifeste.*` (jpg, png, webp, avif — le
composant résout l'extension tout seul). Elle se place derrière le titre et
s'efface en dégradé vers la colonne de texte ; sans fichier, la section reste
telle que dans la maquette.

`manifeste.backdrop` est **vide** : la section a retrouvé le bandeau sable nu de
la maquette, la carte servant désormais d'illustration au héros. Pour remettre
un fond, indiquer `brand/manifeste-carte` ou `brand/photoorga` (chemin **sans
extension** : le helper résout le format réel).

L'opacité se règle via `--manifeste-opacity` dans `globals.css` (0.20 en
desktop, 0.16 en mobile). **Attention au contraste** : l'accroche « Manifeste »
ne dispose que de 4,54:1 sur le fond sable, donc le moindre assombrissement la
fait passer sous le seuil AA — le dégradé vertical ne démarre volontairement
qu'en dessous d'elle (150 px en desktop, 95 px en mobile). Le grand titre, lui,
garde plus de 8:1. Vérifier ces deux valeurs si l'image ou les paddings changent.

La qualité JPEG/WebP est forcée à 55 pour ce visuel (invisible à 20 % d'opacité
derrière un masque, 144 → 112 Ko). Next 16 refusant toute qualité non déclarée,
elle est listée dans `images.qualities` de `next.config.mjs` ; sans cela le
`quality` est ignoré en silence.

### Palette et vert clair

Le vert clair de la charte est décliné en trois rôles, chacun vérifié par la
mesure plutôt que choisi à l'œil :

| Jeton | Valeur | Rôle | Contraste |
| --- | --- | --- | --- |
| `accent` | `#8BB19F` | décoratif, et texte sur les bandeaux vert foncé | 6,42:1 sur `#192924` |
| `sage` | `#456F5C` | texte d'accent sur fond clair | 5,42 sur bone, 4,97 sur sable, 5,12 sur la teinte |
| `accent-tint` | `#EEF4F1` | fond de bande | texte forêt à 13,6:1 |

La valeur précédente, `#4B7662`, tombait à 4,50:1 exactement sur le sable —
le seuil AA, sans marge : la moindre superposition (le fondu d'apparition des
sections suffit) la faisait basculer sous la barre. `#456F5C` tient ≥ 4,97:1 sur
les trois fonds clairs du site, pour un écart de teinte imperceptible.

Le vert apparaît sur la bande « Notre vision », les bandes alternées de la page
Offres, la bande du manifeste, les puces des prestations, les filets de section
et les survols. Le bandeau LinkedIn garde le sable, pour ne pas verdir toute la
page.

### Couverture du manifeste

La bande « Manifeste » en fin de page d'accueil affiche une couverture de
document. Tant qu'aucun fichier n'est fourni, elle est **composée dans la page**
à partir de `manifesto.cover` : bloc vert foncé, titre en Instrument Serif,
motif cartographique, marque « RIT ». Elle hérite donc des fontes du site, reste
nette à toute résolution et ne coûte aucun octet de plus.

Ses proportions sont pilotées par des unités de conteneur (`cqw`), pas par la
largeur de fenêtre : la couverture est identique dans la colonne du bureau et
une fois la grille repliée sur mobile. Attention si vous la retouchez — un
conteneur ne peut pas s'interroger lui-même, sa propre marge intérieure doit
donc rester en pourcentage (`padding: 5.5%`), sans quoi les `cqw` retombent sur
la fenêtre et divisent toutes les tailles filles.

Pour poser une vraie couverture : téléverser l'image dans Sanity (À propos →
Manifeste RIT → Couverture du document), ou renseigner `manifesto.coverUrl`.
Format conseillé : portrait, environ 1000 × 1414 px.

### Téléchargement du manifeste contre adresse e-mail

Le bouton « Télécharger le manifeste » n'apparaît **que si le document
existe** : `public/documents/manifeste-rit.pdf` dans le dépôt, ou un fichier
téléversé depuis le studio (À propos → Manifeste RIT → Document à télécharger),
qui prend alors le dessus. Sans document, la bande garde son seul lien LinkedIn
— mieux vaut pas de bouton qu'un bouton qui tombe sur un 404.

Le formulaire ouvre une `<dialog>` native : le navigateur y assure le piège à
focus, la touche Échap, l'inertie de l'arrière-plan et le retour du focus sur le
bouton d'ouverture, ce qu'une réimplémentation manuelle rate presque toujours.

`POST /api/manifeste` valide l'adresse, exige le consentement, écarte les robots
par un champ leurre, limite le débit par IP, puis relaie l'adresse vers
`MANIFESTE_WEBHOOK_URL` — n'importe quel service acceptant un POST JSON
(Zapier, Make, Brevo, n8n). Charge utile :

```json
{ "email": "…", "document": "Manifeste Réseau Influence & Territoires", "date": "…" }
```

Sans cette variable d'environnement, l'adresse est seulement journalisée et le
document est servi quand même : une intégration absente ne prive jamais un
visiteur du document, et le relais en panne non plus.

**Ce que ce formulaire ne fait pas.** Le PDF est servi depuis `public/` : une
fois l'URL connue, elle est publique et partageable. C'est le compromis habituel
de ce type de formulaire, et il est assumé — l'objectif est de qualifier des
contacts, pas de protéger un document par ailleurs diffusé. Pour un vrai
verrou, il faudrait sortir le fichier de `public/` et le servir derrière un
jeton signé à durée limitée.

La limitation de débit (5 demandes par minute et par IP) vit en mémoire de
l'instance : sur une plateforme sans état elle ne survit pas au recyclage. C'est
un garde-fou de première ligne, pas une protection anti-abus.

Le traitement est décrit dans la page « Politique de confidentialité »
(finalité, base légale — le consentement —, destinataires, durée). Ces
rubriques comportent encore des crochets à compléter : prestataire d'envoi
retenu et durées de conservation.

### Logos des médias (presse)

Même principe que les logos clients : chaque entrée de `press` porte un chemin
`logo` sous `public/` **sans extension**. Déposer les fichiers sous
`public/brand/press/ouest-france.*`, `bretagne-economique.*`,
`femmes-de-bretagne.*`. Tant qu'un fichier manque, le nom du média s'affiche
en toutes lettres dans la pastille.

### Pages légales

`/mentions-legales`, `/confidentialite` et `/cookies` partagent le gabarit
`src/components/LegalPage.tsx`. **Leur contenu est un squelette** : tout ce qui
relève de l'éditeur (forme juridique, SIREN, RCS, hébergeur, numéro HATVP,
durées de conservation) est laissé entre crochets, à compléter par le client ou
son conseil. Rien n'a été inventé. Les trois pages sont en `noindex` et hors
sitemap tant qu'elles ne sont pas remplies.

### Logos clients

La liste est dans `clients` (`src/content/site.ts`). Chaque entrée pointe un
chemin sous `public/` **sans extension** ; `findPublicAsset` résout le format,
en préférant le SVG. Les cinq fichiers actuels sont dans `public/brand/`.

Tant qu'un fichier manque, sa tuile affiche le nom du client à la place, donc
la section reste présentable même incomplète.

Les logos livrés sont des tracés monochromes : ils sont simplement atténués au
repos et reprennent du corps au survol. Ils sont servis en `unoptimized` —
l'optimiseur de Next refuse le SVG sans `dangerouslyAllowSVG`, et un vecteur
n'a de toute façon rien à y gagner.

`google.svg` est arrivé avec **un « o » manquant** — le jaune, le plus clair,
perdu au seuillage de la vectorisation : le logo se lisait « Go gle ». Réparé
en dupliquant le « o » restant, un cercle identique, recentré dans l'espace
laissé libre (écarts o→o et o→g mesurés à 11 px chacun).

`region-bretagne.svg` reste la version **en négatif** : un carré noir avec le
logo détouré en blanc. Elle fonctionne, mais pèse visuellement plus que les
quatre autres, qui sont sur fond transparent. Une version à fond transparent
l'alignerait sur le reste de la ligne.

### Retombées presse

Les trois articles sont dans `press` (`src/content/site.ts`). Les titres ont été
repris des URL sources : les trois domaines sont inaccessibles depuis
l'environnement de build, donc **les dates n'ont pas pu être relevées et ne sont
pas affichées** — les ajouter manuellement si besoin.

### Header collant

Le header est en `position: sticky`. Attention au conteneur qui l'entoure :
la maquette l'enveloppe dans un `overflow-x: hidden`, ce qui force
`overflow-y` à `auto` et en fait une zone de défilement — `sticky` s'y accroche
alors au lieu de s'accrocher à la fenêtre, et le header repart avec le contenu.
Le wrapper utilise donc `overflow-x: clip`, qui découpe sans créer de zone de
défilement. Ne pas le repasser à `hidden`.

Sa hauteur varie (75 px, 132 px quand la navigation passe sur deux lignes en
mobile) : le composant publie la valeur mesurée dans `--header-h` via un
`ResizeObserver`, et `globals.css` s'en sert pour le `scroll-margin-top` des
sections ancrées. La valeur en dur dans le CSS ne sert que d'amorce avant
hydratation.

Les animations sont exclusivement en `transform` / `opacity` — aucune ne décale
la mise en page, et la hauteur de chaque section reste identique à l'artboard.
`prefers-reduced-motion: reduce` les neutralise toutes, y compris la dérive du
filigrane du héros.

## CMS (Sanity)

Léa modifie le contenu, jamais le code. Le studio est hébergé par Sanity sur
une URL dédiée : elle s'y connecte par e-mail, remplit des formulaires en
français et clique sur **Publier**.

> Le studio n'est pas servi par Next : Sanity 6 ne se compile ni avec Turbopack
> ni avec webpack à l'intérieur de Next 16. L'hébergement Sanity est gratuit,
> officiel, et évite d'embarquer un back-office dans le site vitrine.

### Mise en route (une seule fois, sans terminal)

`sanity login` et `sanity deploy` exigent un terminal. Le studio se construit
aussi en statique (`npm run studio:build`), donc **Vercel peut le déployer comme
n'importe quel site** — tout se fait depuis le navigateur, avec les deux outils
déjà en place.

1. **Projet Sanity** — sur [sanity.io/manage](https://sanity.io/manage),
   *Create new project*, dataset `production`. Relever l'identifiant (`Project ID`).
2. **Studio sur Vercel** — nouveau projet Vercel, **même dépôt GitHub** :
   - Framework preset : `Other`
   - Build command : `npm run studio:build`
   - Output directory : `dist`
   - Variables : `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET=production`

   L'URL obtenue est le lien à donner à Léa.
3. **CORS** — dans Sanity, *API → CORS origins*, ajouter l'URL du studio avec
   *Allow credentials*. Sans cette étape le studio s'affiche mais reste vide :
   le navigateur bloque ses appels à l'API.
4. **Léa** — *Members → Invite*, rôle **Editor** (pas Administrator : inutile
   qu'elle puisse supprimer le dataset).
5. **Site** — dans le projet Vercel existant, ajouter
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production` et
   `SANITY_REVALIDATE_SECRET` (`openssl rand -hex 32`), puis redéployer.
6. **Webhook** *(optionnel)* — Sanity *API → Webhooks*, URL
   `https://<domaine>/api/revalidate`, méthode POST, en-tête
   `x-kastell-secret` valant le même secret. Sans lui les modifications
   apparaissent en moins d'une minute ; avec lui, immédiatement.

> Le build du studio recopie `public/` dans sa sortie, soit ~7 Mo d'images du
> site embarquées pour rien. Sans conséquence — c'est un déploiement séparé —
> mais ça alourdit ses builds.

### Tant que rien n'est branché

`isSanityConfigured` est faux sans identifiant de projet : le site sert le
contenu de `src/content/site.ts`. **Rien ne casse avant la mise en route, et
rien ne casse non plus si Sanity devient injoignable** — `getContent()` rattrape
l'erreur et retombe sur le dépôt.

La fusion se fait **champ par champ** : une fiche à moitié remplie dans le
studio ne vide aucune rubrique, ce qui permet de basculer progressivement.

### Ce que voit Léa

Cinq rubriques, dans l'ordre du site, sans bouton « créer » ni liste à
parcourir : Paramètres du site, Page d'accueil, Offres, À propos, Pied de page.
La rubrique « À propos » est découpée en quatre onglets : Fondatrice, Dans la
presse, Nos publications, Manifeste RIT. Les schémas sont dans
`src/sanity/schema.ts` ; leurs intitulés sont les étiquettes qu'elle lit.

## Couche de contenu

**Aucun texte visible n'est écrit dans les composants.** Tout ce qui est
rédactionnel vit dans `src/content/site.ts`, groupé par section : `hero`,
`vision`, `offersSection`, `offers`, `about`, `founder`, `press`,
`publications`, `manifesto`, `references`, `clients`, `testimonials`, `news`,
`posts`, `contact`, `footer`, `legal`.

C'est le point d'entrée d'un CMS : brancher une source externe se fait à cet
endroit, sans toucher aux composants. Chaque groupe correspond à ce que serait
un document ou une collection côté CMS.

## À compléter

Ces éléments sont des emplacements réservés dans la maquette d'origine et
attendent le contenu réel :

| Élément | Où |
| --- | --- |
| Visuel de fond du manifeste | déposer `public/brand/manifeste.jpg` (ou .png/.webp) — voir ci-dessous |
| Dates des articles de presse | `press` dans `src/content/site.ts` |
| URL LinkedIn (page entreprise et profil de Léa) | `site.linkedin` / `site.linkedinProfile` |
| Titre de la tribune et nom du média | `publications` dans `src/content/site.ts` |
| Couverture du manifeste RIT | `manifesto.coverUrl`, ou l'image « Couverture du document » dans Sanity — voir ci-dessous |
| PDF du manifeste RIT | `public/documents/manifeste-rit.pdf`, ou le fichier téléversé dans Sanity — voir ci-dessous |
| Destination des adresses e-mail collectées | variable `MANIFESTE_WEBHOOK_URL` — voir ci-dessous |
| Logos des médias (presse) | `public/brand/press/…` — voir ci-dessous |
| Contenu des pages légales | `src/app/mentions-legales`, `confidentialite`, `cookies` |
| Logos clients | déposer dans `public/brand/clients/` — voir ci-dessous |
| Témoignages | `testimonials` dans `src/content/site.ts` |
| Posts LinkedIn | `posts` dans `src/content/site.ts` — à brancher sur un widget ou l'API LinkedIn |
| Mentions légales, confidentialité, cookies | `legal` dans `src/content/site.ts` |
| Domaine de production | `metadataBase` dans `src/app/layout.tsx` (actuellement `kastell-conseil.fr`) |

Les sections « témoignages » et « LinkedIn » peuvent être masquées via
`showTestimonials` / `showNews` dans `src/content/site.ts`, comme les props
correspondantes de la maquette.

## Page Missions

`/missions` reprend la charte de l'accueil et expose les ancres attendues
(`#affaires-publiques`, `#representation`, `#communication`, `#transition`),
mais n'a **pas** été reproduite depuis un artboard : seule la maquette
« Accueil » a été fournie. Elle est à remplacer dès que le design
`Missions.dc.html` est disponible.
