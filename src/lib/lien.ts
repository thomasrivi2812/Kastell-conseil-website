/**
 * Un lien mène-t-il réellement quelque part ?
 *
 * Les URL non encore fournies sont notées « # » dans le contenu. Rendues
 * telles quelles, elles produisent un bouton qui ne fait rien — au mieux la
 * page saute en haut, au pire le visiteur croit à une panne. Mieux vaut ne pas
 * afficher le bouton, comme pour le téléchargement du manifeste.
 */
export function estUtile(href: string | null | undefined): boolean {
  if (!href) return false;
  const propre = href.trim();
  return propre !== "" && propre !== "#" && propre !== "/#";
}
