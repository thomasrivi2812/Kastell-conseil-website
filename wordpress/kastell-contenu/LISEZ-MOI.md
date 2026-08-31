# Kastell — contenu du site

Extension WordPress qui fournit le contenu du site Next.js. **WordPress ne sert
aucune page** : il sert des données, que Next va chercher et rend en HTML
statique sur Vercel.

## Installation

1. Copier le dossier `kastell-contenu/` dans `wp-content/plugins/`.
2. L'activer dans *Extensions*.
3. Ajouter deux constantes dans `wp-config.php`, **au-dessus** de la ligne
   `/* That's all, stop editing! */` :

   ```php
   define( 'KASTELL_SITE_URL', 'https://kastell-conseils.fr' );
   define( 'KASTELL_SECRET', '…' ); // même valeur que REVALIDATE_SECRET côté Vercel
   ```

Aucune autre extension n'est nécessaire : ni ACF, ni WPGraphQL. Le modèle de
contenu, l'administration et la route REST sont fournis ici.

Vérification : `https://<votre-wordpress>/wp-json/kastell/v1/contenu` doit rendre
du JSON.

## Ce que voit l'éditrice

Un menu unique, **Contenu du site** :

| Rubrique | Nature |
| --- | --- |
| Paramètres | fiche unique |
| Accueil | fiche unique |
| Offres : présentation | fiche unique |
| À propos | fiche unique |
| Pied de page | fiche unique |
| Offres | liste ordonnable |
| Chiffres clés | liste ordonnable |
| Références clients | liste ordonnable |
| Témoignages | liste ordonnable |
| Actualités | liste ordonnable |
| Retombées presse | liste ordonnable |
| Publications | liste ordonnable |

Les rubriques uniques mènent droit à leur formulaire : pas de liste à parcourir,
pas de bouton « ajouter » à côté duquel se tromper.

Les listes se réordonnent par le champ **ordre** (encadré « Attributs »).

Les listes de texte — paragraphes d'une biographie, prestations d'une offre,
objectifs du manifeste — se saisissent **une ligne par élément**. WordPress n'a
pas de champ répétable sans extension payante, et une ligne par élément se
comprend sans explication.

## Comment c'est construit

```
kastell-contenu.php   amorçage, noindex, redirection du front
inc/schema.php        le modèle de contenu, déclaré une seule fois
inc/types.php         types de contenu et menu d'administration
inc/metaboxes.php     moteur de formulaire générique
inc/rest.php          route d'agrégation /wp-json/kastell/v1/contenu
inc/revalidation.php  webhook vers le site à chaque publication
```

**Tout part de `inc/schema.php`.** L'administration, l'enregistrement et la
réponse REST en dérivent : ajouter un champ là-bas suffit à le voir apparaître
partout. Ne pas dupliquer la liste des champs ailleurs.

## Choix à connaître avant de modifier

**Une seule route, pas cinq.** Le site fait un appel et reçoit les cinq
rubriques. Cinq points d'entrée séparés multiplieraient les allers-retours et
les modes de panne partielle.

**L'enveloppe est un contrat.** Les noms de champs rendus par `inc/rest.php`
sont ceux qu'attend `src/cms/content.ts` côté site. Renommer un champ ici sans
le renommer là-bas fait silencieusement retomber la valeur sur le contenu du
dépôt — pas d'erreur, juste l'ancien texte qui persiste.

**Lecture publique assumée.** La route ne demande pas d'authentification : elle
rend exactement ce qu'affiche le site. Rien de plus sensible que la page
d'accueil elle-même.

**Le webhook est non bloquant.** Enregistrer un article n'attend pas la réponse
du site et n'échoue pas si celui-ci est indisponible. Sans webhook, les
modifications apparaissent en moins d'une minute au lieu d'immédiatement.

**WordPress est tenu hors des moteurs** : `noindex` sur toutes les pages,
`robots.txt` fermé, redirection des visiteurs non connectés vers le site. C'est
le piège classique du headless — le back-office indexé qui fait concurrence au
site public.

Si vous installez Yoast ou Rank Math pour leurs champs SEO, **désactivez leur
sitemap** : il listerait des URL WordPress qui n'existent pas publiquement.
