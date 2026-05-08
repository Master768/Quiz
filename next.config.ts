import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Quiz",
  assetPrefix: "/Quiz/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
