import { DELAI_MS, isWordPressConfigured, wordpressUrl } from "./env";

/**
 * Un seul appel : l'extension WordPress expose une route d'agrégation qui rend
 * les cinq rubriques d'un coup. Interroger cinq points d'entrée séparés
 * multiplierait les allers-retours et les modes de panne partielle.
 */
const ROUTE = "/wp-json/kastell/v1/contenu";

export async function lireContenuWordPress<T>(): Promise<T | null> {
  if (!isWordPressConfigured) return null;

  const abandon = AbortSignal.timeout(DELAI_MS);
  const reponse = await fetch(`${wordpressUrl}${ROUTE}`, {
    signal: abandon,
    headers: { accept: "application/json" },
    next: { revalidate: 60, tags: ["contenu"] },
  });

  if (!reponse.ok) {
    throw new Error(`WordPress a répondu ${reponse.status}`);
  }
  return (await reponse.json()) as T;
}
