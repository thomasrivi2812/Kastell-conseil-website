/**
 * Ce fichier est lu par Next ET par le bundle du studio Sanity, qui n'exposent
 * pas les mêmes variables :
 *   - Next ne transmet au navigateur que le préfixe NEXT_PUBLIC_
 *   - le studio ne transmet que le préfixe SANITY_STUDIO_
 * D'où la double lecture. Les deux doivent être renseignées dans .env.local,
 * avec la même valeur.
 *
 * L'accès passe par des gardes optionnelles : selon le contexte de compilation,
 * `process` peut ne pas exister du tout et une lecture directe lèverait.
 */
const lire = (cle: string): string | undefined => {
  if (typeof process === "undefined") return undefined;
  return process.env?.[cle];
};

export const projectId =
  lire("NEXT_PUBLIC_SANITY_PROJECT_ID") ?? lire("SANITY_STUDIO_PROJECT_ID") ?? "";

export const dataset =
  lire("NEXT_PUBLIC_SANITY_DATASET") ??
  lire("SANITY_STUDIO_DATASET") ??
  "production";

export const apiVersion = "2024-10-01";

/**
 * Tant qu'aucun projet Sanity n'est renseigné, le site sert le contenu de
 * src/content/site.ts. Rien ne casse avant que le CMS soit branché, et rien ne
 * casse non plus si Sanity devient injoignable.
 */
export const isSanityConfigured = projectId.length > 0;
