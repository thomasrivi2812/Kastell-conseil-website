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

export const hero = {
  /** Le mot-symbole porte le nom : ce titre est la promesse seule. */
  promise: "Peser dans le débat public.",
  cta: "Découvrir nos offres",
} as const;

export const manifeste = {
  /**
   * Visuel de fond, chemin sous public/ SANS extension : findPublicAsset
   * résout le format réel du fichier. Vide = pas de fond, comme la maquette.
   * La carte sert désormais d'illustration au héros ; pour en remettre une ici,
   * indiquer "brand/manifeste-carte" ou "brand/photoorga".
   */
  backdrop: "",
  eyebrow: "Manifeste",
  title:
    "Une passerelle entre le monde politique et les entreprises des territoires.",
  paragraphs: [
    "Les décisions qui façonnent la transition écologique se prennent à Rennes, à Paris et à Bruxelles. Les entreprises qui la mettent en œuvre, elles, travaillent au plus près du terrain. Kastell Conseil existe pour relier les deux.",
    "Nous portons vos enjeux avec méthode : comprendre le calendrier politique, construire un argumentaire solide, identifier les bons interlocuteurs et engager un dialogue durable. Sans esbroufe, avec une exigence de transparence et de conformité.",
    "Proximité, expertise, engagement : trois principes qui structurent chacune de nos missions.",
  ],
  stats: [
    { value: "15 ans", label: "d'expérience institutionnelle" },
    { value: "Rennes", label: "Paris · Bruxelles" },
  ],
} as const;

export const nav = [
  { label: "Manifeste", href: "/#manifeste" },
  { label: "Offres", href: "/offres" },
  { label: "À propos", href: "/#apropos" },
  { label: "Références", href: "/#references" },
] as const;

export const offersSection = {
  eyebrow: "Offres",
  ctaAll: "Toutes nos offres",
  pageTitle: "Quatre terrains d'intervention.",
  pageIntro:
    "Chaque mission part du même point : comprendre où se prend la décision, à quel moment, et par qui. Le reste — argumentaire, interlocuteurs, calendrier — en découle.",
  backLabel: "Retour",
  backCta: "Revenir à l'accueil",
} as const;

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

export const about = {
  eyebrow: "Présidente fondatrice",
  pressHeading: "Dans la presse",
  publicationsHeading: "Nos publications",
  portraitPlaceholder: ["portrait — présidente fondatrice", "(photo professionnelle, format 4:5)"],
} as const;

export const references = {
  eyebrow: "Références",
  title: "Ils nous confient leurs enjeux publics",
  freeSlot: "emplacement disponible — cas client ou témoignage à venir",
} as const;

export const news = {
  heading: "Sur LinkedIn",
  followCta: "Suivre Léa de Lamotte",
  postCta: "Voir le post",
  previewLabel: "aperçu du post (image)",
} as const;

export const contact = {
  eyebrow: "Contact",
  title: "Parlons de vos enjeux publics.",
  intro:
    "Un premier échange de trente minutes suffit souvent à clarifier une stratégie.",
  mailCta: "Nous contacter par mail",
  linkedinCta: "Nous contacter sur LinkedIn",
} as const;

export const footer = {
  blurb:
    "Conseil en affaires publiques, lobbying et communication d'influence. Rennes, Bretagne.",
  navHeading: "Navigation",
  infoHeading: "Informations",
  contactHeading: "Contact",
  copyright: "© 2026 Kastell Conseil",
  mention: "Représentant d'intérêts déclaré — HATVP",
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
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Politique de cookies", href: "/cookies" },
  { label: "LinkedIn", href: site.linkedin },
] as const;
