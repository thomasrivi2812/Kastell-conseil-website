export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID ??
  "";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  "production";
export const apiVersion = "2024-10-01";

/**
 * Tant qu'aucun projet Sanity n'est renseigné, le site sert le contenu de
 * src/content/site.ts. Rien ne casse avant que le CMS soit branché, et rien ne
 * casse non plus si Sanity devient injoignable.
 */
export const isSanityConfigured = projectId.length > 0;
