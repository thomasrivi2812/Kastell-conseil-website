export const site = {
  name: "Kastell Conseil",
  tagline: "Conseil & lobbying engagé",
  email: "contact@kastell-conseil.fr",
  city: "Rennes, Bretagne",
  linkedin: "#",
  /** Sections toggled from the design canvas props. */
  showTestimonials: true,
  showNews: true,
} as const;

export const nav = [
  { label: "Manifeste", href: "/#manifeste" },
  { label: "Missions", href: "/missions" },
  { label: "À propos", href: "/#apropos" },
  { label: "Références", href: "/#references" },
] as const;

export const missions = [
  {
    index: "01",
    slug: "affaires-publiques",
    title: "Affaires publiques",
    summary:
      "Veille législative, lecture du calendrier institutionnel, stratégie d'influence.",
  },
  {
    index: "02",
    slug: "representation",
    title: "Représentation d'intérêts",
    summary:
      "Portage de vos positions auprès des élus, administrations et collectivités.",
  },
  {
    index: "03",
    slug: "communication",
    title: "Communication d'influence",
    summary: "Narratif, relations presse et prises de parole dirigeants.",
  },
  {
    index: "04",
    slug: "transition",
    title: "Transition écologique",
    summary:
      "Énergie, agroalimentaire et mer : climat, eau, foncier, biodiversité.",
  },
] as const;

export const founder = {
  /** TODO: remplacer par le nom de la présidente fondatrice. */
  name: "[ Prénom Nom ]",
  role: "Conseil en affaires publiques · Rennes",
  bio: [
    "Formée aux institutions et passée par les cabinets d'élus comme par la direction des affaires publiques d'un grand groupe, elle a fondé Kastell Conseil pour porter les enjeux des entreprises bretonnes engagées dans la transition écologique.",
    "Elle intervient personnellement sur chaque mission, de la stratégie à la rencontre des décideurs.",
  ],
  quote:
    "« Peser dans le débat public ne s'improvise pas : cela se prépare, se documente et se construit dans le temps long. »",
  /** Déposer le portrait ici (4:5) — le placeholder du design s'affiche tant qu'il est absent. */
  photo: "/brand/fondatrice.jpg",
} as const;

export const testimonials = [
  {
    quote:
      "« Un accompagnement précis, qui connaît les circuits de décision et sait quand intervenir. »",
    author: "Nom · fonction, organisation",
  },
  {
    quote:
      "« Une lecture du territoire breton que peu de cabinets parisiens peuvent offrir. »",
    author: "Nom · fonction, organisation",
  },
] as const;

export const posts = [
  {
    date: "12 août 2026",
    excerpt:
      "Loi d’accélération des énergies renouvelables : ce que change le dernier décret pour les porteurs de projets en Bretagne…",
    href: "#",
  },
  {
    date: "29 juillet 2026",
    excerpt:
      "Retour sur la table ronde « Eau et industrie agroalimentaire » organisée avec les acteurs du bassin rennais…",
    href: "#",
  },
  {
    date: "8 juillet 2026",
    excerpt:
      "Budget régional 2027 : trois arbitrages à suivre pour les filières de la mer et du littoral breton…",
    href: "#",
  },
] as const;

export const legal = [
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  { label: "Politique de cookies", href: "#" },
  { label: "LinkedIn", href: site.linkedin },
] as const;
