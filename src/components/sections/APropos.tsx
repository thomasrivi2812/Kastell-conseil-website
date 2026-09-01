import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";
import { getContent } from "@/cms/content";

export async function APropos() {
  const { about, founder, press, publications } = await getContent();
  const portrait = founder.photoUrl;
  return (
    <section id="apropos" className="band-dark">
      <div className="shell band-lg">
        <div className="grid items-start gap-[clamp(32px,5vw,80px)] [grid-template-columns:minmax(220px,0.72fr)_minmax(280px,1.28fr)] max-[820px]:[grid-template-columns:1fr]">
          <div className="apropos-colonne flex flex-col">
            <Reveal
              as="figure"
              className="relative m-0 flex min-h-[clamp(300px,30vw,430px)] items-end overflow-hidden border border-[rgba(226,240,248,0.14)] bg-[rgba(226,240,248,0.06)] p-6 [background-image:repeating-linear-gradient(135deg,rgba(226,240,248,0.06)_0_2px,transparent_2px_12px)]"
          >
            {portrait ? (
              <Image
                src={portrait}
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

            <Reveal
              index={2}
              className="apropos-citation mt-[clamp(26px,3vw,38px)]"
            >
              <blockquote className="m-0 border-l-2 border-accent pl-[clamp(18px,2vw,26px)]">
                <p className="m-0 font-serif text-[clamp(19px,1.7vw,25px)] font-normal italic leading-[1.42] text-white">
                  {founder.quote}
                </p>
              </blockquote>

              <a
                href={site.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="press-link mt-[clamp(20px,2.4vw,28px)] inline-flex items-center gap-2 rounded-full border border-[rgba(226,240,248,0.4)] px-6 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-white hover:border-white hover:bg-[rgba(226,240,248,0.1)]"
              >
                {founder.linkedinCta}
                <span className="inline-block" aria-hidden>
                  ↗
                </span>
                <span className="sr-only"> (nouvelle fenêtre)</span>
              </a>
            </Reveal>
          </div>

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
              {press.map((article) => (
                <li key={article.href}>
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-link flex items-center gap-[14px] text-[15px] leading-[1.5] text-[rgba(226,240,248,0.82)] hover:text-white"
                  >
                    {article.logoUrl ? (
                      <span className="press-logo relative block h-[42px] w-[116px] shrink-0 overflow-hidden rounded-[8px] bg-bone">
                        <Image
                          src={article.logoUrl}
                          alt={article.outlet}
                          fill
                          sizes="116px"
                          unoptimized
                          className="object-contain px-2.5 py-2"
                        />
                      </span>
                    ) : (
                      <span className="flex h-[42px] w-[116px] shrink-0 items-center justify-center rounded-[8px] border border-[rgba(115,193,103,0.35)] bg-[rgba(115,193,103,0.12)] px-2 text-center font-sans text-[10px] uppercase leading-[1.25] tracking-[0.1em] text-accent">
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
                  {item.objectives?.length ? (
                    <ol className="m-0 mb-2.5 flex max-w-[46ch] list-decimal flex-col gap-1.5 pl-[18px] text-[15px] leading-[1.55] text-[rgba(226,240,248,0.72)] marker:text-frost">
                      {item.objectives.map((objectif) => (
                        <li key={objectif}>{objectif}</li>
                      ))}
                    </ol>
                  ) : null}
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
