"use client";

import { useId, useState } from "react";

/** Au-delà, une citation occupe plus de place que le témoignage n'en mérite. */
const LONGUEUR_MAX = 180;

/**
 * Témoignage, tronqué au-delà d'une certaine longueur.
 *
 * Le texte complet est toujours rendu et seulement écrêté par la feuille de
 * style : les moteurs le lisent en entier, et sans JavaScript il s'affiche tel
 * quel plutôt que d'être amputé par un bouton inopérant.
 */
export function CitationDepliable({
  citation,
  auteur,
  lire,
  reduire,
}: {
  citation: string;
  auteur: string;
  lire: string;
  reduire: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const id = useId();
  const longue = citation.length > LONGUEUR_MAX;

  return (
    <div className="border-t border-[rgba(25,41,36,0.2)] pt-6">
      <p
        id={id}
        className={`citation m-0 mb-[14px] font-serif text-[clamp(18px,1.5vw,22px)] italic leading-[1.5] text-forest ${
          longue && !ouvert ? "est-ecretee" : ""
        }`}
      >
        {citation}
      </p>

      {longue ? (
        <button
          type="button"
          className="citation-lien mb-[14px]"
          aria-expanded={ouvert}
          aria-controls={id}
          onClick={() => setOuvert((v) => !v)}
        >
          {ouvert ? reduire : lire}
        </button>
      ) : null}

      <p className="m-0 font-sans text-[14px] uppercase tracking-[0.14em] text-sage">
        {auteur}
      </p>
    </div>
  );
}
