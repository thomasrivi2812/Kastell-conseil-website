import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { founder } from "@/content/site";

/**
 * The canvas ships a hatched placeholder for the portrait. Drop the real 4:5
 * photo at public/brand/fondatrice.jpg and it takes over automatically.
 */
const hasPortrait = fs.existsSync(
  path.join(process.cwd(), "public", founder.photo),
);

export function APropos() {
  return (
    <section id="apropos" className="band-dark">
      <div className="shell band-lg">
        <div className="grid items-start gap-[clamp(32px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          <Reveal
            as="figure"
            className="relative m-0 flex min-h-[clamp(320px,38vw,520px)] items-end overflow-hidden border border-[rgba(226,240,248,0.14)] bg-[rgba(226,240,248,0.06)] p-6 [background-image:repeating-linear-gradient(135deg,rgba(226,240,248,0.06)_0_2px,transparent_2px_12px)]"
          >
            {hasPortrait ? (
              <Image
                src={founder.photo}
                alt={`Portrait de ${founder.name}, présidente fondatrice de Kastell Conseil`}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="portrait-img object-cover"
              />
            ) : (
              <figcaption className="m-0 font-mono text-[12px] leading-[1.6] text-[rgba(226,240,248,0.6)]">
                portrait — présidente fondatrice
                <br />
                (photo professionnelle, format 4:5)
              </figcaption>
            )}
          </Reveal>

          <Reveal index={1}>
            <p className="eyebrow-dark mb-[22px]">Présidente fondatrice</p>
            <h2 className="m-0 mb-2 font-serif text-[clamp(30px,3.4vw,46px)] font-normal leading-[1.14] text-white">
              {founder.name}
            </h2>
            <p className="m-0 mb-[clamp(28px,3.5vw,40px)] font-sans text-[16px] uppercase tracking-[0.1em] text-frost">
              {founder.role}
            </p>

            {founder.bio.map((paragraph, i) => (
              <p
                key={i}
                className={`body-dark max-w-[56ch] ${
                  i === founder.bio.length - 1
                    ? "mb-[clamp(30px,4vw,44px)]"
                    : "mb-5"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <blockquote className="m-0 border-l-2 border-sage pl-[clamp(20px,2.4vw,32px)]">
              <p className="m-0 max-w-[34ch] font-serif text-[clamp(21px,2.1vw,30px)] font-normal italic leading-[1.42] text-white">
                {founder.quote}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
