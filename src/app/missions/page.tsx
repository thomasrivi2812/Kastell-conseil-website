import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/Reveal";
import { missions } from "@/content/site";

export const metadata: Metadata = {
  title: "Missions",
  description:
    "Affaires publiques, représentation d'intérêts, communication d'influence et transition écologique : les quatre terrains d'intervention de Kastell Conseil.",
};

export default function MissionsPage() {
  return (
    <div className="w-full overflow-x-clip">
      <Header />
      <main id="contenu">
        <section className="shell pb-[clamp(40px,6vw,72px)] pt-[clamp(56px,9vw,120px)]">
          <Reveal className="flex max-w-[min(900px,92%)] flex-col items-start">
            <p className="eyebrow-tight mb-[clamp(20px,3vw,32px)]">Missions</p>
            <h1 className="h1">Quatre terrains d&apos;intervention.</h1>
            <p className="body-lg mt-[clamp(24px,3vw,36px)] max-w-[56ch]">
              Chaque mission part du même point : comprendre où se prend la
              décision, à quel moment, et par qui. Le reste — argumentaire,
              interlocuteurs, calendrier — en découle.
            </p>
          </Reveal>
        </section>

        {missions.map((mission, i) => (
          <section
            key={mission.slug}
            id={mission.slug}
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
                  <p className="mission-index mb-[18px] block">
                    {mission.index}
                  </p>
                  <h2 className="h2 max-w-[16ch]">{mission.title}</h2>
                </div>
                <div className="max-w-[60ch]">
                  <p className="body-lg">{mission.summary}</p>
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        <section className="hairline-top">
          <div className="shell band-md">
            <Reveal className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-5">
              <p className="eyebrow-tight">Retour</p>
              <Link href="/" className="pill pill-outline">
                Revenir à l&apos;accueil <span aria-hidden>→</span>
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
