"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";

/** Hauteur commune aux deux logos ; la largeur suit leur rapport d'origine. */
const LOGO_H = 38;
const MARK_W = Math.round((LOGO_H * 2500) / 2407);
const WORDMARK_W = Math.round((LOGO_H * 2500) / 737);

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  /**
   * Le héros porte déjà le mot-symbole en grand : tant qu'il est à l'écran, le
   * header se contente de la marque. Dès qu'on le quitte — ou sur toute autre
   * page — le mot-symbole complet prend le relais.
   *
   * Seul l'observateur écrit `heroVisible` ; la route est combinée au rendu.
   * Un état unique remis à jour depuis l'effet resterait bloqué sur la marque
   * après une navigation côté client, le Header n'étant pas remonté.
   */
  const [heroVisible, setHeroVisible] = useState(true);
  const pastHero = !isHome || !heroVisible;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === "undefined") return;
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: `-${LOGO_H + 40}px 0px 0px 0px`, threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [isHome]);

  /**
   * Publie la hauteur réelle du header : la navigation se replie sur deux
   * lignes en mobile, un point de rupture figé dériverait.
   */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${Math.round(node.getBoundingClientRect().height)}px`,
      );
    publish();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(publish);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-50 border-b border-[rgba(25,41,36,0.10)] bg-[rgba(250,249,246,0.92)] backdrop-blur-[10px]"
    >
      <div className="shell flex items-center justify-between gap-8 py-[18px]">
        <Link
          href="/#top"
          aria-label="Kastell — Conseil & lobbying engagé, retour à l'accueil"
          className="logo-swap relative block shrink-0"
          style={{
            height: LOGO_H,
            width: pastHero ? WORDMARK_W : MARK_W,
          }}
        >
          <Image
            src="/brand/kastell-mark.png"
            alt=""
            aria-hidden
            width={2500}
            height={2407}
            priority
            sizes="40px"
            className="logo-swap-face aspect-[2500/2407] h-full w-auto"
            style={{ opacity: pastHero ? 0 : 1 }}
          />
          <Image
            src="/brand/kastell-logo-forest.png"
            alt=""
            aria-hidden
            width={2500}
            height={737}
            priority
            sizes="129px"
            className="logo-swap-face aspect-[2500/737] h-full w-auto"
            style={{ opacity: pastHero ? 1 : 0 }}
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-[clamp(16px,2.2vw,34px)]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link hit-area"
            >
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
