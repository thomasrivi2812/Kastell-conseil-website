"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mirrors the canvas reveal: fade + 16px rise, 900ms, staggered in groups of
 * four, with a 700ms fallback so content is never trapped behind the observer.
 */
export function Reveal({
  children,
  index = 0,
  className = "",
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "section" | "figure";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const fallback = window.setTimeout(() => setVisible(true), 700);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          window.clearTimeout(fallback);
          setVisible(true);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    io.observe(node);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      // @ts-expect-error -- single ref shared across the allowed tag union
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${Math.min(index % 4, 3) * 90}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
