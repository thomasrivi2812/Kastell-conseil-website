import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { findPublicAsset } from "@/lib/asset";

/** Déposer le visuel dans public/brand/manifeste.(jpg|png|webp…) pour l'activer. */
const backdrop = findPublicAsset("brand/manifeste");

const stats = [
  { value: "15 ans", label: "d'expérience institutionnelle" },
  { value: "Rennes", label: "Paris · Bruxelles" },
];

export function Manifeste() {
  return (
    <section
      id="manifeste"
      className="relative overflow-hidden border-t border-[rgba(25,41,36,0.12)] bg-sand"
    >
      {backdrop ? (
        <div aria-hidden className="manifeste-bg">
          <Image
            src={backdrop}
            alt=""
            fill
            sizes="(max-width: 899px) 100vw, 62vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="shell band-lg relative">
        <div className="grid-auto gap-[clamp(32px,6vw,90px)]">
          <Reveal>
            <p className="eyebrow mb-[22px]">Manifeste</p>
            <h2 className="h2 h2-pretty max-w-[22ch]">
              Une passerelle entre le monde politique et les entreprises des
              territoires.
            </h2>
          </Reveal>

          <Reveal index={1} className="max-w-[60ch]">
            <p className="body-lg mb-5">
              Les décisions qui façonnent la transition écologique se prennent à
              Rennes, à Paris et à Bruxelles. Les entreprises qui la mettent en
              œuvre, elles, travaillent au plus près du terrain. Kastell Conseil
              existe pour relier les deux.
            </p>
            <p className="body-lg mb-5">
              Nous portons vos enjeux avec méthode : comprendre le calendrier
              politique, construire un argumentaire solide, identifier les bons
              interlocuteurs et engager un dialogue durable. Sans esbroufe, avec
              une exigence de transparence et de conformité.
            </p>
            <p className="body-lg">
              Proximité, expertise, engagement : trois principes qui structurent
              chacune de nos missions.
            </p>

            <div className="mt-[clamp(30px,4vw,46px)] flex flex-wrap gap-x-[clamp(28px,4vw,56px)] gap-y-0 border-t border-[rgba(25,41,36,0.15)] pt-[26px]">
              {stats.map((stat) => (
                <div key={stat.value} className="min-w-[120px]">
                  <p className="m-0 font-serif text-[clamp(28px,3vw,40px)] text-forest">
                    {stat.value}
                  </p>
                  <p className="m-0 mt-1.5 font-sans text-[14px] uppercase tracking-[0.14em] text-sage">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
