export const site = {
  name: "Kastell Conseil",
  /** Domaine de production — sert aussi à robots.txt, au sitemap et à l'OpenGraph. */
  url: "https://kastell-conseils.fr",
  tagline: "Ancrage territorial, influence nationale",
  /** Profil HATVP de Léa — à renseigner, lié depuis le pied de page. */
  hatvp: "",
  /** Domaine au pluriel depuis le changement de nom de domaine. */
  email: "contact@kastell-conseils.fr",
  city: "Lamballe, Bretagne",
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
  promise:
    "Peser dans le débat public. Influencer les décisions. Où que vous soyez.",
  cta: "Découvrir nos offres",
} as const;

export const vision = {
  /**
   * Visuel de fond, chemin sous public/ SANS extension : findPublicAsset
   * résout le format réel du fichier. Vide = pas de fond, comme la maquette.
   * La carte sert désormais d'illustration au héros ; pour en remettre une ici,
   * indiquer "brand/manifeste-carte" ou "brand/photoorga".
   */
  backdrop: "",
  eyebrow: "Notre vision",
  title:
    "« L'interface entre les entreprises ancrées dans les territoires et les lieux de décisions »",
  paragraphs: [
    "L'économie française se construit dans les territoires. Les décisions structurantes qui en dessinent l'avenir se prennent ailleurs. Pendant longtemps, influencer la décision publique signifiait être à Paris ou à Bruxelles, héritage d'un modèle de décision centralisé.",
    "Mais l'influence publique ne s'arrête pas au périphérique. À mesure que les centres de décision se diversifient, l'influence doit se rapprocher du terrain. Depuis les Côtes-d'Armor, Kastell crée un dialogue entre les lieux où naissent les projets et les lieux où se prennent les décisions.",
    "Où que vous soyez, Kastell met sa connaissance des réalités locales, du monde économique et des institutions publiques au service de vos enjeux d'influence : lever des obstacles législatifs et réglementaires qui freinent votre activité, accroître votre visibilité sur votre territoire et au-delà, renforcer votre ancrage et votre dialogue avec vos parties prenantes, obtenir des financements publics pour développer vos projets.",
    "Parce que l'influence ne s'improvise pas, nous travaillons chaque enjeu avec méthode. Comprendre les agendas politiques, identifier les interlocuteurs clés, construire les bons arguments et inscrire un dialogue dans la durée : une approche exigeante, transparente et conforme aux règles applicables aux représentants d'intérêts.",
    "Comprendre au plus près, conseiller avec expertise, agir pour une influence utile et responsable : trois principes qui guident chacune de nos missions.",
  ],
  stats: [
    { value: "10 ans", label: "d'expérience institutionnelle" },
    { value: "Lamballe", label: "Paris · Bruxelles" },
  ],
} as const;

export const nav = [
  { label: "Notre vision", href: "/#vision" },
  { label: "Offres", href: "/offres" },
  { label: "À propos", href: "/#apropos" },
  { label: "Références", href: "/#references" },
] as const;

export const offersSection = {
  eyebrow: "Offres",
  ctaAll: "Toutes nos offres",
  pageTitle: "Six terrains d'intervention.",
  pageIntro:
    "Chaque mission part du même point : comprendre où se prend la décision, à quel moment, et par qui. Le reste — argumentaire, interlocuteurs, calendrier — en découle.",
  backLabel: "Retour",
  backCta: "Revenir à l'accueil",
  /** Libellé et préfixe d'objet du courriel de prise de rendez-vous. */
  diagnosticCta: "Prendre rendez-vous pour un pré-diagnostic",
  diagnosticSubject: "Pré-diagnostic",
  bulletsHeading: "Ce que Kastell fait pour vous",
} as const;

/**
 * `caseStudy` reste vide tant qu'aucun cas pratique n'est publiable : le bloc
 * n'apparaît que s'il est renseigné, offre par offre.
 */
export const offers = [
  {
    index: "01",
    slug: "lobbying-institutionnel",
    title: "Lobbying institutionnel",
    summary:
      "Influencer les décisions publiques pour conquérir de nouveaux marchés et protéger vos activités.",
    bullets: [
      "Suivi de l'activité politique, législative et réglementaire",
      "Analyse et décryptage",
      "Mapping de l'environnement institutionnel",
      "Organisation de rendez-vous avec des décideurs politiques nationaux",
      "Rédaction et négociation d'amendements et de propositions de loi",
    ],
    caseStudy: null,
  },
  {
    index: "02",
    slug: "ancrage-territorial",
    title: "Ancrage territorial",
    summary:
      "Renforcer votre capacité d'influence au cœur des écosystèmes locaux.",
    bullets: [
      "Veille et intelligence territoriale",
      "Création de coalitions et animation de réseaux",
      "Mise en relation avec des décideurs locaux",
      "Organisation d'événements locaux",
    ],
    caseStudy: null,
  },
  {
    index: "03",
    slug: "aides-et-financements-publics",
    title: "Aides et financements publics",
    summary:
      "Vous orienter dans le millefeuille administratif et mobiliser des aides et financements publics pour développer vos projets.",
    bullets: [
      "Identification des aides et financements éligibles a priori pour votre projet",
      "Conseil stratégique : positionnement, rendez-vous décideurs, messages",
      "Préparation et dépôt des demandes auprès des organismes identifiés",
      "Sécurisation institutionnelle jusqu'à l'obtention des financements",
    ],
    caseStudy: null,
  },
  {
    index: "04",
    slug: "communication-d-influence",
    title: "Communication d'influence",
    summary:
      "Faire entendre votre voix et valoriser vos projets à impact dans une société exigeante à l'information abondante.",
    bullets: [
      "Analyse réputationnelle",
      "Animation et structuration de réseaux",
      "Négociation d'interviews dans les médias",
      "Recherche de partenariats d'influence",
      "Organisation d'événements",
    ],
    caseStudy: null,
  },
  {
    index: "05",
    slug: "audit-strategique",
    title: "Audit stratégique d'affaires publiques",
    summary:
      "Trouver des leviers de compétitivité grâce à une stratégie d'affaires publiques efficace.",
    bullets: [
      "Diagnostic interne et échange sur vos priorités",
      "Analyse de l'environnement économique, juridique et politique dans lequel agir",
      "Cartographie des parties prenantes et priorisation des publics",
      "Identification des messages clés",
      "Analyse des leviers d'action",
      "Construction d'une feuille de route opérationnelle",
    ],
    note: "Formation animée sur un module d'une journée.",
    caseStudy: null,
  },
  {
    index: "06",
    slug: "communication-de-crise",
    title: "Communication de crise",
    summary:
      "Protéger votre réputation dans un environnement crisogène où la perception compte souvent autant que la performance.",
    bullets: [
      "Veille sectorielle et détection des signaux faibles",
      "Organisation et animation d'une cellule de crise",
      "Mise en œuvre de la stratégie : matrices, procédures",
      "Élaboration des messages clés",
      "Gestion des relations presse de crise",
      "Media training",
    ],
    caseStudy: null,
  },
] as const;

export const clients = [
  { name: "Ville de Rennes", file: "brand/ville-de-rennes" },
  { name: "Région Bretagne", file: "brand/region-bretagne" },
  { name: "Breizh Cola", file: "brand/breizh-cola" },
  { name: "NDC", file: "brand/ndc" },
  { name: "Google", file: "brand/google" },
] as const;

export const founder = {
  name: "Léa de Lamotte",
  role: "Conseil en affaires publiques · Lamballe · Paris · Bruxelles",
  bio: [
    "Formée au croisement de la décision publique, du plaidoyer environnemental et du conseil aux entreprises, Léa de Lamotte fonde Kastell Conseil avec une conviction : l'influence publique ne doit pas être réservée aux acteurs implantés dans les centres de décision.",
    "Son parcours, de l'Assemblée nationale au conseil stratégique en passant par le milieu des ONG, lui permet de croiser plusieurs expertises : compréhension de la fabrique de la loi, communication d'influence, ancrage territorial et intelligence économique.",
    "À travers Kastell, elle met son expertise au service de l'influence des entreprises et des acteurs économiques, avec une attention particulière portée à celles et ceux qui font vivre les territoires et portent les transformations de demain.",
    "Elle intervient personnellement sur chaque mission, de la définition de la stratégie à la rencontre des décideurs.",
    "Implanté en Bretagne, Kastell revendique une autre manière de pratiquer les affaires publiques, depuis les régions : partir du terrain pour mieux comprendre les enjeux des acteurs économiques, tout en maîtrisant les lieux de pouvoir et les mécanismes de décision. Elle co-fonde en 2026 le réseau Influence & Territoires, premier réseau professionnel dédié aux professionnels des affaires publiques installés en régions.",
  ],
  quote:
    "« L'influence publique ne doit pas être réservée aux acteurs implantés dans les centres de décision. »",
  linkedinCta: "Me suivre sur LinkedIn",
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
    title: "Réseau Influence & Territoires",
    context:
      "La décision publique reste très concentrée à Paris, créant une déconnexion avec les territoires où se déroule l'essentiel de l'activité économique et sociale — plus de 80 % des emplois privés. Plutôt que d'opposer Paris et les régions, le Réseau Influence & Territoires, collectif apartisan de consultants et de cabinets implantés en région, entend fluidifier le dialogue entre le niveau national et les réalités de terrain.",
    objectives: [
      "Valoriser l'expertise des professionnels des affaires publiques basés en territoires.",
      "Structurer la profession via le partage d'outils, de méthodes et de retours d'expérience.",
      "Rendre l'offre lisible pour les acteurs économiques locaux : PME, ETI, fédérations.",
      "Porter une voix collective pour faire remonter les enjeux territoriaux dans les processus de décision nationaux.",
    ],
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
  title: "Parlons de vos enjeux.",
  intro:
    "Un premier échange de trente minutes suffit souvent à clarifier une stratégie.",
  mailCta: "Nous contacter par mail",
  linkedinCta: "Nous contacter sur LinkedIn",
} as const;

export const footer = {
  blurb:
    "Conseil en affaires publiques, lobbying et communication d'influence. Lamballe, Bretagne.",
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
