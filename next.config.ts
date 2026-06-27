import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow serving local /public/projects/... images without domain restrictions.
    // Remove this once you configure a CDN or remote image host.
    unoptimized: true,
  },
};

export default nextConfig;
