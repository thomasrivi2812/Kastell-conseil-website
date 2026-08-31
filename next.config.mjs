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
  },
  images: {
    // Visuels servis par le CDN Sanity une fois le CMS branché.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // Next 16 rejette toute qualité non déclarée. 55 sert au visuel de fond du
    // manifeste : masqué et à 20 % d'opacité, la compression y est invisible.
    qualities: [55, 75],
  },
};

export default nextConfig;
