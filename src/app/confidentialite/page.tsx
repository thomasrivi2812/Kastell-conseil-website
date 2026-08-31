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
            "La prise de contact se fait par courriel ou via LinkedIn : les données que vous transmettez alors se limitent à celles que vous choisissez de communiquer.",
            "Le téléchargement du manifeste du Réseau Influence & Territoires suppose de renseigner une adresse e-mail. Seule cette adresse est enregistrée, accompagnée de la date de la demande. Aucun autre élément n'est collecté à cette occasion, et aucun compte n'est créé.",
            "[ Compléter si des mesures d'audience sont ajoutées ultérieurement. ]",
          ],
        },
        {
          heading: "Finalité et base légale",
          body: [
            "Les données reçues par courriel servent uniquement à répondre à votre demande et, le cas échéant, à assurer le suivi de la relation commerciale. La base légale est l'intérêt légitime du cabinet à répondre aux sollicitations qui lui sont adressées.",
            "L'adresse communiquée lors du téléchargement du manifeste sert à vous adresser le document puis, si vous y avez consenti, les publications du cabinet et du réseau. La base légale est votre consentement, que vous pouvez retirer à tout moment : chaque envoi comporte un lien de désinscription, et une demande adressée à l'adresse ci-dessous produit le même effet.",
          ],
        },
        {
          heading: "Destinataires",
          body: [
            "Les adresses recueillies lors du téléchargement du manifeste sont traitées par le cabinet et, le cas échéant, par son prestataire d'envoi de courriels, agissant comme sous-traitant. Elles ne sont ni revendues ni cédées à des tiers.",
            "[ Nommer le prestataire d'envoi retenu et son pays d'hébergement. ]",
          ],
        },
        {
          heading: "Durée de conservation",
          body: [
            "[ Durée retenue pour les échanges, par exemple trois ans à compter du dernier contact. ]",
            "Les adresses recueillies lors du téléchargement sont conservées jusqu'au retrait du consentement, et au plus [ durée retenue ] après le dernier contact.",
          ],
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
