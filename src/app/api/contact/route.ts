import { NextResponse } from "next/server";

/**
 * Réception des demandes du formulaire de contact.
 *
 * Le message est relayé vers CONTACT_WEBHOOK_URL (Brevo, Zapier, Make, n8n :
 * tout service acceptant un POST JSON). À la différence du téléchargement du
 * manifeste, il n'y a ici aucun repli acceptable côté serveur : une demande
 * perdue est un client perdu. Si la destination n'est pas configurée, ou si le
 * relais échoue, la route le dit franchement — le formulaire propose alors au
 * visiteur d'ouvrir son logiciel de messagerie avec le message déjà rédigé,
 * plutôt que de lui laisser croire que c'est parti.
 */

const EMAIL = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;

/* Garde-fou de première ligne, par instance : sur une plateforme sans état, ce
   compteur ne survit pas au recyclage et ne remplace pas une protection amont. */
const FENETRE_MS = 60_000;
const MAX_PAR_FENETRE = 4;
const compteur = new Map<string, { n: number; debut: number }>();

function tropDeRequetes(ip: string) {
  const maintenant = Date.now();
  const suivi = compteur.get(ip);
  if (!suivi || maintenant - suivi.debut > FENETRE_MS) {
    compteur.set(ip, { n: 1, debut: maintenant });
    return false;
  }
  suivi.n += 1;
  return suivi.n > MAX_PAR_FENETRE;
}

/** Coupe une saisie trop longue sans rejeter la demande pour autant. */
const borne = (valeur: unknown, max: number) =>
  typeof valeur === "string" ? valeur.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";
  if (tropDeRequetes(ip)) {
    return NextResponse.json({ code: "debit" }, { status: 429 });
  }

  let corps: unknown;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json({ code: "illisible" }, { status: 400 });
  }

  const c = (corps ?? {}) as Record<string, unknown>;

  /* Champ leurre : hors écran et exclu de la tabulation, seul un robot le
     remplit. On répond comme si tout allait bien, sans rien relayer. */
  if (borne(c.societe, 80).length > 0) {
    return NextResponse.json({ code: "ok" });
  }

  const nom = borne(c.nom, 120);
  const email = borne(c.email, 254);
  const message = borne(c.message, 4000);

  if (!nom || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json({ code: "champs" }, { status: 400 });
  }
  if (c.consentement !== true) {
    return NextResponse.json({ code: "consentement" }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    /* 501 et non 500 : ce n'est pas une panne, c'est une configuration
       absente. La distinction guide le message affiché au visiteur. */
    console.warn("[contact] CONTACT_WEBHOOK_URL absente, demande non relayée");
    return NextResponse.json({ code: "non-configure" }, { status: 501 });
  }

  try {
    const reponse = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nom,
        email,
        organisation: borne(c.organisation, 160),
        telephone: borne(c.telephone, 40),
        objet: borne(c.objet, 160),
        message,
        date: new Date().toISOString(),
        source: "Formulaire de contact du site",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!reponse.ok) throw new Error(`le service a répondu ${reponse.status}`);
  } catch (erreur) {
    console.error("[contact] relais impossible", erreur);
    return NextResponse.json({ code: "relais" }, { status: 502 });
  }

  return NextResponse.json({ code: "ok" });
}
