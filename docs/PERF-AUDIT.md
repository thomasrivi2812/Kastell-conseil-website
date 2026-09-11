# Audit de performance — Kastell Conseil

Mesures de référence relevées le 11 septembre 2026 sur la branche
`perf/optimisation`, avant toute modification.

**Conditions.** Site construit en production, servi localement, mesuré avec
Lighthouse en profil mobile (4G simulée, ralentissement processeur ×4). Chaque
chiffre est la **médiane de trois passages**, sur une machine dont les serveurs
de test concurrents ont été arrêtés au préalable — ce point n'est pas un détail :
sur une machine chargée, le même site mesurait 85 au lieu de 94.

---

## 0. Stack

| | |
|---|---|
| Next.js | **16.3.2** (App Router, Turbopack) |
| React | 19.2.8 |
| Dépendances de production | **`next`, `react`, `react-dom`. Rien d'autre.** |
| CMS | WordPress headless, REST |
| Hébergement | Vercel |

La sémantique de cache de Next 16 s'applique : `fetch` n'est plus mis en cache
par défaut depuis Next 15, et le cache se pilote par `revalidate` et
`revalidateTag`. Le site utilise déjà ces deux mécanismes.

**Aucune librairie lourde à alléger.** Pas de framer-motion, pas de bibliothèque
d'icônes, pas de librairie de dates. `depcheck` ne signale aucune dépendance de
production inutilisée. Les trois signalements sur les dépendances de
développement (`autoprefixer`, `postcss`, `@types/react-dom`) sont des faux
positifs : elles sont utilisées par la chaîne PostCSS et par TypeScript, que
depcheck ne sait pas lire. Le signalement d'un `sanity` manquant en est un
autre : le terme n'apparaît nulle part dans le dépôt.

---

## 1. Lighthouse — référence

Profil mobile, médiane de trois passages.

| Page | Perf | LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|
| Accueil | **97** | 2,51 s | 78 ms | 0,000 | 0,93 s |
| Offres | **93** | 3,03 s | 132 ms | 0,000 | 0,77 s |
| Contact | **95** | 2,99 s | 64 ms | 0,000 | 0,89 s |

Face aux objectifs :

| Objectif | État |
|---|---|
| Performance ≥ 95 | accueil ✓ · contact ✓ · **offres ✗ (93)** |
| LCP < 2 s | **✗ sur les trois pages** |
| CLS < 0,05 | ✓ — mesuré à **0** partout |
| TTFB < 200 ms | ✓ — 8 à 26 ms |
| JS < 120 ko par route | **✗ — 144,5 ko** |

---

## 2. Le problème principal : le LCP attend le JavaScript

C'est le constat central de cet audit, et il explique à lui seul l'écart sur
les trois pages.

Lighthouse décompose le LCP de `/offres` ainsi :

```
Temps de réponse serveur        16 ms
Délai de rendu de l'élément   1162 ms   ← ici
```

Même chose sur `/contact` : 1152 ms. Le serveur répond en 16 ms, puis
**l'élément reste invisible pendant plus d'une seconde**.

La cause est dans `Reveal`, le composant d'apparition au défilement :

```css
.reveal { opacity: 0; transform: translateY(16px); }
.reveal.is-visible { opacity: 1; transform: none; }
```

La classe `is-visible` est posée par JavaScript, après hydratation, quand un
`IntersectionObserver` détecte l'élément. Or un navigateur ne compte pas comme
« peint » un élément d'opacité nulle. Le texte du haut de page est donc dans le
HTML dès la première milliseconde, mais le LCP n'est enregistré qu'une fois le
JavaScript chargé, exécuté, hydraté, l'observateur déclenché et la transition
entamée.

**Le contenu au-dessus de la ligne de flottaison n'a aucune raison d'attendre
l'observateur** : il est visible d'emblée, par définition. L'animation peut être
jouée par CSS dès le premier rendu, à l'identique — mêmes durée, courbe et
décalage — sans rien devoir au JavaScript.

Sur l'accueil, l'élément de plus grande peinture est l'illustration
cartographique du héros, déjà optimisée (69,7 → 36,3 ko, rendu comparé pixel à
pixel). Son délai de rendu n'est que de 102 ms : c'est bien l'attente du
JavaScript, et non le poids de l'image, qui coûte.

---

## 3. Poids transféré par route

Octets réellement transmis (compressés), relevés par l'API Performance du
navigateur.

| Route | JS | CSS | Images | HTML | Total | Requêtes | TTFB |
|---|---|---|---|---|---|---|---|
| `/` | 144,5 ko | 10,4 | 49,5 | 19,7 | 330,7 ko | 25 | 20 ms |
| `/offres` | 144,5 ko | 10,4 | 13,1 | 10,4 | 287,6 ko | 26 | 8 ms |
| `/lobbying-territorial` | 144,5 ko | 10,4 | 13,1 | 9,7 | 278,1 ko | 21 | 9 ms |
| `/contact` | 146,4 ko | 10,4 | 21,3 | 9,0 | 287,5 ko | 23 | 26 ms |
| `/mentions-legales` | 144,5 ko | 10,4 | 13,1 | 8,0 | 276,4 ko | 21 | 9 ms |

### Décomposition du JavaScript

| Fragment | Transféré | Contenu |
|---|---|---|
| `11pxbv…` | **70,2 ko** | react, react-dom, scheduler |
| `1z99ml…` | **46,3 ko** | routeur applicatif de Next |
| `3qg-bw…` | 10,5 ko | `next/image` + code du site |
| `22emux…` | 7,5 ko | react (complément) |
| 3 autres | 10,0 ko | runtime Turbopack, fragments de page |

**116,5 des 144,5 ko sont le socle React + Next**, identique sur toute
application App Router et non réductible sans renoncer à la navigation côté
client. Le code propre au site représente au plus 28 ko, et l'écart entre la
route la plus légère et la plus lourde est de 1,9 ko — tout est mutualisé.

> **L'objectif « JS < 120 ko par route » n'est pas atteignable sur cette
> stack.** Il faudrait descendre sous le socle du framework. Ce qui est
> atteignable, c'est de réduire la part applicative et de retarder ce qui n'est
> pas nécessaire au premier rendu. Le chiffre honnête à viser est donc le poids
> applicatif, pas le total.

---

## 4. Mode de rendu par route

| Route | Mode | Remarque |
|---|---|---|
| `/` | ○ statique | ISR 1 min |
| `/offres` | ○ statique | ISR 1 min |
| `/lobbying-territorial` | ○ statique | |
| `/contact` | **ƒ dynamique** | **régression** |
| `/mentions-legales`, `/confidentialite` | ○ statique | |
| `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` | ○ statique | ISR 1 h |
| `/robots.txt`, icônes, image de partage | ○ statique | |

`/contact` est rendue à la demande parce qu'elle lit `searchParams` — c'est le
paramètre `?objet=` qui pré-remplit le sujet quand on arrive depuis une offre.
**C'est une régression introduite lors du chantier SEO**, et elle est la seule
page du site à ne pas être servie depuis le cache de bordure. La lecture peut
se faire côté client sans rien perdre du comportement.

---

## 5. Ce qui est déjà bon

À ne pas défaire :

- **CLS mesuré à 0** sur les trois pages. Les images portent toutes leurs
  dimensions, les polices sont auto-hébergées par `next/font` avec
  `display: swap`, aucune bannière ni encart n'est injecté après coup.
- **TTFB de 8 à 26 ms** sur les pages statiques.
- **Aucune requête vers un tiers** : ni police distante, ni script d'analyse, ni
  contenu intégré. Vérifié en relevant les hôtes contactés.
- **Aucune dépendance de production superflue** : trois paquets en tout.
- Les six SVG de la marque sont déjà recompressés, rendu comparé pixel à pixel.

---

## 6. Plan

| Phase | Action | Gain attendu |
|---|---|---|
| 1 | Animation d'apparition jouée par CSS au-dessus de la ligne de flottaison | **LCP, le gros morceau** |
| 1 | `/contact` repasse en statique, le sujet se lit côté client | TTFB, cache de bordure |
| 2 | AVIF ajouté aux formats, `deviceSizes` resserrés | poids des images |
| 3 | `next/dynamic` sur la modale du manifeste | quelques ko de JS |
| 3 | Analyseur de paquets câblé derrière `ANALYZE=true` | outillage |
| 4 | Rien à faire : polices et CLS déjà conformes | — |
| 5 | Région des fonctions à Paris, en-têtes de cache, mesure réelle | TTFB, suivi |

Chaque phase est mesurée avant et après. Ce qui ne produit pas de gain mesuré
n'est pas retenu.
