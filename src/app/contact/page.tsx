import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/Reveal";
import { contact, site } from "@/content/site";
import { IMAGE_OG } from "@/lib/seo";
import { DonneesStructurees } from "@/components/DonneesStructurees";
import { filDAriane } from "@/lib/schema";
import { FilDAriane } from "@/components/FilDAriane";

/* Voir src/app/page.tsx : une page construite sans le CMS ne comporte aucune
   requête, donc aucune période de revalidation, et resterait figée. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: contact.page.title,
  description:
    "Écrivez au cabinet Kastell Conseil : affaires publiques et lobbying territorial à Lamballe, Rennes et dans toute la Bretagne. Réponse sous 48 h.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${contact.page.title} | ${site.name}`,
    description:
      "Affaires publiques et lobbying territorial à Lamballe, Rennes et dans toute la Bretagne.",
    url: "/contact",
    images: [IMAGE_OG],
  },
};

/* La page lit l'objet passé dans l'adresse : un visiteur venu d'une offre
   retrouve cette offre déjà choisie dans la liste des sujets. Le choix est
   fait côté serveur, pour que le champ soit juste dès le premier affichage
   plutôt que rectifié après coup. */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ objet?: string | string[] }>;
}) {
  const { objet } = await searchParams;
  return (
    <div className="w-full overflow-x-clip">
      <DonneesStructurees
        noeuds={[
          filDAriane([
            { nom: "Accueil", chemin: "/" },
            { nom: contact.page.title, chemin: "/contact" },
          ]),
        ]}
      />
      <Header />
      {/* Page d'une seule teinte : l'en-tête clair et la bande sombre du
          formulaire se coupaient en deux au milieu de l'écran. */}
      <main id="contenu" className="band-dark">
        <section className="shell pb-[clamp(28px,3.5vw,44px)] pt-[clamp(44px,7vw,92px)]">
          <Reveal className="max-w-[60ch]">
            <FilDAriane
              sombre
              etapes={[
                { nom: "Accueil", chemin: "/" },
                { nom: contact.page.title, chemin: "/contact" },
              ]}
            />
            <p className="eyebrow-dark mb-[clamp(16px,2vw,24px)] text-[13px] font-medium tracking-[0.22em]">
              {contact.page.eyebrow}
            </p>
            <h1 className="h1 text-white">{contact.page.title}</h1>
            <p className="body-dark mt-[clamp(20px,2.6vw,30px)]">{contact.page.intro}</p>
          </Reveal>
        </section>

        <Contact titre={false} objet={typeof objet === "string" ? objet : ""} />
      </main>
      <Footer />
    </div>
  );
}
