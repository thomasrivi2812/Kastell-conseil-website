import { Reveal } from "@/components/Reveal";
import { getContent } from "@/cms/content";

export async function Contact() {
  const { contact, site } = await getContent();
  return (
    <section id="contact" className="band-dark">
      <div className="shell py-[clamp(60px,9vw,130px)]">
        <Reveal className="flex max-w-[900px] flex-col items-start">
          <p className="m-0 mb-[clamp(24px,3vw,40px)] font-sans text-[12px] font-medium uppercase tracking-[0.24em] text-mist">
            {contact.eyebrow}
          </p>
          <h2 className="h2-contact">{contact.title}</h2>
          <p className="mb-[clamp(34px,4.5vw,52px)] mt-[26px] max-w-[44ch] text-[clamp(16px,1.25vw,19px)] leading-[1.7] text-[rgba(226,240,248,0.78)]">
{contact.intro}
          </p>

          <div className="flex flex-wrap gap-[14px]">
            <a
              href={`mailto:${site.email}`}
              className="pill bg-bone px-7 py-[15px] text-forest hover:bg-white hover:text-forest"
            >
              {contact.mailCta} <span aria-hidden>→</span>
            </a>
            <a
              href={site.linkedin}
              className="pill border border-[rgba(226,240,248,0.4)] px-7 py-[15px] text-white hover:border-white hover:bg-[rgba(226,240,248,0.1)] hover:text-white"
            >
              {contact.linkedinCta} <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="mt-[clamp(36px,5vw,60px)] flex w-full flex-wrap gap-x-12 gap-y-3 border-t border-[rgba(226,240,248,0.2)] pt-6">
            <span className="text-[17px] text-[rgba(226,240,248,0.85)]">
              {site.email}
            </span>
            <span className="text-[17px] text-[rgba(226,240,248,0.7)]">
              {site.city}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
