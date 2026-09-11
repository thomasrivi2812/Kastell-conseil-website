import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { BandeauApercu } from "@/components/BandeauApercu";
import { entite, estProduction, urlSite, verifications } from "@/lib/seo";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/*
 * Le titre par défaut et le gabarit portent « Kastell Conseil », nom d'usage
 * du cabinet. La description reste sous 155 caractères, seuil au-delà duquel
 * Google la tronque en plein milieu.
 *
 * Aucune canonique ici, volontairement : posée à la racine, elle serait
 * héritée par toute page qui n'en déclare pas, et une page nouvelle se
 * présenterait alors comme un doublon de l'accueil. Chaque page déclare la
 * sienne.
 */
export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: {
    default: "Kastell Conseil — Cabinet d'affaires publiques en Bretagne",
    template: "%s | Kastell Conseil",
  },
  description:
    "Cabinet de conseil en affaires publiques et lobbying territorial, basé à Lamballe et intervenant à Rennes et dans toute la Bretagne.",
  openGraph: {
    title: "Kastell Conseil — Cabinet d'affaires publiques en Bretagne",
    description:
      "Cabinet de conseil en affaires publiques et lobbying territorial, basé à Lamballe et intervenant à Rennes et dans toute la Bretagne.",
    url: "/",
    siteName: entite.nom,
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  /* Une balise portant une chaîne « TODO » vaudrait une vérification ratée :
     sans jeton, pas de balise. */
  ...(verifications.google || verifications.bing
    ? {
        verification: {
          ...(verifications.google ? { google: verifications.google } : {}),
          ...(verifications.bing ? { other: { "msvalidate.01": verifications.bing } } : {}),
        },
      }
    : {}),
  /* Hors production, aucun moteur ne doit retenir ces pages : une preview
     porte le même contenu que le site et en deviendrait un duplicata. */
  ...(estProduction ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <BandeauApercu />
        {children}
      </body>
    </html>
  );
}
