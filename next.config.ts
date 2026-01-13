import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker/VPS deployment
  output: "standalone",

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
