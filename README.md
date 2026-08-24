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

### Visuel de fond du manifeste

Déposer une image dans `public/brand/manifeste.*` (jpg, png, webp, avif — le
composant résout l'extension tout seul). Elle se place derrière le titre et
s'efface en dégradé vers la colonne de texte ; sans fichier, la section reste
telle que dans la maquette.

Le visuel actuel est `photoorga.png`, désigné par `manifeste.backdrop` dans
`src/content/site.ts` (chemin **sans extension** : le helper résout le format
réel). Vider la valeur retire le fond.

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

**Deux fichiers sources sont à reprendre :**

- `google.svg` — la vectorisation a **perdu les deux « o »** : le logo se lit
  « Go gle ». Le rouge et le jaune de l'original sont passés du mauvais côté du
  seuil de tracé. Il faut repartir d'un logo Google monochrome propre.
- `region-bretagne.svg` — c'est la version **en négatif** : un carré noir avec
  le logo détouré en blanc. Elle fonctionne, mais pèse visuellement bien plus
  que les quatre autres, qui sont sur fond transparent. Préférer une version à
  fond transparent.

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

## À compléter

Ces éléments sont des emplacements réservés dans la maquette d'origine et
attendent le contenu réel :

| Élément | Où |
| --- | --- |
| Visuel de fond du manifeste | déposer `public/brand/manifeste.jpg` (ou .png/.webp) — voir ci-dessous |
| Dates des articles de presse | `press` dans `src/content/site.ts` |
| URL LinkedIn | `site.linkedin` dans `src/content/site.ts` |
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
