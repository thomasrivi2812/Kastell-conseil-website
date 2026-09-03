import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/cms/content";
import { estUtile } from "@/lib/lien";

export async function News() {
  const { founder, news, posts, site } = await getContent();
  const profil = estUtile(site.linkedinProfile) ? site.linkedinProfile : null;
  return (
    <section className="hairline-top bg-sand">
      <div className="shell band-md">
        <Reveal className="mb-[clamp(28px,3.5vw,44px)] flex flex-wrap items-center justify-between gap-x-10 gap-y-[18px]">
          <div className="flex items-center gap-[14px]">
            <span
              aria-hidden
              className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-forest font-sans text-[14px] font-semibold text-bone"
            >
              in
            </span>
            <h2 className="m-0 font-serif text-[clamp(26px,2.8vw,38px)] font-normal leading-[1.1] text-forest">
              {news.heading}
            </h2>
          </div>
          {profil ? (
            <a
              href={profil}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-outline px-[22px] py-[13px] text-[12px]"
            >
              {news.followCta} <span aria-hidden>↗</span>
              <span className="sr-only"> (nouvelle fenêtre)</span>
            </a>
          ) : null}
        </Reveal>

        <Reveal
          index={1}
          className="grid gap-[clamp(18px,2vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]"
        >
          {/* La date ne fait pas une clé : deux posts publiés le même jour la
              partagent, et React confondrait alors les deux cartes. */}
          {posts.map((post, i) => {
            /* Sans lien vers le post, la carte reste une carte : la rendre
               cliquable n'aboutirait qu'à faire remonter la page. */
            const lien = estUtile(post.href) ? post.href : null;
            const Boite = lien ? "a" : "div";
            return (
            <Boite
              key={`${post.date}-${i}`}
              {...(lien
                ? { href: lien, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`news-card flex flex-col rounded-[14px] border border-[rgba(25,41,36,0.14)] bg-white p-[clamp(20px,2.2vw,26px)] ${
                lien ? "hover:border-sage" : ""
              }`}
            >
              <div className="mb-5 flex items-center gap-3">
                <Image
                  src={founder.photoUrl ?? founder.photo}
                  alt=""
                  aria-hidden
                  width={798}
                  height={1200}
                  sizes="42px"
                  className="h-[42px] w-[42px] shrink-0 rounded-full bg-sand object-cover"
                />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-sans text-[15px] font-semibold text-forest">
                    {founder.name}
                  </span>
                  <span className="font-sans text-[13px] text-dim">
                    {post.date}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="ml-auto font-sans text-[14px] font-semibold tracking-[0.04em] text-sage"
                >
                  in
                </span>
              </div>

              <p className="m-0 mb-5 text-[16px] leading-[1.6] text-graphite">
                {post.excerpt}
              </p>

              <span className="flex aspect-[16/10] items-end rounded-[9px] border border-[rgba(25,41,36,0.1)] bg-sand p-3 font-mono text-[11px] text-muted">
                {news.previewLabel}
              </span>

              {lien ? (
                <span className="mt-[22px] font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-forest">
                  {news.postCta} <span aria-hidden>→</span>
                  <span className="sr-only"> (nouvelle fenêtre)</span>
                </span>
              ) : null}
            </Boite>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
