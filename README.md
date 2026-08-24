# Kastell Conseil — site web

Site vitrine de **Kastell Conseil** (conseil en affaires publiques, lobbying et
communication d'influence — Rennes). Next.js 15 (App Router) + Tailwind CSS,
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

## À compléter

Ces éléments sont des emplacements réservés dans la maquette d'origine et
attendent le contenu réel :

| Élément | Où |
| --- | --- |
| Photo de la présidente fondatrice | déposer `public/brand/fondatrice.jpg` (format 4:5) — le placeholder de la maquette disparaît automatiquement |
| Nom de la présidente fondatrice | `founder.name` dans `src/content/site.ts` |
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
