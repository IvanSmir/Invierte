/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = {
  reactStrictMode: true,
  // next.config.js
  images: {
    domains: ["images.unsplash.com"],
  },
};
