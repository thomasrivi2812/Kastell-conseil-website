import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Appelé par le webhook Sanity à chaque publication : purge le cache du
 * contenu pour que la modification apparaisse sans redéploiement.
 *
 * Le secret est comparé en temps constant — une comparaison naïve laisse
 * fuiter sa longueur et son préfixe par mesure du temps de réponse.
 */
function secretValide(recu: string | null, attendu: string) {
  if (!recu || recu.length !== attendu.length) return false;
  let diff = 0;
  for (let i = 0; i < attendu.length; i++) {
    diff |= recu.charCodeAt(i) ^ attendu.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(request: Request) {
  const attendu = process.env.SANITY_REVALIDATE_SECRET;
  if (!attendu) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET n'est pas configuré." },
      { status: 500 },
    );
  }

  const recu =
    request.headers.get("x-kastell-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (!secretValide(recu, attendu)) {
    return NextResponse.json({ message: "Secret invalide." }, { status: 401 });
  }

  // Next 16 impose un profil d'expiration ; 0 = purge immédiate.
  revalidateTag("contenu", { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
