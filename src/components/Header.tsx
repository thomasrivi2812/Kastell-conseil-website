"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  /**
   * Publish the real header height so anchored sections can clear it. It is
   * not a constant: the nav wraps on narrow viewports (75px -> 132px), so a
   * hardcoded breakpoint would drift. globals.css ships 75px as the pre-hydration
   * default.
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
