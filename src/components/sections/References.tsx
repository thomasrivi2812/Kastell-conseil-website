import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";
import { getContent } from "@/cms/content";

export async function References() {
  const { clients: logos, references, testimonials } = await getContent();
  return (
    <section id="references" className="shell band-refs">
      <Reveal>
        <p className="eyebrow mb-[18px]">{references.eyebrow}</p>
        <h2 className="h2 mb-[clamp(32px,4vw,54px)] max-w-[26ch]">
          {references.title}
        </h2>
      </Reveal>

      <Reveal
        index={1}
        className="grid gap-[clamp(12px,1.4vw,20px)] [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]"
      >
        {logos.map((client) => (
          <div
            key={client.name}
            className="client-tile relative flex aspect-[5/2] items-center justify-center overflow-hidden rounded-[12px] border border-[rgba(25,41,36,0.16)] bg-bone"
          >
            {client.logoUrl ? (
              <Image
                src={client.logoUrl}
                alt={client.name}
                fill
                sizes="220px"
                unoptimized
                className="client-logo object-contain px-5 py-3"
              />
            ) : (
              <span className="px-2 text-center font-mono text-[11px] text-muted">
                {client.name}
              </span>
            )}
          </div>
        ))}
      </Reveal>

      {site.showTestimonials ? (
        <Reveal
          index={2}
          className="mt-[clamp(40px,5vw,64px)] grid gap-[clamp(28px,3vw,44px)] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
        >
          {testimonials.map((item) => (
            <div
              key={item.quote}
              className="border-t border-[rgba(25,41,36,0.2)] pt-6"
            >
              <p className="m-0 mb-[18px] font-serif text-[clamp(18px,1.5vw,22px)] italic leading-[1.5] text-forest">
                {item.quote}
              </p>
              <p className="m-0 font-sans text-[14px] uppercase tracking-[0.14em] text-sage">
                {item.author}
              </p>
            </div>
          ))}
          <div className="border-t border-[rgba(25,41,36,0.2)] pt-6">
            <p className="placeholder-note text-[12px] leading-[1.7]">
              {references.freeSlot}
            </p>
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}
