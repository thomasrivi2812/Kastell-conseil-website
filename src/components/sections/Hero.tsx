import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[min(82vh,860px)] items-center overflow-hidden"
    >
      <Image
        src="/brand/kastell-mark.png"
        alt=""
        aria-hidden
        width={2500}
        height={2407}
        priority
        sizes="(max-width: 1348px) 46vw, 620px"
        className="pointer-events-none absolute right-[-8%] top-1/2 aspect-[2500/2407] w-[min(46vw,620px)] -translate-y-1/2 opacity-[0.06]"
      />

      <div className="shell relative w-full py-[clamp(72px,11vw,150px)]">
        <Reveal className="flex max-w-[min(900px,92%)] flex-col items-start">
          <h1 className="h1">Peser dans le débat public.</h1>
          <Link
            href="/missions"
            className="pill pill-solid mt-[clamp(30px,4vw,48px)]"
          >
            Découvrir nos missions <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
