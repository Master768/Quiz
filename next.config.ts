import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Quiz",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
