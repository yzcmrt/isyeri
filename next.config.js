/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Next.js'in build sırasında ESLint hatalarını görmezden gelmesini sağlar
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig; 