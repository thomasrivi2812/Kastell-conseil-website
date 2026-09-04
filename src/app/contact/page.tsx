import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/Reveal";
import { contact, site } from "@/content/site";

/* Voir src/app/page.tsx : une page construite sans le CMS ne comporte aucune
   requête, donc aucune période de revalidation, et resterait figée. */
export const revalidate = 60;

export const metadata: Metadata = {
  title: contact.page.title,
  description: contact.page.intro,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${contact.page.title} — ${site.name}`,
    description: contact.page.intro,
    url: "/contact",
  },
};

export default function Page() {
  return (
    <div className="w-full overflow-x-clip">
      <Header />
      <main id="contenu">
        <section className="shell pb-[clamp(30px,4vw,52px)] pt-[clamp(44px,7vw,92px)]">
          <Reveal className="max-w-[60ch]">
            <p className="eyebrow mb-[clamp(16px,2vw,24px)]">{contact.page.eyebrow}</p>
            <h1 className="h1">{contact.page.title}</h1>
            <p className="body-lg mt-[clamp(20px,2.6vw,30px)]">{contact.page.intro}</p>
          </Reveal>
        </section>

        <Contact titre={false} />
      </main>
      <Footer />
    </div>
  );
}
