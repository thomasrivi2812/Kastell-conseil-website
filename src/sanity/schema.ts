import type { SchemaTypeDefinition } from "sanity";

/**
 * Schémas rédigés en français : ce sont les intitulés que voit Léa dans le
 * studio. Chaque document est un singleton — une seule fiche par rubrique —
 * pour qu'elle retrouve toujours la même arborescence à gauche.
 */

const texte = { type: "string" } as const;
const paragraphe = { type: "text", rows: 4 } as const;

const parametres: SchemaTypeDefinition = {
  name: "parametres",
  title: "Paramètres du site",
  type: "document",
  fields: [
    { name: "nom", title: "Nom du cabinet", ...texte },
    { name: "url", title: "Adresse du site", ...texte, description: "Avec https://" },
    { name: "email", title: "Adresse e-mail de contact", ...texte },
    { name: "ville", title: "Ville", ...texte },
    { name: "linkedin", title: "Page LinkedIn du cabinet", ...texte },
    {
      name: "linkedinProfil",
      title: "Profil LinkedIn de Léa",
      ...texte,
      description: "C'est ce profil qui alimente la rubrique actualités.",
    },
  ],
  preview: { prepare: () => ({ title: "Paramètres du site" }) },
};

const accueil: SchemaTypeDefinition = {
  name: "accueil",
  title: "Page d'accueil",
  type: "document",
  groups: [
    { name: "heros", title: "Héros" },
    { name: "manifeste", title: "Manifeste" },
    { name: "references", title: "Références" },
    { name: "actualites", title: "Actualités" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    { name: "promesse", title: "Promesse", group: "heros", ...texte },
    { name: "herosCta", title: "Libellé du bouton", group: "heros", ...texte },
    {
      name: "herosVisuel",
      title: "Illustration",
      group: "heros",
      type: "image",
      description: "Laisser vide pour garder le motif cartographique fourni.",
    },

    { name: "manifesteIntitule", title: "Intitulé de section", group: "manifeste", ...texte },
    { name: "manifesteTitre", title: "Titre", group: "manifeste", ...paragraphe },
    {
      name: "manifesteParagraphes",
      title: "Paragraphes",
      group: "manifeste",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    },
    {
      name: "manifesteChiffres",
      title: "Chiffres clés",
      group: "manifeste",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "valeur", title: "Valeur", ...texte },
            { name: "libelle", title: "Légende", ...texte },
          ],
          preview: { select: { title: "valeur", subtitle: "libelle" } },
        },
      ],
    },

    { name: "referencesIntitule", title: "Intitulé de section", group: "references", ...texte },
    { name: "referencesTitre", title: "Titre", group: "references", ...paragraphe },
    {
      name: "clients",
      title: "Logos clients",
      group: "references",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "nom", title: "Nom du client", ...texte },
            { name: "logo", title: "Logo", type: "image" },
          ],
          preview: { select: { title: "nom", media: "logo" } },
        },
      ],
    },
    {
      name: "temoignages",
      title: "Témoignages",
      group: "references",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "citation", title: "Citation", ...paragraphe },
            { name: "auteur", title: "Auteur", ...texte, description: "Nom · fonction, organisation" },
          ],
          preview: { select: { title: "auteur", subtitle: "citation" } },
        },
      ],
    },

    { name: "actualitesTitre", title: "Titre de section", group: "actualites", ...texte },
    { name: "actualitesCta", title: "Libellé du bouton", group: "actualites", ...texte },
    {
      name: "posts",
      title: "Posts mis en avant",
      group: "actualites",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "date", title: "Date affichée", ...texte },
            { name: "extrait", title: "Extrait", ...paragraphe },
            { name: "lien", title: "Lien vers le post", ...texte },
          ],
          preview: { select: { title: "date", subtitle: "extrait" } },
        },
      ],
    },

    { name: "contactIntitule", title: "Intitulé de section", group: "contact", ...texte },
    { name: "contactTitre", title: "Titre", group: "contact", ...paragraphe },
    { name: "contactIntro", title: "Phrase d'introduction", group: "contact", ...paragraphe },
  ],
  preview: { prepare: () => ({ title: "Page d'accueil" }) },
};

const offres: SchemaTypeDefinition = {
  name: "offres",
  title: "Offres",
  type: "document",
  fields: [
    { name: "intitule", title: "Intitulé de section", ...texte },
    { name: "titrePage", title: "Titre de la page Offres", ...paragraphe },
    { name: "introPage", title: "Introduction de la page", ...paragraphe },
    {
      name: "liste",
      title: "Les offres",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "titre", title: "Titre", ...texte },
            { name: "resume", title: "Résumé", ...paragraphe },
            {
              name: "ancre",
              title: "Identifiant de lien",
              ...texte,
              description: "Sans accent ni espace, sert d'ancre dans l'URL.",
            },
          ],
          preview: { select: { title: "titre", subtitle: "resume" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Offres" }) },
};

const apropos: SchemaTypeDefinition = {
  name: "apropos",
  title: "À propos",
  type: "document",
  groups: [
    { name: "fondatrice", title: "Fondatrice" },
    { name: "presse", title: "Dans la presse" },
    { name: "publications", title: "Nos publications" },
  ],
  fields: [
    { name: "intitule", title: "Intitulé de section", group: "fondatrice", ...texte },
    { name: "nom", title: "Nom", group: "fondatrice", ...texte },
    { name: "role", title: "Fonction", group: "fondatrice", ...texte },
    { name: "portrait", title: "Portrait", group: "fondatrice", type: "image" },
    {
      name: "biographie",
      title: "Biographie",
      group: "fondatrice",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    },
    { name: "citation", title: "Citation", group: "fondatrice", ...paragraphe },

    { name: "presseIntitule", title: "Intitulé du bloc", group: "presse", ...texte },
    {
      name: "presse",
      title: "Retombées presse",
      group: "presse",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "media", title: "Média", ...texte },
            { name: "titre", title: "Titre de l'article", ...paragraphe },
            { name: "lien", title: "Lien", ...texte },
            { name: "logo", title: "Logo du média", type: "image" },
          ],
          preview: { select: { title: "media", subtitle: "titre", media: "logo" } },
        },
      ],
    },

    { name: "publicationsIntitule", title: "Intitulé du bloc", group: "publications", ...texte },
    {
      name: "publications",
      title: "Publications",
      group: "publications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "categorie", title: "Catégorie", ...texte, description: "Tribune, Manifeste…" },
            { name: "titre", title: "Titre", ...paragraphe },
            { name: "contexte", title: "Contexte", ...paragraphe },
            { name: "lien", title: "Lien", ...texte },
            { name: "cta", title: "Libellé du lien", ...texte },
          ],
          preview: { select: { title: "titre", subtitle: "categorie" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "À propos" }) },
};

const piedDePage: SchemaTypeDefinition = {
  name: "piedDePage",
  title: "Pied de page",
  type: "document",
  fields: [
    { name: "accroche", title: "Phrase de présentation", ...paragraphe },
    { name: "copyright", title: "Mention de copyright", ...texte },
    { name: "mention", title: "Mention réglementaire", ...texte },
  ],
  preview: { prepare: () => ({ title: "Pied de page" }) },
};

export const schemaTypes = [parametres, accueil, offres, apropos, piedDePage];

/** Rubriques du studio : une entrée par document, dans l'ordre du site. */
export const singletonTypes = [
  { type: "parametres", title: "Paramètres du site" },
  { type: "accueil", title: "Page d'accueil" },
  { type: "offres", title: "Offres" },
  { type: "apropos", title: "À propos" },
  { type: "piedDePage", title: "Pied de page" },
] as const;

export const schema: { types: SchemaTypeDefinition[] } = { types: schemaTypes };
