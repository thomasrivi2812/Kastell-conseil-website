# Logos des médias

Déposer ici les logos, sous ces noms exacts — l'extension est libre
(`svg` de préférence, sinon `png`, `jpg`, `webp`) :

    ouest-france.svg
    bretagne-economique.svg
    femmes-de-bretagne.svg

Les noms proviennent du champ `logo` de chaque entrée de `press`
(`src/content/site.ts`). Tant qu'un fichier manque, la pastille affiche le nom
du média en toutes lettres — la rubrique reste présentable.

Les logos s'affichent sur une pastille claire, ce qui permet d'utiliser les
versions sombres habituelles des médias sans retouche. Préférer un fond
transparent.

Une fois Sanity branché, ces logos se televersent directement depuis le studio,
rubrique « À propos » → « Dans la presse » : le CMS prend alors le pas sur les
fichiers du dépôt.
