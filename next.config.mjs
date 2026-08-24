/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Next 16 rejette toute qualité non déclarée. 55 sert au visuel de fond du
    // manifeste : masqué et à 20 % d'opacité, la compression y est invisible.
    qualities: [55, 75],
  },
};

export default nextConfig;
