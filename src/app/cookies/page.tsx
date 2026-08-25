import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: `Usage des cookies sur le site ${site.name}.`,
  robots: { index: false },
};

export default function Page() {
  return (
    <LegalPage
      title="Politique de cookies"
      intro="Cette page recense les traceurs déposés lors de votre visite."
      blocks={[
        {
          heading: "État actuel",
          body: [
            "En l'état, ce site ne dépose aucun cookie : il n'utilise ni mesure d'audience, ni régie publicitaire, ni bouton de partage tiers. Aucun bandeau de consentement n'est donc requis.",
          ],
        },
        {
          heading: "Si cela devait changer",
          body: [
            "L'ajout d'un outil de mesure d'audience, d'un formulaire tiers ou d'un fil LinkedIn intégré déposerait des traceurs. Il faudrait alors mettre en place un bandeau de consentement conforme aux recommandations de la CNIL et compléter le tableau ci-dessous.",
            "[ Tableau des traceurs : nom, finalité, durée, éditeur. ]",
          ],
        },
        {
          heading: "Contact",
          body: [`Toute question sur ce point peut être adressée à ${site.email}.`],
        },
      ]}
    />
  );
}
