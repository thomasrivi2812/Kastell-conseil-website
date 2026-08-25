import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";

export type LegalBlock = { heading: string; body: string[] };

/**
 * Gabarit commun aux pages légales. Le contenu réel relève de l'éditeur du
 * site (immatriculation, hébergeur, DPO…) : les blocs à compléter sont
 * marqués entre crochets plutôt que remplis d'un texte inventé.
 */
export function LegalPage({
  title,
  intro,
  blocks,
}: {
  title: string;
  intro: string;
  blocks: LegalBlock[];
}) {
  return (
    <div className="w-full overflow-x-clip">
      <Header />
      <main id="contenu">
        <section className="shell pb-[clamp(40px,6vw,72px)] pt-[clamp(48px,8vw,104px)]">
          <Reveal className="max-w-[70ch]">
            <p className="eyebrow-tight mb-[clamp(18px,2.5vw,28px)]">
              Informations
            </p>
            <h1 className="h1">{title}</h1>
            <p className="body-lg mt-[clamp(22px,3vw,32px)]">{intro}</p>
          </Reveal>
        </section>

        <section className="hairline-top">
          <div className="shell band-md">
            <div className="flex max-w-[70ch] flex-col gap-[clamp(30px,4vw,46px)]">
              {blocks.map((block, i) => (
                <Reveal key={block.heading} index={i}>
                  <h2 className="m-0 mb-3 font-serif text-[clamp(22px,2.2vw,30px)] font-normal leading-[1.2] text-forest">
                    {block.heading}
                  </h2>
                  {block.body.map((line, j) => (
                    <p key={j} className="body-lg mb-3 last:mb-0">
                      {line}
                    </p>
                  ))}
                </Reveal>
              ))}
            </div>

            <div className="mt-[clamp(40px,5vw,64px)]">
              <Link href="/" className="pill pill-outline">
                Revenir à l&apos;accueil <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
