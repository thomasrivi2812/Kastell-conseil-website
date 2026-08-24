import Image from "next/image";
import Link from "next/link";
import { nav } from "@/content/site";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[rgba(25,41,36,0.10)] bg-[rgba(250,249,246,0.92)] backdrop-blur-[10px]"
    >
      <div className="shell flex items-center justify-between gap-8 py-[18px]">
        <Link href="/#top" className="flex shrink-0 items-center">
          <Image
            src="/brand/kastell-logo-forest.png"
            alt="Kastell — Conseil & lobbying engagé"
            width={2500}
            height={737}
            priority
            sizes="129px"
            className="block aspect-[2500/737] h-[38px] w-auto"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-[clamp(16px,2.2vw,34px)]">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="nav-cta">
            Échanger avec nous
          </Link>
        </nav>
      </div>
    </header>
  );
}
