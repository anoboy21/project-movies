/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "https://image.tmdb.org",
      "image.tmdb.org"
    ]
  }
}

module.exports = nextConfig
