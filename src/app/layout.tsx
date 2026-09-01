import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { BandeauApercu } from "@/components/BandeauApercu";
import { site } from "@/content/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Cabinet Kastell — Ancrage territorial, influence nationale",
    template: "%s — Cabinet Kastell",
  },
  description:
    "Cabinet de conseil en affaires publiques et lobbying. Kastell relie les entreprises ancrées dans les territoires aux lieux de décision, de Lamballe à Paris et Bruxelles.",
  openGraph: {
    title: "Cabinet Kastell — Ancrage territorial, influence nationale",
    description:
      "Peser dans le débat public. Influencer les décisions. Où que vous soyez.",
    url: "/",
    siteName: "Cabinet Kastell",
    locale: "fr_FR",
    type: "website",
  },
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
