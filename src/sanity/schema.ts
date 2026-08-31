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
    {
      name: "hatvp",
      title: "Profil HATVP",
      ...texte,
      description:
        "Lien vers la fiche du répertoire des représentants d'intérêts. Laisser vide retire le lien du pied de page.",
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
    { name: "vision", title: "Notre vision" },
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

    { name: "visionIntitule", title: "Intitulé de section", group: "vision", ...texte },
    { name: "visionTitre", title: "Titre", group: "vision", ...paragraphe },
    {
      name: "visionParagraphes",
      title: "Paragraphes",
      group: "vision",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    },
    {
      name: "visionChiffres",
      title: "Chiffres clés",
      group: "vision",
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
            {
              name: "prestations",
              title: "Ce que Kastell fait pour vous",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "note",
              title: "Mention complémentaire",
              ...texte,
              description: "Facultatif. Exemple : « Formation animée sur un module d'une journée. »",
            },
            {
              name: "casPratique",
              title: "Cas pratique",
              type: "object",
              description:
                "Facultatif : le bloc n'apparaît sur le site que s'il est renseigné.",
              fields: [
                { name: "title", title: "Titre", ...texte },
                { name: "body", title: "Récit", ...paragraphe },
              ],
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
    { name: "manifeste", title: "Manifeste RIT" },
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
            {
              name: "objectifs",
              title: "Objectifs",
              type: "array",
              of: [{ type: "string" }],
              description: "Facultatif : liste numérotée sous le contexte.",
            },
          ],
          preview: { select: { title: "titre", subtitle: "categorie" } },
        },
      ],
    },

    { name: "manifesteIntitule", title: "Intitulé de section", group: "manifeste", ...texte },
    { name: "manifesteTitre", title: "Titre", group: "manifeste", ...paragraphe },
    {
      name: "manifesteIntro",
      title: "Texte de présentation",
      group: "manifeste",
      type: "text",
      rows: 6,
    },
    { name: "manifesteObjectifsTitre", title: "Titre de la liste", group: "manifeste", ...texte },
    {
      name: "manifesteObjectifs",
      title: "Objectifs",
      group: "manifeste",
      type: "array",
      of: [{ type: "string" }],
      description: "La numérotation est ajoutée automatiquement.",
    },
    {
      name: "manifesteEtiquettes",
      title: "Étiquettes",
      group: "manifeste",
      type: "array",
      of: [{ type: "string" }],
      description: "Deux ou trois mots affichés en pastilles au-dessus de la liste.",
    },
    { name: "manifesteCta", title: "Libellé du bouton", group: "manifeste", ...texte },
    { name: "manifesteLien", title: "Lien du bouton", group: "manifeste", ...texte },
    { name: "manifesteTelechargerCta", title: "Libellé du bouton de téléchargement", group: "manifeste", ...texte },
    {
      name: "manifesteFichier",
      title: "Document à télécharger",
      group: "manifeste",
      type: "file",
      description:
        "Le PDF du manifeste. Sans fichier ici ni dans le dépôt, le bouton de téléchargement ne s'affiche pas.",
    },
    {
      name: "manifesteCouverture",
      title: "Couverture du document",
      group: "manifeste",
      type: "image",
      description:
        "Facultatif. Sans image, une couverture est composée automatiquement aux couleurs du site. Format conseillé : portrait, environ 1000 x 1414 px.",
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
