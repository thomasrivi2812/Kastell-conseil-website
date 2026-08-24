import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
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
  metadataBase: new URL("https://kastell-conseil.fr"),
  title: {
    default: "Kastell Conseil — Conseil & lobbying engagé",
    template: "%s — Kastell Conseil",
  },
  description:
    "Conseil en affaires publiques, lobbying et communication d'influence. Une passerelle entre le monde politique et les entreprises des territoires. Rennes, Bretagne.",
  openGraph: {
    title: "Kastell Conseil — Conseil & lobbying engagé",
    description:
      "Conseil en affaires publiques, lobbying et communication d'influence. Rennes, Bretagne.",
    url: "/",
    siteName: "Kastell Conseil",
    locale: "fr_FR",
    type: "website",
  },
  icons: { icon: "/brand/kastell-mark.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
