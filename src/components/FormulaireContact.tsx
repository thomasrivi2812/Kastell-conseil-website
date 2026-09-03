"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Textes = {
  heading: string;
  nom: string;
  organisation: string;
  organisationAide: string;
  email: string;
  telephone: string;
  telephoneAide: string;
  objet: string;
  objetDefaut: string;
  objetAutre: string;
  message: string;
  consentement: string;
  envoyer: string;
  envoi: string;
  succes: string;
  erreur: string;
  indisponible: string;
  replierMail: string;
  confidentialite: string;
  obligatoire: string;
};

type Etat = "repos" | "envoi" | "succes" | "echec";

/**
 * Formulaire de contact.
 *
 * Une demande perdue est un client perdu : quand l'envoi échoue — destination
 * non configurée, service en panne, débit dépassé — le formulaire ne se
 * contente pas d'afficher une erreur. Il propose d'ouvrir le logiciel de
 * messagerie avec le message déjà rédigé, et conserve la saisie à l'écran.
 * Le visiteur repart toujours avec un moyen d'aboutir.
 */
export function FormulaireContact({
  textes,
  sujets,
  email,
}: {
  textes: Textes;
  sujets: readonly string[];
  email: string;
}) {
  const [etat, setEtat] = useState<Etat>("repos");
  const [message, setMessage] = useState("");
  const [replier, setReplier] = useState("");
  const formulaire = useRef<HTMLFormElement>(null);

  /** Courriel de secours, message compris : rien de la saisie n'est perdu. */
  const construireMailto = (donnees: FormData) => {
    const l = (cle: string) => String(donnees.get(cle) ?? "").trim();
    const corps = [
      `Nom : ${l("nom")}`,
      l("organisation") && `Organisation : ${l("organisation")}`,
      `E-mail : ${l("email")}`,
      l("telephone") && `Téléphone : ${l("telephone")}`,
      l("objet") && `Sujet : ${l("objet")}`,
      "",
      l("message"),
    ]
      .filter(Boolean)
      .join("\n");
    const sujet = l("objet") ? `Demande — ${l("objet")}` : "Demande de contact";
    return `mailto:${email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
  };

  const envoyer = async (evenement: React.FormEvent<HTMLFormElement>) => {
    evenement.preventDefault();
    const donnees = new FormData(evenement.currentTarget);
    setEtat("envoi");
    setMessage("");
    setReplier("");

    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nom: donnees.get("nom"),
          organisation: donnees.get("organisation"),
          email: donnees.get("email"),
          telephone: donnees.get("telephone"),
          objet: donnees.get("objet"),
          message: donnees.get("message"),
          consentement: donnees.get("consentement") === "on",
          societe: donnees.get("societe"),
        }),
      });
      const resultat = (await reponse.json()) as { code?: string };

      if (reponse.ok && resultat.code === "ok") {
        setEtat("succes");
        setMessage(textes.succes);
        formulaire.current?.reset();
        return;
      }

      setEtat("echec");
      setMessage(resultat.code === "non-configure" ? textes.indisponible : textes.erreur);
      setReplier(construireMailto(donnees));
    } catch {
      setEtat("echec");
      setMessage(textes.erreur);
      setReplier(construireMailto(donnees));
    }
  };

  if (etat === "succes") {
    return (
      <div className="formulaire-carte">
        <p className="formulaire-succes" role="status">
          {textes.succes}
        </p>
      </div>
    );
  }

  return (
    <div className="formulaire-carte">
      <h3 className="formulaire-titre">{textes.heading}</h3>

      <form ref={formulaire} onSubmit={envoyer} className="formulaire">
        <p className="formulaire-champ">
          <label htmlFor="contact-nom">
            {textes.nom} <span aria-hidden>*</span>
          </label>
          <input id="contact-nom" name="nom" type="text" required maxLength={120} autoComplete="name" />
        </p>

        <p className="formulaire-champ">
          <label htmlFor="contact-organisation">
            {textes.organisation} <span className="formulaire-aide">{textes.organisationAide}</span>
          </label>
          <input
            id="contact-organisation"
            name="organisation"
            type="text"
            maxLength={160}
            autoComplete="organization"
          />
        </p>

        <p className="formulaire-champ">
          <label htmlFor="contact-email">
            {textes.email} <span aria-hidden>*</span>
          </label>
          <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" />
        </p>

        <p className="formulaire-champ">
          <label htmlFor="contact-telephone">
            {textes.telephone} <span className="formulaire-aide">{textes.telephoneAide}</span>
          </label>
          <input id="contact-telephone" name="telephone" type="tel" maxLength={40} autoComplete="tel" />
        </p>

        <p className="formulaire-champ formulaire-large">
          <label htmlFor="contact-objet">{textes.objet}</label>
          <select id="contact-objet" name="objet" defaultValue="">
            <option value="">{textes.objetDefaut}</option>
            {sujets.map((sujet) => (
              <option key={sujet} value={sujet}>
                {sujet}
              </option>
            ))}
            <option value={textes.objetAutre}>{textes.objetAutre}</option>
          </select>
        </p>

        <p className="formulaire-champ formulaire-large">
          <label htmlFor="contact-message">
            {textes.message} <span aria-hidden>*</span>
          </label>
          <textarea id="contact-message" name="message" required rows={5} minLength={10} maxLength={4000} />
        </p>

        {/* Leurre : hors écran et exclu de la tabulation, seul un robot le
            remplit. `hidden` ne conviendrait pas, certains robots l'ignorent
            justement parce qu'il est trop visible dans le balisage. */}
        <div className="sr-only" aria-hidden>
          <label htmlFor="contact-societe">Ne pas remplir</label>
          <input id="contact-societe" name="societe" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="formulaire-consentement formulaire-large">
          <input type="checkbox" name="consentement" required />
          <span>{textes.consentement}</span>
        </label>

        <div className="formulaire-pied formulaire-large">
          <button type="submit" className="pill pill-solid" disabled={etat === "envoi"}>
            {etat === "envoi" ? textes.envoi : textes.envoyer}
            <span aria-hidden>→</span>
          </button>
          <p className="formulaire-mention">
            <span aria-hidden>*</span> {textes.obligatoire} ·{" "}
            <Link href="/confidentialite" className="formulaire-lien hit-area">
              {textes.confidentialite}
            </Link>
          </p>
        </div>

        <div className="formulaire-large" aria-live="polite">
          {message ? (
            <p className={`formulaire-message ${etat === "echec" ? "est-erreur" : ""}`}>{message}</p>
          ) : null}
          {replier ? (
            <a href={replier} className="pill pill-outline formulaire-replier">
              {textes.replierMail}
              <span aria-hidden>→</span>
            </a>
          ) : null}
        </div>
      </form>
    </div>
  );
}
