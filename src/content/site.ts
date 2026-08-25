export const site = {
  name: "Kastell Conseil",
  /** Domaine de production — sert aussi à robots.txt, au sitemap et à l'OpenGraph. */
  url: "https://kastell-conseils.fr",
  tagline: "Conseil & lobbying engagé",
  /** Domaine au pluriel depuis le changement de nom de domaine. */
  email: "contact@kastell-conseils.fr",
  city: "Rennes, Bretagne",
  /** Page entreprise. */
  linkedin: "#",
  /** Profil personnel : c'est lui qui alimente la section actualités. */
  linkedinProfile: "#",
  /** Sections toggled from the design canvas props. */
  showTestimonials: true,
  showNews: true,
} as const;

export const manifeste = {
  /**
   * Visuel de fond, chemin sous public/ SANS extension : findPublicAsset
   * résout le format réel du fichier. Vide = pas de fond, comme la maquette.
   * La carte sert désormais d'illustration au héros ; pour en remettre une ici,
   * indiquer "brand/manifeste-carte" ou "brand/photoorga".
   */
  backdrop: "",
} as const;

export const nav = [
  { label: "Manifeste", href: "/#manifeste" },
  { label: "Offres", href: "/offres" },
  { label: "À propos", href: "/#apropos" },
  { label: "Références", href: "/#references" },
] as const;

export const offers = [
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

/**
 * Logos clients. `file` est un chemin sous public/ SANS extension : le helper
 * findPublicAsset résout le format réel. Tant qu'un fichier manque, la tuile
 * affiche le nom du client à la place, comme dans la maquette.
 */
export const clients = [
  { name: "Ville de Rennes", file: "brand/ville-de-rennes" },
  { name: "Région Bretagne", file: "brand/region-bretagne" },
  { name: "Breizh Cola", file: "brand/breizh-cola" },
  { name: "NDC", file: "brand/ndc" },
  { name: "Google", file: "brand/google" },
] as const;

export const founder = {
  name: "Léa de Lamotte",
  role: "Conseil en affaires publiques · Rennes",
  bio: [
    "Formée aux institutions et passée par les cabinets d'élus comme par la direction des affaires publiques d'un grand groupe, elle a fondé Kastell Conseil pour porter les enjeux des entreprises bretonnes engagées dans la transition écologique.",
    "Elle intervient personnellement sur chaque mission, de la stratégie à la rencontre des décideurs.",
  ],
  quote:
    "« Peser dans le débat public ne s'improvise pas : cela se prépare, se documente et se construit dans le temps long. »",
  /** Déposer le portrait ici (4:5) — le placeholder du design s'affiche tant qu'il est absent. */
  photo: "/brand/fondatrice.png",
} as const;

/**
 * Retombées presse. Titres repris des URL sources ; les dates ne sont pas
 * renseignées faute d'avoir pu ouvrir les articles.
 *
 * `logo` est un chemin sous public/ SANS extension. Tant que le fichier manque,
 * le nom du média s'affiche en toutes lettres à la place.
 */
export const press = [
  {
    outlet: "Ouest-France",
    logo: "brand/press/ouest-france",
    title:
      "Elle crée le premier cabinet d'affaires publiques dans le pays de Lamballe",
    href: "https://www.ouest-france.fr/economie/entreprises/elle-cree-le-premier-cabinet-daffaires-publiques-dans-le-pays-de-lamballe-841a2d3a-a91d-11f0-a84e-0a4f72002724",
  },
  {
    outlet: "Bretagne Économique",
    logo: "brand/press/bretagne-economique",
    title:
      "Léa de Lamotte crée Kastell Conseil, spécialisé dans le lobbying engagé et les affaires publiques",
    href: "https://www.bretagne-economique.com/actualites/lea-de-lamotte-cree-kastell-conseil-specialise-dans-le-lobbying-engage-et-les-affaires-publiques/",
  },
  {
    outlet: "Femmes de Bretagne",
    logo: "brand/press/femmes-de-bretagne",
    title:
      "Léa de Lamotte, entrepreneure engagée au service des territoires bretons",
    href: "https://www.femmesdebretagne.fr/articles/197488-lea-de-lamotte-entrepreneure-engagee-au-service-des-territoires-bretons",
  },
] as const;

/**
 * Publications. Le premier billet est paru en presse écrite : il n'a pas de
 * version web, d'où le renvoi vers le post LinkedIn qui le présente.
 * TODO client : titre exact de la tribune, nom du média, description du RIT.
 */
export const publications = [
  {
    label: "Tribune",
    title: "[ Titre de la tribune ]",
    context: "Parue en presse écrite — [ média ], début 2026",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7427385529794527232/",
    cta: "Voir le post LinkedIn",
  },
  {
    label: "Manifeste",
    title: "Réseau Influence & Territoire",
    context:
      "[ Description du RIT — réseau professionnel co-fondé en 2026 ]",
    /* URL publique : le lien fourni pointait vers l'espace d'administration. */
    href: "https://www.linkedin.com/company/115801577/",
    cta: "Suivre le RIT sur LinkedIn",
  },
] as const;

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
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Politique de cookies", href: "/cookies" },
  { label: "LinkedIn", href: site.linkedin },
] as const;
