import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { APropos } from "@/components/sections/APropos";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Manifeste } from "@/components/sections/Manifeste";
import { MissionsPreview } from "@/components/sections/MissionsPreview";
import { News } from "@/components/sections/News";
import { References } from "@/components/sections/References";
import { site } from "@/content/site";

export default function Home() {
  return (
    <div className="w-full overflow-x-clip">
      <Header />
      <main id="contenu">
        <Hero />
        <Manifeste />
        <MissionsPreview />
        <APropos />
        <References />
        {site.showNews ? <News /> : null}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
