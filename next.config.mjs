/**
 * L'hôte de la médiathèque se déduit de WORDPRESS_API_URL : sans cela, il
 * faudrait tenir deux réglages en accord, et l'optimiseur d'images refuserait
 * silencieusement les visuels le jour où l'un des deux dérive.
 */
const hoteWordPress = process.env.WORDPRESS_API_URL
  ? new URL(process.env.WORDPRESS_API_URL)
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // La section « Missions » est devenue « Offres » ; on ne casse pas les liens
    // déjà partagés.
    return [
      { source: "/missions", destination: "/offres", permanent: true },
    ];
  },
  // Le dossier public/ n'est pas embarqué par défaut dans les fonctions
  // serveur : sans cela, la route du manifeste ne verrait pas le PDF à
  // l'exécution et refuserait un document pourtant bien servi par le CDN.
  outputFileTracingIncludes: {
    "/api/manifeste": ["./public/documents/**"],
    "/api/manifeste/fichier": ["./public/documents/**"],
  },
  images: {
    // Visuels servis par la médiathèque WordPress. L'hôte est déduit de la même
    // variable que l'API : une seule valeur à renseigner, pas deux à accorder.
    remotePatterns: hoteWordPress
      ? [{ protocol: hoteWordPress.protocol.replace(":", ""), hostname: hoteWordPress.hostname }]
      : [],
    // Next 16 rejette toute qualité non déclarée. 55 sert aux visuels de fond :
    // masqués et à faible opacité, la compression y est invisible.
    qualities: [55, 75],
  },
};

export default nextConfig;
