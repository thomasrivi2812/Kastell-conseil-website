import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { about, founder, press, publications } from "@/content/site";
import { findPublicAsset } from "@/lib/asset";

/**
 * La maquette prévoit un cadre hachuré tant que le portrait n'est pas livré ;
 * déposer la photo à l'emplacement de founder.photo le remplace.
 */
const hasPortrait = fs.existsSync(
  path.join(process.cwd(), "public", founder.photo),
);

const pressItems = press.map((article) => ({
  ...article,
  logoSrc: findPublicAsset(article.logo),
}));

export function APropos() {
  return (
    <section id="apropos" className="band-dark">
      <div className="shell band-lg">
        <div className="grid items-start gap-[clamp(32px,5vw,80px)] [grid-template-columns:minmax(220px,0.72fr)_minmax(280px,1.28fr)] max-[820px]:[grid-template-columns:1fr]">
          <Reveal
            as="figure"
            className="relative m-0 flex min-h-[clamp(300px,30vw,430px)] items-end overflow-hidden border border-[rgba(226,240,248,0.14)] bg-[rgba(226,240,248,0.06)] p-6 [background-image:repeating-linear-gradient(135deg,rgba(226,240,248,0.06)_0_2px,transparent_2px_12px)]"
          >
            {hasPortrait ? (
              <Image
                src={founder.photo}
                alt={`Portrait de ${founder.name}, présidente fondatrice de Kastell Conseil`}
                fill
                sizes="(max-width: 820px) 100vw, 30vw"
                className="portrait-img object-cover"
              />
            ) : (
              <figcaption className="m-0 font-mono text-[12px] leading-[1.6] text-[rgba(226,240,248,0.6)]">
                {about.portraitPlaceholder[0]}
                <br />
                {about.portraitPlaceholder[1]}
              </figcaption>
            )}
          </Reveal>

          <Reveal index={1}>
            <p className="eyebrow-dark mb-[22px]">{about.eyebrow}</p>
            <h2 className="m-0 mb-2 font-serif text-[clamp(33px,3.8vw,52px)] font-normal leading-[1.14] text-white">
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

        {/* Presse et publications sur toute la largeur : l'ordre de lecture
            reste correct une fois la grille repliée en une colonne. */}
        <div className="mt-[clamp(48px,6vw,80px)] grid gap-[clamp(36px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <Reveal index={2} className="border-t border-[rgba(226,240,248,0.2)] pt-[22px]">
            <p className="eyebrow-dark mb-[18px] text-[12px] font-medium tracking-[0.22em]">
              {about.pressHeading}
            </p>
            <ul className="m-0 flex list-none flex-col gap-[14px] p-0">
              {pressItems.map((article) => (
                <li key={article.href}>
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-link flex items-center gap-[14px] text-[15px] leading-[1.5] text-[rgba(226,240,248,0.82)] hover:text-white"
                  >
                    {article.logoSrc ? (
                      <span className="press-logo relative block h-[34px] w-[92px] shrink-0 overflow-hidden rounded-[6px] bg-bone">
                        <Image
                          src={article.logoSrc}
                          alt={article.outlet}
                          fill
                          sizes="92px"
                          unoptimized
                          className="object-contain px-2 py-1.5"
                        />
                      </span>
                    ) : (
                      <span className="flex h-[34px] w-[92px] shrink-0 items-center justify-center rounded-[6px] bg-[rgba(226,240,248,0.1)] px-1 text-center font-sans text-[10px] uppercase leading-[1.2] tracking-[0.08em] text-frost">
                        {article.outlet}
                      </span>
                    )}
                    <span>
                      {article.title}
                      {" "}
                      <span className="inline-block" aria-hidden>
                        ↗
                      </span>
                      <span className="sr-only"> (nouvelle fenêtre)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={3} className="border-t border-[rgba(226,240,248,0.2)] pt-[22px]">
            <p className="eyebrow-dark mb-[18px] text-[12px] font-medium tracking-[0.22em]">
              {about.publicationsHeading}
            </p>
            <ul className="m-0 flex list-none flex-col gap-[22px] p-0">
              {publications.map((item) => (
                <li key={item.href}>
                  <p className="m-0 mb-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-frost">
                    {item.label}
                  </p>
                  <p className="m-0 mb-1.5 font-serif text-[clamp(19px,1.7vw,24px)] leading-[1.25] text-white">
                    {item.title}
                  </p>
                  <p className="m-0 mb-2.5 max-w-[46ch] text-[15px] leading-[1.6] text-[rgba(226,240,248,0.72)]">
                    {item.context}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-link inline-block font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-[rgba(226,240,248,0.9)] hover:text-white"
                  >
                    {item.cta}
                    {" "}
                    <span className="inline-block" aria-hidden>
                      ↗
                    </span>
                    <span className="sr-only"> (nouvelle fenêtre)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
