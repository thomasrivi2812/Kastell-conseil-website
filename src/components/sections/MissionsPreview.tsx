import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { missions } from "@/content/site";

export function MissionsPreview() {
  return (
    <section id="missions" className="hairline-top">
      <div className="shell band-md">
        <Reveal className="mb-[clamp(30px,4vw,56px)] flex flex-wrap items-baseline justify-between gap-x-10 gap-y-5">
          <p className="eyebrow-tight">Missions</p>
          <Link href="/missions" className="pill pill-outline">
            Toutes nos missions <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <Reveal index={1} className="grid-auto gap-[clamp(24px,3vw,48px)]">
          {missions.map((mission) => (
            <Link
              key={mission.slug}
              href={`/missions#${mission.slug}`}
              className="mission-card"
            >
              <span className="mission-index">{mission.index}</span>
              <span className="mission-title">{mission.title}</span>
              <span className="max-w-[34ch] text-[16px] leading-[1.65] text-stone">
                {mission.summary}
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
