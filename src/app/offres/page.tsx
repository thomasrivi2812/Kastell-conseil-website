import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Offres",
  description:
    "Affaires publiques, représentation d'intérêts, communication d'influence et transition écologique : les quatre terrains d'intervention de Kastell Conseil.",
};

export default async function OffresPage() {
  const { offers, offersSection } = await getContent();
  return (
    <div className="w-full overflow-x-clip">
      <Header />
      <main id="contenu">
        <section className="shell pb-[clamp(40px,6vw,72px)] pt-[clamp(56px,9vw,120px)]">
          <Reveal className="flex max-w-[min(900px,92%)] flex-col items-start">
            <p className="eyebrow-tight mb-[clamp(20px,3vw,32px)]">{offersSection.eyebrow}</p>
            <h1 className="h1">{offersSection.pageTitle}</h1>
            <p className="body-lg mt-[clamp(24px,3vw,36px)] max-w-[56ch]">
{offersSection.pageIntro}
            </p>
          </Reveal>
        </section>

        {offers.map((offer, i) => (
          <section
            key={offer.slug}
            id={offer.slug}
            className={`hairline-top ${
              i % 2 === 1 ? "bg-sand" : ""
            }`}
          >
            <div className="shell band-md">
              <Reveal
                index={i}
                className="grid-auto items-start gap-[clamp(32px,6vw,90px)]"
              >
                <div>
                  <p className="offer-index mb-[18px] block">
                    {offer.index}
                  </p>
                  <h2 className="h2 max-w-[16ch]">{offer.title}</h2>
                </div>
                <div className="max-w-[60ch]">
                  <p className="body-lg">{offer.summary}</p>
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        <section className="hairline-top">
          <div className="shell band-md">
            <Reveal className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-5">
              <p className="eyebrow-tight">{offersSection.backLabel}</p>
              <Link href="/" className="pill pill-outline">
                {offersSection.backCta} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
