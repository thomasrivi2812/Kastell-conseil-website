import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { vision as reglages } from "@/content/site";
import { findPublicAsset } from "@/lib/asset";
import { getContent } from "@/cms/content";

/** Fond optionnel : réglage du dépôt, vide par défaut depuis que la carte sert au héros. */
const backdrop = reglages.backdrop ? findPublicAsset(reglages.backdrop) : null;

export async function Vision() {
  const { vision } = await getContent();
  return (
    <section
      id="vision"
      className="relative overflow-hidden border-t border-[rgba(69,111,92,0.2)] bg-accent-tint"
    >
      {backdrop ? (
        <div aria-hidden className="vision-bg">
          <Image
            src={backdrop}
            alt=""
            fill
            sizes="(max-width: 899px) 100vw, 62vw"
            unoptimized
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="shell band-lg relative">
        <div className="grid-auto gap-[clamp(32px,6vw,90px)]">
          <Reveal>
            <p className="eyebrow mb-[22px]">{vision.eyebrow}</p>
            <h2 className="h2 h2-pretty max-w-[22ch]">{vision.title}</h2>
          </Reveal>

          <Reveal index={1} className="max-w-[60ch]">
            {vision.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`body-lg ${
                  i === vision.paragraphs.length - 1 ? "" : "mb-5"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-[clamp(30px,4vw,46px)] flex flex-wrap gap-x-[clamp(28px,4vw,56px)] gap-y-0 border-t border-[rgba(25,41,36,0.15)] pt-[26px]">
              {vision.stats.map((stat) => (
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
