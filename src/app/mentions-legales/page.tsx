import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.name}.`,
  robots: { index: false },
};

export default function Page() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Informations relatives à l'éditeur, à l'hébergeur et aux conditions d'utilisation du site."
      blocks={[
        {
          heading: "Éditeur du site",
          body: [
            `${site.name} — [ forme juridique ], au capital de [ montant ] €.`,
            "Siège social : [ adresse complète ].",
            "SIREN / SIRET : [ numéro ]. RCS : [ ville et numéro ]. TVA intracommunautaire : [ numéro ].",
            `Directrice de la publication : [ nom ]. Contact : ${site.email}.`,
          ],
        },
        {
          heading: "Hébergement",
          body: [
            "Le site est hébergé par [ hébergeur ], [ adresse ], [ téléphone ].",
          ],
        },
        {
          heading: "Représentation d'intérêts",
          body: [
            "Kastell Conseil est inscrit au répertoire des représentants d'intérêts tenu par la Haute Autorité pour la transparence de la vie publique (HATVP) sous le numéro [ numéro ].",
          ],
        },
        {
          heading: "Propriété intellectuelle",
          body: [
            "L'ensemble des contenus de ce site — textes, identité visuelle, photographies — est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation préalable est interdite.",
            "Les logos des organisations citées demeurent la propriété de leurs titulaires respectifs et sont affichés avec leur accord.",
          ],
        },
        {
          heading: "Signaler un contenu",
          body: [
            `Pour toute demande de rectification ou de retrait, écrire à ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
