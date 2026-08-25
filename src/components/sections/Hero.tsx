import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[min(82vh,860px)] items-center overflow-hidden"
    >
      {/* Illustration : le motif cartographique. Il remplace le filigrane du
          symbole K, redondant depuis que le mot-symbole occupe le héros. Calé à
          droite du bloc de texte, il ne passe jamais sous les glyphes. */}
      <Image
        src="/brand/manifeste-carte.svg"
        alt=""
        aria-hidden
        width={1200}
        height={900}
        priority
        unoptimized
        className="hero-map pointer-events-none absolute top-1/2 aspect-[4/3] -translate-y-1/2"
      />

      <div className="shell relative w-full py-[clamp(72px,11vw,150px)]">
        <div className="flex max-w-[min(900px,92%)] translate-y-[clamp(14px,2.6vw,48px)] flex-col items-start">
          <Reveal>
            {/* Le mot-symbole porte le nom et la baseline : la ligne de texte
                qui les répétait a été retirée. Le H1 reste la promesse. */}
            <Image
              src="/brand/kastell-logo-forest.png"
              alt="Kastell — Conseil & lobbying engagé"
              width={2500}
              height={737}
              priority
              sizes="(max-width: 700px) 78vw, min(34vw, 520px)"
              className="mb-[clamp(30px,4.5vw,54px)] block aspect-[2500/737] h-auto w-[min(78vw,clamp(280px,34vw,520px))]"
            />
            <h1 className="h1">Peser dans le débat public.</h1>
          </Reveal>
          <Reveal className="reveal-hero-cta mt-[clamp(30px,4vw,48px)]">
            <Link href="/offres" className="pill pill-solid">
              Découvrir nos offres <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
