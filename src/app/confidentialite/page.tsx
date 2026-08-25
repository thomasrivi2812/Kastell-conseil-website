import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Traitement des données personnelles sur le site ${site.name}.`,
  robots: { index: false },
};

export default function Page() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Cette page décrit les données personnelles traitées à l'occasion de votre visite et les droits dont vous disposez."
      blocks={[
        {
          heading: "Responsable de traitement",
          body: [
            `${site.name}, [ adresse ]. Contact : ${site.email}.`,
            "[ Le cas échéant, coordonnées du délégué à la protection des données. ]",
          ],
        },
        {
          heading: "Données collectées",
          body: [
            "Ce site ne comporte pas de formulaire : la prise de contact se fait par courriel ou via LinkedIn. Les données que vous transmettez alors se limitent à celles que vous choisissez de communiquer.",
            "[ Compléter si des mesures d'audience ou un formulaire sont ajoutés ultérieurement. ]",
          ],
        },
        {
          heading: "Finalité et base légale",
          body: [
            "Les données reçues par courriel servent uniquement à répondre à votre demande et, le cas échéant, à assurer le suivi de la relation commerciale. La base légale est l'intérêt légitime du cabinet à répondre aux sollicitations qui lui sont adressées.",
          ],
        },
        {
          heading: "Durée de conservation",
          body: ["[ Durée retenue, par exemple trois ans à compter du dernier contact. ]"],
        },
        {
          heading: "Vos droits",
          body: [
            `Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition. Pour l'exercer, écrivez à ${site.email}.`,
            "Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).",
          ],
        },
      ]}
    />
  );
}
