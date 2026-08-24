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
- **Poids de la page divisé par deux** (210 → 116 Ko) : le favicon pointait sur
  le PNG de la marque en pleine résolution (94 Ko), remplacé par `app/icon.png`
  en 64 px (3 Ko).
- `robots.txt` et `sitemap.xml` générés depuis `site.url`.

### Visuel de fond du manifeste

Déposer une image dans `public/brand/manifeste.*` (jpg, png, webp, avif — le
composant résout l'extension tout seul). Elle se place derrière le titre et
s'efface en dégradé vers la colonne de texte ; sans fichier, la section reste
telle que dans la maquette.

L'opacité se règle via `--manifeste-opacity` dans `globals.css` (0.14 en
desktop, 0.10 en mobile où le dégradé est resserré sur la zone du titre).
Plus l'image est contrastée, plus il faut descendre pour préserver la
lisibilité du texte.

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
| Logos clients (6) | `src/components/sections/References.tsx` |
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
