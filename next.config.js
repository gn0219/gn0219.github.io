/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com', 'linkedin.com', 'researchgate.net'],
  },
}

module.exports = nextConfig 